import React, { Component } from 'react'
import { Link, Prompt, Redirect } from 'react-router-dom';
import { getQuestion, submitQuestion } from '../../actions/questionActions';
import Loader from 'react-loader-spinner';
import { connect } from 'react-redux';
import { Badge, ButtonToolbar, Pagination, ProgressBar } from 'react-bootstrap';
import ReactPlayer from 'react-player';
import HeaderClient from '../../components/client/HeaderClient';
import SubMenuClient from '../../components/client/SubMenuClient';
import Footer from '../Footer/Footer';
import { doExam, doneExam } from '../../actions/examActions';
import Countdown from 'react-countdown';
import { Fragment } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { toast } from 'react-toastify';
import ReactPaginate from 'react-paginate';
import Answer from '../../components/answer/Answer';
import examApiv2 from '../../api/2.0/examApi';
import queryString from 'querystring';
import { QuestionTypes } from '../../constants/QuestionTypes';
class ExamPage extends Component {
    constructor(props) {
        super(props);
        this.isComponentMounted = false;
        this.state = {
            examId: '',
            questions: [
                {
                    answers: []
                }
            ],
            currentQuestion: { toeicPart: 1, answers: [] }, //Câu hỏi hiện tại
            remainQuestion: [], //Số câu hỏi bị bỏ qua hoặc sai,
            answers: [],
            exam: {},
            index: 0,
            rightAnswer: 0, //Số câu trả lời đúng
            loading: true, //Màn hình chờ load
            selected: null, //Đáp án lựa chọn
            answer: '', //Lưu đáp án để submit
            listened: false,
            checked: false, //Câu hỏi đã được submit để kiểm tra
            submitted: false, //Kết quả trả về cho câu hỏi
            done: false, //Câu hỏi cuối
            empty: false,
            start: Date.now(),
            modal: false,
            tutorial: [
                "Đối với mỗi câu hỏi trong phần này, bạn sẽ nghe thấy bốn câu về một bức tranh trong sách kiểm tra của bạn. Khi bạn nghe những câu mô tả về bức tranh, bạn sẽ chọn một câu mô tả đúng nhất những gì bạn nhìn thấy trong hình. Sau đó tìm số câu hỏi trên phiếu trả lời của bạn và đánh dấu câu trả lời của bạn. Lưu ý: các câu mô tả sẽ không được in trong đề thi và bạn chỉ được nghe một lần.",
                "Bạn sẽ nghe một câu hỏi hoặc câu nói và ba câu trả lời được nói bằng tiếng Anh. Chúng sẽ không được in trong đề thi của bạn và sẽ chỉ được nói một lần. Chọn câu trả lời đúng nhất cho câu hỏi hoặc câu đó và chọn đáp án (A), (B) hoặc (C).",
                "Bạn sẽ nghe thấy một số cuộc hội thoại giữa hai người, thậm chí là ba hoặc bốn người. Bạn sẽ được yêu cầu trả lời ba câu hỏi về những gì các nhân vật nói trong mỗi cuộc trò chuyện. Lựa chọn câu trả lời đúng nhất cho mỗi câu hỏi và chọ đáp án  (A), (B), (C) hoặc (D) trên phiếu trả lời của bạn. Các cuộc hội thoại sẽ không được in trong đề thi của bạn và sẽ được nói chỉ một lần.",
                "Bạn sẽ nghe một số cuộc nói chuyện được phát ra bởi một người nói. Bạn sẽ được yêu cầu trả lời ba câu hỏi về những gì được đề cập trong mỗi cuộc trò chuyện. Chọn câu trả lời cho từng câu hỏi và đánh dấu các đáp án như (A), (B), (C) hoặc (D) trên phiếu trả lời của bạn. Các cuộc trò chuyện sẽ không được được in trong đề thi của bạn và sẽ chỉ được nói một lần.",

                "Một từ hoặc cụm từ bị thiếu trong mỗi câu đưa ravà sẽ kèm theo những câu trả lời. Bạn phải chọn câu trả lời đúng nhất để hoàn thành câu và  chọn đáp án (A), (B), (C) hoặc (D) trên bài thi của bạn.",
                "Đọc các văn bản được cho sẵn trong bài thi. Sẽ có một từ hoặc cụm từ bị thiếu trong một số câu. Sẽ có 4 đáp án được đưa ra. Bạn phải  lựa chọn câu trả lời đúng nhất để hoàn thành văn bản. Và bạn nhớ đánh dấu đáp án  (A), (B), (C) hoặc (D) trên phiếu trả lời của bạn.",
                "Trong phần này, bạn sẽ đọc những văn bản,chẳng hạn như các bài báo và tạp chí, thư, và mẫu  quảng cáo. Mỗi văn bản được đi kèm với một số câu hỏi . Bạn phải chọn câu trả lời đúng nhất cho mỗi câu hỏi và đánh dấu đáp án (A), (B), (C) hoặc (D) trên phiếu trả lời của bạn.",
            ],
            paginStart: 1,
            paginEnd: 10,
            shuffleAnswers: [],
            currentShuffleAnswer: [{
                id: '',
                content: '',
                questionId: ''
            }]
        }
        this.handleUnload = this.handleUnload.bind(this);
        this.pauseExam = this.pauseExam.bind(this);
    }
    async componentDidMount() {
        this.isComponentMounted = true;
        window.addEventListener('beforeunload', this.handleUnload);
        window.addEventListener('unload', this.pauseExam);
        const { location: { match: { params } } } = this.props;
        const { location: { location: { search } } } = this.props;
        var temp = queryString.parse(search.replace('?', ''));
        if (temp.resume === 'true') {
            var remainTime = await examApiv2.resumeExam(params.examId);
            var saveExams = Array.from(JSON.parse(localStorage.getItem('saveExam')));
            var currentExam = saveExams?.find(e => e.id === params.examId);
            this.setState({
                examId: params.examId,
                exam: {
                    ...currentExam,
                    duration: remainTime
                },
                questions: currentExam.questions,
                shuffleAnswers: currentExam.shuffleAnswers,
                index: currentExam.currentQuestion,
                answers: currentExam.answers,
                currentQuestion: currentExam.questions[currentExam.currentQuestion],
                currentShuffleAnswer: currentExam.shuffleAnswers[currentExam.currentQuestion],
                loading: false,
                selected: currentExam.answers[currentExam.currentQuestion].selected,
                answer: currentExam.answers[currentExam.currentQuestion].answer
            })
        } else {

            try {
                if (this.isComponentMounted) {
                    this.fetchQuestions(params.examId);
                }
            }
            catch (error) {
                console.log(error);
                this.setState({ loading: false });
            }
        }
    }
    pauseExam = async (e) => {
        if (!this.state.submitted) {
            let saveExam = []
            var temp = localStorage.getItem('saveExam');
            if (!temp) {
                localStorage.setItem('saveExam', JSON.stringify(saveExam));
            }
            saveExam = Array.from(JSON.parse(localStorage.getItem('saveExam')));
            let alreadySave = saveExam.some(e => e.id == this.state.exam.id);
            console.log(alreadySave);
            if (!alreadySave) {
                var exam = this.state.exam;
                exam.shuffleAnswers = this.state.shuffleAnswers
                exam.answers = this.state.answers
                exam.currentQuestion = this.state.index;
                exam.isPause = true;
                exam.pauseAt = this.getCurrentDateTime();
                saveExam.push(this.state.exam)
                localStorage.setItem('saveExam', JSON.stringify(saveExam));
            }
            else {
                var exam = saveExam.find(e => e.id == this.state.exam.id);
                var index = saveExam.indexOf(exam);
                exam.currentQuestion = this.state.index;
                exam.shuffleAnswers = this.state.shuffleAnswers;
                exam.isPause = true;
                exam.pauseAt = this.getCurrentDateTime();
                exam.answers = this.state.answers
                saveExam[index] = exam;
                localStorage.setItem('saveExam', JSON.stringify(saveExam));
            }
        }
    }
    getCurrentDateTime = () => {
        var date = new Date();
        var day = date.getDate();       // yields date
        var month = date.getMonth() + 1;    // yields month (add one as '.getMonth()' is zero indexed)
        var year = date.getFullYear();  // yields year
        var hour = date.getHours();     // yields hours 
        var minute = date.getMinutes(); // yields minutes
        var second = date.getSeconds(); // yields seconds

        // After this construct a string with the above results as below
        var time = day + "/" + month + "/" + year + " " + hour + ':' + minute + ':' + second;
        return time;
    }
    fetchQuestions = async (examId) => {
        try {
            const exam = await doExam(examId);

            console.log(exam);
            if (exam.questions.length > 0) {
                this.setState({
                    examId: examId,
                    questions: exam.questions,
                    currentQuestion: exam.questions[this.state.index],
                    id: this.state.index,
                    exam,
                    loading: false
                });
                this.shuffleAnswer(exam.questions[this.state.index]);
                let answers = [];
                let shuffleAnswers = [];
                exam.questions.forEach(question => {
                    let currentAnswer = {
                        id: question.id,
                        questionId: question.id,
                        answer: '',
                        selected: '',
                        flag: false,
                        isListeningQuestion: question.isListeningQuestion,
                        listened: false
                    };
                    answers.push(currentAnswer);
                    let questionShuffleAnswer = [];
                    question.answers.forEach((value) => {
                        questionShuffleAnswer.push({
                            content: value.answer,
                            id: value.id,
                            questionId: question.id
                        });
                        questionShuffleAnswer = questionShuffleAnswer.sort(() => Math.random() - 0.5)
                    })
                    shuffleAnswers.push(questionShuffleAnswer);
                });
                this.setState({
                    answers: answers,
                    shuffleAnswers: shuffleAnswers,
                    currentShuffleAnswer: shuffleAnswers[this.state.index]
                })
                console.log(shuffleAnswers);
            }
            else {
                toast("Hiện chưa có câu hỏi cho exam này")
                this.setState({
                    empty: true
                })
            }
        } catch (error) {
            console.log(error);
        }
    }
    selectedAnswer = (e, position) => {
        console.log(e.target.dataset.answer);
        if (this.state.selected === position) {
            this.setState({
                selected: null,
            })
        }
        else {
            this.setState({
                selected: position
            })
        }
        if (e) {
            let found = this.state.answers.filter(el => el.questionId === this.state.currentQuestion.id);
            console.log(found);
            if (found[0].isListeningQuestion) {
                found[0].listened = true;
            }
            found[0].id = e.target.dataset.id
            found[0].selected = position;
            found[0].answer = e.target.dataset.answer;
            console.log(this.state.answers);
        }

    }
    removeSelected = () => {
        this.setState({
            selected: null
        })
    }
    setColor = (position) => {
        if (this.state.selected === position) {
            return "#77B748"
        }
        else {
            return ""
        }
    }
    // submitAnswer = async (e) => {
    //     e.preventDefault();
    //     const answer = {
    //         id: this.state.currentQuestion.id,
    //         answer: this.state.answer,
    //         isRightAnswer: false
    //     }
    //     const currentAnswer = {
    //         question: this.state.currentQuestion,
    //         answer: this.state.answer,
    //         selected: this.state.selected
    //     }
    //     const result = await submitQuestion(this.state.currentQuestion.id, answer);
    //     this.setState({
    //         index: this.state.index + 1,
    //         checked: true,
    //         answers: [...this.state.answers, currentAnswer]
    //     })
    //     if (!result.isRightAnswer) {
    //         this.setState({
    //             remainQuestion: [...this.state.remainQuestion, this.state.currentQuestion]
    //         })
    //     } else {
    //         this.setState({
    //             rightAnswer: this.state.rightAnswer + 1
    //         })
    //     }
    //     if (this.reachEnd()) {

