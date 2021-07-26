import { HubConnectionState } from '@microsoft/signalr';
import React, { Component } from 'react'
import { Badge, OverlayTrigger, Popover } from 'react-bootstrap';
import InfiniteScroll from 'react-infinite-scroll-component';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import examApiv2 from '../../api/2.0/examApi';
import quizApi from '../../api/2.0/quizApi';
import examApi from '../../api/examApi';
import HeaderClient from '../../components/client/HeaderClient';
import SubMenuClient from '../../components/client/SubMenuClient';
import { ExamPurpose } from '../../constants/ExamPurpose';
import { PublishStatus } from '../../constants/PublishStatus';
import { connection } from '../../signalR/createSignalRConnection';
import Footer from '../Footer/Footer';

class Exam extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menu: {
                type: 'Exam',
                difficult: 'Easy',
                sortData: ''
            },
            exams: {
                currentPage: 1,
                pageSize: 5,
                totalPages: 1,
                items: []
            },
            quizzes: {
                currentPage: 1,
                pageSize: 5,
                totalPages: 1,
                items: []
            },
            params: {
                currentPage: 1,
                pageSize: 5,
                totalPages: 0,
                publishStatus: PublishStatus.PUBLISHED,
                purpose: ExamPurpose.TEST
            },
            pagination: {
                currentPage: 1,
                pageSize: 5
            },
            hasMore: true,
            histories: [],
            examPage: false
        }
        this.isComponentMounted = false;
    }
    componentDidMount = async () => {
        this.isComponentMounted = true;
        var exams = await this.fetchExam();
        if (this.isComponentMounted) {
            if (this.props.isLoggedIn) {
                if (connection.state == HubConnectionState.Disconnected) {
                    connection.start();
                }
                connection.on("NewExam", (data) => {
                    var exam = JSON.parse(data);
                    this.setState({
                        exams: [exam, ...this.state.exams.splice(4, 1)]
                    })
                })
            }
            this.setState({
                exams: exams,
                examPage: true
            })
            if (this.props.isLoggedIn) {
                const histories = await this.fetchHistories(this.props.account.id);
                this.setState({
                    histories: histories,
                    pagination: {
                        ...this.state.pagination,
                    }
                })
                console.log(histories);
            }
        }
    }
    fetchExam = async () => {
        const params = {
            currentPage: 1,
            pageSize: this.state.exams.pageSize,
            difficult: this.state.menu.difficult,
            publishStatus: this.state.params.publishStatus,
            purpose: this.state.params.purpose
        }
        var exams = await examApiv2.getAll(params)
        return exams;
    }
    fetchMore = async () => {
        if (this.state.menu.type == "Quiz") {
            const params = {
                currentPage: 1,
                pageSize: this.state.quizzes.pageSize + 5,
                difficult: this.state.menu.difficult,
                publishStatus: this.state.params.publishStatus
            }
            var quizzes = await quizApi.getAll(params);
            console.log(quizzes);
            if (this.isComponentMounted) {
                this.setState({
                    ...this.state,
                    quizzes: quizzes
                })
            }
        }
        else{
            const params = {
                currentPage: 1,
                pageSize: this.state.exams.pageSize + 5,
                difficult: this.state.menu.difficult,
                publishStatus: this.state.params.publishStatus,
                purpose: this.state.params.purpose
            }
            var exams = await examApiv2.getAll(params)
            console.log(exams);
            if (this.isComponentMounted) {
                this.setState({
                    ...this.state,
                    exams: exams
                })
            }
        }
    }
    sort = async (e) => {
        e.preventDefault();
        if (this.state.menu.type == "Quiz") {
            const params = {
                currentPage: 1,
                pageSize: this.state.quizzes.pageSize,
                difficult: this.state.menu.difficult,
                publishStatus: this.state.params.publishStatus,
                sort: e.target.value
            }
            var quizzes = await quizApi.getAll(params);
            console.log(quizzes);
            if (this.isComponentMounted) {
                this.setState({
                    ...this.state,
                    quizzes: quizzes,
                    menu: {
                        ...this.state.menu,
                        sortData: e.target.value
                    }
                })
            }
        }
        else{
            console.log(e.target.value);
            const params = {
                currentPage: 1,
                pageSize: this.state.exams.pageSize,
                difficult: this.state.menu.difficult,
                publishStatus: this.state.params.publishStatus,
                purpose: this.state.params.purpose,
                sort: e.target.value
            }
            var exams = await examApiv2.getAll(params)
            console.log(exams);
            if (this.isComponentMounted) {
                this.setState({
                    ...this.state,
                    exams: exams,
                    menu: {
                        ...this.state.menu,
                        sortData: e.target.value
                    }
                })
            }
        }
    }
    fetchHistories = async (id) => {
        return await examApi.getHistories(id);
    }
    typeChange = async (e) => {
        if (e.target.value == "Quiz") {
            const params = {
                currentPage: 1,
                pageSize: 5,
                difficult: this.state.menu.difficult,
                publishStatus: this.state.params.publishStatus
            }
            var quizzes = await quizApi.getAll(params);
            console.log(quizzes);
            if (this.isComponentMounted) {
                this.setState({
                    ...this.state,
                    menu: {
                        ...this.state.menu,
                        type: e.target.value,
                    },
                    examPage: e.target.value == "Exam",
                    quizzes: quizzes
                })
            }


        }
        else {
            const params = {
                currentPage: 1,
                pageSize: 5,
                difficult: this.state.menu.difficult,
                publishStatus: this.state.params.publishStatus,
                purpose: this.state.params.purpose
            }
            var exams = await examApiv2.getAll(params)
            console.log(exams);
            if (this.isComponentMounted) {
                this.setState({
                    ...this.state,
                    menu: {
                        ...this.state.menu,
                        type: e.target.value,
                    },
                    examPage: e.target.value == "Exam",
                    exams: exams
                })
            }
        }

    }
    difficultChange = (e) => {
        this.setState({
            ...this.state,
            menu: {
                ...this.state.menu,
                difficult: e.target.value
            }
        })
    }

    render() {
        console.log(this.state);
        const popover = (
            <Popover id="popover-basic">
                <Popover.Title as="h3">Popover right</Popover.Title>
                <Popover.Content>
                    And here's some <strong>amazing</strong> content. It's very engaging.
                    right?
                </Popover.Content>
            </Popover>
        );
        const popovers = [];
        const renderExam = this.state.exams.items.map((exam) =>
            <OverlayTrigger key={exam.id} trigger={["hover", "focus"]} placement="bottom" overlay={<Popover id="popover-basic">
                <Popover.Title as="h3">{exam.title}</Popover.Title>
                <Popover.Content>
                    {exam.detail}
                    <p>Số câu hỏi nghe: {exam.totalListening}</p>
                    <p>Số câu hỏi đọc: {exam.totalReading}</p>
                    <p>Tổng điểm bài thi: {exam.totalScore}</p>
                    <p>Điểm đạt: {exam.passScore}</p>
                    {this.props.isLoggedIn && this.state.histories.some(el => el.examId === exam.id) && <p>Kết quả thi tốt nhất: Điểm: {this.state.histories.find((history) => history.examId === exam.id) && this.state.histories.find((history) => history.examId === exam.id).score}</p>}
                </Popover.Content>
            </Popover>}>
                <div className="card-hoc pt-2 mb-3">
                    <div className="row">
                        <div className="col-2 text-center">
                            <img src="/image/welcome.jpg" alt="welcome" className="img-hoc" />
                        </div>
                        <div className="col-7">
                            <a className="link-title">{exam.title} </a><Badge variant="primary">{exam.isNew ? "New" : "Old"}</Badge> {this.state.histories.some(el => el.examId == exam.id && el.isDone) && <Badge variant="success">Đã làm</Badge>}{this.state.histories.some(el => el.examId == exam.id && el.isPause) && <Badge variant="success">Tạm dừng</Badge>}
                            <p>Thời gian làm bài: {exam.duration} phút</p>
                        </div>
                        <div className="col-3 pr-4">
                            {exam.isPrivate ? (this.props.isLoggedIn ? ((this.state.histories.some(h => h.examId == exam.id && h.isPause == false) ?
                                <Link className="btn btn-primary do-btn" to={"/test/" + exam.id}>Làm ngay <i className="fa fa-pencil"></i></Link> :
                                <Link className="btn btn-primary do-btn" to={`/test/${exam.id}?resume=true`}>Tiếp tục <i className="fa fa-pencil"></i></Link>)) : <Link className='btn btn-primary do-btn disabled text-warning'>Yêu cầu đăng nhập</Link>) : <Link className='btn btn-primary do-btn' to={"/test/" + exam.id}>Làm ngay <i className='fa fa-pencil'></i></Link>}
                        </div>
                    </div>
                </div>
            </OverlayTrigger>
        );
        const renderQuiz = this.state.quizzes.items.map((quiz, idx) =>
            <OverlayTrigger key={idx} trigger={["hover", "focus"]} placement="bottom" overlay={<Popover id="popover-basic">
                <Popover.Title as="h3">{quiz.title}</Popover.Title>
                <Popover.Content>
                    {quiz.detail}
                </Popover.Content>
            </Popover>}>
                <div className="card-hoc pt-2 mb-3">
                    <div className="row">
                        <div className="col-2 text-center">
                            <img src="/image/welcome.jpg" alt="welcome" className="img-hoc" />
                        </div>
                        <div className="col-7">
                            <a className="link-title">{quiz.quizName} </a><Badge variant="primary">{quiz.isNew ? "New" : "Old"}</Badge>

                        </div>
                        <div className="col-3 pr-4">
                            {/* {exam.isPrivate ? (this.props.isLoggedIn ? ((this.state.histories.some(h => h.examId == exam.id && h.isPause == false) ?
                                <Link className="btn btn-primary do-btn" to={"/test/" + exam.id}>Làm ngay <i className="fa fa-pencil"></i></Link> :
                                <Link className="btn btn-primary do-btn" to={`/test/${exam.id}?resume=true`}>Tiếp tục <i className="fa fa-pencil"></i></Link>)) : <Link className='btn btn-primary do-btn disabled text-warning'>Yêu cầu đăng nhập</Link>) : <Link className='btn btn-primary do-btn' to={"/test/" + exam.id}>Làm ngay <i className='fa fa-pencil'></i></Link>} */}
                        </div>
                    </div>
                </div>
            </OverlayTrigger>
        );
        return (
            <div id="wrapper">
                <SubMenuClient></SubMenuClient>
                <div id="content-wrapper" className="d-flex flex-column">
                    <div id="content" style={{ overflow: 'auto', height: '100vh' }}>
                        <HeaderClient></HeaderClient>
                        <main id='trangchu'>
                            <div className="container">
                                <div className="row">
                                    <div className="col-md-10 ">
                                        <div id="homeSearch" className="mb-2">
                                            <div className="d-flex justify-content-start">
                                                <p className="text-white mr-1 mt-2">Tìm kiếm</p>
                                                <input type="search" className="rounded mr-1" />
                                                <button className="btn btn-primary"><i className="fa fa-search"></i></button>
                                            </div>
                                            <div className="col-md-5 offset-md-3 d-flex justify-content-end">
                                                <select className='pagination-select' name="filter" id="" value={this.state.sortData} onChange={(e) => this.sort(e)}>
                                                    <option value="New">Mới nhất</option>
                                                    <option value="Hot">Hot nhất</option>
                                                </select>
                                            </div>
                                        </div>

                                        {this.state.examPage ? renderExam : renderQuiz}
                                        <div className='d-flex justify-content-center'>
                                            <button className='btn border border-primary round' onClick={() => this.fetchMore()}>Hiển thị thêm</button>
                                        </div>
                                    </div>
                                    <div className='col card border-0 rounded shadow-sm p-2' style={{ height: '50%' }}>
                                        <h5 className='text-center'>Menu</h5>
                                        <h6>Loại bài</h6>
                                        <div className='container'>
                                            <div className="custom-control custom-radio">
                                                <input type="radio" name="type" value="Exam" className="custom-control-input top" checked={this.state.menu.type == "Exam"} onChange={(e) => this.typeChange(e)}></input>
                                                <label className="custom-control-label text-dark">Exam</label>
                                            </div>

                                            <div className="custom-control custom-radio">
                                                <input type="radio" name="type" value="Quiz" className="custom-control-input top" checked={this.state.menu.type == "Quiz"} onChange={(e) => this.typeChange(e)}></input>
                                                <label className="custom-control-label text-dark">Quiz</label>
                                            </div>

                                        </div>

                                        <br></br>
                                        <div className='form-group'>
                                            <h6>Độ khó</h6>
                                            <div className='container'>
                                                <div className="custom-control custom-radio">
                                                    <input type="radio" name="difficult" value="Easy" className="custom-control-input top" checked={this.state.menu.difficult == "Easy"} onChange={(e) => this.difficultChange(e)}></input>
                                                    <label className="custom-control-label text-dark">Dễ</label>
                                                </div>
                                                <div className="custom-control custom-radio">
                                                    <input type="radio" name="difficult" value="Medium" className="custom-control-input top" checked={this.state.menu.difficult == "Medium"} onChange={(e) => this.difficultChange(e)}></input>
                                                    <label className="custom-control-label text-dark">Vừa</label>
                                                </div>
                                                <div className="custom-control custom-radio">
                                                    <input type="radio" name="difficult" value="Hard" className="custom-control-input top" checked={this.state.menu.difficult == "Hard"} onChange={(e) => this.difficultChange(e)}></input>
                                                    <label className="custom-control-label text-dark">Khó</label>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </main>
                        <Footer></Footer>
                    </div>
                </div>

            </div>
        )
    }
    componentWillUnmount() {
        this.isComponentMounted = false;
    }
}
const mapStateToProps = (state) => {
    const { isLoggedIn, account } = state.auth;
    return {
        isLoggedIn: isLoggedIn,
        account: account
    }
}
export default connect(mapStateToProps)(Exam)