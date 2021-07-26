import React, { Component } from 'react';
import { Link } from "react-browser-router";
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import accountApi from '../../api/accountApi';
import HeaderClient from '../../components/client/HeaderClient';
import SubMenuClient from '../../components/client/SubMenuClient';
import Footer from '../Footer/Footer';
import { Button, Modal } from 'react-bootstrap'
class XacNhanEmail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            modal: false,
        }
    }
    modalOpen() {
        this.setState({ modal: true });
    }
    modalClose() {
        this.setState({
            modal: false
        });
    }
    render() {

        return (
            <div id="wrapper">
                <SubMenuClient></SubMenuClient>
                <div id="content-wrapper" className="d-flex flex-column">
                    <div id="content">
                        <HeaderClient></HeaderClient>
                        <main id="xacnhanemail">
                            <div className="container">
                                {/* Outer Row */}
                                <div className="row justify-content-center">
                                    <div className="col-xl-10 col-lg-12 col-md-9">
                                        <div className="card o-hidden border-0 shadow-lg my-5">
                                            <div className="card-body p-0">
                                                <div className="row">
                                                    <div className="col-lg-6 d-none d-lg-block bg-email-image"></div>
                                                    <div className="col-lg-6">
                                                        <div className="p-5">
                                                            <div className="text-center">
                                                                <h1 className="h4 text-gray-900 mb-2">Xác nhận email</h1>
                                                                <p className="mb-4">Bạn cần phải xác nhận email trước khi thực hiện chức năng bình luận</p>
                                                            </div>
                                                            <form className="user text-center">
                                                                <div className="form-group">
                                                                    <input type="email" className="form-control form-control-user" id="exampleInputEmail" aria-describedby="emailHelp" placeholder="Nhập email..." />
                                                                </div>
                                                                <button className="btn btn-primary " onClick={e => this.modalOpen(e)}>Xác nhận</button>
                                                            </form>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </main>
                        <Modal show={this.state.modal}>
                            <Modal.Header closeButton onClick={() => this.modalClose()}>
                                <Modal.Title><img src="/image/success.png"></img> Chúc mừng bạn đã xác nhận email thành công</Modal.Title>
                            </Modal.Header>
                            {/* <Modal.Body> 
                                   </Modal.Body> */}
                            <Modal.Footer>
                                <Button variant="secondary" onClick={() => this.modalClose()}>Trở lại</Button>
                            </Modal.Footer>
                        </Modal>
                        <Footer></Footer>
                    </div>
                </div>

            </div>

        );
    }
}
export default XacNhanEmail;
