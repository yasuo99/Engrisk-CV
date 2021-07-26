import React, { Component } from "react"
import "datatables.net-dt/js/dataTables.dataTables.js"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import $ from 'jquery'
import questionApi from "../../api/questionApi";
import { Button, Modal } from 'react-bootstrap'
import { toast } from "react-toastify";
import ReactPlayer from "react-player";

class QLListCauHoi extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalCreate: false,
            modalEdit: false,
            modalDelete: false,
            // Phần create
            content: null,
            answer: null,
            type: null,
            audio: null,
            file: null,
            a: null,
            b: null,
            c: null,
            d: null,
            answer: null,
            oldImage: null,
            oldAudio: null,
            explaination: null,
            toeicPart: 0,
            questions: [],
            selectQuestion: 0,
        };
        // this.handleChange = this.handleChange.bind(this);
        // this.handleSubmit = this.submitCreate.bind(this);
        // this.handleSubmit = this.submitEdit.bind(this);
        // this.handleSubmit = this.submitDelete.bind(this);
    }
    async componentDidMount() {
        this.isComponentMounted = true;
        var result = await this.fetchQuestions();
        if (this.isComponentMounted) {
            this.setState({
                questions: result
            });
            $(function () {
                $("#dataTable").DataTable();
            });
        }
    }
    fetchQuestions = async () => {
        return await questionApi.getAll();
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
    submitCreate = async () => {
        if (this.state.answer == null || this.state.content == null) {
            toast("Câu hỏi / đáp án không được để trống");
        }
        else {
            let formData = new FormData();
            formData.append('content', this.state.content);
            formData.append('a', this.state.a);
            formData.append('b', this.state.b);
            formData.append('c', this.state.c);
            formData.append('d', this.state.d);
            formData.append('answer', this.state.answer);
            formData.append('explaination', this.state.explaination);
            formData.append('audio', this.state.audio);
            formData.append('file', this.state.file);
            switch (this.state.type) {
                case "listening":
                    formData.append("isListeningQuestion", true);
                    break;
                case "image":
                    formData.append("isFilloutQuestion", true);
                    break;
                case "collapse":
                    formData.append("isListeningQuestion", true);
                    formData.append("isFilloutQuestion", true);
                    break;
                default:
                    break;
            }
            if (this.state.toeicPart == 0) {
                formData.append('isQuizQuestion', true);
            }
            try {
                const result = await questionApi.createQuestion(formData);
                if (result.status === 200) {
                    toast("Thêm câu hỏi thành công");
                    var questions = await this.fetchQuestions();
                    if (this.isComponentMounted) {
                        this.setState({
                            modalCreate: false,
                            questions: questions,
                            content: null,
                            a: null,
                            b: null,
                            c: null,
                            d: null,
                            answer: null,
                            audio: null,
                            file: null,
                            explaination: null,
                            type: ''
                        });
                    }
                } else {
                    toast("Thêm thất bại");
                }
            } catch (error) {
                console.log(error);
                toast("Thêm thất bại");
            }
        }
    }

    modalCreate = () => {
        this.state.modalCreate ? this.setState({ modalCreate: false }) : this.setState({ modalCreate: true });
    }
    // Xử lý modal edit
    modalEdit = async (e) => {
        if(e){
            e.preventDefault();
            if(e.target.dataset.id){
                console.log(e);
                const result = await this.fetchQuestion(e.target.dataset.id);
                console.log(result);
                this.setState({
                    selectQuestion: e.target.dataset.id,
                    content: result.content,
                    a: result.a,
                    b: result.b,
                    c: result.c,
                    d: result.d,
                    answer: result.answer,
                    oldAudio: result.audio,
                    oldImage: result.photoUrl, 
                    explaination: result.explaination,
                })
            }
        }
        this.state.modalEdit ? this.setState({ modalEdit: false }) : this.setState({ modalEdit: true });
    }
    fetchQuestion = async (id) =>{
        return await questionApi.getDetail(id);
    }
    submitEdit = async () => {
        let formData = new FormData();
        formData.append('content', this.state.content);
        formData.append('a', this.state.a);
        formData.append('b', this.state.b);
        formData.append('c', this.state.c);
        formData.append('d', this.state.d);
        formData.append('answer', this.state.answer);
        formData.append('explaination', this.state.explaination);
        formData.append('audio', this.state.audio);
        formData.append('file', this.state.file);
        switch (this.state.type) {
            case "listening":
                formData.append("isListeningQuestion", true);
                break;
            case "image":
                formData.append("isFilloutQuestion", true);
                break;
            case "collapse":
                formData.append("isListeningQuestion", true);
                formData.append("isFilloutQuestion", true);
                break;
            default:
                break;
        }
        if (this.state.toeicPart == 0) {
            formData.append('isQuizQuestion', true);
        }
        else{
            formData.append('toeicPart', this.state.toeicPart);
        }
        try {
            const result = await questionApi.updateQuestion(this.state.selectQuestion,formData);
            if (result.status === 200) {
                toast("Cập nhật câu hỏi thành công");
                var questions = await this.fetchQuestions();
                if (this.isComponentMounted) {
                    this.setState({
                        modalEdit: false,
                        questions: questions,
                        content: null,
                        a: null,
                        b: null,
                        c: null,
                        d: null,
                        answer: null,
                        audio: null,
                        file: null,
                        explaination: null,
                        type: ''
                    });
                }
            } else {
                toast("Cập nhật thất bại");
            }
        } catch (error) {
            console.log(error);
            toast("Cập nhật thất bại");
        }
    }
    // Xử lý modal delete
    modalDelete(e) {
        this.state.modalDelete ? this.setState({ modalDelete: false }) : this.setState({ modalDelete: true });
    }
    submitDelete(e) {
        this.setState({

        });
        this.closeDelete();
    }
    fileChange(e) {
        this.setState({
            [e.target.name]: e.target.files[0]
        });
    }
    render() {
        const renderQuestions = this.state.questions.map((question) =>
            <tr key={question.id}>
                <td>{question.content}</td>
                <td>{question.a}</td>
                <td>{question.b}</td>
                <td>{question.c}</td>
                <td>{question.d}</td>
                <td>{question.answer}</td>
                <td>
                    <Button data-id={question.id} variant="primary" className="btn btn-primary mr-2" onClick={e => this.modalEdit(e)}><i data-id={question.id} className="fa fa-edit" /></Button>
                    <Button data-id={question.id} variant="primary" className="btn btn-danger" onClick={e => this.modalDelete(e)}><i data-id={question.id} className="fa fa-trash" /></Button>
                </td>
            </tr>
        );
        return (
            <div>
                <Button variant="primary" className="btn btn-success mr-2 mb-3" onClick={e => this.modalCreate(e)} ><i className="fa fa-plus" /> Thêm câu hỏi</Button>
                <table className="table table-bordered" id="dataTable" width="100%" cellSpacing={0}>
                    <thead>
                        <tr>
                            <th >Câu hỏi</th>
                            <th className="cautraA">A</th>
                            <th className="cautraB">B</th>
                            <th className="cautraC">C</th>
                            <th className="cautraD">D</th>
                            <th className="dapAn">Đáp án câu hỏi</th>
                            <th className="chucnang" />
                        </tr>
                    </thead>
                    <tbody>
                        {renderQuestions}
                    </tbody>
                </table>
                {/* Modal create */}
                <Modal show={this.state.modalCreate} onHide={this.modalCreate}>
                    <Modal.Header closeButton onClick={() => this.modalCreate()}>
                        <Modal.Title>Thêm câu hỏi</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="form-group">
                            <div className="card-input mt-4">
                                <span>Câu hỏi</span>
                                <textarea
                                    type="text"
                                    value={this.state.content}
                                    name="content"
                                    onChange={e => this.handleChange(e)}
                                ></textarea>
                            </div>
                            <div className="card-input mt-4">
                                <select name="type" id="" onChange={e => this.setState({ [e.target.name]: e.target.value })}>
                                    <option value="">Chọn dạng câu hỏi (Không chọn nếu là câu hỏi bình thường)</option>
                                    <option value="listening">Câu hỏi nghe</option>
                                    <option value="image">Câu hỏi hình</option>
                                    <option value="collapse">Câu hỏi nghe có hình</option>
                                </select>
                            </div>
                            {this.state.type === 'listening' && <div className="card-input mt-4">
                                <span>File nghe</span>
                                <input type="file" name="audio" accept="audio/*" onChange={e => this.fileChange(e)} /></div>}
                            {this.state.type === 'image' && <div className="card-input mt-4">
                                <span>File hình</span>
                                <input type="file" name="file" accept="image/png, image/jpeg" onChange={e => this.fileChange(e)} /></div>}
                            {this.state.type === 'collapse' && <div className="card-input mt-4">
                                <span>File nghe</span>
                                <input type="file" name="audio" accept="audio/*" onChange={e => this.fileChange(e)} />
                                <span>File hình</span>
                                <input type="file" name="file" accept="image/png, image/jpeg" onChange={e => this.fileChange(e)} /></div>
                            }
                            <div className="card-input mt-4">
                                <span>Toeic (0 nếu không thuộc câu hỏi toeic)</span>
                                <input
                                    type="number"
                                    value={this.state.toeicPart}
                                    name="toeicPart"
                                    onChange={e => this.handleChange(e)}
                                />
                            </div>
                            <div className="card-input mt-4">
                                <span>A</span>

                                <div className="row">
                                    <div className="col-11">
                                        <input
                                            type="text"
                                            value={this.state.a}
                                            name="a"
                                            onChange={e => this.handleChange(e)}
                                        />
                                    </div>
                                    <div className="col-1">
                                        <input
                                            type="radio"
                                            value={this.state.a}
                                            name="answer"
                                            onChange={e => this.handleChange(e)}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="card-input mt-4">
                                <span>B</span>
                                <div className="row">
                                    <div className="col-11">
                                        <input
                                            type="text"
                                            value={this.state.b}
                                            name="b"
                                            onChange={e => this.handleChange(e)}
                                        />
                                    </div>
                                    <div className="col-1">
                                        <input
                                            type="radio"
                                            value={this.state.b}
                                            name="answer"
                                            onChange={e => this.handleChange(e)}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="card-input mt-4">
                                <span>C</span>
                                <div className="row">
                                    <div className="col-11">
                                        <input
                                            type="text"
                                            value={this.state.c}
                                            name="c"
                                            onChange={e => this.handleChange(e)}
                                        />
                                    </div>
                                    <div className="col-1">
                                        <input
                                            type="radio"
                                            value={this.state.c}
                                            name="answer"
                                            onChange={e => this.handleChange(e)}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="card-input mt-4">
                                <span>D</span>
                                <div className="row">
                                    <div className="col-11">
                                        <input
                                            type="text"
                                            value={this.state.d}
                                            name="d"
                                            onChange={e => this.handleChange(e)}
                                        />
                                    </div>
                                    <div className="col-1">
                                        <input
                                            type="radio"
                                            value={this.state.d}
                                            name="answer"
                                            onChange={e => this.handleChange(e)}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="card-input mt-4">
                                <span>Giải thích đáp án</span>
                                <textarea
                                    type="text"
                                    value={this.state.explaination}
                                    name="explaination"
                                    onChange={e => this.handleChange(e)}
                                ></textarea>
                            </div>
                        </div>

                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => this.modalCreate()}>Trở lại</Button>
                        <Button variant="primary" onClick={(e) => this.submitCreate(e)}>Lưu lại</Button>
                    </Modal.Footer>
                </Modal>
                {/* Modal Edit */}
                <Modal show={this.state.modalEdit} onHide={this.modalEdit}>
                    <Modal.Header closeButton onClick={() => this.modalEdit()}>
                        <Modal.Title>Cập nhật câu hỏi</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="form-group">
                            <div className="card-input mt-4">
                                <span>Câu hỏi</span>
                                <textarea
                                    type="text"
                                    value={this.state.content}
                                    name="content"
                                    onChange={e => this.handleChange(e)}
                                ></textarea>
                            </div>
                            {this.state.oldAudio !== null && <ReactPlayer controls url={this.state.oldAudio} width="100px" height="30px"></ReactPlayer>}
                            {this.state.oldImage !== null && <img src={this.state.oldImage} alt="" width="100px" height="100px"/>}
                            <div className="card-input mt-4">
                                <select name="type" id="" onChange={e => this.setState({ [e.target.name]: e.target.value })}>
                                    <option value="">Chọn dạng câu hỏi (Không chọn nếu là câu hỏi bình thường)</option>
                                    <option value="listening">Câu hỏi nghe</option>
                                    <option value="image">Câu hỏi hình</option>
                                    <option value="collapse">Câu hỏi nghe có hình</option>
                                </select>
                            </div>
                            {this.state.type === 'listening' && <div className="card-input mt-4">
                                <span>File nghe</span>
                                <input type="file" name="audio" accept="audio/*" onChange={e => this.fileChange(e)} /></div>}
                            {this.state.type === 'image' && <div className="card-input mt-4">
                                <span>File hình</span>
                                <input type="file" name="file" accept="image/png, image/jpeg" onChange={e => this.fileChange(e)} /></div>}
                            {this.state.type === 'collapse' && <div className="card-input mt-4">
                                <span>File nghe</span>
                                <input type="file" name="audio" accept="audio/*" onChange={e => this.fileChange(e)} />
                                <span>File hình</span>
                                <input type="file" name="file" accept="image/png, image/jpeg" onChange={e => this.fileChange(e)} /></div>
                            }
                            <div className="card-input mt-4">
                                <span>Toeic (0 nếu không thuộc câu hỏi toeic)</span>
                                <input
                                    type="number"
                                    value={this.state.toeicPart}
                                    name="toeicPart"
                                    onChange={e => this.handleChange(e)}
                                />
                            </div>
                            <div className="card-input mt-4">
                                <span>A</span>

                                <div className="row">
                                    <div className="col-11">
                                        <input
                                            type="text"
                                            value={this.state.a}
                                            name="a"
                                            onChange={e => this.handleChange(e)}
                                        />
                                    </div>
                                    <div className="col-1">
                                        <input
                                            type="radio"
                                            value={this.state.a}
                                            name="answer"
                                            onChange={e => this.handleChange(e)}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="card-input mt-4">
                                <span>B</span>
                                <div className="row">
                                    <div className="col-11">
                                        <input
                                            type="text"
                                            value={this.state.b}
                                            name="b"
                                            onChange={e => this.handleChange(e)}
                                        />
                                    </div>
                                    <div className="col-1">
                                        <input
                                            type="radio"
                                            value={this.state.b}
                                            name="answer"
                                            onChange={e => this.handleChange(e)}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="card-input mt-4">
                                <span>C</span>
                                <div className="row">
                                    <div className="col-11">
                                        <input
                                            type="text"
                                            value={this.state.c}
                                            name="c"
                                            onChange={e => this.handleChange(e)}
                                        />
                                    </div>
                                    <div className="col-1">
                                        <input
                                            type="radio"
                                            value={this.state.c}
                                            name="answer"
                                            onChange={e => this.handleChange(e)}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="card-input mt-4">
                                <span>D</span>
                                <div className="row">
                                    <div className="col-11">
                                        <input
                                            type="text"
                                            value={this.state.d}
                                            name="d"
                                            onChange={e => this.handleChange(e)}
                                        />
                                    </div>
                                    <div className="col-1">
                                        <input
                                            type="radio"
                                            value={this.state.d}
                                            name="answer"
                                            onChange={e => this.handleChange(e)}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="card-input mt-4">
                                <span>Giải thích đáp án</span>
                                <textarea
                                    type="text"
                                    value={this.state.explaination}
                                    name="explaination"
                                    onChange={e => this.handleChange(e)}
                                ></textarea>
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => this.modalEdit()}>Trở lại</Button>
                        <Button variant="primary" onClick={(e) => this.submitEdit()}>Lưu lại</Button>
                    </Modal.Footer>
                </Modal>
                {/* Modal Delete */}
                <Modal show={this.state.modalDelete} onHide={this.modalDelete}>
                    <Modal.Header closeButton onClick={() => this.modalDelete()}>
                        <Modal.Title>Xác nhận xóa câu hỏi</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Bạn có chắc chắn muốn xóa câu hỏi này ra khỏi hệ thống không?</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => this.modalDelete()}>Trở lại</Button>
                        <Button variant="primary" onClick={(e) => this.submitDelete(e)}>Lưu lại</Button>
                    </Modal.Footer>
                </Modal>

            </div >
        )
    }
    componentWillUnmount() {
        this.isComponentMounted = false;
    }
}
export default QLListCauHoi;