import React, { Component } from "react"
import QLQuiz from "./QLQuiz"
import { Button, Modal } from 'react-bootstrap'
import ModalListCauHoiDoc from "../modalcauhoi/ModalListCauHoiDoc";
import ModalListCauHoiHinhAnh from "../modalcauhoi/ModalListCauHoiHinhAnh";
import ModalListCauHoiNghe from "../modalcauhoi/ModalListCauHoiNghe";
import "datatables.net-dt/js/dataTables.dataTables.js"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import $ from 'jquery'
import sectionApi from "../../api/sectionApi";
import quizApi from "../../api/quizApi";
import questionApi from "../../api/questionApi";
import { toast } from "react-toastify";
class QLListQuiz extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalCreate: false,
            modalDelete: false,
            modalEdit: false,
            modalQuestionCreate: false,
            modalQuestionDelete: false,
            quizzes: [],
            readingQuestions: [],
            listeningQuestions: [],
            selectedQuiz: 0,
            quiz: { questions: [] },
            sections: [],
            quizName: '',
            difficultLevel: 1,
            sectionId: 0,
            image: '',
            file: null
        };
        this.isComponentMounted = false;
        this.modalDelete = this.modalDelete.bind(this)
        this.modalQuestionCreate = this.modalQuestionCreate.bind(this)
    }
    async componentDidMount() {
        this.isComponentMounted = true;
        var quizzes = await this.fetchQuizzes();
        var readingQuestions = await this.fetchReadingQuestion();
        var listeningQuestions = await this.fetchListeningQuestion();
        var sections = await this.fetchSections();
        if (this.isComponentMounted) {
            this.setState({
                quizzes: quizzes,
                readingQuestions: readingQuestions,
                listeningQuestions: listeningQuestions,
                sections: sections
            })
            $(function () {
                $("#dataTableQuiz").DataTable();
            })
        }
    }
    fetchQuizzes = async () => {
        return quizApi.getAll();
    }
    fetchReadingQuestion = async (id) => {
        const params = {
            type: "reading",
            category: "quiz"
        }
        return await questionApi.getAll(params);
    }
    fetchQuiz = async (id) => {
        return quizApi.getDetail(id);
    }
    fetchSections = async () => {
        return sectionApi.getManage();
    }
    fetchListeningQuestion = async (id) => {
        const params = {
            type: "listening",
            category: "quiz"
        }
        return await questionApi.getAll(params);
    }
    handleChange(e) {
        var target = e.target;
        var name = target.name;
        var value = target.value;
        this.setState({
            [name]: value
        });
    }

    submitCreate = async () => {
        if (this.state.sectionId == 0) {
            toast("Vui lòng chọn bài học cho quiz");
        }
        else if (this.state.difficultLevel > 10 || this.state.difficultLevel < 1) {
            toast("Độ khó tối thiểu 1 và tối đa là 10");
        }
        else {
            var formData = new FormData();
            formData.append('quizName', this.state.quizName);
            formData.append('file', this.state.file);
            formData.append('difficultLevel', this.state.difficultLevel);
            formData.append('sectionId', this.state.sectionId);
            try {
                const result = await quizApi.create(formData);
                if (result.status === 200) {
                    toast("Thêm thành công");
                    const quizzes = await this.fetchQuizzes();
                    if (this.isComponentMounted) {
                        this.setState({
                            modalCreate: false,
                            quizzes: quizzes,
                            quizName: '',
                            difficultLevel: 1,
                            sectionId: 0,
                            file: null
                        })
                    }
                }
                else {
                    toast("Thêm thất bại")
                }
            } catch (error) {
                console.log(error);
                toast("Thêm thất bại")
            }

        }
    }
    fileChange(e) {
        this.setState({
            file: e.target.files[0]
        });
    }
    openCreate() {
        this.setState({ modalCreate: true });
    }

    closeCreate = () => {
        this.setState({
            modalCreate: false,
        });
    }
    modalQuestionCreate = async (e) => {
        if (e) {
            if (e.target.dataset.id) {
                var quiz = await this.fetchQuiz(e.target.dataset.id)
                if (this.isComponentMounted) {
                    this.setState({
                        selectedQuiz: e.target.dataset.id,
                        quiz: quiz
                    })
                }
            }
        }

        this.state.modalQuestionCreate ? this.setState({ modalQuestionCreate: false }) : this.setState({ modalQuestionCreate: true });
    }
    modalDelete = (e) => {
        if (e) {
            if (e.target.dataset.id) {
                this.setState({
                    selectedQuiz: e.target.dataset.id
                })
            }
        }
        this.state.modalDelete ? this.setState({ modalDelete: false }) : this.setState({ modalDelete: true });
    }
    submitDelete = async () => {
        try {
            var result = await quizApi.delete(this.state.selectedQuiz);
            if (result.status === 200) {
                toast("Xóa thành công");
                var quizzes = await this.fetchQuizzes();
                if (this.isComponentMounted) {
                    this.setState({
                        quizzes: quizzes,
                        modalDelete: false
                    })
                }
            }
            else {
                toast("Thất bại");
            }
        } catch (error) {
            if (error.response.data.error) {
                toast(error.response.data.error);
            }
            console.log(error);
        }
    }
    addQuestion = async (quizId, questionId) => {
        try {
            const result = await quizApi.addQuestionToquiz(quizId, questionId);
            if (result.status === 200) {
                toast("Thành công");
                var quizzes = await this.fetchQuizzes()
                var quiz = await this.fetchQuiz(quizId);
                if (this.isComponentMounted) {
                    this.setState({
                        quizzes: quizzes,
                        quiz: quiz
                    })
                }
            }
            else {
                toast("Thất bại");
            }
        } catch (error) {
            console.log(error);
        }
    }
    modalEdit = async (e) => {
        if (e) {
            if (e.target.dataset.id) {
                const result = await quizApi.getDetail(e.target.dataset.id);
                this.setState({
                    selectedQuiz: e.target.dataset.id,
                    quizName: result.quizName,
                    difficultLevel: result.difficultLevel,
                    sectionId: result.sectionId,
                    image: result.photoUrl
                })
            }
        }
        this.state.modalEdit ? this.setState({ modalEdit: false }) : this.setState({ modalEdit: true })
    }
    submitUpdate = async () => {
        if (this.state.sectionId == 0) {
            toast("Vui lòng chọn bài học cho quiz");
        }
        else if (this.state.difficultLevel > 10 || this.state.difficultLevel < 1) {
            toast("Độ khó tối thiểu 1 và tối đa là 10");
        }
        else {
            var formData = new FormData();
            formData.append('quizName', this.state.quizName);
            formData.append('file', this.state.file);
            formData.append('difficultLevel', this.state.difficultLevel);
            formData.append('sectionId', this.state.sectionId);
            try {
                const result = await quizApi.update(this.state.selectedQuiz, formData);
                if (result.status === 200) {
                    toast("Cập nhật thành công");
                    const quizzes = await this.fetchQuizzes();
                    if (this.isComponentMounted) {
                        this.setState({
                            modalEdit: false,
                            quizzes: quizzes,
                            quizName: '',
                            difficultLevel: 1,
                            sectionId: 0,
                            file: null
                        })
                    }
                }
                else {
                    toast("Cập nhật thất bại")
                }
            } catch (error) {
                console.log(error);
                toast("Cập nhật thất bại")
            }

        }
    }
    render() {
        const renderQuiz = this.state.quizzes.map((quiz) =>
            <QLQuiz key={quiz.id} quiz={quiz} modalQuestionCreate={this.modalQuestionCreate} modalDelete={this.modalDelete} modalEdit={this.modalEdit}></QLQuiz>
        );
        const { quizName, difficultLevel, image } = this.state
        return (
            <div>
                <Button variant="primary" className="btn btn-success mr-2 mb-3" onClick={e => this.openCreate(e)} ><i className="fa fa-plus" />Thêm bài quiz</Button>
                {/* Modal create */}
                <Modal show={this.state.modalCreate} onHide={this.closeCreate}>
                    <Modal.Header closeButton onClick={() => this.closeCreate()}>
                        <Modal.Title>Thêm bài quiz</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="form-group">
                            <div className="card-input">
                                <span>Tên quiz</span>
                                <input
                                    type="text"
                                    value={quizName}
                                    name="quizName"
                                    onChange={e => this.handleChange(e)}
                                    required
                                />
                            </div>
                            <div className="card-input">
                                <span>Hình ảnh</span>
                                <input
                                    type="file"
                                    name="file"
                                    accept="image/png, image/jpeg"
                                    onChange={e => this.fileChange(e)}
                                    required
                                />
                            </div>
                            <div className="card-input">
                                <span>Thuộc bài học</span>
                                <select name="sectionId" id="" onChange={e => this.handleChange(e)}>
                                    <option>Chọn bài học</option>
                                    {this.state.sections.map((section) =>
                                        <option key={section.id} value={section.id}>{section.sectionName}</option>
                                    )}
                                </select>
                            </div>
                            <div className="card-input">
                                <span>Độ khó</span>
                                <input
                                    type="number"
                                    min="1"
                                    max="10"
                                    value={difficultLevel}
                                    name="difficultLevel"
                                    onChange={e => this.handleChange(e)}
                                    required
                                />
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => this.closeCreate()}>Trở lại</Button>
                        <Button variant="primary" onClick={(e) => this.submitCreate(e)}>Lưu lại</Button>
                    </Modal.Footer>
                </Modal>

                {this.isComponentMounted && <table className="table table-bordered" id="dataTableQuiz" width="100%" cellSpacing={0}>
                    <thead>
                        <tr>
                            <th>Tên</th>
                            <th>Section</th>
                            <th>Độ khó</th>
                            <th>Số câu hỏi</th>
                            <th className="chucnang"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {renderQuiz}
                    </tbody>
                </table>}
                <Modal show={this.state.modalQuestionCreate} onHide={this.modalQuestionCreate}>
                    <Modal.Header closeButton onClick={() => this.modalQuestionCreate()}>
                        <Modal.Title>Thêm câu hỏi</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <ul className="nav nav-tabs">
                            <li className="nav-item"> <a className="active nav-link" data-toggle="pill" data-target="#taboneQuestion"><i className="fa fa-book" /> Câu hỏi đọc</a> </li>
                            <li className="nav-item"> <a className="nav-link" data-toggle="pill" data-target="#tabtwoQuestion"><i className="fa fa-star" /> Câu hỏi nghe </a> </li>
                            <li className="nav-item"> <a className="nav-link" data-toggle="pill" data-target="#tabthreeQuestion"><i className="fa fa-bolt" /> Câu hỏi hình ảnh</a> </li>
                        </ul>
                        <div className="tab-content mt-3">
                            <div className="tab-pane fade show active" id="taboneQuestion" role="tabpanel">
                                <ModalListCauHoiDoc questions={this.state.readingQuestions} exam={this.state.quiz} addQuestion={this.addQuestion}></ModalListCauHoiDoc>
                            </div>

                            <div className="tab-pane fade" id="tabtwoQuestion" role="tabpanel">
                                <ModalListCauHoiNghe questions={this.state.listeningQuestions} exam={this.state.quiz} addQuestion={this.addQuestion}></ModalListCauHoiNghe>
                            </div>
                            <div className="tab-pane fade" id="tabthreeQuestion" role="tabpanel">
                                <ModalListCauHoiHinhAnh></ModalListCauHoiHinhAnh>
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => this.modalQuestionCreate()}>Trở lại</Button>
                        <Button variant="primary" onClick={(e) => this.modalQuestionCreate(e)}>Lưu lại</Button>
                    </Modal.Footer>
                </Modal>

                {/* Modal phần xóa */}
                <Modal show={this.state.modalDelete} onHide={this.modalDelete}>
                    <Modal.Header closeButton onClick={this.modalDelete}>
                        <Modal.Title>Xác nhận xóa quiz</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Bạn có chắc chắn muốn xóa quiz này ra khỏi hệ thống không?</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => this.modalDelete()}>Trở lại</Button>
                        <Button variant="primary" onClick={(e) => this.submitDelete()}>Lưu lại</Button>
                    </Modal.Footer>
                </Modal>
                <Modal show={this.state.modalEdit} onHide={this.modalEdit}>
                    <Modal.Header closeButton onClick={() => this.modalEdit()}>
                        <Modal.Title>Cập nhật bài quiz</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="form-group">
                            <div className="card-input">
                                <span>Tên quiz</span>
                                <input
                                    type="text"
                                    value={quizName}
                                    name="quizName"
                                    onChange={e => this.handleChange(e)}
                                    required
                                />
                            </div>
                            <div className="card-input mt-2">
                                <img src={image} alt="" width="100px" height="100px"/>
                            </div>
                            <div className="card-input">
                                <span>Hình ảnh</span>
                                <input
                                    type="file"
                                    name="file"
                                    accept="image/png, image/jpeg"
                                    onChange={e => this.fileChange(e)}
                                    required
                                />
                            </div>
                            <div className="card-input">
                                <span>Thuộc bài học</span>
                                <select value={this.state.sectionId} name="sectionId" id="" onChange={e => this.handleChange(e)}>
                                    <option>Chọn bài học</option>
                                    {this.state.sections.map((section) =>
                                        <option key={section.id} value={section.id}>{section.sectionName}</option>
                                    )}
                                </select>
                            </div>
                            <div className="card-input">
                                <span>Độ khó</span>
                                <input
                                    type="number"
                                    min="1"
                                    max="10"
                                    value={difficultLevel}
                                    name="difficultLevel"
                                    onChange={e => this.handleChange(e)}
                                    required
                                />
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => this.modalEdit()}>Trở lại</Button>
                        <Button variant="primary" onClick={(e) => this.submitUpdate(e)}>Lưu lại</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
    componentWillUnmount() {
        this.isComponentMounted = false;
    }
}
export default QLListQuiz;