import React, { Component } from "react";
import { Link } from "react-browser-router"
import ModalEdit from "../modal/ModalEdit";
import ModalDelete from "../modal/ModalDelete";
import CKEditor from "react-ckeditor-component";
class QLThongBao extends Component {
    constructor(props) {
        super(props);
        this.updateContent = this.updateContent.bind(this);
        this.state = {
            content: '',
            modalEdit: false,
            name: "",
            date: "",
            modalInputName: "",
            modalInputDate: ""
        };
    }
    updateContent() {
        var content = localStorage.getItem('content');
        this.setState({
            content: content
        })
        console.log(this.state.content);
        localStorage.removeItem('content');
    }

    onChange(evt) {
        console.log("onChange fired with event info: ", evt);
        var newContent = evt.editor.getData();
        console.log(newContent);
        localStorage.setItem('content', newContent);
    }

    onBlur(evt) {
        console.log("onBlur event called with event info: ", evt);
    }

    afterPaste(evt) {
        console.log("afterPaste event called with event info: ", evt);
    }
    handleChange(e) {
        var target = e.target;
        var name = target.name;
        var value = target.value;
        this.setState({
            [name]: value
        });
    }

    handleSubmit(e) {
        this.setState({ name: this.state.modalInputName, date: this.state.modalInputDate });
        this.modalClose();
    }

    modalOpen() {
        this.setState({ modalEdit: true });
    }

    modalClose() {
        this.setState({
            modalEdit: false,
            modalDelete: false,
        });
    }
    modalOpenDelete() {
        this.setState({ modalDelete: true });
    }
    handleSubmitDelete(e) {
        this.setState({

        });
        this.modalClose();
    }
    render() {
        return (
            <tr>
                <td>{this.props.notification.id}</td>
                <td>{this.props.notification.publishedDate}</td>
                <td>{this.props.notification.content}</td>
                <td>
                    <a href="#" className="btn btn-primary mr-2" onClick={e => this.modalOpen(e)} ><i className="fa fa-edit" /></a>
                    <a href="#" className="btn btn-danger" onClick={e => this.modalOpenDelete(e)}><i className="fa fa-trash" /></a>
                    <ModalEdit show={this.state.modalEdit} handleClose={e => this.modalClose(e)}>
                        <h2 className="text-center text-primary">Cập nhật thông báo</h2>
                        <hr className="sidebar-divider my-0" />
                        <div className="form-group">
                            <div className="card-input mt-4">
                                <span>Tiêu đề</span>
                                <input
                                    type="text"
                                    value={this.state.modalInputName}
                                    name="modalInputName"
                                    onChange={e => this.handleChange(e)}
                                />
                            </div>
                            <div className="card-input mt-4">
                                <span>Thời gian</span>
                                <input
                                    type="datetime-local"
                                    value={this.state.modalInputDate}
                                    name="modalInputDate"
                                    onChange={e => this.handleChange(e)}
                                />
                            </div>
                            <div className="card-input mt-4">
                                <span>Nội dung thông báo</span>
                                <CKEditor
                                    activeClass="p10"
                                    content={this.state.content}
                                    events={{
                                        "blur": this.onBlur,
                                        "afterPaste": this.afterPaste,
                                        "change": this.onChange
                                    }}
                                />
                            </div>
                        </div>
                        <div className="card-button">
                            <button onClick={e => this.handleSubmit(e)} type="button" className="btn btn-primary float-left">
                                Lưu lại
                                </button>
                        </div>
                    </ModalEdit>
                    <ModalDelete show={this.state.modalDelete} handleClose={e => this.modalClose(e)}>
                        <h3 className="title"> <img src="/image/trash.png"></img> Xác nhận xóa thông báo</h3>
                        <p className="content">
                            Bạn có chắc chắn muốn xóa thông báo này ra khỏi hệ thống không?
                        </p>
                        <button onClick={e => this.handleSubmitDelete(e)} type="button" className="btn btn-info float-right">
                            Xác nhận
                        </button>
                    </ModalDelete>
                </td>
                <td>
                </td>
            </tr>
        );
    }
}
export default QLThongBao;