import React, { Component } from "react";
import { Link } from "react-browser-router"
import Modal from "../modal/Modal";
class QLCauHoi extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            inputQuestionDoc: "",
            inputADocQ: "",
            inputBDoc: "",
            inputCDoc: "",
            inputDDoc: "",
            inputAnswerDoc: "",
            inputQuestionNghe: "",
            inputANghe: "",
            inputBNghe: "",
            inputCNghe: "",
            inputDNghe: "",
            inputAnswerNghe: "",
            inputQuestionHinh: "",
            inputAHinh: "",
            inputBHinh: "",
            inputCHinh: "",
            inputAnswerHinh: "",
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(e) {
        var target = e.target;
        var name = target.name;
        var value = target.value;
        this.setState({
            [name]: value
        });
    }
    
    handleSubmit(e) {
        this.setState({
        });
        this.modalClose();
    }

    modalOpen() {
        this.setState({ modal: true });
    }

    modalClose() {
        this.setState({
            modal: false,
            inputQuestionDoc: "",
            inputADocQ: "",
            inputBDoc: "",
            inputCDoc: "",
            inputDDoc: "",
            inputAnswerDoc: "",
            inputQuestionNghe: "",
            inputANghe: "",
            inputBNghe: "",
            inputCNghe: "",
            inputDNghe: "",
            inputAnswerNghe: "",
            inputQuestionHinh: "",
            inputAHinh: "",
            inputBHinh: "",
            inputCHinh: "",
            inputAnswerHinh: "",
        });
    }
    render() {
        return (
            <tr>
                <td>If you could please get back to me with your_______before the end of the day today, I will make sure that your order is processed in time for delivery by the end of the week.</td>
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
                  <a href="#" className="btn btn-primary mr-2" onClick={e => this.modalOpen(e)}><i className="fa fa-edit" /></a>
                    <a href="#" className="btn btn-danger"><i className="fa fa-trash" /></a>
                    <Modal show={this.state.modal} handleClose={e => this.modalClose(e)}>
                    <h2 className="text-center text-primary">Thêm câu hỏi</h2>
                    <hr className="sidebar-divider my-0" />
                    <ul className="nav nav-tabs mt-5">
                        <li className="nav-item"> <a className="active nav-link" data-toggle="pill" data-target="#taboneQuestion"><i className="fa fa-book" /> Câu hỏi đọc</a> </li>
                        <li className="nav-item"> <a className="nav-link" data-toggle="pill" data-target="#tabtwoQuestion"><i className="fa fa-star" /> Câu hỏi nghe </a> </li>
                        <li className="nav-item"> <a className="nav-link" data-toggle="pill" data-target="#tabthreeQuestion"><i className="fa fa-bolt" /> Câu hỏi hình ảnh</a> </li>
                    </ul>
                    <div className="tab-content mt-3">
                        <div className="tab-pane fade show active" id="taboneQuestion" role="tabpanel">
                        <div className="form-group">
                                <div className="card-input mt-4">
                                    <span>Câu hỏi</span>
                                    <input
                                        type="text"
                                        value={this.state.inputQuestionDoc}
                                        name="inputQuestionDoc"
                                        onChange={e => this.handleChange(e)}
                                    />
                                </div>
                                <div className="card-input mt-4">
                                    <span>A</span>
                                    <input
                                        type="text"
                                        value={this.state.inputADoc}
                                        name="inputADoc"
                                        onChange={e => this.handleChange(e)}
                                    />
                                </div>
                                <div className="card-input mt-4">
                                    <span>B</span>
                                    <input
                                        type="text"
                                        value={this.state.inputBDoc}
                                        name="inputBDoc"
                                        onChange={e => this.handleChange(e)}
                                    />
                                </div>
                                <div className="card-input mt-4">
                                    <span>C</span>
                                    <input
                                        type="text"
                                        value={this.state.inputCDoc}
                                        name="inputCDoc"
                                        onChange={e => this.handleChange(e)}
                                    />
                                </div>
                                <div className="card-input mt-4">
                                    <span>D</span>
                                    <input
                                        type="text"
                                        value={this.state.inputDDoc}
                                        name="inputDDoc"
                                        onChange={e => this.handleChange(e)}
                                    />
                                </div>
                                <div className="card-input mt-4">
                                    <span>Đáp án câu hỏi</span>
                                    <input
                                        type="text"
                                        value={this.state.inputAnswerDoc}
                                        name="inputAnswerDoc"
                                        onChange={e => this.handleChange(e)}
                                    />
                                </div>
                            </div>

                        </div>

                        <div className="tab-pane fade" id="tabtwoQuestion" role="tabpanel">
                            <div className="form-group">
                                <div className="card-input mt-4">
                                    <span>Câu hỏi</span>
                                    <input
                                        type="file"
                                        value={this.state.inputQuestionNghe}
                                        name="inputQuestionNghe"
                                        onChange={e => this.handleChange(e)}
                                    />
                                </div>
                                <div className="card-input mt-4">
                                    <span>A</span>
                                    <input
                                        type="text"
                                        value={this.state.inputANghe}
                                        name="inputANghe"
                                        onChange={e => this.handleChange(e)}
                                    />
                                </div>
                                <div className="card-input mt-4">
                                    <span>B</span>
                                    <input
                                        type="text"
                                        value={this.state.inputBNghe}
                                        name="inputBNghe"
                                        onChange={e => this.handleChange(e)}
                                    />
                                </div>
                                <div className="card-input mt-4">
                                    <span>C</span>
                                    <input
                                        type="text"
                                        value={this.state.inputCNghe}
                                        name="inputCNghe"
                                        onChange={e => this.handleChange(e)}
                                    />
                                </div>
                                <div className="card-input mt-4">
                                    <span>D</span>
                                    <input
                                        type="text"
                                        value={this.state.inputDNghe}
                                        name="inputDNghe"
                                        onChange={e => this.handleChange(e)}
                                    />
                                </div>
                                <div className="card-input mt-4">
                                    <span>Đáp án câu hỏi</span>
                                    <input
                                        type="text"
                                        value={this.state.inputAnswerNghe}
                                        name="inputAnswerNghe"
                                        onChange={e => this.handleChange(e)}
                                    />
                                </div>
                            </div>

                        </div>
                        <div className="tab-pane fade" id="tabthreeQuestion" role="tabpanel">
                            <div className="form-group">
                                <div className="card-input mt-4">
                                    <span>Câu hỏi</span>
                                    <input
                                        type="text"
                                        value={this.state.inputQuestionHinh}
                                        name="inputQuestionHinh"
                                        onChange={e => this.handleChange(e)}
                                    />
                                </div>
                                <div className="card-input mt-4">
                                    <span>A</span>
                                    <input
                                        type="file"
                                        value={this.state.inputAHinh}
                                        name="inputAHinh"
                                        onChange={e => this.handleChange(e)}
                                    />
                                </div>
                                <div className="card-input mt-4">
                                    <span>B</span>
                                    <input
                                        type="file"
                                        value={this.state.inputBHinh}
                                        name="inputBHinh"
                                        onChange={e => this.handleChange(e)}
                                    />
                                </div>
                                <div className="card-input mt-4">
                                    <span>C</span>
                                    <input
                                        type="file"
                                        value={this.state.inputCHinh}
                                        name="inputCHinh"
                                        onChange={e => this.handleChange(e)}
                                    />
                                </div>
                                <div className="card-input mt-4">
                                    <span>Đáp án câu hỏi</span>
                                    <input
                                        type="text"
                                        value={this.state.inputAnswerHinh}
                                        name="inputAnswerHinh"
                                        onChange={e => this.handleChange(e)}
                                    />
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className="card-button">
                        <button onClick={e => this.handleSubmit(e)} type="button" className="btn btn-primary float-left">
                            Lưu lại
                                </button>
                    </div>
                    </Modal>
                </td>
            </tr>
        );
    }
}
export default QLCauHoi;