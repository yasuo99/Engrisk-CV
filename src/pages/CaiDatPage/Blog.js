import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import HeaderClient from '../../components/client/HeaderClient';
import SubMenuClient from '../../components/client/SubMenuClient';
import Search from '../../components/xemthem/Search';
import Footer from '../Footer/Footer';
import queryString from 'querystring';
import accountApi from '../../api/accountApi';
import { Badge } from 'react-bootstrap';
import accountApiV2 from '../../api/2.0/accountApi';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import { follow } from '../../actions/authActions';
class Blog extends Component {
    constructor(props) {
        super(props);
        this.isComponentMounted = false;
        this.state = {
            account: {},
            follow: false
        }
    }
    async componentDidMount() {
        const { location: { location: { search } } } = this.props;
        var temp = queryString.parse(search.replace('?', ''));
        console.log(temp);
        this.isComponentMounted = true;
        try {
            const account = await this.fetchAccountBlog(temp.id);
            if (this.isComponentMounted) {
                this.setState({
                    account: account
                })
                var isFollowed = this.props.account.following.some(following => following.accountId == this.props.account.id);
                if (isFollowed) {
                    this.setState({
                        follow: true
                    });
                }
            }
        } catch (error) {
            if (error.response.status === 404) {
                window.location = '/loi';
            }
        }
    }
    fetchAccountBlog = async (id) => {
        return await accountApi.getDetail(id);
    }
    followUser = async (id) => {
        this.props.followUser(this.props.account.id, id, this.state.account);
        this.setState({
            follow: this.state.follow ? false : true
        });
    }
    render() {
        console.log(this.props.online.some(onl => onl == this.state.account.username));
        return (
            <div id="wrapper">
                <SubMenuClient></SubMenuClient>
                <div id="content-wrapper" className="d-flex flex-column">
                    <div id="content">
                        <HeaderClient></HeaderClient>
                        <div>
                            <div className="started-bg card" style={{ height: "100vh", position: "relative" }}>

                                <div className="container" >
                                    <section className="started">
                                        <div className="st-box" style={{ marginTop: "90px" }}>
                                            <div className="st-image"><img src={this.state.account.photoUrl || "/image/businessman.png"} alt="#" /></div>
                                            <div className="st-title">{this.state.account.username} {this.props.online.some(onl => onl == this.state.account.username) && <i className='fa fa-circle fa-xs text-success'></i>}  </div> {this.props.account.id != this.state.account.id && <Badge key={this.state.account.id} style={{ cursor: "pointer" }} variant="primary" onClick={() => this.followUser(this.state.account.id)}>{this.props.account.following.some(following => following.accountId == this.state.account.id) ? "Following" : "Follow"}</Badge> } 
                                            <div className="st-subtitle">{this.state.account.fullname}</div>
                                            <div className="st-soc">
                                                <a target="blank" href="#" className="btn_animated">
                                                    <span className="circle"><i className="fa fa-facebook" /></span>
                                                </a>
                                                <a target="blank" href="#" className="btn_animated">
                                                    <span className="circle"><i className="fa fa-google" /></span>
                                                </a>
                                            </div>
                                        </div>
                                    </section>
                                    <section id="about">
                                        <div className="col-10 offset-1">
                                            <div className="content-box">
                                                <div className="row">
                                                    <div className="offset-md-4 col-7">
                                                        <div className="info-list">
                                                            {this.state.account.age < 100 && <p><strong><span>Tuổi:</span></strong> {this.state.account.age}</p>}
                                                            <p><strong><span>Địa chỉ:</span></strong> {this.state.account.address || "Không có"}</p>
                                                            <p><strong><span>Phone:</span></strong> <a href={"tel:" + this.state.account.phoneNumber}>{this.state.account.phoneNumber || "Không có"}</a></p>
                                                            <p><strong><span>E-mail:</span></strong> <a href={"mailto:" + this.state.account.email}>{this.state.account.email}</a></p>
                                                        </div>

                                                    </div>
                                                </div>
                                                <hr />
                                                <div className="row">
                                                    <div className="offset-1 col-3"><p>Số từ vựng đã học: {this.state.account.wordLearned}</p></div>
                                                    <div className="offset-1 col-3"><p>Số quiz đã làm: {this.state.account.quizDone}</p></div>
                                                    <div className="offset-1 col-3"><p>Số exam đã làm: {this.state.account.examDone}</p></div>
                                                </div>
                                            </div>
                                        </div>
                                    </section>
                                </div>
                                <div className="slide" />
                            </div>

                        </div>
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
    const { account, online } = state.auth;
    return {
        account: account,
        online: online
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        followUser: (followerId, followingId, following) => dispatch(follow(followerId, followingId, following))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Blog);