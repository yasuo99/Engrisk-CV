import React, { Component, useEffect, useState } from "react";
import SubMenu from '../../components/admin/SubMenu'
import { Link } from "react-router-dom";
import HeaderAdmin from "../../components/admin/HeaderAdmin";
// import ManagementQuiz_Exam from "./ManagementQuiz_Exam";
import { Button, Tabs, Tab, Table, Modal, Badge } from "react-bootstrap";
import quizApi from "../../api/2.0/quizApi";
import examApiv2 from "../../api/2.0/examApi";
import Paginate from "../../components/pagination/Paginate";
import DifficultRender from "../../components/utils/DifficultRender";
import QuizPreview from "./ContentManagement/QuizPreview";
import ExamPreview from "./ContentManagement/ExamPreview";
import { MapPublishStatus, PublishStatus } from "../../constants/PublishStatus";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
const ManagementQuiz_Exam = ({ }) => {
    const [quizzes, setQuizzes] = useState({
        currentPage: 1,
        pageSize: 5,
        totalPages: 1,
        items: [],
    })
    const { register, handleSubmit, formState: { errors, isSubmitSuccessful }, reset, unregister } = useForm();
    const [quizInspectModal, setQuizInspectModal] = useState(false);
    const [quizQuery, setQuizQuery] = useState('')
    const [selectedQuiz, setSelectedQuiz] = useState({});
    const [quizModalCreate, setQuizModalCreate] = useState(false)
    const [quizModalEdit, setQuizModalEdit] = useState(false)
    const [quizModalDelete, setQuizModalDelete] = useState(false)
    const [quizRefresh,setQuizRefresh] = useState(false);
    const [exams, setExams] = useState({
        currentPage: 1,
        pageSize: 5,
        totalPages: 1,
        items: []
    })
    const [examInspectModal, setExamInspectModal] = useState(false);
    const [examQuery, setExamQuery] = useState('')
    const [selectedExam, setSelectedExam] = useState({});
    const [examModalCreate, setExamModalCreate] = useState(false)
    const [examModalEdit, setExamModalEdit] = useState(false)
    const [examModalDelete, setExamModalDelete] = useState(false)
    const [examModalPublish, setExamModalPublish] = useState(false);
    const [quizModalPublish, setQuizModalPublish] = useState(false);
    const [base, setBase] = useState("quiz")
    useEffect(() => {
        async function fetchData() {
            const params = {
                currentPage: quizzes.currentPage,
                pageSize: quizzes.pageSize,
                search: quizQuery,
                status: 'Nope'
            }
            const result = await quizApi.getAll(params)
            setQuizzes(result)
        }
        fetchData();
        const params = new URLSearchParams(window.location.search)
        let type = params.get('type')
        if (type) {
            setBase(type)
        }
    }, [quizzes.currentPage, quizzes.pageSize, quizQuery])
    useEffect(() => {
        async function fetchData() {
            const params = {
                currentPage: exams.currentPage,
                pageSize: exams.pageSize,
                search: examQuery,
                status: 'Nope'
            }
            const result = await examApiv2.getAll(params)
            setExams(result)
        }
        fetchData();
    }, [exams.currentPage, exams.pageSize, examQuery])
    function toggleQuizModalCreate() {
        reset();
        setQuizModalCreate(!quizModalCreate);
    }
    function toggleExamModalCreate() {
        reset();
        setExamModalCreate(!examModalCreate);
    }
    function quizSearch(query) {
        setQuizQuery(query);
        setQuizzes({
            ...quizzes,
            currentPage: 1
        })
    }
    function examSearch(query) {
        setExamQuery(query);
        setExams({
            ...exams,
            currentPage: 1
        })
    }
    function quizPaginationChange(currentPage, pageSize) {
        setQuizzes({
            ...quizzes,
            currentPage: currentPage,
            pageSize: pageSize
        })
    }
    function examPaginationChange(currentPage, pageSize) {
        setExams({
            ...exams,
            currentPage: currentPage,
            pageSize: pageSize
        })
    }
    function toggleModalExamPublish(exam) {
        setSelectedExam(exam);
        setExamModalPublish(!examModalPublish);
    }
    async function submitQuizCreate(data) {
        const result = await quizApi.create(data);
        if(result){
            toast('Thành công', {type: 'success', autoClose: 2000})
            reset();
            setQuizRefresh(true);
        }else{
            toast('Thất bại', {type: 'error', autoClose: 2000})
        }
    }
    return (
        <div>
            <div id="wrapper">
                <SubMenu></SubMenu>
                <div id="content-wrapper" className="d-flex flex-column">
                    <div id="content">
                        <HeaderAdmin></HeaderAdmin>
                        <div className="container-fluid ql_quiz">
                            <Tabs defaultActiveKey={base} id="controlled-tab-example">
                                <Tab eventKey="quiz" title="Quản lý các bài quiz" tabClassName='font-weight-bold'>

                                    <div className="card shadow mb-4">
                                        <div className="card-body">
                                            <div className="table-responsive">
                                                <Button variant="primary" className="btn btn-quiz mr-2 mb-3" onClick={() => toggleQuizModalCreate()}><i className="fa fa-plus" /> Thêm quiz</Button>
                                                {/* <Button variant="primary" className="btn btn-success mr-2 mb-3"  ><i className="fa fa-plus" /> </Button> */}
                                                <Table striped bordered hover responsive>

                                                    <thead>
                                                        <tr>
                                                            <th className="tenbaiquiz">Tên bài</th>
                                                            <th className="motaquiz">Số câu hỏi</th>
                                                            <th className="dokhoquiz">Độ khó</th>
                                                            <th className="chucnang" >Preview</th>
                                                            <th className="chucnang" >Trạng thái</th>
                                                            <th className="chucnang" />
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {quizzes.items.map((quiz, index) =>
                                                            <tr key={index}>
                                                                <td>{quiz.quizName}</td>
                                                                <td>{quiz.questions.length}</td>
                                                                <td><DifficultRender difficult={quiz.difficultLevel}></DifficultRender></td>
                                                                <td> <Button variant="primary" onClick={() => { setSelectedQuiz(quiz); setQuizInspectModal(!quizInspectModal) }} className="btn btn-success btn-delete btn-add" ><i className="fa fa-play-circle"></i></Button></td>
                                                                <td> <h5><Badge variant={MapPublishStatus(quiz.publishStatus).variant}>{MapPublishStatus(quiz.publishStatus).text}</Badge></h5> </td>
                                                                <td>
                                                                    <Link to={`/admin/quan-ly-quiz/${quiz.id}/cai-dat`} className="btn btn-primary btn-delete btn-delete mr-2"><i className="fa fa-edit"></i></Link>
                                                                    <Button variant="danger" className="btn btn-danger btn-delete"><i className="fa fa-trash" /></Button>
                                                                    <button
                                                                        className="btn btn-primary btn-delete ml-1"
                                                                        onClick={() => toggleModalPublish(quiz)}
                                                                        title="Chuyển trạng thái"
                                                                    >
                                                                        {quiz.publishStatus == PublishStatus.UNPUBLISHED ? <i className="fa fa-upload"></i> : <i className="fa fa-download"></i>}
                                                                    </button>
                                                                </td>
                                                            </tr>
                                                        )}

                                                    </tbody>
                                                </Table>
                                                <Paginate currentPage={quizzes.currentPage} pageSize={quizzes.pageSize} totalPages={quizzes.totalPages} change={quizPaginationChange}></Paginate>
                                            </div>
                                        </div>
                                        <Modal show={quizInspectModal} onHide={() => setQuizInspectModal(!quizInspectModal)} dialogClassName="modal-90w" size="lg" animation>
                                            <Modal.Body>
                                                {Object.keys(selectedQuiz).length > 0 && <QuizPreview quiz={selectedQuiz} closeReview={() => setQuizInspectModal(!quizInspectModal)}></QuizPreview>}
                                            </Modal.Body>
                                            <Modal.Footer bsPrefix='d-flex justify-content-end mb-2'>
                                                <Button className='mr-4' variant="secondary" onClick={() => setQuizInspectModal(!quizInspectModal)}>
                                                    Kết thúc preview
                                                </Button>
                                            </Modal.Footer>
                                        </Modal>
                                        {quizModalCreate && <Modal show={quizModalCreate} animation onHide={() => toggleQuizModalCreate()} centered size="lg" animation>
                                            <Modal.Body>
                                                <div className='text-center'>
                                                    <h3 className='text-info'> Thêm quiz</h3>
                                                </div>
                                                <form id="create-quiz-form" className="form-group" onSubmit={handleSubmit(submitQuizCreate)}>
                                                    <div className="container">
                                                        <div>
                                                            <div>Tên bài quiz</div>
                                                            <div className="wrap-input100 mb-3">
                                                                <input className="input100" name="title" placeholder='Nhập tên' {...register('quizName',
                                                                    {
                                                                        required: 'Tên quiz không được để trống',
                                                                    })}
                                                                    type="text"
                                                                    id="title"
                                                                    autoComplete="off"
                                                                ></input>
                                                                {errors.quizName && <div className='invalid'>{errors.quizName.message}</div>}
                                                            </div>
                                                            <div>Mô tả</div>
                                                            <div className="wrap-input100 mb-3">
                                                                <input className="input100" name="title" placeholder='Nhập tên' {...register('detail',
                                                                    {
                                                                        required: 'Mô tả không được để trống',                                            
                                                                    })}
                                                                    type="text"
                                                                    id="title"
                                                                    autoComplete="off"
                                                                ></input>
                                                                {errors.detail && <div className='invalid'>{errors.detail.message}</div>}
                                                            </div>
                                                        </div>
                                                        
                                                    </div>
                                                </form>
                                            </Modal.Body>
                                            <Modal.Footer>
                                                <Button variant="secondary" onClick={() => toggleQuizModalCreate()}>Trở lại</Button>
                                                <Button variant="primary" form="create-quiz-form" type="submit">Lưu lại</Button>
                                            </Modal.Footer>
                                        </Modal>}
                                    </div>
                                </Tab >
                                <Tab eventKey="exam" title="Quản lý các bài exam" tabClassName='font-weight-bold'>
                                    <div className="card shadow mb-4">
                                        <div className="card-body">
                                            <div className="table-responsive">
                                                <Link variant="primary" className="btn btn-quiz mr-2 mb-3" to="/admin/quan-ly-exam/them"><i className="fa fa-plus" /> Thêm exam</Link>
                                                {/* <Button variant="primary" className="btn btn-success mr-2 mb-3"  ><i className="fa fa-plus" /> </Button> */}
                                                <Table striped bordered hover responsive>
                                                    <thead>
                                                        <tr>
                                                            <th className="tenbaiquiz">Tên bài</th>
                                                            <th className="motaquiz">Mô tả</th>
                                                            <th className="dokhoquiz">Thời gian làm</th>
                                                            <th className="dokhoquiz">Số câu hỏi</th>
                                                            <th className="dokhoquiz">Độ khó</th>
                                                            <th className="dokhoquiz">Thống kê</th>
                                                            <th className="dokhoquiz">Preview</th>
                                                            <th className="dokhoquiz">Trạng thái</th>
                                                            <th className="chucnang-3" />
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {exams.items.map((exam, index) =>
                                                            <tr key={index}>
                                                                <td style={{ width: '100px' }}>{exam.title}</td>
                                                                <td className='cell-4'><span className='text-overflow'>{exam.detail}</span></td>
                                                                <td>{exam.duration} phút</td>
                                                                <td>{exam.questions.length}</td>
                                                                <td><DifficultRender difficult={exam.difficult}></DifficultRender></td>
                                                                <td><div className='d-flex justify-content-between'>
                                                                    <div>
                                                                        {12} <i className='fa fa-eye text-success'></i>
                                                                    </div>
                                                                    <div>
                                                                        {15}  <i className='fa fa-check text-success'></i>
                                                                    </div>
                                                                </div></td>
                                                                <td> <Button variant="primary" onClick={() => { setSelectedExam(exam); setExamInspectModal(!examInspectModal) }} className="btn btn-success btn-delete btn-add" ><i className="fa fa-play-circle"></i></Button></td>
                                                                <td> <h5><Badge variant={MapPublishStatus(exam.publishStatus).variant}>{MapPublishStatus(exam.publishStatus).text}</Badge></h5> </td>
                                                                <td>
                                                                    <Link className="btn btn-primary btn-delete mr-2 h-100" to={`/admin/quan-ly-exam/${exam.id}/cai-dat`}>
                                                                        <i className="fa fa-edit"></i></Link>
                                                                    <Button variant="danger" className="btn btn-delete"><i className="fa fa-trash" /></Button>
                                                                    <button
                                                                        className="btn btn-primary btn-delete ml-1"
                                                                        onClick={() => toggleModalExamPublish(exam)}
                                                                        title="Chuyển trạng thái"
                                                                    >
                                                                        {exam.publishStatus == PublishStatus.UNPUBLISHED ? <i className="fa fa-upload"></i> : <i className="fa fa-download"></i>}
                                                                    </button>
                                                                </td>
                                                            </tr>
                                                        )}

                                                    </tbody>
                                                </Table>
                                                <Paginate currentPage={exams.currentPage} pageSize={exams.pageSize} totalPages={exams.totalPages} change={examPaginationChange}></Paginate>
                                            </div>
                                        </div>
                                        <Modal show={examInspectModal} onHide={() => setExamInspectModal(!examInspectModal)} dialogClassName="modal-90w" size="lg">
                                            <Modal.Body>
                                                {Object.keys(selectedExam) && <ExamPreview exam={selectedExam} closeReview={() => setExamInspectModal(!examInspectModal)} />}
                                            </Modal.Body>
                                            <Modal.Footer bsPrefix='d-flex justify-content-end mb-2'>
                                                <Button className='mr-4' variant="secondary" onClick={() => setExamInspectModal(!examInspectModal)}>
                                                    Kết thúc preview
                                                </Button>
                                            </Modal.Footer>
                                        </Modal>

                                    </div>
                                </Tab>
                            </Tabs >
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ManagementQuiz_Exam;