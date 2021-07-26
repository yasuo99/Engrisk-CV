import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import BinhLuanPost from '../../components/thaoluan/BinhLuanPost';
import ContentPost from '../../components/thaoluan/ContentPost';
import PhanHoiPost from '../../components/thaoluan/PhanHoiPost';
import HeaderClient from '../../components/client/HeaderClient';
import SubMenuClient from '../../components/client/SubMenuClient';
import Footer from '../Footer/Footer';
import postApi from '../../api/postApi';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import { connection } from '../../signalR/createSignalRConnection';
import { HubConnectionState } from '@microsoft/signalr';

class ThaoLuanChiTietPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            post: { comments: [{ replies: [] }] },
            comment: null,
            filter: "",
            redirect: false
        }
        this.isComponentMounted = false;
        this.handleSubmit = this.handleSubmit.bind(this);
        this.cancel = this.cancel.bind(this);
    }
    async componentDidMount() {
        this.isComponentMounted = true;
        const { match: { match: { params } } } = this.props;
        const post = await this.fetchPostDetail(params.postId);
        if (this.isComponentMounted) {
            if (this.props.isLoggedIn) {
                if (connection.state == HubConnectionState.Disconnected) {
                    connection.start();
                }
                connection.on('NewComment', (data) => {
                    console.log(data);
                    var comment = JSON.parse(data);
                    if (comment.postId == params.postId) {
                        this.setState({
                            post: {
                                ...this.state.post,
                                comments: [comment, ...this.state.post.comments]
                            }
                        })
                    }
                })
                connection.on('DeleteComment', (data) => {
                    var comments = this.state.post.comments.filter(c => c.id != data);
                    this.setState({
                        post: {
                            ...this.state.post,
                            comments: comments
                        }
                    })
                })
                connection.on('UpdateComment', (data) => {
                    var comment = JSON.parse(data);
                    var existComment = this.state.post.comments.find(c => c.id == comment.id);
                    var indexOfComment = this.state.post.comments.indexOf(existComment);
                    var comments = this.state.post.comments;
                    comments[indexOfComment] = comment;
                    this.setState({
                        post: {
                            ...this.state.post,
                            comments: comments
                        }
                    })
                })
                connection.on('NewReplyComment', (data) => {
                    var reply = JSON.parse(data);
                    console.log(reply);
                    var existComment = this.state.post.comments.find(c => c.id == reply.replyId);
                    existComment.replies.push(reply)
                    console.log(this.state.post.comments);
                })
            }
            if (post) {
                this.setState({
                    post: post
                });
            }
            else {
                window.location = '/not-found'
            }

        }
    }

    fetchPostDetail = async (id, params) => {
        return await postApi.getDetail(id, params);
    }
    handleChange = event => {
        this.setState({
            comment: event.target.value
        })
        console.log(this.state);
    }
    async handleSubmit() {
        if (this.state.comment == '') {
            toast('Bình luận không được để trống');
        } else {
            let comment = {
                comment: this.state.comment
            }
            let result = (await postApi.commentToPost(this.state.post.id, comment)).status;
            if (result === 200) {
                this.setState({
                    comment: ''
                })
            }
        }
    }
    cancel() {
        this.setState({
            comment: ''
        });
    }
    replyComment = async (comment, commentId) => {
        const { match: { match: { params } } } = this.props;
        const body = {
            content: comment
        }
        let result = await postApi.replyComment(params.postId, commentId, body);
        if (result.status === 200) {
        }
        else {
            toast("Bình luận không được để trống")
        }
    }
    refreshPost = async () => {
        const { match: { match: { params } } } = this.props;
        let parameters = {
            orderBy: "newest"
        }
        const post = await this.fetchPostDetail(params.postId, parameters);
        if (this.isComponentMounted) {
            this.setState({
                post: post,
            });
        }
    }
    likeComment = async (commentId) => {
        const { match: { match: { params } } } = this.props;
        var result = await postApi.likeComment(params.postId, commentId);
        if (result.status === 200) {
            await this.refreshPost();
        }
        else {
            toast(result.error)
        }
    }
    async filter(event) {
        this.setState({
            filer: event.target.id
        })
        let parameters = {
            orderBy: event.target.id
        }
        const { match: { match: { params } } } = this.props;
        const post = await this.fetchPostDetail(params.postId, parameters);
        if (this.isComponentMounted) {
            this.setState({
                post: post
            });
        }
    }
    updateComment = async (postId, commentId, body) => {
        const result = await postApi.updateComment(postId, commentId, body);
        if (result.status === 200) {
            toast("Thành công");
        }
        else {
            toast("Thất bại")
        }
    }
    deleteComment = async (postId, commentId) => {
        const result = await postApi.deleteComment(postId, commentId);
        if (result.status === 200) {
            toast("Thành công");
        }
        else {
            toast("Thất bại")
        }
    }
    render() {
        return (
            <div id="wrapper">
                <SubMenuClient></SubMenuClient>
                <div id="content-wrapper" className="d-flex flex-column">
                    <div id="content">
                        <HeaderClient></HeaderClient>
                        <section id="chitietthaoluan">
                            <div className="container pt-3">
                                <div className="row kechan">
                                    <div className="col-6 diendan mt-5 mb-5">
                                        <a href="/thao-luan">DIỄN ĐÀN</a> <i className="fa fa-angle-right" /> <a href="#">Thảo luận</a>
                                    </div>
                                </div>
                                <ContentPost post={this.state.post}></ContentPost>
                                {this.props.isLoggedIn && this.props.account.isBanned === false && <div className="binhluan">
                                    <div className="row mt-5">
                                        <div className="col-md-1 nd-img"><img className="img-fluid d-block mb-4 img-chitietthaoluan" src={this.props.account.photoUrl || "/image/default-user-image.png"} /></div>
                                        <div className="col-md-11">
                                            <textarea rows={2} cols={120} placeholder="Gửi một bình luận mới" value={this.state.comment} onChange={this.handleChange} />
                                            <button type="button" className="btn btn-primary mr-3 mt-2" onClick={this.handleSubmit}>ĐĂNG</button>
                                            <button type="button" className="btn btn-secondary mt-2" onClick={this.cancel}>HỦY</button>
                                        </div>
                                    </div>
                                </div>}
                                {this.props.account.isBanned && <div className="row mt-5">
                                    <div className="col-md-1 nd-img"><img className="img-fluid d-block mb-4 img-chitietthaoluan" src={this.props.account.photoUrl || "/image/default-user-image.png"} /></div>
                                    <div className="col-md-11">
                                        <p class="text-danger mt-4">Tài khoản của bạn hiện đang bị khóa bình luận</p>
                                    </div>
                                </div>}
                                <div className="row mt-5 kechan">
                                    <div className="col-6">
                                        <h3>BÌNH LUẬN</h3>
                                    </div>
                                    <div className="col-6 sapxep">
                                        <div className="navbar navbar-expand-lg navbar-light">
                                            <div className="container">
                                                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#menu-sapxep"> </button>
                                                <div className="collapse navbar-collapse" id="menu-sapxep">
                                                    <ul>
                                                        <li className="nav-item dropdown"> <a className="nav-link " href="#" data-toggle="dropdown">SẮP XẾP THEO<i className="fa fa-chevron-down" /></a>
                                                            <div className="dropdown-menu sub-sapxep"> <a className="dropdown-item" href="#" id="like" onClick={(e) => this.filter(e)}>Top like</a> <a className="dropdown-item" href="#" id="newest" onClick={(e) => this.filter(e)}>Mới nhất</a> <a className="dropdown-item" id="oldest" href="#" onClick={(e) => this.filter(e)}>Cũ nhất</a></div>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="phanhoi-binhluan">
                                    <PhanHoiPost comments={this.state.post.comments} replyComment={this.replyComment} likeComment={this.likeComment} postId={this.state.post.id} updateComment={this.updateComment} deleteComment={this.deleteComment}></PhanHoiPost>
                                </div>
                            </div>
                        </section>

                        <Footer></Footer>
                    </div>
                </div>

            </div>
        );
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
export default connect(mapStateToProps)(ThaoLuanChiTietPage);