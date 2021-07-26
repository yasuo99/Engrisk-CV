import React, { Component } from 'react'

class Exam extends Component {
    constructor(props) {
        super(props);
        this.isComponentMounted = false;
        this.state = {
            quizId: 0,
            question: {},
            questions: [],
            currentQuestion: {},
            remainQuestion: [],
            quiz: {},
            index: 0,
            rightAnswer: 0,
            loading: true,
            selected: null,
            answer: '',
            checked: false,
            result: false,
            done: false,
        }
    }
    async componentDidMount() {
        const { match: { match: { params } } } = this.props;
        this.isComponentMounted = true;
        try {
            if (this.isComponentMounted) {
                this.fetchQuestions(params.quizId);
            }
        }
        catch (error) {
            console.log(error);
            this.setState({ loading: false });
        }
    }
    fetchQuestions = async (quizId) => {
        try {
            const quiz = await doQuiz(quizId);
            this.setState({
                quizId: quizId,
                questions: quiz.questions,
                currentQuestion: quiz.questions[this.state.index],
                id: this.state.index,
                quiz,
                loading: false
            })
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
    submitAnswer = async (e) => {
        e.preventDefault();
        const answer = {
            id: this.state.currentQuestion.id,
            answer: this.state.answer,
            isRightAnswer: false
        }
        const result = await submitQuestion(this.state.currentQuestion.id, answer);
        this.setState({
            index: this.state.index + 1,
            checked: true
        })
        if (!result.isRightAnswer) {
            this.setState({
                remainQuestion: [...this.state.remainQuestion, this.state.currentQuestion]
            })
        } else {
            this.setState({
                rightAnswer: this.state.rightAnswer + 1
            })
        }
        if (this.reachEnd()) {
            if (this.state.rightAnswer !== this.state.quiz.questions.length) {
                this.setState({
                    questions: [...this.state.questions, ...this.state.remainQuestion.sort(() => Math.random() - 0.5)],
                    remainQuestion: []
                });
            }
            else {
                this.setState({
                    done: true
                })
            }
        }
        console.log(this.state);
    }
    submitQuiz = async (e) => {

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
        console.log(this.state);
        if (!this.reachEnd()) {
            this.setState({
                currentQuestion: this.state.questions[this.state.index],
                checked: false,
                result: false,
            })
        }
    }
    render() {
        const { quizId, currentQuestion, loading, rightAnswer, checked, quiz, index, done } = this.state;
        if (loading) {
            return (
                <div>
                    <Header />
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
                </div>
            )
        }
        else {
            return (
                <div>
                    <Header />
                    <main id="hoc2">
                        <div className="container">
                            <div className="mt-4">
                                <ProgressBar animated now={rightAnswer} max={quiz.questions.length} variant="success" />
                            </div>
                            <div className="row kechan mt-5 kechan">
                                <div className="col-8 offset-2">
                                    {currentQuestion.isListeningQuestion === false && <div className="row"> <div className="col-5"><h2>{currentQuestion.content}</h2>
                                        <p className="mb-5">Có nghĩa là?</p></div>
                                        <div className="col-7"><img src={currentQuestion.photoUrl} alt="" /></div></div>}
                                    {currentQuestion.isListeningQuestion === true &&
                                        <div className="row">
                                            <b>Chọn đáp án đúng</b>
                                            <ReactPlayer url={currentQuestion.content} controls width="500px" height="30px" />
                                        </div>}
                                    <div className="row mt-2">
                                        <div className="col-6">
                                            <div className="dapan" style={{ backgroundColor: this.setColor(1) }} onClick={(e) => this.selectedAnswer(e, 1)}>
                                                <p>{currentQuestion.a}</p>
                                            </div>
                                        </div>
                                        <div className="col-6">
                                            <div className="dapan" style={{ backgroundColor: this.setColor(2) }} onClick={(e) => this.selectedAnswer(e, 2)}>
                                                <p>{currentQuestion.b}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-6">
                                            <div className="dapan" style={{ backgroundColor: this.setColor(3) }} onClick={(e) => this.selectedAnswer(e, 3)}>
                                                <p>{currentQuestion.c}</p>
                                            </div>
                                        </div>
                                        <div className="col-6">
                                            <div className="dapan" style={{ backgroundColor: this.setColor(4) }} onClick={(e) => this.selectedAnswer(e, 4)}>
                                                <p>{currentQuestion.d}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row mt-5">
                                <div className="col-3"><button className="btn btn-primary" onClick={this.nextQuestion}>Bỏ qua</button></div>
                                <div className="col-6"></div>
                                <div className="col-3 text-right">
                                    {checked === false && <button className="btn btn-primary" onClick={this.submitAnswer}>Kiểm tra</button>}
                                    {checked && done === false && <Link className="btn btn-primary" to={"/baihoc/" + (quizId)} onClick={this.nextQuestion}>Tiếp theo</Link>}
                                    {done && <Link className="btn btn-primary" to="/">Kết thúc</Link>}
                                </div>
                            </div>
                        </div>
                    </main>
                </div>

            )
        }

    }
    componentWillUnmount() {
        this.isComponentMounted = false;
    }
}

export default Exam
