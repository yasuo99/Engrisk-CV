import React, { Component } from "react";
import HeaderClient from "../../components/client/HeaderClient";
import SubMenuClient from "../../components/client/SubMenuClient";
import ReactAudioPlayer from 'react-audio-player';
import { Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import quizApi from "../../api/2.0/quizApi";
import ReactPlayer from "react-player";
import { timers } from "jquery";

const selectedOptionInit = {
    questionId: '',
    index: 0,
    id: '',
    checked: false,
    result: false
}
class Learn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedOption: {
                index: 0,
                id: '',
                checked: false,
                result: false
            },
            modalDisplay: false,
            useKeyBoard: false,
            typeQuestion: "ToeicReading",
            check: "",
            next: false,
            chooseImg: false,
            answerSort: "",
            checkSort: "",
            quiz: {
                questions: []
            },
            currentQuestion: {
                answers: []
            },
            currentQuestionIndex: 0,
            answers: [
            ],
            audioPlay: false,
        }
        this.isComponentMounted = false;
    }
    async componentDidMount() {
        this.isComponentMounted = true;
        const { match: { match: { params } } } = this.props;
        var quiz = await quizApi.doQuiz(params.sectionId);
        if (this.isComponentMounted) {
            this.setState({
                quiz: quiz,
                currentQuestion: quiz.questions[this.state.currentQuestionIndex],
                selectedOption: {
                    ...this.state.selectedOption,
                    id: quiz.questions[this.state.currentQuestionIndex]?.answers[0]?.id
                }
            })
        }
        console.log(quiz);
    }
    fetchQuiz = (id) => {

    }
    handleSelectOption = (e) => {
        console.log(e.target.value);
        this.setState({
            selectedOption: {
                ...this.state.selectedOption,
                index: e.target.name,
                id: e.target.value
            },
            chooseImg: true
        })
    }
    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }
    openModal = () => {
        this.setState({
            modalDisplay: true
        })
    }
    closeModal = () => {
        this.setState({
            modalDisplay: false,
        })
    }
    ToToggleKeyBoard = () => {
        if (this.state.useKeyBoard === false) {
            this.setState({
                useKeyBoard: true,
            })
        }
        else {
            this.setState({
                useKeyBoard: false,
            })
        }

    }
    checkAnswer = (e) => {
        const currentQuestion = this.state.currentQuestion;
        const answer = currentQuestion.answers.find(ans => ans.id == this.state.selectedOption.id);
        const selectedOption = {
            ...this.state.selectedOption,
            result: answer.isQuestionAnswer,
            checked: true
        }
        this.setState({
            selectedOption: selectedOption
        })
        const answers = [...this.state.answers, selectedOption]
        console.log(answers);
        this.setState({
            answers: answers,
        });
    }
    checkAnswerSort = (answerSort) => {
        if (this.state.answerSort === answerSort.target.value) {
            this.setState({
                checkSort: true,
            })
        }
        else {
            this.setState({
                checkSort: false
            })
        }
        this.setState({
            next: true
        })
    }
    onClickAnswerImg = () => {
        if (this.state.selectedOption !== "") {
            this.setState({
                chooseImg: true
            })
        }
        else {
            this.setState({
                chooseImg: false
            })
        }
    }
    playAudio = () => {
        this.setState({
            audioPlay: true
        })
    }
    selectQuestion = (index) => {
        this.setState({
            currentQuestion: this.state.quiz.questions[index],
            currentQuestionIndex: index,
            selectedOption: this.state.answers[index] == undefined ? ({ ...selectedOptionInit, questionId: this.state.quiz.questions[index]?.id, id: this.state.quiz.questions[index]?.answers[0]?.id }) : this.state.answers[index],
            modalDisplay: false
        })
    }
    nextQuestion = () => {
        if (this.state.currentQuestionIndex < this.state.quiz.questions.length) {
            const nextQuestion = this.state.quiz.questions[this.state.currentQuestionIndex + 1]
            const nextQuestionSelectedOption = this.state.answers.find(ans => ans.questionId == nextQuestion.id);
            const selectedOption = {
                ...(nextQuestionSelectedOption != undefined ? nextQuestionSelectedOption : selectedOptionInit),
                questionId: nextQuestion.id,
                id: nextQuestion.answers[0]?.id
            }
            this.setState({
                selectedOption: selectedOption,
                currentQuestion: nextQuestion,
                currentQuestionIndex: this.state.currentQuestionIndex + 1,
            })
        }
    }
    render() {
        var { useKeyBoard, typeQuestion, check, checkSort, next, chooseImg, currentQuestion, answers } = this.state
        const renderListQuestions = this.state.quiz.questions.map((question, index) =>
            <tr key={index} onClick={() => this.selectQuestion(index)} style={{ cursor: "pointer" }}>
                <td className="question">{question.content}</td>
                <td className="achieved">{question.score}</td>
                <td className="point">{question.score}</td>
                <td className="result"><img src={answers.some(ans => ans.questionId == question.id) ? (answers.find(ans => ans.questionId == question.id).checked && answers.find(ans => ans.questionId == question.id).result == true ? "/image/tick.png" : "/image/cross.png") : ""}></img></td>
            </tr>
        )
        const renderAnswers = currentQuestion.answers.map((ans, index) =>
            <div className="row" key={index}>
                <div className="col-1 text-right">
                    <input type="radio"
                        className="radioAnswer"
                        value={ans.id}
                        name={index}
                        checked={this.state.selectedOption.index == index}
                        onChange={this.handleSelectOption} />
                </div>
                <div className="col-11">
                    <p className="answer">{ans.answer}</p>
                </div>

            </div>
        )
        console.log(currentQuestion);
        return (
            <div id="wrapper">
                <SubMenuClient></SubMenuClient>
                <div id="content-wrapper" className="d-flex flex-column">
                    <div id="content">
                        <HeaderClient></HeaderClient>
                        <main id="learn">
                            <div className="container">
                                <p className="btn btn-listQuestion" onClick={e => this.openModal(e)}>Danh sách câu hỏi</p>
                                <div className="boxContent">
                                    <div>
                                        <div className="titleQuestion">
                                            <img src="/image/question.png" alt="question"></img>
                                            <h5>{currentQuestion.preQuestion}</h5>
                                            <br />
                                        </div>
                                        <div className="titleQuestion">
                                            <p className="title">{currentQuestion.content}</p>
                                        </div>

                                        <div className="answerQuestion">

                                            {currentQuestion.isListeningQuestion && <div><img onClick={this.playAudio} src="/image/sound.png" className="sound"></img> <ReactPlayer
                                                config={{
                                                    file: {
                                                        attributes: {
                                                            preload: 'none'
                                                        }
                                                    }
                                                }}
                                                src="my_audio_file.ogg"
                                                playing={this.state.audioPlay}
                                                style={{ height: '30px' }}
                                            /></div>}

                                            <div className="itemAnswer">
                                                {renderAnswers}
                                            </div>
                                            {this.state.selectedOption.checked && (
                                                this.state.selectedOption.result === true ? (
                                                    <div className="boxNotifyCorrect">
                                                        <p className="title">Correct</p>
                                                        <p className="content">Well done !</p>
                                                    </div>
                                                ) : (
                                                    <div className="boxNotifyIncorrect">
                                                        <p className="title">Incorrect</p>
                                                        <p className="content">Sorry, sorry. Incorrect</p>
                                                    </div>
                                                ))
                                            }

                                        </div>

                                    </div>

                                    {this.state.selectedOption.checked === false ? <button className="btn btn-check" onClick={this.checkAnswer}><img src="/image/checked (1).png"></img> Kiểm tra</button> : <button onClick={this.nextQuestion} className="btn btn-continue"><img src="/image/next (3).png"></img> Tiếp theo</button>}
                                    {this.state.quiz.questions.length === this.state.answers.length && <button className="btn btn-continue"><img src="/image/next (3).png"></img> Kết thúc</button>}
                                </div>

                            </div>
                            <Modal show={this.state.modalDisplay} onHide={this.closeModal}>
                                <table>
                                    <Modal.Header closeButton onClick={() => this.closeModal()}>
                                        <thead>
                                            <tr className="active">
                                                <th className="question">Câu hỏi</th>
                                                <th className="achieved">Điểm đạt được</th>
                                                <th className="point">Số điểm</th>
                                                <th className="result">Kết quả</th>
                                            </tr>
                                        </thead>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <tbody style={{ width: "898px" }}>
                                            {renderListQuestions}
                                        </tbody>

                                    </Modal.Body>
                                </table>
                            </Modal>

                        </main>
                    </div>
                </div>
            </div >)
    }
    componentWillUnmount() {
        this.isComponentMounted = false;
    }
}
export default Learn;