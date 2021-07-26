import React, { Component } from "react";
import { Link } from "react-browser-router"
import wordApi from "../../api/wordApi";
import { Button, Modal } from 'react-bootstrap'

class QLTuVung extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalEdit: false,
            modalDelete: false,
            modalInputEnglish: "",
            modalInputVietNam: "",
            modalInputSpelling: "",
            modalInputLoaiTu: "",
            modalInputHinhAnh: null,
            words: []
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmitEdit = this.submitEdit.bind(this);
        this.isComponentMounted = false;
    }
    async componentDidMount() {
        this.isComponentMounted = true;
        var result = await this.fetchWords();
        console.log(result);
        if (this.isComponentMounted) {
            this.setState({
                words: result
            })
        }
    }
    onFileChange = event => {
        this.setState({ modalInputHinhAnh: event.target.files[0] });

    };
    handleChange(e) {
        var target = e.target;
        var name = target.name;
        var value = target.value;
        this.setState({
            [name]: value
        });
    }
    fetchWords = async () => {
        return await wordApi.getAll();
    }
    // Xử lý modal edit
    openEdit() {
        this.setState({ modalEdit: true });
    }
    closeEdit() {
        this.setState({
            modalEdit: false,
        });
    }
    submitEdit(e) {
        this.setState({       
        });
        this.closeEdit();
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
        var { modalInputEnglish, modalInputVietNam, modalInputLoaiTu, modalInputSpelling, modalInputHinhAnh } = this.state;
        const renderWords = this.props.words.map((word) =>
            <tr key={word.id}>
                <td>{word.eng}</td>
                <td>{word.wordCategory}</td>
                <td>{word.vie}</td>
                <td>{word.examples.map((example) =>
                    <p key={example.id}>{example.eng} / {example.vie}</p>
                )}</td>
                <td><img width="50px" height="50px" src={word.wordImg}></img></td>

                <td>
                    <Button variant="primary" className="btn btn-primary mr-2" onClick={e => this.openEdit(e)}><i className="fa fa-edit" /></Button>
                    <Button variant="primary" className="btn btn-danger" onClick={e => this.openDelete(e)}><i className="fa fa-trash" /></Button>
                    {/* Modal phần xóa */}
                    <Modal show={this.state.modalDelete}>
                        <Modal.Header closeButton onClick={() => this.closeDelete()}>
                            <Modal.Title>Xác nhận xóa từ vựng</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>Bạn có chắc chắn muốn xóa từ vựng này ra khỏi hệ thống không?</Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={() => this.closeDelete()}>Trở lại</Button>
                            <Button variant="primary" onClick={(e) => this.submitDelete(e)}>Lưu lại</Button>
                        </Modal.Footer>
                    </Modal>
                    {/* Modal phần sửa */}
                    <Modal show={this.state.modalEdit}>
                        <Modal.Header closeButton onClick={() => this.closeEdit()}>
                            <Modal.Title>Cập nhật từ vựng</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div className="form-group">
                                <div className="card-input">
                                    <span>English</span>
                                    <input
                                        type="text"
                                        value={modalInputEnglish}
                                        name="modalInputEnglish"
                                        onChange={e => this.handleChange(e)}
                                        required
                                    />
                                </div>
                                <div className="card-input">
                                    <span>Việt Nam</span>
                                    <input
                                        type="text"
                                        value={modalInputVietNam}
                                        name="modalInputVietNam"
                                        onChange={e => this.handleChange(e)}
                                        required
                                    />
                                </div>
                                <div className="card-input">
                                    <span>Phát âm</span>
                                    <input
                                        type="text"
                                        value={modalInputSpelling}
                                        name="modalInputSpelling"
                                        onChange={e => this.handleChange(e)}
                                        required
                                    />
                                </div>
                                <div className="card-input">
                                    <span>Loại từ</span>
                                    <select
                                        value={modalInputLoaiTu}
                                        onChange={e => this.handleChange(e)}
                                        name="modalInputLoaiTu" required>
                                        <option value="">- Chọn loại từ -</option>
                                        <option value="Danh từ">Danh từ</option>
                                        <option value="Tính từ">Tính từ</option>
                                        <option value="Động từ">Động từ</option>
                                        <option value="Trạng từ">Trạng từ</option>
                                    </select>
                                </div>
                                <div className="card-input">
                                    <span>Hình ảnh minh họa</span>
                                    <input
                                        type="file"
                                        accept="image/png, image/jpeg"
                                        name="modalInputHinhAnh"
                                        onChange={this.onFileChange}
                                    />
                                </div>
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={() => this.closeEdit()}>Trở lại</Button>
                            <Button variant="primary" onClick={(e) => this.submitEdit(e)}>Lưu lại</Button>
                        </Modal.Footer>
                    </Modal>
                </td>
            </tr>
        );
        return (
            <tbody>
                {renderWords}
            </tbody>
        );
    }
    componentWillUnmount() {
        this.isComponentMounted = false;
    }
}
export default QLTuVung;