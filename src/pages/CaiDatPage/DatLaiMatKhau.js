import React, { Component } from 'react';
import { Link } from "react-browser-router";
import HeaderClient from '../../components/client/HeaderClient';
import SubMenuClient from '../../components/client/SubMenuClient';
import Footer from '../Footer/Footer';
import { Button, Modal } from 'react-bootstrap'
import accountApi from '../../api/accountApi';
import { toast } from 'react-toastify';
class DatLaiMatKhau extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalInfor: false,
            modal: false,
            email: '',
            otp: 0,
            newPassword: '',
            confirmPassword: ''
        };
        this.handleChange = this.handleChange.bind(this);
    }
    resetPassword = async (e) => {
        e.preventDefault();
        try {
            const result = await accountApi.resetPassword(Number.parseInt(this.state.otp), this.state.email, this.state.newPassword, this.state.confirmPassword);
            if (result.status === 200) {
                toast("Reset mật khẩu thành công");
            }
        } catch (error) {
            console.log(error.response);
            if(error.response.data.error){
                toast(error.response.data.error)
            }
            else{
                toast("OTP đã sử dụng");
            }
        }

    }
    handleChange = (e) => {
        e.preventDefault();
        console.log(e.target.value);
        this.setState({
            [e.target.id]: e.target.value
        })
    }
    modalOpen() {
        this.setState({ modalInfor: true });
    }
    modalClose() {
        this.setState({
            modalInfor: false
        });
    }
    render() {
        return (
            <div id="wrapper">
                <SubMenuClient></SubMenuClient>
                <div id="content-wrapper" className="d-flex flex-column">
                    <div id="content">
                        <HeaderClient></HeaderClient>
                        <main id="quenmatkhau">
                            <div className="container">
                                <div className="row justify-content-center">
                                    <div className="col-xl-10 col-lg-12 col-md-9">
                                        <div className="card o-hidden border-0 shadow-lg my-5">
                                            <div className="card-body p-0">
                                                <div className="row">
                                                    <div className="col-lg-6 d-none d-lg-block bg-password-image"></div>
                                                    <div className="col-lg-6">
                                                        <div className="p-5">
                                                            <div className="text-center">
                                                                <h1 className="h4 text-gray-900 mb-2">Đặt lại mật khẩu</h1>
                                                            </div>
                                                            <form className="user" onSubmit={this.resetPassword}>
                                                                <div className="form-group">
                                                                    <input type="email" className="form-control form-control-user" id="email" placeholder="Nhập email..." onChange={this.handleChange} required/>
                                                                </div>
                                                                <div className="form-group">
                                                                    <input type="number" className="form-control form-control-user" id="otp" placeholder="Nhập mã OTP..." onChange={this.handleChange} required/>
                                                                </div>
                                                                <div className="form-group">
                                                                    <input type="password" className="form-control form-control-user" id="newPassword" placeholder="Nhập mật khẩu..." onChange={this.handleChange} required/>
                                                                </div>
                                                                <div className="form-group">
                                                                    <input type="password" className="form-control form-control-user" id="confirmPassword" placeholder="Xác nhận lại mật khẩu..." onChange={this.handleChange} required/>
                                                                </div>
                                                                <button className="btn btn-primary btn-user btn-block" type="submit">
                                                                    Lưu lại
                                                                </button>
                                                                <Modal show={this.state.modalInfor}>
                                                                    <Modal.Header closeButton onClick={() => this.modalClose()}>
                                                                        <Modal.Title> <img src="/image/check-mark.png"></img> Chúc mừng bạn đã thay đổi mật khẩu thành công</Modal.Title>
                                                                    </Modal.Header>

                                                                    <Modal.Footer>
                                                                        <Button variant="secondary" onClick={() => this.modalClose()}>Trở lại</Button>
                                                                    </Modal.Footer>
                                                                </Modal>                         
                                                            </form>
                                                            <hr />
                                                            <div className="text-center">
                                                                <Link className="small" to="/signup">Tạo tài khoản</Link>
                                                            </div>
                                                            <div className="text-center">
                                                                <Link className="small" to="/signin">Bạn đã có sẵn một tài khoản? Đăng nhập</Link>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </main>
                        <Footer></Footer>
                    </div>
                </div>

            </div>

        );
    }
}

export default DatLaiMatKhau;
