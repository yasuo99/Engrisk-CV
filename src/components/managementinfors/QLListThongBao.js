import React, { Component } from "react"
import Switch from "react-switch";
import "datatables.net-dt/js/dataTables.dataTables.js"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import $ from 'jquery'
import notificationApi from "../../api/notificationApi";
import { Button, Modal } from 'react-bootstrap';
import { toast } from "react-toastify";
import notificationApiV2 from "../../api/2.0/notificationApi";
class QLListThongBao extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalCreate: false,
            modalDelete: false,
            modalEdit: false,
            url: '',
            content: '',
            type: '',
            side: '',
            notifications: [],
            selectNotify: 0,
            users: [],
            selectedUsers: []
        };
        this.isComponentMounted = false;
        this.handleChange = this.handleChange.bind(this);
    }
    async componentDidMount() {
        this.isComponentMounted = true;

        var result = await this.fetchNotification();
        if (this.isComponentMounted) {
            this.setState({
                notifications: result
            });
            $(function () {
                $("#dataTable").DataTable();
            });
            await this.fetchUsers();
        }
    }
    fetchUsers = async () => {
        var users = await notificationApiV2.getUsers();
        if (this.isComponentMounted) {
            this.setState({
                users: users
            });
        }
    }
    fetchNotification = async () => {
        return await notificationApi.getAll();
    }
    publishNotification = async (id) => {
        await notificationApi.publishNotification(id);
        var result = await this.fetchNotification();
        if (this.isComponentMounted) {
            this.setState({
                notifications: result
            });
        }
    }
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
        const notify = {
            content: this.state.content,
            url: this.state.url,
            type: this.state.type,
        }
        try {
            const result = await notificationApiV2.create(notify, this.state.selectedUsers);
            if (result) {
                toast("Thêm thành công");
                this.setState({
                    notifications: [...this.state.notifications, result],
                    url: '',
                    content: '',
                    type: '',
                    side: '',
                    selectedUsers: []
                })
                this.closeCreate();
            }
            else {
                toast("Thêm thất bại");
            }

        } catch (error) {
            console.log(error);
        }

    }

    openCreate() {
        this.setState({ modalCreate: true });
    }

    closeCreate() {
        this.setState({
            nameCreate: "",
            modalCreate: false,
            contentCreate: ""
        });
    }
    // Xử lý modal edit
    openEdit = async (e) => {
        if (e) {
            if (e.target.dataset.id) {
                const notify = await notificationApi.getDetail(e.target.dataset.id);
                this.setState({
                    selectNotify: e.target.dataset.id,
                    url: notify.url,
                    content: notify.content,
                    type: notify.type,
                    side: notify.isClientNotify ? "client" : "admin"
                });
            }
        }
        this.setState({ modalEdit: true });
    }
    closeEdit() {
        this.setState({
            nameCreate: "",
            contentEdit: "",
            modalEdit: false,
        });
    }
    submitEdit = async (e) => {
        const notify = {
            content: this.state.content,
            url: this.state.url,
            type: this.state.type,
            isClientNotify: this.state.side === "client" ? true : false
        }
        try {
            const result = await notificationApi.updateNotify(this.state.selectNotify, notify);
            if (result.status === 200) {
                toast("Cập nhật thành công");
                var notifications = await this.fetchNotification();
                if (this.isComponentMounted) {
                    this.setState({
                        notifications: notifications
                    });
                }
                this.closeEdit();
            }
            else {
                toast("Cập nhật thất bại");
            }

        } catch (error) {
            console.log(error);
        }

    }
    // Xử lý modal delete
    openDelete(e) {
        if (e) {
            if (e.target.dataset.id) {
                this.setState({
                    selectNotify: e.target.dataset.id
                })
            }
        }
        this.setState({ modalDelete: true });
    }
    closeDelete() {
        this.setState({
            modalDelete: false,
        });
    }
    submitDelete = async (e) => {
        try {
            const result = await notificationApi.deleteNotify(this.state.selectNotify);
            if (result.status === 200) {
                toast("Xóa thành công");
                var notifications = await this.fetchNotification();
                if (this.isComponentMounted) {
                    this.setState({
                        notifications: notifications
                    });
                }
                this.closeDelete();
            }
            else {
                toast("Xóa thất bại")
            }
        } catch (error) {
            console.log(error);
        }
    }
    selectedUser = (e) => {
        const users = this.state.selectedUsers;
        users.push(e.target.dataset.id);
        this.setState({
            selectedUsers: users
        })
    }
    render() {
        const renderNotification = this.state.notifications.map((notification) =>
            <tr key={notification.id}>
                <td>{notification.url}</td>
                <td>{notification.publishedDate}</td>
                <td>{notification.content}</td>
                <td>{notification.type}</td>
                <td>
                    <Button data-id={notification.id} variant="primary" className="btn btn-primary mr-2" onClick={e => this.openEdit(e)}><i data-id={notification.id} className="fa fa-edit" /></Button>
                    <Button data-id={notification.id} variant="primary" className="btn btn-danger" onClick={e => this.openDelete(e)}><i data-id={notification.id} className="fa fa-trash" /></Button>

                </td>
            </tr>
        );
        const renderUsers = this.state.users.map((user, index) =>
            <div className="card-input mt-3" key={index}>
                <div className="container">
                    <div className="row">
                        <div className="col-10">
                            <p data-id={user.accountId}>{user.username}</p>
                        </div>
                        <div className="col-2">
                            <input data-id={user.accountId} type="checkbox" class="form-check-input" id="exampleCheck1" onChange={(e) => this.selectedUser(e)} />
                        </div>
                    </div>
                </div>
            </div>
        );
        return (
            <div>
                <Button variant="primary" className="btn btn-primary mr-2 mb-3" onClick={e => this.openCreate(e)} ><i className="fa fa-plus" /> Thêm thông báo</Button>
                {this.isComponentMounted && <table className="table table-bordered" id="dataTable" width="100%" cellSpacing={0}>
                    <thead>
                        <tr>
                            <th className="tieudeTB">Đường dẫn</th>
                            <th className="ngayTB">Ngày thông báo</th>
                            <th >Nội dung thông báo</th>
                            <th>Loại thông báo</th>
                            <th className="chucnang" />
                        </tr>
                    </thead>
                    <tbody>
                        {renderNotification}
                    </tbody>
                </table>}
                {/* Modal thêm */}
                <Modal show={this.state.modalCreate} animation size="lg" backdrop="static">
                    <Modal.Header closeButton onClick={() => this.closeCreate()}>
                        <Modal.Title>Thêm thông báo</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="form-group">
                            <div className="container">
                                <div className="row">
                                    <div className="col-6">
                                        <p className="titleInfo">Thông tin thông báo</p>
                                        <div className="card-input mt-3">
                                            <span>Đường dẫn</span>
                                            <input
                                                type="text"
                                                value={this.state.url}
                                                name="url"
                                                onChange={e => this.handleChange(e)}
                                            />
                                        </div>
                                        <div className="card-input mt-3">
                                            <span>Nội dung</span>
                                            <textarea placeholder="Nhập nội dung thông báo"
                                                onChange={e => this.handleChange(e)}
                                                value={this.state.content}
                                                name="content"
                                            />
                                        </div>
                                        <div className="card-input mt-3">
                                            <span>Loại thông báo</span>
                                            <select name="type" id="" onChange={e => this.handleChange(e)}>
                                                <option value="">Chọn loại thông báo</option>
                                                <option value="info">Gợi ý</option>
                                                <option value="success">Thông báo</option>
                                                <option value="danger">Cảnh báo</option>
                                            </select>
                                        </div>

                                    </div>
                                    <div className="col-6">
                                        <div className="search">
                                            <input type="text" className="searchFollowingPost" placeholder="Tìm kiếm" />
                                            <button type="submit" className="searchButton">
                                                <i className="fa fa-search" />
                                            </button>
                                        </div>
                                        <p className="titleAccount">Danh sách tài khoản</p>
                                        <div className="boxAccount">
                                            {renderUsers}
                                        </div>
                                    </div>
                                </div>
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
                        <Modal.Title>Xác nhận xóa thông báo</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Bạn có chắc chắn muốn xóa thông báo này ra khỏi hệ thống không?</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => this.closeDelete()}>Trở lại</Button>
                        <Button variant="primary" onClick={(e) => this.submitDelete(e)}>Lưu lại</Button>
                    </Modal.Footer>
                </Modal>
                {/* Modal phần sửa */}
                <Modal show={this.state.modalEdit}>
                    <Modal.Header closeButton onClick={() => this.closeEdit()}>
                        <Modal.Title>Cập nhật thông báo</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="form-group">
                            <div className="container">
                                <div className="row">
                                    <div className="col-6">
                                        <p className="titleInfo">Thông tin thông báo</p>
                                        <div className="card-input mt-3">
                                            <span>Đường dẫn</span>
                                            <input
                                                type="text"
                                                value={this.state.url}
                                                name="url"
                                                onChange={e => this.handleChange(e)}
                                            />
                                        </div>
                                        <div className="card-input mt-3">
                                            <span>Nội dung</span>
                                            <textarea placeholder="Nhập nội dung thông báo"
                                                onChange={e => this.handleChange(e)}
                                                value={this.state.content}
                                                name="content"
                                            />
                                        </div>
                                        <div className="card-input mt-3">
                                            <span>Loại thông báo</span>
                                            <select name="type" id="" onChange={e => this.handleChange(e)}>
                                                <option value="">Chọn loại thông báo</option>
                                                <option value="info">Gợi ý</option>
                                                <option value="success">Thông báo</option>
                                                <option value="danger">Cảnh báo</option>
                                            </select>
                                        </div>

                                    </div>
                                    <div className="col-6">
                                        <div className="search">
                                            <input type="text" className="searchFollowingPost" placeholder="Tìm kiếm" />
                                            <button type="submit" className="searchButton">
                                                <i className="fa fa-search" />
                                            </button>
                                        </div>
                                        <p className="titleAccount">Danh sách tài khoản</p>
                                        <div className="boxAccount">

                                            <div className="card-input mt-3">
                                                <div className="container">
                                                    <div className="row">
                                                        <div className="col-10">
                                                            <p>Nguyễn Lập</p>
                                                        </div>
                                                        <div className="col-2">
                                                            <input type="checkbox" class="form-check-input" id="exampleCheck1" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="card-input mt-3">
                                                <div className="container">
                                                    <div className="row">
                                                        <div className="col-10">
                                                            <p>Nguyễn Lập</p>
                                                        </div>
                                                        <div className="col-2">
                                                            <input type="checkbox" class="form-check-input" id="exampleCheck1" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="card-input mt-3">
                                                <div className="container">
                                                    <div className="row">
                                                        <div className="col-10">
                                                            <p>Nguyễn Lập</p>
                                                        </div>
                                                        <div className="col-2">
                                                            <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="card-input mt-3">
                                                <div className="container">
                                                    <div className="row">
                                                        <div className="col-10">
                                                            <p>Nguyễn Lập</p>
                                                        </div>
                                                        <div className="col-2">
                                                            <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="card-input mt-3">
                                                <div className="container">
                                                    <div className="row">
                                                        <div className="col-10">
                                                            <p>Nguyễn Lập</p>
                                                        </div>
                                                        <div className="col-2">
                                                            <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="card-input mt-3">
                                                <div className="container">
                                                    <div className="row">
                                                        <div className="col-10">
                                                            <p>Nguyễn Lập</p>
                                                        </div>
                                                        <div className="col-2">
                                                            <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="card-input mt-3">
                                                <div className="container">
                                                    <div className="row">
                                                        <div className="col-10">
                                                            <p>Nguyễn Lập</p>
                                                        </div>
                                                        <div className="col-2">
                                                            <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="card-input mt-3">
                                                <div className="container">
                                                    <div className="row">
                                                        <div className="col-10">
                                                            <p>Nguyễn Lập</p>
                                                        </div>
                                                        <div className="col-2">
                                                            <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="card-input mt-3">
                                                <div className="container">
                                                    <div className="row">
                                                        <div className="col-10">
                                                            <p>Nguyễn Lập</p>
                                                        </div>
                                                        <div className="col-2">
                                                            <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
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
    componentWillUnmount() {
        this.isComponentMounted = false;
    }
}
export default QLListThongBao;