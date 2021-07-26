import React, { Component } from "react"
import { Button, Modal } from 'react-bootstrap'
import { connect } from "react-redux";
import { toast } from "react-toastify";
import postApi from "../../api/postApi";
class ContentPost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            content: '',
            id: "",
            titleEdit: "",
            modalEdit: false,
            modalDelete: false,
        };
    }
    submitEdit(e) {
        const body = {

        }
        this.setState({
        });
        this.closeEdit();
    }

    openEdit() {
        this.setState({ modalEdit: true });
    }

    closeEdit() {
        this.setState({
            titleEdit: "",
            modalEdit: false,
        });
    }
    // Xử lý modal delete
    openDelete() {
        this.setState({ modalDelete: true });
    }
    closeDelete() {
        this.setState({
            modalDelete: false,
        });
    }
    submitDelete = async (e) => {
        const result = await postApi.deletePost(this.props.post.id);
        if (result.status === 200) {
            window.location = '/thao-luan';
        }
        else {
            toast('Xóa thất bại');
        }

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
    render() {
        console.log(this.props.post);
        return (
            <div className="chude-binhluan">
                <div className="row mt-5">
                    <div className="col-md-1 nd-img"><img className="img-fluid d-block mb-4 img-chitietthaoluan" src={this.props.post.accountPhotoUrl || "/image/default-user-image.png"} /></div>
                    <div className="col-md-9 pt-3">
                        <h5>{this.props.post.title}</h5>
                        <a href={"/blog?id=" + this.props.post.accountId}>{this.props.post.accountUsername} {this.props.post.accountVerified && <img src="/image/check.png" alt='check-img' />}</a>
                        <hr />
                        <p className="mt-3 mb-3">{this.props.post.content}</p>
                        <div className="row">
                            {this.props.post.postImages?.map((value, index) =>
                                <div className="col img-fluid w-75" key={index}>
                                    <img className="w-75 h-75" loading="lazy" src={`http://localhost:5000/api/v2/streaming/image?image=${value.imageUrl}`}></img>
                                </div>
                            )}
                        </div>
                    </div>
                    {(this.props.post.accountUsername === this.props.account.username && this.props.account.isBanned === false) && <div className="col-2 chucnang"><Button variant="primary" className="btn btn-primary mr-2" onClick={e => this.openEdit(e)}><i className="fa fa-edit" /></Button></div>}
                    {(this.props.account.roles.includes("forumadmin") || this.props.account.roles.includes("forummod") || this.props.account.roles.includes("superadmin") || this.props.account.roles.includes("manager")) && <div className="col-2 chucnang">
                        <Button variant="primary" className="btn btn-danger" onClick={e => this.openDelete(e)}><i className="fa fa-trash" /></Button>
                    </div>}
                    <div className="baocao">
                        <div className="rate">
                            <ul className="rate-area">
                                <input type="radio" id="5-star" name="crating" defaultValue={5} />
                                <label htmlFor="5-star" title="Amazing">5 stars</label>
                                <input type="radio" id="4-star" name="crating" defaultValue={4} />
                                <label htmlFor="4-star" title="Good">4 stars</label>
                                <input type="radio" id="3-star" name="crating" defaultValue={3} />
                                <label htmlFor="3-star" title="Average">3 stars</label>
                                <input type="radio" id="2-star" name="crating" defaultValue={2} />
                                <label htmlFor="2-star" title="Not Good">2 stars</label>
                                <input type="radio" id="1-star" required name="crating" defaultValue={1} aria-required="true" />
                                <label htmlFor="1-star" title="Bad">1 star</label>
                            </ul>
                        </div>
                    </div>
                </div>
                {/* Modal phần sửa */}
                <Modal show={this.state.modalEdit}>
                    <Modal.Header closeButton onClick={() => this.closeEdit()}>
                        <Modal.Title>Cập nhật bài viết</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="form-group pt-3">
                            <div className="card-input mt-4">
                                <span>Tiêu đề</span>
                                <input
                                    type="text"
                                    value={this.state.titleEdit}
                                    name="titleEdit"
                                    onChange={e => this.handleChange(e)}
                                />
                            </div>
                            <div className="card-input mt-4">
                                <span>Nội dung bài viết</span>
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
                        <Modal.Title>Xác nhận xóa bài viết</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Bạn có chắc chắn muốn xóa bài viết này ra khỏi hệ thống không?</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => this.closeDelete()}>Trở lại</Button>
                        <Button variant="primary" onClick={(e) => this.submitDelete(e)}>Lưu lại</Button>
                    </Modal.Footer>
                </Modal>

            </div>

        )
    }
}
const mapStateToProps = (state) => {
    const { account } = state.auth
    return {
        account: account
    }
}
export default connect(mapStateToProps)(ContentPost);