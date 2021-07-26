import React, { Component } from "react"
import "datatables.net-dt/js/dataTables.dataTables.js"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import $ from 'jquery'
import Switch from 'react-switch';
// import accountApi from "../../api/accountApi";
import { Button, Modal } from 'react-bootstrap'
import accountApi from "../../api/accountApi"
import { toast } from "react-toastify";
class QLListTaiKhoan extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalDetail: false,

            accounts: [],
        };
        this.isComponentMounted = false;
    }
    async componentDidMount() {
        this.isComponentMounted = true;
        const accounts = await this.fetchAccount();
        if (this.isComponentMounted) {
            this.setState({
                accounts: accounts
            })
            $(function () {
                $("#dataTable").DataTable();
            });
        }

    }
    fetchAccount = async () => {
        return await accountApi.getAll();
    }
    // Xử lý modal detail
    openDetail() {
        this.setState({ modalDetail: true });
    }
    closeDetail() {
        this.setState({
            modalDetail: false,
        });
    }
    submitDetail(e) {
        this.setState({
        });
        this.closeDetail();
    }
    disableAccount = async (id) => {
        try {
            const result = await accountApi.disableAccount(id);
            if (result.status === 200) {
                toast("Thành công");
                const accounts = await this.fetchAccount();
                if (this.isComponentMounted) {
                    this.setState({
                        accounts: accounts
                    })
                }
            } else {
                toast("Thất bại");
            }
        } catch (error) {
            console.log(error);
        }

    }
    render() {
        const renderAccounts = this.state.accounts.map((account) =>
            <tr key={account.id}>
                {/* XỬ LÝ DATA */}
                <td>{account.username}</td>
                <td>{account.email}</td>
                <td>{account.phoneNumber}</td>
                <td>{account.address}</td>
                <td>{account.isVerified ? "Đã xác nhận" : "Chưa xác nhận"}</td>
                <td>{account.locked}</td>
                <td>
                    <Switch id={account.id} onChange={(props, event, id) => this.disableAccount(id)} checked={account.isDisabled} />

                </td>
            </tr>
        );
        return (
            <div>
                {this.isComponentMounted && <table className="table table-bordered" id="dataTable" width="100%" cellSpacing={0}>
                    <thead>
                        <tr>
                            <th className="taikhoan">Tên tài khoản</th>
                            <th className="email">Email</th>
                            <th className="sdt">Số điện thoại</th>
                            <th>Địa chỉ</th>
                            <th>Xác nhận email</th>
                            <th className="chucnang" >Khóa tới</th>
                            <th className="lock">Vô hiệu hóa</th>
                        </tr>
                    </thead>
                    <tbody>
                        {renderAccounts}
                    </tbody>
                </table>}

                {/* Modal phần xem chi tiết */}
                <Modal show={this.state.modalDetail}>
                    <Modal.Header closeButton onClick={() => this.closeDetail()}>
                        <Modal.Title>Thông tin chi tiết tài khoản</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="form-group form-group-account">
                            <div className="card-input mt-4">
                                <span>Tên tài khoản:</span>&nbsp;
                                <span>NguyenLap</span>
                            </div>
                            <div className="card-input mt-4">
                                <span>Email:</span>&nbsp;
                                <span>Lap@gmail.com</span>
                            </div>
                            <div className="card-input mt-4">
                                <span>Họ và tên:</span>&nbsp;
                                <span>Nguyễn Thanh Lập</span>
                            </div>
                            <div className="card-input mt-4">
                                <span>Số điện thoại:</span>&nbsp;
                                <span>03.3939.2502</span>
                            </div>
                            <div className="card-input mt-4">
                                <span>Địa chỉ:</span>&nbsp;
                                <span>38/2 Tay hoa</span>
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => this.closeDetail()}>Trở lại</Button>
                        <Button variant="primary" onClick={(e) => this.submitDetail(e)}>Lưu lại</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
    componentWillUnmount() {
        this.isComponentMounted = false;
    }
}
export default QLListTaiKhoan;