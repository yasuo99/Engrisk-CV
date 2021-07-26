import React, { Component } from "react"
import "datatables.net-dt/js/dataTables.dataTables.js"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import $ from 'jquery';
import { Button, Modal } from 'react-bootstrap'
class QLListTaiLieu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalCreate: false,
            modalEdit: false,
            modalDelete: false,
            nameCreate: "",
            nameEdit:"",
            contentCreate:"",
            contentEdit:"",
        };
    }
    componentDidMount(){
        $(function(){
            $("#dataTable").DataTable();
        })
    }
    handleChange(e) {
        var target = e.target;
        var name = target.name;
        var value = target.value;
        this.setState({
            [name]: value
        });
    }
    //  Xử lý modal create
    submitCreate(e) {
        this.setState({ name: this.state.nameCreate });
        this.closeCreate();
    }

    openCreate() {
        this.setState({ modalCreate: true });
    }

    closeCreate() {
        this.setState({
            nameCreate: "",
            modalCreate: false
        });
    }
     //  Xử lý modal edit
     submitEdit(e) {
        this.setState({ name: this.state.nameEdit });
        this.closeEdit();
    }

    openEdit() {
        this.setState({ modalEdit: true });
    }

    closeEdit() {
        this.setState({
            nameEdit: "",
            modalEdit: false
        });
    }
     //  Xử lý modal edit
     submitDelete(e) {
        this.setState();
        this.closeEdit();
    }

    openDelete() {
        this.setState({ modalDelete: true });
    }

    closeDelete() {
        this.setState({
            nameDelete: "",
            modalDelete: false
        });
    }
    render() {
        const renderDocs = (() =>
        <tr>
             {/* XỬ LÝ DATA */}
            <td>
                <Button variant="primary" className="btn btn-primary mr-2" onClick={e => this.openEdit(e)}><i className="fa fa-edit" /></Button>
                <Button variant="primary" className="btn btn-danger" onClick={e => this.openDelete(e)}><i className="fa fa-trash" /></Button>
            </td>
        </tr>
    );
        return (
            <div>
                <Button variant="primary" className="btn btn-success mr-2 mb-3" onClick={e => this.openCreate(e)} ><i className="fa fa-plus" /> Thêm tài liệu</Button>

                <table className="table table-bordered" id="dataTable" width="100%" cellSpacing={0}>
                    <thead>
                        <tr>
                            <th className="tieudeTL">Tiêu đề</th>
                            <th >Nội dung tài liệu</th>
                            <th className="fileTL">File đính kèm</th>
                            <th className="chucnang" />
                        </tr>
                    </thead>
                    <tbody>
                        {renderDocs}
                    </tbody>
                </table>
                 {/* Modal create */}
                  <Modal show={this.state.modalCreate}>
                    <Modal.Header closeButton onClick={() => this.closeCreate()}>
                        <Modal.Title>Thêm tài liệu</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="form-group">
                            <div className="card-input mt-4">
                                <span>Tiêu đề</span>
                                <input
                                    type="text"
                                    value={this.state.nameCreate}
                                    name="nameCreate"
                                    onChange={e => this.handleChange(e)}
                                />
                            </div>
                            <div className="card-input mt-4">
                                <span>Nội dung tài liệu</span>
                                <textarea placeholder="Nhập nội dung tài liệu" 
                                    onChange={e => this.handleChange(e)}
                                    value={this.state.contentCreate}
                                    name="contentCreate"
                                />
                            </div>
                            <div className="card-input mt-4">
                                <span>File đính kèm</span><input type="file" accept=".doc,.docx,.pdf" />
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => this.closeCreate()}>Trở lại</Button>
                        <Button variant="primary" onClick={(e) => this.submitCreate(e)}>Lưu lại</Button>
                    </Modal.Footer>
                </Modal>
                {/* Modal phần xóa */}
                <Modal show={this.state.modalDelete}>
                    <Modal.Header closeButton onClick={() => this.closeDelete()}>
                        <Modal.Title>Xác nhận xóa tài liệu</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Bạn có chắc chắn muốn xóa tài liệu này ra khỏi hệ thống không?</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => this.closeDelete()}>Trở lại</Button>
                        <Button variant="primary" onClick={(e) => this.submitDelete(e)}>Lưu lại</Button>
                    </Modal.Footer>
                </Modal>
                {/* Modal phần sửa */}
                <Modal show={this.state.modalEdit}>
                    <Modal.Header closeButton onClick={() => this.closeEdit()}>
                        <Modal.Title>Cập nhật tài liệu</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="form-group">
                        <div className="card-input mt-4">
                                <span>Tiêu đề</span>
                                <input
                                    type="text"
                                    value={this.state.nameCreate}
                                    name="nameCreate"
                                    onChange={e => this.handleChange(e)}
                                />
                            </div>
                            <div className="card-input mt-4">
                                <span>Nội dung tài liệu</span>
                                <textarea placeholder="Nhập nội dung tài liệu" 
                                    onChange={e => this.handleChange(e)}
                                    value={this.state.contentEdit}
                                    name="contentEdit"
                                />
                            </div>
                            <div className="card-input mt-4">
                                <span>File đính kèm</span><input type="file" accept=".doc,.docx,.pdf" />
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => this.closeEdit()}>Trở lại</Button>
                        <Button variant="primary" onClick={(e) => this.submitEdit(e)}>Lưu lại</Button>
                    </Modal.Footer>
                </Modal>

            </div>
        )
    }
}
export default QLListTaiLieu;