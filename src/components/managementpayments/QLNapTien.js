import React, { Component } from "react";
import { Link } from "react-browser-router"
import { Button, Modal } from 'react-bootstrap'
class QLNapTien extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalDelete: false,
            modalDetail: false,
        };
    }
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
    // Xử lý modal delete
    openDelete() {
        this.setState({ modalDelete: true });
    }
    closeDelete() {
        this.setState({
            modalDelete: false,
        });
    }
    submitDelete(e) {
        this.setState({

        });
        this.closeDelete();
    }
    render() {
        return (
            <tr>
                <td>lap@gmail.com</td>
                <td>100.000VNĐ</td>
                <td>12-09-2020</td>
                <td>paypal</td>             
                <td>
                <Button variant="primary" className="btn btn-primary mr-2" onClick={e => this.openDetail(e)}><i className="fa fa-info" /></Button>
                <Button variant="primary" className="btn btn-danger" onClick={e => this.openDelete(e)}><i className="fa fa-trash" /></Button>
                     {/* Modal phần xóa */}
                <Modal show={this.state.modalDelete}>
                    <Modal.Header closeButton onClick={() => this.closeDelete()}>
                        <Modal.Title>Xác nhận xóa tài khoản</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Bạn có chắc chắn muốn xóa tài khoản này ra khỏi hệ thống không?</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => this.closeDelete()}>Trở lại</Button>
                        <Button variant="primary" onClick={(e) => this.submitDelete(e)}>Lưu lại</Button>
                    </Modal.Footer>
                </Modal>
                {/* Modal phần xem chi tiết */}
                <Modal show={this.state.modalDetail}>
                    <Modal.Header closeButton onClick={() => this.closeDetail()}>
                        <Modal.Title>Thông tin chi tiết lịch sử nạp tiền</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="form-group ">
                            <div className="card-input mt-4">
                                <span>Tên tài khoản:</span>&nbsp;
                                <span>NguyenLap</span>
                            </div>
                            <div className="card-input mt-4">
                                <span>Số tiền nạp:</span>&nbsp;
                                <span>100.000VNĐ</span>
                            </div>
                            <div className="card-input mt-4">
                                <span>Ngày nạp:</span>&nbsp;
                                <span>02/02/2020</span>
                            </div>
                            <div className="card-input mt-4">
                                <span>Hình thức</span>&nbsp;
                                <span>paypal</span>
                            </div>
                        </div>  
                        </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => this.closeDetail()}>Trở lại</Button>
                        <Button variant="primary" onClick={(e) => this.submitDetail(e)}>Lưu lại</Button>
                    </Modal.Footer>
                </Modal>
                </td>
            </tr>
        );
    }
}
export default QLNapTien;