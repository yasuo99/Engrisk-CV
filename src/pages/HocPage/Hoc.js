import React, { PureComponent, Suspense, useState, useEffect } from 'react';
import { Link, Prompt, Redirect } from 'react-router-dom';
import { getQuestion, submitQuestion } from '../../actions/questionActions';
import Loader from 'react-loader-spinner';
import { connect } from 'react-redux';
import { ButtonToolbar, ProgressBar } from 'react-bootstrap';
import ReactPlayer from 'react-player';
import HeaderClient from '../../components/client/HeaderClient';
import SubMenuClient from '../../components/client/SubMenuClient';
import Footer from '../Footer/Footer';
import Countdown from 'react-countdown';
import sectionApi from '../../api/sectionApi';
import { Button, Modal } from 'react-bootstrap'
import { appendScript } from '../../config/appendScript'
import { Fragment } from 'react';
import { toast } from 'react-toastify';
import wordApi from '../../api/wordApi';
import { donePractice } from '../../actions/wordActions';

class Hoc extends PureComponent {
    constructor(props) {
        super(props);
        this.isComponentMounted = false;
        this.state = {
            sectionId: 0,
            question: {},
            questions: [],
            currentQuestion: {},
            remainQuestion: [],
            quiz: { questions: [] },
            index: 0,
            rightAnswer: 0,
            loading: true,
            selected: null,
            answer: '',
            checked: false,
            result: false,
            done: false,
            isRight: false,
            modal: false,
            authResult: {},
            totalTime: 0,
        }
        this.time = 0;
        this.handleUnload = this.handleUnload.bind(this);
    }
    async componentDidMount() {
        window.addEventListener('beforeunload', this.handleUnload);

        const { match: { match: { params, path } } } = this.props;
        this.isComponentMounted = true;
        //Kiểm tra có phải là bài quiz practice hay không
        //Không phải thì là bài quiz của section
        if (path !== '/practice') {
            const result = await this.fetchQuestions(params.sectionId);
            try {
                if (this.isComponentMounted) {
                    console.log(result);
                    if (result.status != 204) {

                        if (result.questions.length > 0) {
                            this.setState({
                                sectionId: params.sectionId,
                                questions: result.questions,
                                currentQuestion: result.questions[this.state.index],
                                id: this.state.index,
                                quiz: result,
                                loading: false
                            })
                            if (!this.props.isLoggedIn) {
                                this.calculateSpent = setInterval(() => {
                                    this.time += 1
                                }, 1000)
                            }
                        }
                        else {
                            toast("Hiện chưa có câu hỏi cho bài quiz này");
                            this.setState({
                                loading: true
                            })
                        }
                    } else {
                        toast("Hiện chưa có câu hỏi cho bài quiz này");
                        this.setState({
                            loading: true
                        })
                    }
                }
            }
            catch (error) {
                console.log(error);
                this.setState({ loading: false });
            }
        } else {
            const questions = await wordApi.practice(this.props.words);
            console.log(questions);
            if (this.isComponentMounted) {
                if (questions) {
                    if (questions.length > 0) {
                        this.setState({
                            questions: questions,
                            currentQuestion: questions[this.state.index],
                            quiz: { ...this.state.quiz, questions: questions },
                            id: this.state.index,
                            loading: false
                        })
                        this.calculateSpent = setInterval(() => {
                            this.calculateSpent = setInterval(() => {
                                this.time += 1
                            }, 1000)
                        }, 1000)
                    }
                    else {
                        this.setState({ loading: true })
                    }
                } else {
                    this.setState({ loading: true })
                }
            }
        }
    }
    fetchQuestions = async (sectionId) => {
        try {
            return await sectionApi.doQuiz(sectionId);
        } catch (error) {
            console.log(error);
        }
    }
    selectedAnswer = (e, position) => {
        if (this.state.selected === position) {
            this.setState({
                selected: null
            })
        }
        else {
            this.setState({
                selected: position
            })
        }
        this.setState({
            answer: e.target.innerHTML
        });
    }
    setColor = (position) => {
        if (this.state.selected === position) {
            return "#77B748"
        }
        else {
            return ""
        }
    }
    submitAnswer = async () => {
        const { match: { match: { path } } } = this.props;
        let rightAnswer = this.state.rightAnswer;
        let remainQuestion = this.state.remainQuestion;
        if (path !== '/practice') {
            const answer = {
                id: this.state.currentQuestion.id,
                answer: this.state.answer,
                isQuestionAnswer: false
            }
            const result = await submitQuestion(this.state.currentQuestion.id, answer);
            this.setState({
                isRight: result.isQuestionAnswer
            })
            if (result.isQuestionAnswer) {
                this.setState({
                    rightAnswer: this.state.rightAnswer + 1,
                })
            } else {
                remainQuestion = [...remainQuestion, this.state.currentQuestion];
                this.setState({
                    remainQuestion: [...this.state.remainQuestion, this.state.currentQuestion],
                })
            }
        }
        else {
            if (this.state.answer == this.state.currentQuestion.answer) {
                rightAnswer += 1;
                this.setState({
                    rightAnswer: rightAnswer,
                    isRight: true
                });
            } else {
                remainQuestion = [...remainQuestion, this.state.currentQuestion];
                this.setState({
                    remainQuestion: remainQuestion,
                    isRight: false
                })
            }
        }
        if (this.state.index === this.state.questions.length - 1) {
            console.log(this.state.rightAnswer);
            if (path !== '/practice') {
                if (this.state.rightAnswer !== this.state.quiz.questions.length) {
                    this.setState({
                        questions: [...this.state.questions, ...remainQuestion.sort(() => Math.random() - 0.5)],
                        remainQuestion: []
                    });
                }
                else {
                    const result = await this.submitQuiz();
                    this.setState({
                        done: true,
                        authResult: result
                    })
                    clearInterval(this.calculateSpent)
                }
            }
            else {
                if (rightAnswer !== this.state.quiz.questions.length) {
                    this.setState({
                        questions: [...this.state.questions, ...remainQuestion.sort(() => Math.random() - 0.5)],
                        remainQuestion: []
                    });
                }
                else {
                    clearInterval(this.calculateSpent);
                    const result = await wordApi.donePractice(this.props.words);
                    if (result.status === 200) {
                        this.props.donePractice();
                    }
                    else {
                        toast('Lỗi');
                    }
                    this.setState({
                        done: true,
                    })
                }
            }
        }
        this.setState({
            checked: true,
            index: this.state.index + 1,
        })
    }
    submitQuiz = async () => {
        return await sectionApi.doneQuiz(this.state.sectionId, this.state.quiz.id);
    }
    reachEnd = () => {
        if (this.state.index < this.state.questions.length) {
            return false;
        }
        return true;
    }
    nextQuestion = async (e) => {
        e.preventDefault();
        this.setColor(5);
        this.selectedAnswer(e, 5);
        if (!this.reachEnd()) {
            this.setState({
                currentQuestion: this.state.questions[this.state.index],
                checked: false,
                result: false,
                isRight: false
            })
        }
        console.log(this.state);
    }
    skipQuestion = () => {
        this.setState({
            index: this.state.index + 1,
            remainQuestion: [...this.state.remainQuestion, this.state.currentQuestion]
        })
        let tempIndex = this.state.index + 1;
        let remainQuestion = [...this.state.remainQuestion, this.state.currentQuestion]
        if (tempIndex < this.state.questions.length) {
            this.setState({
                currentQuestion: this.state.questions[tempIndex],
                checked: false,
                result: false,
                questions: [...this.state.questions, ...remainQuestion],
                remainQuestion: [],
                isRight: false
            })
            console.log(this.state);
        }
    }
    modalOpen() {
        this.setState({ modal: true });
    }
    modalClose() {
        this.setState({
            modal: false
        });
    }
    render() {
        const { match: { match: { path } } } = this.props;
        const { sectionId, currentQuestion, loading, rightAnswer, checked, quiz, index, done, isRight } = this.state;
        console.log(isRight);
        if (loading) {
            return (
                <div id="wrapper">
                    <SubMenuClient></SubMenuClient>
                    <div id="content-wrapper" className="d-flex flex-column">
                        <div id="content">
                            <HeaderClient></HeaderClient>

                            <main id="hoc2">
                                <div className="container">
                                    <div className="row kechan mt-5 kechan d-flex">
                                        <div className="col-8 offset-5">
                                            <Loader type="Oval"
                                                color="#00BFFF"
                                                height={200}
                                                width={200} />
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
        else {
            return (
                <Fragment>
                    <Prompt when={!done} message="Bạn chưa hoàn thành quiz, bạn muốn rời khỏi ?"></Prompt>
                    <div id="wrapper">
                        <SubMenuClient></SubMenuClient>
                        <div id="content-wrapper" className="d-flex flex-column">
                            <div id="content">
                                <HeaderClient></HeaderClient>
                                <main id="hoc2">
                                    <div className="container">
                                        <div className="mt-4">
                                            <ProgressBar animated now={rightAnswer} max={quiz.questions.length} variant="success" />
                                        </div>
                                        <div className="row kechan mt-5">
                                            <div className="col-8 offset-2">
                                                {currentQuestion.isListeningQuestion === false && <div className="row"> <div className="col-9"><h2>{currentQuestion.content}</h2>
                                                    {currentQuestion.isFillOutQuestion ? <p>Điền vào chỗ trống</p> : <p className="mb-5">Có nghĩa là?</p>}</div>
                                                    {currentQuestion.photoUrl && <div className="col-3"><img src={currentQuestion.photoUrl} alt="" /><br />Chọn đáp án đúng</div>}</div>}
                                                {currentQuestion.isListeningQuestion === true &&
                                                    <div className="row">
                                                        <b>{currentQuestion.content}</b>
                                                        <ReactPlayer url={currentQuestion.audio} controls width="500px" height="30px" playing={true} />
                                                        {currentQuestion.photoUrl && <div className="col-7"><img src={currentQuestion.photoUrl} alt="" /><br />Chọn đáp án đúng</div>}
                                                    </div>}
                                                <div className="row mt-2">
                                                    {currentQuestion.answers.map((answer, index) =>
                                                        <div className="col-6">
                                                            <div className={answer ? "dapan" : "dapan hidden"} style={{ backgroundColor: this.setColor(index + 1) }} onClick={(e) => this.selectedAnswer(e, index + 1)}>
                                                                <p>{answer.answer}</p>
                                                            </div>
                                                        </div>
                                                    )
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                        <div className={checked ? (isRight ? "row mt-3 thongbao-ketqua" : "row mt-3 thongbao-ketquasai") : "row mt-3 khungKq"}>
                                            <div className="col-3">
                                                {checked === false && <button className="btn btn-primary" onClick={this.skipQuestion}>Bỏ qua</button>}
                                            </div>
                                            <div className="col-6"></div>
                                            <div className="col-3 text-right">
                                                {checked === false && <button className="btn btn-primary" onClick={this.submitAnswer}>Kiểm tra</button>}
                                                {checked && done === false && <Link className="btn btn-primary" to={"/baihoc/" + (sectionId)} onClick={this.nextQuestion}>Tiếp theo</Link>}
                                                {done && <button className="btn btn-primary" onClick={e => this.modalOpen(e)}>Kết thúc</button>}
                                            </div>
                                        </div>
                                    </div>
                                </main>
                                <Modal show={this.state.modal}>
                                    <Modal.Header closeButton onClick={() => this.modalClose()}>
                                        <Modal.Title><img src="/image/check-mark.png"></img> Chúc mừng bạn đã hoàn thành bài quiz</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body> Thời gian hoàn thành của bạn là: {path !== '/practice' ? (this.props.isLoggedIn ? this.state.authResult.timeSpent : this.time) : this.time} giây
                                   </Modal.Body>
                                    <Modal.Footer>
                                        {path !== '/practice' ? <Link className="btn btn-primary" onClick={() => this.modalClose()} to="/home">Học tiếp</Link> : <Link className="btn btn-primary" onClick={() => this.modalClose()} to="/flashcard">Học tiếp</Link>}
                                    </Modal.Footer>
                                </Modal>
                                <Footer></Footer>
                            </div>
                        </div>
                    </div >
                </Fragment >
            )
        }

    }
    componentWillUnmount() {
        this.isComponentMounted = false;
        window.removeEventListener('beforeunload', this.handleUnload);
        clearInterval(this.calculateSpent)
    }
    handleUnload(e) {
        var message = "\o/";

        (e || window.event).returnValue = message; //Gecko + IE
        return message;
    }
}
const mapStateToProps = (state) => {
    const { auth } = state;
    const { words } = state.word;
    return {
        account: auth.account,
        isLoggedIn: auth.isLoggedIn,
        words: words
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        donePractice: () => dispatch(donePractice())
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(Hoc);