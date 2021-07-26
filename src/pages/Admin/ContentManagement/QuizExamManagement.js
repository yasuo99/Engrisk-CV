import SubMenu from '../../../components/admin/SubMenu'
import { Link } from "react-router-dom";
import HeaderAdmin from "../../../components/admin/HeaderAdmin";
// import ManagementQuiz_Exam from "./ManagementQuiz_Exam";
import { Button, Tabs, Tab, Table, Modal } from "react-bootstrap";
import { useState, useEffect } from 'react';
import adminApi from '../../../api/2.0/adminApi';
import { Badge, OverlayTrigger, Popover } from 'react-bootstrap';
import QuizPreview from './QuizPreview';
import Paginate from '../../../components/pagination/Paginate';
import ExamPreview from './ExamPreview';
const QuizExamManagement = () => {
    const [quizInspectModal, setQuizInspectModal] = useState(false);
    const [examInspectModal, setExamInspectModal] = useState(false);
    const [quizzesData, setQuizzesData] = useState({
        items: [],
        currentPage: 1,
        pageSize: 5,
        totalPages: 1
    })
    const [examsData, setExamsData] = useState({
        items: [],
        currentPage: 1,
        pageSize: 5,
        totalPages: 1
    })
    const [selectedQuiz, setSelectedQuiz] = useState({});
    const [selectedExam, setSelectedExam] = useState({});
    useEffect(async () => {
        const params = {
            currentPage: quizzesData.currentPage,
            pageSize: quizzesData.pageSize
        }
        console.log(params);
        var quizzes = await adminApi.getWaitingCensorQuizzes(params);
        setQuizzesData(quizzes)
    }, [quizzesData.currentPage, quizzesData.pageSize])
    useEffect(async () => {
        const params = {
            currentPage: quizzesData.currentPage,
            pageSize: quizzesData.pageSize
        }
        var exams = await adminApi.getWaitingCensorExams(params);
        setExamsData(exams);
    }, [examsData.currentPage, examsData.pageSize])
    function toggleQuizInspectModal(quiz) {
        setQuizInspectModal(!quizInspectModal)
        setSelectedQuiz(quiz);
    }
    function quizPaginationChange(currentPage, pageSize) {
        setQuizzesData({
            ...quizzesData,
            currentPage: currentPage,
            pageSize: pageSize
        })
    }
    function toggleExamInspectModal(exam) {
        setExamInspectModal(!examInspectModal);
        setSelectedExam(exam);
    }
    function examPaginationChange(currentPage, pageSize) {
        setExamsData({
            ...examsData,
            currentPage: currentPage,
            pageSize: pageSize
        })
    }
    return (
        <div>
            <div id="wrapper">
                <SubMenu></SubMenu>
                <div id="content-wrapper" className="d-flex flex-column">
                    <div id="content">
                        <HeaderAdmin></HeaderAdmin>
                        <div className="container-fluid ql_quiz">
                            <Tabs defaultActiveKey="quiz" id="controlled-tab-example">
                                <Tab eventKey="quiz" title="Danh sách quiz chờ duyệt" tabClassName='font-weight-bold'>

                                    <div className="card shadow mb-4">
                                        <div className="card-body">
                                            <div className="table-responsive">
                                                {/* <Button variant="primary" className="btn btn-success mr-2 mb-3"  ><i className="fa fa-plus" /> </Button> */}
                                                <Table striped bordered hover responsive>
                                                    <thead>
                                                        <tr>
                                                            <th className="tenbaiquiz">Tên bài</th>
                                                            <th className="dokhoquiz">Số câu hỏi</th>
                                                            <th className="dokhoquiz">Độ khó</th>
                                                            <th className='dokhoquiz'>Tạo bởi</th>
                                                            <th className="chucnang" />
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {quizzesData.items.map((quiz, index) =>
                                                            <tr key={index}>
                                                                <td>{quiz.quizName}</td>
                                                                <td>{quiz.questions.length}</td>
                                                                <td>{quiz.difficultLevel}</td>
                                                                <OverlayTrigger key={quiz.id} trigger={["hover", "focus"]} placement="top" overlay={
                                                                    <Popover id="popover-basic">
                                                                        <Popover.Title as="h3">{quiz.createdBy}</Popover.Title>
                                                                        <Popover.Content>
                                                                            <div className='d-flex justify-content-center'>
                                                                                <img className='chat-avatar' src={quiz.owner.photoUrl}></img>

                                                                            </div>
                                                                            <p>Email: {quiz.owner.email}</p>
                                                                            <p>Tuổi: {quiz.owner.age}</p>
                                                                            <p>Tham gia từ: 2018</p>
                                                                        </Popover.Content>
                                                                    </Popover>}>
                                                                    <td>
                                                                        {quiz.createdBy}

                                                                    </td>
                                                                </OverlayTrigger>
                                                                <td>
                                                                    <Button variant="primary" className="btn btn-add mr-2" onClick={() => toggleQuizInspectModal(quiz)} ><i className="fa fa-eye"></i></Button>
                                                                </td>
                                                            </tr>
                                                        )}

                                                    </tbody>
                                                </Table>
                                                <Paginate currentPage={quizzesData.currentPage} pageSize={quizzesData.pageSize} totalPages={quizzesData.totalPages} change={quizPaginationChange}></Paginate>
                                            </div>
                                        </div>
                                    </div>
                                    <Modal show={quizInspectModal} onHide={() => toggleQuizInspectModal({})} dialogClassName="modal-90w" size="lg" animation>
                                        <Modal.Body>
                                            <QuizPreview quiz={selectedQuiz} closeReview={() => toggleQuizInspectModal({})}></QuizPreview>
                                        </Modal.Body>
                                        <Modal.Footer bsPrefix='d-flex justify-content-center mb-2'>
                                            <Button className='mr-2' variant="secondary" onClick={() => toggleQuizInspectModal({})}>
                                                Từ chối
                                            </Button>
                                            <Button className='ml-2' variant="primary" onClick={(e) => toggleQuizInspectModal({})}>
                                                Phê duyệt
                                            </Button>
                                        </Modal.Footer>
                                    </Modal>
                                </Tab >
                                <Tab eventKey="exam" title="Danh sách exam chờ duyệt" tabClassName='font-weight-bold'>
                                    <div className="card shadow mb-4">
                                        <div className="card-body">
                                            <div className="table-responsive">
                                                <Table striped bordered hover responsive>
                                                    <thead>
                                                        <tr>
                                                            <th className="tenbaiquiz">Tên bài</th>
                                                            <th className="motaquiz">Mô tả</th>
                                                            <th className="dokhoquiz">Thời gian làm bài</th>
                                                            <th className="dokhoquiz">Số câu hỏi</th>
                                                            <th className='dokhoquiz'>Thêm bởi</th>
                                                            <th className="chucnang" />
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {examsData.items.map((exam, index) =>
                                                            <tr key={index}>
                                                                <td>{exam.title}</td>
                                                                <td>{exam.detail}</td>
                                                                <td>{exam.duration}</td>
                                                                <td>{exam.questions.length}</td>
                                                                <OverlayTrigger key={exam.id} trigger={["hover", "focus"]} placement="top" overlay={
                                                                    <Popover id="popover-basic">
                                                                        <Popover.Title as="h3">{exam.createdBy}</Popover.Title>
                                                                        <Popover.Content>
                                                                            <div className='d-flex justify-content-center'>
                                                                                <img className='chat-avatar' src={exam.owner.photoUrl}></img>

                                                                            </div>
                                                                            <p>Email: {exam.owner.email}</p>
                                                                            <p>Tuổi: {exam.owner.age}</p>
                                                                            <p>Tham gia từ: 2018</p>
                                                                        </Popover.Content>
                                                                    </Popover>}>
                                                                    <td>
                                                                        {exam.createdBy}

                                                                    </td>
                                                                </OverlayTrigger>
                                                                <td>
                                                                    <Button variant="primary" className="btn btn-add mr-2" onClick={() => toggleExamInspectModal(exam)} ><i className="fa fa-eye"></i></Button>
                                                                </td>
                                                            </tr>
                                                        )}

                                                    </tbody>
                                                </Table>
                                                
                                                <Paginate currentPage={examsData.currentPage} pageSize={examsData.pageSize} totalPages={examsData.totalPages} change={examPaginationChange}></Paginate>
                                            </div>
                                        </div>
                                    </div>
                                    <Modal show={examInspectModal} onHide={() => toggleExamInspectModal({})} dialogClassName="modal-90w" size="lg">
                                        <Modal.Body>
                                            <ExamPreview exam={selectedExam} closeReview={() => toggleExamInspectModal({})}/>
                                        </Modal.Body>
                                        <Modal.Footer bsPrefix='d-flex justify-content-center mb-2'>
                                            <Button className='mr-2' variant="secondary" onClick={() => toggleQuizInspectModal({})}>
                                                Từ chối
                                            </Button>
                                            <Button className='ml-2' variant="primary" onClick={(e) => toggleQuizInspectModal({})}>
                                                Phê duyệt
                                            </Button>
                                        </Modal.Footer>
                                    </Modal>
                                </Tab>
                            </Tabs >
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default QuizExamManagement;