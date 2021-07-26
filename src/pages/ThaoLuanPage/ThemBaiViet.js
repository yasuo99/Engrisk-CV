import React, { Component } from "react"
import CKEditor from "react-ckeditor-component";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { CreatePost } from "../../actions/postActions";
import postApi from "../../api/postApi";
import HeaderClient from '../../components/client/HeaderClient';
import SubMenuClient from '../../components/client/SubMenuClient';
import DangTheoDoi from "../../components/thaoluan/DangTheoDoi";
import Footer from '../Footer/Footer';

class ThemBaiViet extends Component {
    constructor(props) {
        super(props);
        this.createPost = this.createPost.bind(this);
        this.state = {
            title: '',
            content: '',
            followingPosts: []
        }
        this.isComponentMounted = false;
    }
    async componentDidMount() {
        this.isComponentMounted = true;
        if (this.isComponentMounted) {
            if (!this.props.account.isVerified) {
                window.location = '/thao-luan';
            } else {
                if (this.props.isLoggedIn) {
                    var result = await this.fetchFollowingPosts();
                    this.setState({ followingPosts: result })
                }
            }
        }
    }
    async createPost() {
        console.log(this.state);
        let post = {
            title: this.state.title,
            content: this.state.content
        }
        console.log(post);
        await this.props.CreatePost(post);
        this.setState({
            content: "",
            title: ""
        })
        window.location = '/thao-luan';
    }
    async fetchFollowingPosts() {
        let token = localStorage.getItem('token');
        return await postApi.getFollowing(this.props.account.id, token);
    }
    onChange(evt) {
        var newContent = evt.editor.getData();
        console.log(newContent);
        localStorage.setItem('content', newContent);
    }
    handleChange(e) {
        e.preventDefault();
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    onBlur(evt) {
    }

    afterPaste(evt) {
    }
    render() {
        return (
            <div id="wrapper">
                <SubMenuClient></SubMenuClient>
                <div id="content-wrapper" className="d-flex flex-column">
                    <div id="content">
                        <HeaderClient></HeaderClient>
                        <section id="thembaiviet">
                            <div className="container">
                                <div className="row">
                                    <div className="col-8 mt-5">
                                        <div className="form-baiviet">
                                            <input type="submit" className="btn float-right" onClick={this.createPost} value="Đăng" />
                                            <Link to="/thao-luan" type="button" className="btn float-right mr-3">HỦY</Link>
                                            <textarea style={{ resize: "none" }} value={this.state.title} type="text" className="tieude" placeholder="Gõ tiêu đề bài viết" onChange={(e) => this.handleChange(e)} name="title" />
                                            <textarea style={{ height: "400px" }} value={this.state.content} placeholder="Nhập nội dung bài viết" onChange={(e) => this.handleChange(e)} name="content" className="tieude" />
                                        </div>
                                    </div>
                                    <div className="col-4 mt-5">
                                        <input className="form-control" type="text" placeholder="Tìm kiếm" aria-label="Search" />
                                        <DangTheoDoi posts={this.state.followingPosts}></DangTheoDoi>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <Footer></Footer>
                    </div>
                </div>

            </div>
        )
    }
    componentWillUnmount() {
        this.isComponentMounted = false;
    }
}
const mapStateToProps = (state) => {
    const { account, isLoggedIn } = state.auth;
    return {
        account: account,
        isLoggedIn: isLoggedIn
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        CreatePost: (body) => dispatch(CreatePost(body))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ThemBaiViet);