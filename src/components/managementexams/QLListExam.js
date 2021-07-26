import React, { Component } from "react"
import QLExam from "./QLExam"
import { Button, Modal } from 'react-bootstrap'
import ModalListCauHoiDoc from "../modalcauhoi/ModalListCauHoiDoc";
import ModalListCauHoiHinhAnh from "../modalcauhoi/ModalListCauHoiHinhAnh";
import ModalListCauHoiNghe from "../modalcauhoi/ModalListCauHoiNghe";
import "datatables.net-dt/js/dataTables.dataTables.js"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import $ from 'jquery'
import examApi from "../../api/examApi";
import { toast } from "react-toastify";
import questionApi from "../../api/questionApi";
import sectionApi from "../../api/sectionApi";
class QLListExam extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalCreate: false,
            modalUpdate: false,
            modalQuestionCreate: false,
            modalDelete: false,
            modalQuestionDelete: false,
            seletedExam: 0,
            exam: { questions: [] },
            seletedQuestion: 0,
            exams: [],
            listeningQuestions: [],
            readingQuestions: [],
            title: null,
            detail: null,
            duration: 10
        };
        this.isComponentMounted = false;
        this.modalQuestionCreate = this.modalQuestionCreate.bind(this);
        this.modalDelete = this.modalDelete.bind(this);
    }
    async componentDidMount() {
        this.isComponentMounted = true;
        var exams = await this.fetchExam();
        var listeningQuestions = await this.fetchListeningQuestion();
        var readingQuestions = await this.fetchReadingQuestion();
        if (this.isComponentMounted) {
            this.setState({
                exams: exams,
                listeningQuestions: listeningQuestions,
                readingQuestions: readingQuestions
            })
            $(function () {
                $("#dataTableExam").DataTable();
            })
        }
    }
    fetchExam = async () => {
        return await examApi.getManage();
    }
    fetchReadingQuestion = async (id) => {
        const params = {
            type: "reading"
        }
        return await questionApi.getAll(params)
    }
    fetchListeningQuestion = async (id) => {
        const params = {
            type: "listening"
        }
        return await questionApi.getAll(params)
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
        if (this.state.duration <= 10) {
            toast("Thời gian làm bài tối thiểu 10 phút")
        }
        else {
            if (this.state.title === '') {
                toast("Tên exam không được để trống")
            }
            else {
                var exam = {
                    title: this.state.title,
                    detail: this.state.detail,
                    duration: this.state.duration
                };
                try {
                    const result = await examApi.create(exam);
                    if (result.status === 200) {
                        toast("Thêm thành công");
                        var exams = await this.fetchExam();
                        if (this.isComponentMounted) {
                            this.setState({
                                exams: exams,
                                modalCreate: false,
                                title: null,
                                detail: null,
                                duration: 10
                            })
                            $(function () {
                                $("#dataTableExam").DataTable();
                            })
                        }
                    }
                    else {
                        toast("Thêm thất bại")
                    }
                } catch (error) {
                    toast("Thêm thất bại");
                    console.log(error);
                }

            }
        }
    }

    modalCreate = () => {
        this.state.modalCreate ? this.setState({ modalCreate: false }) : this.setState({ modalCreate: true });
    }
    modalUpdate = async (e) => {
        if (e) {
            if (e.target.dataset.id) {
                const result = await examApi.getExam(e.target.dataset.id);
                this.setState({
                    seletedExam: e.target.dataset.id,
                    title: result.title,
                    detail: result.detail,
                    duration: result.duration
                })
            }
        }
        this.state.modalUpdate ? this.setState({ modalUpdate: false }) : this.setState({ modalUpdate: true });
    }
    modalDelete(e) {
        if (e) {
            if (e.target.dataset.id) {
                this.setState({
                    seletedExam: e.target.dataset.id
                })
            }
        }
        this.state.modalDelete ? this.setState({ modalDelete: false }) : this.setState({ modalDelete: true });
    }
    submitUpdate = async () => {
        var exam = {
            title: this.state.title,
            detail: this.state.detail,
            duration: this.state.duration
        };
        try {
            const result = await examApi.updateExam(this.state.seletedExam, exam);
            if (result.status === 200) {
                toast("Cập nhật thành công");
                var exams = await this.fetchExam();
                if (this.isComponentMounted) {
                    this.setState({
                        exams: exams,
                        modalUpdate: false,
                        title: null,
                        detail: null,
                        duration: 10
                    })
                    $(function () {
                        $("#dataTableExam").DataTable();
                    })
                }
            }
            else {
                toast("Cập nhật thất bại")
            }
        } catch (error) {
            toast("Cập nhật thất bại");
            console.log(error);
        }

    }
    deleteExam = async (e) => {
        e.preventDefault();
        try {
            const result = await examApi.deleteExam(this.state.seletedExam);
            if (result.status === 200) {
                toast("Xóa thành công");
                var exams = await this.fetchExam();
                if (this.isComponentMounted) {
                    this.setState({
                        exams: exams,
                        modalDelete: false
                    })
                }
            }
            else {
                toast("Xóa không thành công");
            }
        } catch (error) {
            if (error.response.data.error) {
                toast(error.response.data.error)
            }
        }

    }
    async modalQuestionCreate(e) {
        e.preventDefault();
        if (e.target.dataset.id) {
            this.setState({
                seletedExam: e.target.dataset.id
            });
            const exam = await examApi.getAnswer(e.target.dataset.id);
            if (exam) {
                this.setState({
                    exam: exam
                });
            }
        }

        this.state.modalQuestionCreate ? this.setState({ modalQuestionCreate: false }) : this.setState({ modalQuestionCreate: true });
    }
    modalQuestionDelete(e) {
        if (e.target.dataset.id) {
            this.setState({
                seletedExam: e.target.dataset.id
            });
        }
        this.state.modalQuestionDelete ? this.setState({ modalQuestionDelete: false }) : this.setState({ modalQuestionDelete: true });
    }
    addQuestion = async (examId, questionId) => {
        try {
            var result = await examApi.addQuestion(examId, questionId);
            if (result.status === 200) {
                toast("Thành công");
                const exam = await examApi.getAnswer(this.state.seletedExam);
                if (this.isComponentMounted) {
                    this.setState({
                        exam: exam
                    })
                }
            }
            else {
                toast("Thất bại");
            }
        } catch (error) {
            console.log(error);
            // if (error.response.data.error) toast(error.response.data.error);

        }
    }
    async removeQuestion(e) {
        e.preventDefault();

    }
    render() {
        const renderExam = this.state.exams.map((exam) =>
            <QLExam key={exam.id} exam={exam} modalQuestionCreate={this.modalQuestionCreate} modalDelete={this.modalDelete} modalUpdate={this.modalUpdate}></QLExam>
        );
        const { title, detail, duration } = this.state;
        return (
            <div>
                <Button variant="primary" className="btn btn-success mr-2 mb-3" onClick={e => this.modalCreate(e)} ><i className="fa fa-plus" />Thêm bài exam</Button>
                {/* Modal create */}
                <Modal show={this.state.modalCreate} onHide={this.modalCreate}>
                    <Modal.Header closeButton onClick={() => this.modalCreate()}>
                        <Modal.Title>Thêm bài exam</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="form-group">
                            <div className="card-input">
                                <span>Tên exam</span>
                                <input
                                    type="text"
                                    value={title}
                                    name="title"
                                    onChange={e => this.handleChange(e)}
                                    required
                                />
                            </div>
                            <div className="card-input">
                                <span>Mô tả</span>
                                <input
                                    type="text"
                                    min="1"
                                    max="10"
                                    value={detail}
                                    name="detail"
                                    onChange={e => this.handleChange(e)}
                                    required
                                />
                            </div>
                            <div className="card-input">
                                <span>Thời gian làm bài (phút)</span>
                                <input
                                    type="number"
                                    min="1"
                                    max="10"
                                    value={duration}
                                    name="duration"
                                    onChange={e => this.handleChange(e)}
                                    required
                                />
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => this.modalCreate()}>Trở lại</Button>
                        <Button variant="primary" onClick={(e) => this.submitCreate(e)}>Lưu lại</Button>
                    </Modal.Footer>
                </Modal>

                {this.isComponentMounted && <table className="table table-bordered" id="dataTableExam" width="100%" cellSpacing={0}>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Mô tả</th>
                            <th>Thời gian làm bài</th>
                            <th className="chucnang"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {renderExam}
                    </tbody>
                </table>}
                <Modal show={this.state.modalQuestionCreate} onHide={() => this.setState({ modalQuestionCreate: false })}>
                    <Modal.Header closeButton onClick={(e) => this.modalQuestionCreate(e)}>
                        <Modal.Title>Thêm câu hỏi vào bài exam</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <ul className="nav nav-tabs">
                            <li className="nav-item"> <a className="active nav-link" data-toggle="pill" data-target="#taboneQuestion"><i className="fa fa-book" /> Câu hỏi đọc</a> </li>
                            <li className="nav-item"> <a className="nav-link" data-toggle="pill" data-target="#tabtwoQuestion"><i className="fa fa-star" /> Câu hỏi nghe </a> </li>
                            <li className="nav-item"> <a className="nav-link" data-toggle="pill" data-target="#tabthreeQuestion"><i className="fa fa-bolt" /> Câu hỏi hình ảnh</a> </li>
                        </ul>
                        <div className="tab-content mt-3">
                            <div className="tab-pane fade show active" id="taboneQuestion" role="tabpanel">
                                <ModalListCauHoiDoc questions={this.state.readingQuestions} addQuestion={this.addQuestion} exam={this.state.exam}></ModalListCauHoiDoc>
                            </div>

                            <div className="tab-pane fade" id="tabtwoQuestion" role="tabpanel">
                                <ModalListCauHoiNghe questions={this.state.listeningQuestions} addQuestion={this.addQuestion} exam={this.state.exam}></ModalListCauHoiNghe>
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
                <Modal show={this.state.modalUpdate} onHide={this.modalUpdate}>
                    <Modal.Header closeButton onClick={() => this.modalUpdate()}>
                        <Modal.Title>Cập nhật exam</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="form-group">
                            <div className="card-input">
                                <span>Tên exam</span>
                                <input
                                    type="text"
                                    value={title}
                                    name="title"
                                    onChange={e => this.handleChange(e)}
                                    required
                                />
                            </div>
                            <div className="card-input">
                                <span>Mô tả</span>
                                <input
                                    type="text"
                                    min="1"
                                    max="10"
                                    value={detail}
                                    name="detail"
                                    onChange={e => this.handleChange(e)}
                                    required
                                />
                            </div>
                            <div className="card-input">
                                <span>Thời gian làm bài (phút)</span>
                                <input
                                    type="number"
                                    min="1"
                                    max="10"
                                    value={duration}
                                    name="duration"
                                    onChange={e => this.handleChange(e)}
                                    required
                                />
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => this.modalUpdate()}>Trở lại</Button>
                        <Button variant="primary" onClick={(e) => this.submitUpdate(e)}>Lưu lại</Button>
                    </Modal.Footer>
                </Modal>
                {/* Modal phần xóa */}
                <Modal show={this.state.modalDelete} onHide={this.modalDelete}>
                    <Modal.Header closeButton onClick={this.modalDelete}>
                        <Modal.Title>Xác nhận xóa exam</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Bạn có chắc chắn muốn xóa exam này ra khỏi hệ thống không?</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => this.modalDelete()}>Trở lại</Button>
                        <Button variant="primary" onClick={this.deleteExam}>Lưu lại</Button>
                    </Modal.Footer>
                </Modal>
                <Modal show={this.state.modalQuestionDelete}>
                    <Modal.Header closeButton onClick={() => this.modalQuestionDelete()}>
                        <Modal.Title>Xác nhận xóa exam</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Bạn có chắc chắn muốn xóa exam này ra khỏi hệ thống không?</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={(e) => this.modalQuestionDelete(e)}>Trở lại</Button>
                        <Button variant="primary" onClick={(e) => this.submitDelete(e)}>Lưu lại</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
    componentWillUnmount() {
        this.isComponentMounted = false;
    }
}
export default QLListExam;