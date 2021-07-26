import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactTimeAgo from 'react-time-ago/commonjs/ReactTimeAgo';
import { Badge, Button, Modal } from 'react-bootstrap'
import postApi from '../../api/postApi';
import { toast } from 'react-toastify';
import accountApi from '../../api/accountApi';
class PhanHoiPost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            comments: [],
            selectedCommentId: 0,
            comment: '',
            likeCommentId: 0,
            content: '',
            modalEdit: false,
            modalDelete: false,
        }
        this.replyComment = this.replyComment.bind(this);
    }
    submitEdit = async (e) => {
        console.log(this.state.comment);
        if (this.state.content == null || this.state.content == "") {
            toast("Không được để trống bình luận")
        }
        else {
            await this.props.updateComment(this.props.postId, this.state.selectedCommentId, this.state.content);
            this.setState({
                content: ''
            });
            this.closeEdit();
        }
    }

    openEdit(e) {
        this.setState({ modalEdit: true, selectedCommentId: e.target.dataset.id });
    }

    closeEdit() {
        this.setState({
            modalEdit: false,
        });
    }
    // Xử lý modal delete
    openDelete(e) {
        this.setState({ modalDelete: true, selectedCommentId: e.target.dataset.id });
    }
    closeDelete() {
        this.setState({
            modalDelete: false,
        });
    }
    submitDelete = async (e) => {
        await this.props.deleteComment(this.props.postId, this.state.selectedCommentId);
        this.closeDelete();
    }
    handleChange(e) {
        var target = e.target;
        var name = target.name;
        var value = target.value;
        this.setState({
            [name]: value
        });
    }
    replyComment = async () => {
        console.log(this.state.content);
        if (this.state.content == null || this.state.content == "") {
            toast("Không được để trống bình luận");
        } else {
            await this.props.replyComment(this.state.content, this.state.selectedCommentId);
            this.setState({
                content: ''
            })
        }
    }
    likeComment = async (e) => {
        e.preventDefault();
        await this.props.likeComment(e.target.dataset.id);
    }
    updateComment = async () => {
        console.log(this.state.content);
        // const body = {
        //     content: this.state.content
        // };
        // await this.props.updateComment(this.props.postId, this.state.selectedCommentId, body);
    }
    banAccount = async (e) => {
        console.log(e.target.dataset.id);
        const result = await accountApi.banAccount(e.target.dataset.id, 2);
        if (result.status === 200) {
            toast("Khóa bình luận thành công");
        }
        else {
            toast("Khóa bình luận thất bại");
        }
    }
    render() {
        console.log(this.props.comments);
        const renderComments = this.props.comments.map((comment,index) =>
            <div key={comment.id} className="row kechan d-block" key={index}>
                <div className="row mt-3 ">
                    <div className="col-md-1 nd-img"><img className="img-fluid mb-4 img-chitietthaoluan" src={comment.accountPhotoUrl || "/image/default-user-image.png"} /></div>
                    <div className="col-md-11 pt-3">
                        <a href={"/blog?id="+comment.accountId}>{comment.accountUsername} {comment.verifiedStatus == 'Pending' && <Badge variant='secondary'>Chờ phê duyệt</Badge>} {comment.isVerified && <img src="/image/check.png" alt="check-img"/>}</a>   {this.props.isLoggedIn && (this.props.account.roles.includes("forumadmin") || this.props.account.roles.includes("manager") || this.props.account.roles.includes("superadmin")) && this.props.account.id != comment.accountId && <span className="dropdown">
                            <a className="ml-2" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <img src="/image/morel.png"></img>
                            </a>
                            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                <Button data-id={comment.accountId} variant="primary" className="dropdown-item" onClick={e => this.banAccount(e)}>Khóa bình luận</Button>
                            </div>
                        </span>}
                        <span className="more">
                            <div className="mt-3">{comment.comment}
                                {this.props.isLoggedIn && this.props.account.isBanned === false &&  this.props.account.id === comment.accountId && <span className="dropdown">
                                    <a className="ml-2" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <img src="/image/morel.png"></img>
                                    </a>
                                    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                        <Button data-id={comment.id} variant="primary" className="dropdown-item mr-2" onClick={e => this.openEdit(e)}>Chỉnh sửa bình luận</Button>
                                        <Button data-id={comment.id} variant="primary" className="dropdown-item" onClick={e => this.openDelete(e)}>Xóa bình luận</Button>
                                    </div>
                                </span>}

                            </div>
                        </span>
                    </div>
                    <a href="#" className="mr-3"><img src="/image/like.png" data-id={comment.id} onClick={(e) => this.likeComment(e)}></img> {comment.like}</a>

                </div>
                {this.props.isLoggedIn && this.props.account.isBanned === false && <div className="row mt-2">
                    <div className="baocao ">
                        <a data-toggle="collapse" data-target={`#demo${comment.id}`} id={comment.id} onClick={(e) => this.setState({ selectedCommentId: e.target.id })} className="mr-3">BÌNH LUẬN</a>
                        <div id={`demo${comment.id}`} className="collapse binhluan">
                            <form className="mb-2">
                                <textarea rows={2} cols={120} placeholder="Gửi một bình luận mới" value={this.state.content} onChange={(e) => this.setState({ content: e.target.value })} />
                                <button type="button" className="btn btn-primary mr-3 mt-2" onClick={this.replyComment}>Đăng</button>
                                <button type="button" className="btn btn-primary mt-2">Hủy</button>
                            </form>
                        </div>

                    </div>
                </div>}
                {comment.replies.map((reply) =>
                    <div key={reply.id} className="row reply-binhluan">
                        <div className="col-md-1"></div>
                        <div className="col-md-1 nd-img"><img className="img-fluid d-block mb-2 img-chitietthaoluan" src={reply.accountPhotoUrl || "/image/default-user-image.png"} /></div>
                        <div className="col-md-10">
                            <a href={"/blog?id="+reply.accountId}> {reply.accountUsername} {reply.verifiedStatus == 'Pending' && <Badge variant='secondary'>Chờ phê duyệt</Badge>} {reply.accountVerified && <img src="/image/check.png" alt="check-img"/>}</a>{this.props.isLoggedIn && (this.props.account.roles.includes("forumadmin") || this.props.account.roles.includes("manager") || this.props.account.roles.includes("superadmin")) && <span className="dropdown">
                                <a className="ml-2" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <img src="/image/morel.png"></img>
                                </a>
                                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                    <Button data-id={reply.accountId} variant="primary" className="dropdown-item" onClick={e => this.banAccount(e)}>Khóa bình luận</Button>
                                </div>
                            </span>}
                            <span className="more">
                                <div className="mt-3">{reply.comment}
                                    {reply.accountId === this.props.account.id && this.props.account.isBanned === false && <span className="dropdown">
                                        <a className="ml-2" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            <img src="/image/morel.png"></img>
                                        </a>
                                        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                            <Button data-id={reply.replyId} variant="primary" className="dropdown-item mr-2" onClick={e => this.openEdit(e)}>Chỉnh sửa bình luận</Button>
                                            <Button data-id={reply.replyId} variant="primary" className="dropdown-item" onClick={e => this.openDelete(e)}>Xóa bình luận</Button>
                                        </div>
                                    </span>}
                                </div>
                            </span>
                            <a href="#" className="mr-3"><img src="/image/like.png" data-id={reply.replyId} onClick={(e) => this.likeComment(e)}></img> {reply.like}</a>
                        </div>

                    </div>
                )}


            </div>
        )
        return (
            <div>
                {renderComments}
                {/* Modal phần sửa */}
                <Modal show={this.state.modalEdit}>
                    <Modal.Header closeButton onClick={() => this.closeEdit()}>
                        <Modal.Title>Cập nhật bình luận</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="form-group pt-3">
                            <div className="card-input mt-4">
                                <span>Nội dung bình luận</span>
                                <textarea placeholder="Nhập nội dung bài viết" onChange={(e) => this.setState({ content: e.target.value })} className="tieude" />
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => this.closeEdit()}>Trở lại</Button>
                        <Button variant="primary" onClick={(e) => this.submitEdit(e)}>Lưu lại</Button>
                    </Modal.Footer>
                </Modal>
                {/* Modal phần xóa */}
                <Modal show={this.state.modalDelete}>
                    <Modal.Header closeButton onClick={() => this.closeDelete()}>
                        <Modal.Title>Xác nhận xóa bình luận</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Bạn có chắc chắn muốn xóa bình luận này ra khỏi hệ thống không?</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => this.closeDelete()}>Trở lại</Button>
                        <Button variant="primary" onClick={(e) => this.submitDelete(e)}>Lưu lại</Button>
                    </Modal.Footer>
                </Modal>
            </div>

        );
    }
}
const mapStateToProps = (state) => {
    const { isLoggedIn, account } = state.auth;
    return {
        isLoggedIn: isLoggedIn,
        account: account
    }
}
export default connect(mapStateToProps)(PhanHoiPost);