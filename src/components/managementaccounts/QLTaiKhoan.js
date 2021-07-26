import React, { Component } from "react";
import { Link } from "react-browser-router"
import Modal from "../modal/Modal";
import ModalDelete from "../modal/ModalDelete";
import ModalLock from "../modal/ModalLock";
class QLTaiKhoan extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            modalLock:false,
            modalDelete:false,
        };
    }
    handleChange(e) {
        this.setState({
            [e.target.id]: e.target.value,
          });
    }
    modalOpen() {
        this.setState({ modal: true });
    }

    modalClose() {
        this.setState({
            modal: false,
            modalDelete:false,
            modalLock: false,
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
    modalOpenLock() {
        this.setState({ modalLock: true });
    }
    handleSubmitLock(e) {
        this.setState({
        });
        this.modalClose();
    }
    render() {
        var {modalInputTime} = this.state;
        return (
            <tr>
                <td>NguyenLap</td>
                <td>Lap@gmail.com</td>
                <td>Nguyễn Thanh Lập</td>
                <td>03.3939.2502</td>
                
                <td>
                    <a href="javascript:;" className="btn btn-success mr-2" onClick={e => this.modalOpen(e)} ><i className="fa fa-info" /></a>
                    {/* <a href="#" className="btn btn-primary mr-2" onClick={e => this.modalOpenLock(e)}><i className="fa fa-expeditedssl" /></a> */}
                    <a href="#" className="btn btn-danger" onClick={e => this.modalOpenDelete(e)}><i className="fa fa-trash" /></a>
                    <Modal show={this.state.modal} handleClose={e => this.modalClose(e)}>
                        <h2 className="text-center text-primary">Thông tin chi tiết tài khoản</h2>
                        <hr className="sidebar-divider my-0" />
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
                                <span>03.3939.3502</span>
                            </div>
                            <div className="card-input mt-4">
                                <span>Giới tính:</span>&nbsp;
                                <span>Nam</span>
                            </div>
                            <div className="card-input mt-4">
                                <span>Địa chỉ:</span>&nbsp;
                                <span>38/2 Tây Hòa phường Phước Long A quận 9 Tp.HCM</span>
                            </div>
                        </div>
                    </Modal>
                    <ModalDelete show={this.state.modalDelete} handleClose={e => this.modalClose(e)}>
                        <h3 className="title"> <img src="/image/trash.png"></img> Xác nhận xóa tài khoản</h3>
                        <p className="content">
                            Bạn có chắc chắn muốn xóa tài khoản này ra khỏi hệ thống không?
                        </p>
                        <button onClick={e => this.handleSubmitDelete(e)} type="button" className="btn btn-info float-right">
                            Xác nhận
                        </button>
                    </ModalDelete>
                    {/* <ModalLock show={this.state.modalLock} handleClose={e => this.modalClose(e)}>
                        <h3 className="title"> <img src="/image/Lock1.png"></img> Xác nhận khóa tài khoản</h3>
                        <div className="card-input mt-4">
                            <span>Thời gian khóa tài khoản</span>
                            <select
                                value={modalInputTime}
                                onChange={e => this.handleChange(e)}
                                name="modalInputTime">
                                <option value="">- Chọn thời gian -</option>
                                <option value="1 giờ">1 giờ</option>
                                <option value="1 giờ">2 giờ</option>
                                <option value="1 giờ">4 giờ</option>
                                <option value="1 giờ">8 giờ</option>
                                <option value="1 giờ">24 giờ</option>
                            </select>
                        </div>
                        <div className="card-button mt-5">
                        <button onClick={e => this.handleSubmitLock(e)} type="button" className="btn btn-info float-right">
                            Xác nhận
                        </button>
                        </div>
                    </ModalLock> */}
                </td>
                <td>
                    <input 
                        type="checkbox" data-toggle="toggle" data-size="sm" data-style="ios"
                        name="toggleSwitch"
                        id="toggleSwitch"
                        onChange={e => this.handleChange(e)}
                    />
                </td>
            </tr>
        );
    }
}
export default QLTaiKhoan;