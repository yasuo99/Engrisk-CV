import React, { Component } from "react";
import { Button, Modal } from 'react-bootstrap'
class CauHoi extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalDelete: false,
        };
    }
    closeDelete() {
        this.setState({
            modalDelete: false,
        });
    }
    openDelete() {
        this.setState({ modalDelete: true });
    }
    submitDelete(e) {
        this.setState({

        });
        this.closeDelete();
    }
    render() {
        return (
            <tr>
                <td className="cauhoi-quiz">If you could please get back to me with your_______before the end of the day today, I will make sure that your order is processed in time for delivery by the end of the week.</td>
                <td>
                    prefer
                </td>
                <td>
                    preferred </td>
                <td>
                    preferred</td>
                <td>
                    preference
                </td>
                <td>Sau tính từ sở hữu YOUR ta cần một danh từ, nên ta chọn ngay D</td>
                <td>
                <Button variant="primary" className="btn btn-danger" onClick={e => this.openDelete(e)}><i className="fa fa-trash" /></Button>
                </td>
                 {/* Modal phần xóa */}
                 <Modal show={this.state.modalDelete}>
                    <Modal.Header closeButton onClick={() => this.closeDelete()}>
                        <Modal.Title>Xác nhận xóa câu hỏi</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Bạn có chắc chắn muốn xóa câu hỏi này ra khỏi bài quiz không?</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => this.closeDelete()}>Trở lại</Button>
                        <Button variant="primary" onClick={(e) => this.submitDelete(e)}>Lưu lại</Button>
                    </Modal.Footer>
                </Modal>
                
            </tr>
        );
    }
}
export default CauHoi;