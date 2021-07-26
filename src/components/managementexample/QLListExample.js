import React, { Component } from "react"
import "datatables.net-dt/js/dataTables.dataTables.js"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import $ from 'jquery';
import { Button, Modal } from 'react-bootstrap'
import { toast } from "react-toastify";
import ModalListExample from "../modalcauhoi/ModalListExample";
class QLListExample extends Component {
    constructor(props) {
        super(props);
        this.state = {

            modalCreate: false,
            modalDelete: false,
            modalEdit: false,
            // Phần create
            wordCreate: "",
            exampleEngCreate: "",
            exampleVnCreate: "",
            // Phần edit
            wordEdit: "",
            exampleEngCreate: "",
            exampleVnCreate: "",
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.submitCreate.bind(this);
        this.handleSubmit = this.submitEdit.bind(this);
        this.handleSubmit = this.submitDelete.bind(this);
    }
    async componentDidMount() {
        $(function () {
            $("#dataTable1").DataTable();
        });
    }
    // fetchWord = async () => {
    //     return await wordApi.getAll();
    // }

    handleChange(e) {
        var target = e.target;
        var name = target.name;
        var value = target.value;
        this.setState({
            [name]: value
        });
    }
    // Xử lý modal create
    submitCreate = async (e) => {
        this.setState({
        })
        this.closeCreate();
    }
    openCreate() {
        this.setState({ modalCreate: true });
    }

    closeCreate() {
        this.setState({
            wordCreate: "",
            exampleCreate: "",
            modalCreate: false
        });
    }
    // Xử lý modal edit
    async openEdit(e) {
        this.setState({
            modalEdit: true
        });
    }
    closeEdit() {
        this.setState({
            wordEdit: "",
            exampleEdit: "",
            modalEdit: false,
        });
    }
    async submitEdit(e) {
        this.setState({
        });
        this.closeEdit();
    }
    // Xử lý modal delete
    openDelete(e) {
        this.setState({ modalDelete: true });
    }
    closeDelete() {
        this.setState({
            modalDelete: false,
        });
    }
    async submitDelete(e) {

        this.setState({
        })
        this.closeDelete();
    }
    render() {
        // var { exampleCreate, exampleEdit } = this.state;
        // const renderExample = (() =>
        // <tr>
        //         <td>
        //             <Button variant="primary" className="btn btn-primary mr-2" onClick={e => this.openEdit(e) }><i className="fa fa-edit" /></Button>
        //             <Button variant="primary" className="btn btn-danger" onClick={e => this.openDelete(e)}><i className="fa fa-trash" /></Button>
        //         </td>
        //     </tr>
        // );
        return (
            <div>
                <Button variant="primary" className="btn btn-success mr-2 mb-3" onClick={e => this.openCreate(e)} ><i className="fa fa-plus" /> Thêm ví dụ </Button>
                {<table className="table table-bordered" id="dataTable1" width="100%" cellSpacing={0}>
                    <thead>
                        <tr>
                            <th className="tuvung">Từ vựng</th>
                            <th className="vidu">Ví dụ tiếng anh</th>
                            <th className="vidu">Ví dụ tiếng việt</th>
                            <th className="chucnang" />
                        </tr>
                    </thead>
                    <tbody>
                        {/* {renderExample} */}
                        <td>Love</td>
                        <td>I love you</td>
                        <td>Tôi thích bạn</td>
                        <td>
                            <Button variant="primary" className="btn btn-primary mr-2" onClick={e => this.openEdit(e)}><i className="fa fa-edit" /></Button>
                            <Button variant="primary" className="btn btn-danger" onClick={e => this.openDelete(e)}><i className="fa fa-trash" /></Button>
                        </td>
                    </tbody>
                    <tbody>
                        {/* {renderExample} */}
                        <td>Love</td>
                        <td>I love you</td>
                        <td>Tôi thích bạn</td>
                        <td>
                            <Button variant="primary" className="btn btn-primary mr-2" onClick={e => this.openEdit(e)}><i className="fa fa-edit" /></Button>
                            <Button variant="primary" className="btn btn-danger" onClick={e => this.openDelete(e)}><i className="fa fa-trash" /></Button>
                        </td>
                    </tbody>

                </table>}
                {/* Modal create */}
                <Modal show={this.state.modalCreate}>
                    <Modal.Header closeButton onClick={() => this.closeCreate()}>
                        <Modal.Title>Thêm ví dụ</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="form-group">
                            <div className="card-input">
                                <span>Từ vựng</span>
                                <input
                                    type="text"
                                    value={this.state.wordCreate}
                                    name="wordCreate"
                                    onChange={e => this.handleChange(e)}
                                    required
                                />
                            </div>
                            <div className="card-input">
                                <span>Ví dụ tiếng anh</span>
                                <input
                                    type="text"
                                    value={this.state.exampleEngCreate}
                                    name="exampleCreate"
                                    onChange={e => this.handleChange(e)}
                                    required
                                />
                            </div>
                            <div className="card-input">
                                <span>Ví dụ tiếng việt</span>
                                <input
                                    type="text"
                                    value={this.state.exampleVnCreate}
                                    name="exampleCreate"
                                    onChange={e => this.handleChange(e)}
                                    required
                                />
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
                        <Modal.Title>Xác nhận xóa ví dụ</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Bạn có chắc chắn muốn xóa ví dụ này ra khỏi hệ thống không?</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => this.closeDelete()}>Trở lại</Button>
                        <Button variant="primary" onClick={(e) => this.submitDelete(e)}>Lưu lại</Button>
                    </Modal.Footer>
                </Modal>
                {/* Modal phần sửa */}
                <Modal show={this.state.modalEdit}>
                    <Modal.Header closeButton onClick={() => this.closeEdit()}>
                        <Modal.Title>Cập nhật ví dụ</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <ModalListExample></ModalListExample>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => this.closeEdit()}>Trở lại</Button>
                        <Button variant="primary" onClick={(e) => this.submitEdit(e)}>Lưu lại</Button>
                    </Modal.Footer>
                </Modal>

            </div>
        )
    }
    // componentWillUnmount() {
    //     this.isComponentMounted = false;
    // }
}
export default QLListExample;