    //         if (this.state.rightAnswer !== this.state.exam.questions.length) {
    //             this.setState({
    //                 questions: [...this.state.questions, ...this.state.remainQuestion.sort(() => Math.random() - 0.5)],
    //                 remainQuestion: []
    //             });
    //         }
    //         else {
    //             this.setState({
    //                 done: true
    //             })
    //         }
    //     }
    //     console.log(this.state);
    // }
    submitExam = async (e) => {
        console.log(this.state.answers);
        this.props.doneExam(this.state.examId, this.state.answers);
        this.setState({
            submitted: true
        })
    }
    reachEnd = () => {
        if (this.state.index < this.state.questions.length) {
            return false;
        }
        return true;
    }
    nextQuestion = (e) => {
        e.preventDefault();
        this.removeSelected();
        const currentQuestion = this.state.currentQuestion;
        if (currentQuestion.isListeningQuestion) {
            let found = this.state.answers.filter(el => el.questionId === currentQuestion.id);
            console.log(found);
            if (found[0].isListeningQuestion) {
                found[0].listened = true;
            }
        }
        let tempIndex = this.state.index + 1;
        console.log(tempIndex);
        if (tempIndex < this.state.questions.length) {
            this.shuffleAnswer();
            this.setState({
                index: tempIndex,
                currentQuestion: this.state.questions[tempIndex],
                answer: '',
                checked: false
            });
            let stateCurrentQuestion = this.state.questions[tempIndex];
            let currentAnswer = this.state.answers.filter(el => el.questionId === stateCurrentQuestion.id);
            if (currentAnswer.length > 0) {
                if (currentAnswer[0].listened && currentAnswer[0].isListeningQuestion) {
                    this.setState({
                        listened: true
                    })
                }
                else {
                    this.setState({
                        listened: false
                    })
                }
                this.setState({
                    selected: currentAnswer[0].selected,
                    checked: true
                });
                this.setColor(currentAnswer[0].selected);
            }

        }
        console.log(this.state.questions.length);
        if (tempIndex === this.state.questions.length - 1) {
            this.setState({
                done: true
            })
        }

    }
    previousQuestion = (e) => {
        let tempIndex = this.state.index - 1;
        this.removeSelected();
        const currentQuestion = this.state.currentQuestion;
        if (currentQuestion.isListeningQuestion) {
            let found = this.state.answers.filter(el => el.questionId === currentQuestion.id);
            console.log(found);
            if (found[0].isListeningQuestion) {
                found[0].listened = true;
            }
        }
        if (tempIndex >= 0) {
            this.shuffleAnswer();
            this.setState({
                done: false,
                index: tempIndex,
                currentQuestion: this.state.questions[tempIndex],
                answer: '',
                checked: false
            });
            let stateCurrentQuestion = this.state.questions[tempIndex];
            let currentAnswer = this.state.answers.filter(el => el.questionId === stateCurrentQuestion.id);
            if (currentAnswer.length > 0) {
                if (currentAnswer[0].listened && currentAnswer[0].isListeningQuestion) {
                    this.setState({
                        listened: true
                    })
                }
                else {
                    this.setState({
                        listened: false
                    })
                }
                this.setState({
                    selected: currentAnswer[0].selected,
                    checked: true
                });
                this.setColor(currentAnswer[0].selected);
            }
        }
    }
    selectQuestion = (index) => {
        const currentQuestion = this.state.currentQuestion;
        if (currentQuestion.isListeningQuestion) {
            let found = this.state.answers.filter(el => el.questionId === currentQuestion.id);
            console.log(found);
            if (found[0].isListeningQuestion) {
                found[0].listened = true;
            }
        }
        this.setState({
            index: index - 1,
            currentQuestion: this.state.questions[index - 1],
            currentShuffleAnswer: this.state.shuffleAnswers[index - 1],
            selected: ''
        });
        let stateCurrentQuestion = this.state.questions[index - 1];
        this.shuffleAnswer(stateCurrentQuestion);
        let currentAnswer = this.state.answers.filter(el => el.questionId === stateCurrentQuestion.id);
        if (currentAnswer.length > 0) {
            if (currentAnswer[0].listened && currentAnswer[0].isListeningQuestion) {
                this.setState({
                    listened: true
                })
            }
            else {
                this.setState({
                    listened: false
                })
            }
            this.setState({
                selected: currentAnswer[0].selected,
                checked: true
            });
            this.setColor(currentAnswer[0].selected);
        }
        if (index === this.state.questions.length) {
            this.setState({
                done: true
            })
        }
        else {
            this.setState({
                done: false
            })
        }
    }
    flagQuestion = () => {
        let currentAnswer = this.state.answers.filter(el => el.questionId === this.state.currentQuestion.id);
        if (currentAnswer.length > 0) {
            currentAnswer[0].flag = currentAnswer[0].flag ? false : true;
        }
        this.setState({});
        console.log(this.state.answers);
    }
    skipQuestion = () => {
        let tempIndex = this.state.index + 1;
        if (tempIndex < this.state.questions.length) {
            this.setState({
                index: tempIndex,
                currentQuestion: this.state.questions[tempIndex],
                answer: '',
                checked: false
            });
            const currentQuestion = this.state.questions[this.state.index - 1];
            let found = this.state.answers.filter(el => el.questionId === currentQuestion.id);
            console.log(found);
            if (found[0].isListeningQuestion) {
                found[0].listened = true;
            }
            this.shuffleAnswer();
        }
    }
    listenningTimeout = () => {
        const currentQuestion = this.state.currentQuestion;
        if (currentQuestion.isListeningQuestion) {
            let found = this.state.answers.filter(el => el.id === currentQuestion.id);
            if (found[0].isListeningQuestion) {
                found[0].listened = true;
            }
        }
        var timeout = setInterval(() => {
            this.skipQuestion();
            this.removeSelected();
            clearInterval(timeout);
        }, 27000);
    }
    modalOpen() {
        this.setState({ modal: true });
    }
    modalClose() {
        this.setState({
            modal: false
        });
    }
    shuffleAnswer = (currentQuestion) => {
        // let answers = [];
        // answers.push(currentQuestion.a);
        // answers.push(currentQuestion.b);
        // answers.push(currentQuestion.c);
        // answers.push(currentQuestion.d);
        // answers = answers.sort(() => Math.random() - 0.5)
        // this.setState({
        //     shuffleAnswers: answers
        // })
        // console.log(answers);
    }
    render() {
        let active = this.state.index + 1;
        let items = [];
        // items.push(<Pagination.Prev key={0} onClick={(e) => this.previousQuestion(e)} />);
        // for (let i = this.state.paginStart; i <= this.state.paginEnd; i++) {
        //     items.push(<Pagination.Item key={i} active={i === active} onClick={() => this.selectQuestion(i)} style={{ backgroundColor: "green" }}>
        //         {i}{this.state.answers[i - 1] !== undefined && this.state.answers[i - 1].answer !== '' && <Badge variant="success">✔</Badge>}
        //         {this.state.answers[i - 1] !== undefined && this.state.answers[i - 1].flag && <Badge variant="danger"><i className="fa fa-flag"></i></Badge>}
        //     </Pagination.Item>)
        // }
        // items.push(<Pagination.Next key={this.state.questions.length + 1} onClick={(e) => this.nextQuestion(e)} />)
        const { examId, currentQuestion, loading, rightAnswer, checked, exam, index, done, submitted } = this.state;
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
                                                width={200}
                                            />
                                            <p>Hiện chưa có câu hỏi cho exam này !</p>
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
                    <Prompt when={!submitted} message="Bạn chưa nộp bài, có chắn chắn rời ?"></Prompt>
                    <div id="wrapper">
                        <div id="content-wrapper" className="d-flex flex-column">
                            <div id="content">
                                <main id="hoc2">
                                    <div className="container">
                                        <div>
                                        </div>
                                        <div className="row kechan mt-5">
                                            <div className="col-4">Time left: <Countdown date={this.state.start + exam.duration * 60 * 1000} onComplete={this.submitExam} /></div>
                                            <div className="col-4"></div>
                                            <div className="col-4 ">
                                                <Button variant="primary" className="btn btn-primary" onClick={e => this.modalOpen(e)} >Hướng dẫn</Button>
                                            </div>
                                            <div className="col-8 offset-2">
                                                Câu {index + 1}
                                                {currentQuestion.type === QuestionTypes.ToeicListening && <div className="row"> <div className="col-5">
                                                    <p className="mb-5">Chọn đáp án đúng</p></div>
                                                    {currentQuestion.imageFileName != undefined && <div className="col-7"><img src={`http://localhost:5000/api/v2/streaming/image?image=${currentQuestion.imageFileName}`} alt="" /></div>} </div>}
                                                {currentQuestion.type === QuestionTypes.ToeicListening && this.state.listened == false &&
                                                    <div className="row">
                                                        <b>Chọn đáp án đúng</b>
                                                        <ReactPlayer url={currentQuestion.audio} playing={!this.state.listened} width="500px" height="30px" onEnded={() => this.listenningTimeout()} />
                                                        {currentQuestion.imageFileName != undefined && <div className="col-7"><img src={`http://localhost:5000/api/v2/streaming/image?image=${currentQuestion.imageFileName}`} alt="" /></div>}
                                                    </div>}
                                                {currentQuestion.type === QuestionTypes.ToeicListening && this.state.listened && <p>Đây là câu hỏi nghe và chỉ được phép nghe 1 lần</p>}
                                                <p>{currentQuestion.content}</p>
                                                <Answer answers={this.state.currentShuffleAnswer} question={this.state.currentQuestion} setColor={this.setColor} selectedAnswer={this.selectedAnswer}></Answer>
                                            </div>
                                        </div>
                                        <div className="mt-4">
                                            {/* <Pagination size="lg" className="justify-content-center"
                                            >{items}</Pagination> */}
                                            <ReactPaginate
                                                previousLabel={'Quay lại'}
                                                nextLabel={'Tiếp theo'}
                                                nextClassName={'page-item'}
                                                nextLinkClassName={'page-link'}
                                                previousClassName={'page-item'}
                                                previousLinkClassName={'page-link'}
                                                pageClassName={'page-item'}
                                                pageLinkClassName={'page-link'}
                                                breakLabel={'...'}
                                                breakClassName={'page-item'}
                                                breakLinkClassName={'page-link'}
                                                pageCount={this.state.questions.length}
                                                marginPagesDisplayed={2}
                                                pageRangeDisplayed={5}
                                                forcePage={this.state.index}
                                                onPageChange={(e) => this.selectQuestion(e.selected + 1)}
                                                containerClassName={'justify-content-center pagination pagination-lg'}
                                                subContainerClassName={'pages pagination'}
                                                activeClassName={'active'}
                                            />
                                        </div>
                                        <div className="row mt-3">
                                            <div className="offset-6 col-3 text-right">
                                                {done && submitted === false && <button className="btn btn-primary" onClick={this.submitExam}>Nộp bài</button>}
                                                {submitted && <Link className="btn btn-primary" to={"/ketqua-exam/" + examId}>Xem đáp án</Link>}
                                            </div>
                                        </div>
                                    </div>
                                </main>
                                <Modal show={this.state.modal}>
                                    <Modal.Header closeButton onClick={() => this.modalClose()}>
                                        <Modal.Title>Hướng dẫn làm bài</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>{this.state.tutorial[(Number.parseInt(currentQuestion.toeicPart) - 1)]}
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button variant="secondary" onClick={() => this.modalClose()}>Trở lại</Button>
                                    </Modal.Footer>
                                </Modal>
                                <Footer></Footer>
                            </div>
                        </div>

                    </div>
                </Fragment>
            )
        }

    }
    handleUnload(e) {

        var message = "\o/";
        (e || window.event).returnValue = message; //Gecko + IE
        return message;
    }
    async componentWillUnmount() {
        this.isComponentMounted = false;
        if (!this.state.submitted && !this.state.loading) {
            await examApiv2.pauseExam(this.state.exam.id, this.state.index);
            await this.pauseExam();
        }
        console.log('unmount cmnr');
    }
}
const mapStateToProps = (state) => {
    return ({})
}
const mapDispatchToProps = (dispatch) => {
    return {
        doneExam: (id, body) => dispatch(doneExam(id, body))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ExamPage)
