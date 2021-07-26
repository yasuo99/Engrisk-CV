import React, { Component } from "react";
import { Formik, Field, Form, ErrorMessage, FieldArray, FormikProvider } from 'formik';
import HeaderClient from "../client/HeaderClient";
import SubMenuClient from "../client/SubMenuClient";
import { Button, Modal } from 'react-bootstrap'
import quizApi from "../../api/2.0/quizApi";
import examApiv2 from "../../api/2.0/examApi";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import sectionApi from "../../api/sectionApi";
const info = {
    type: 'Quiz',
    title: '',
    description: '',
    difficult: 'easy',
    unlockPoint: 0,
    sectionId: '',
    questions: [{

    }]
}

const question = {
    answers: [
        {
            content: '',
            isQuestionAnswer: false,
            image: null,
            isAudioAnswer: false,
        },
    ],
    content: '',
    image: null,
    type: '',
    isAudioQuestion: false,
    words: [
        {
            word: '',
        }

    ]
};
const validate = (values, props /* only available when using withFormik */) => {
    const errors = {};

    if (!values.email) {
        errors.email = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
    }
    if (!values.answers.some(ans => ans.isQuestionAnswer === true)) {
        errors.answers[0].name = 'Chọn đáp án là đáp án đúng'
    }
    //...

    return errors;
};
class Thumb extends React.Component {
    state = {
        loading: false,
        thumb: undefined
    };

    componentWillReceiveProps(nextProps) {
        if (!nextProps.file) {
            return;
        }

        this.setState({ loading: true }, () => {
            let reader = new FileReader();

            reader.onloadend = () => {
                this.setState({ loading: false, thumb: reader.result });
            };

            reader.readAsDataURL(nextProps.file);
        });
    }

    render() {
        const { file } = this.props;
        const { thumb } = this.state;

        if (!file) {
            return (
                <img
                    src="/image/picture (1).png"
                    alt="image"
                    className="display-ImgQuestion"
                />
            )
        }

        return (
            <img
                src={thumb}
                alt={file.name}
                className="display-ImgQuestion"
            />
        );
    }
}
class Thumb_Answer extends React.Component {
    state = {
        loading: false,
        thumbAnswer: undefined
    };

    componentWillReceiveProps(nextProps) {
        if (!nextProps.imgAnswer) {
            return;
        }

        this.setState({ loading: true }, () => {
            let reader = new FileReader();

            reader.onloadend = () => {
                this.setState({ loading: false, thumbAnswer: reader.result });
            };

            reader.readAsDataURL(nextProps.imgAnswer);
        });
    }

    render() {
        const { imgAnswer } = this.props;
        const { thumbAnswer } = this.state;

        if (!imgAnswer) {
            return (
                <img
                    src="/image/picture (1).png"
                    alt="image"
                    className="display-ImgAnswer"
                />
            )
        }

        return (
            <img
                src={thumbAnswer}
                alt={imgAnswer.name}
                className="display-ImgAnswer"
            />
        );
    }
}
class Quiz_Exam extends Component {

    constructor(props) {
        super(props);
        this.state = {
            typeQuestion: '',
            isDispalyForm: true,
            check: 1,
            srcAnswer: '',
            active: true,
            subject: {
                type: 'Quiz',
                title: '',
                duration: 10,
                description: '',
                difficult: 'easy',
                questions: [
                ]
            },
            questionSettings: {
                type: '',
                duration: 10,
                score: 1,
                answerType: 1,
                toeicPart: 0,
                answers: [

                ]
            },
            selectedQuestion: {},
            tempQuestion: {},
            error: {
                content: '',
                modalStatus: false
            },
            side: false,
            sections: []
        }
        this.changeType = this.changeType.bind(this);
    }

    async componentDidMount() {
        window.addEventListener('unload', function (event) {
            //call function to save you state in API or save in localStore
            localStorage.setItem('state', 1)
        });
        const auth = this.props.account.roles.some(r => r == 'superadmin' || r == 'manager');
        this.setState({ side: auth });
        if (auth) {
            var sections = await sectionApi.getManage({ auth });
            console.log(sections);
            this.setState({
                sections: sections
            })
        }
    }
    handleResetAnswer = (e) => {
        this.setState({
            srcAnswer: '',
        })
    }
    handleImgQuestion = (e) => {
        this.setState({
            imgAnswer: e.currentTarget.files[0],
        })

    }
    changeActive = () => {
        this.setState(prevState => ({
            active: !prevState.active
        }))
        console.log(this.state.active)

    }
    modalTrigger = () => {
        this.state.error.modalStatus ? this.setState({ error: { modalStatus: false } }) : this.setState({ error: { modalStatus: true } })
    }
    addQuestion = (values) => {
        console.log(values);
        var questions = this.state.subject.questions;
        if (!values.answers.some(ans => ans.isQuestionAnswer)) {
            toast('Câu hỏi phải có đáp án đúng', { type: 'warning', position: 'bottom-right' })
            return false;
        }
        else {
            if (values.content != '' && values.answers.length > 0 && values.answers.some(a => a.isQuestionAnswer === true)) {
                var question = {
                    content: values.content,
                    image: values.file,
                    isAudioQuestion: values.isAudioQuestion,
                    engVoice: values.engVoice,
                    duration: this.state.questionSettings.duration,
                    score: this.state.questionSettings.score,
                    toeicPart: this.state.questionSettings.toeicPart == 0 ? null : this.state.questionSettings.toeicPart,
                    explaination: values.explain,
                    answers: this.state.check != 2 ? values.answers.filter(q => q.content != '') : values.answers,
                }
                switch (this.state.questionSettings.type) {
                    case "Quiz":
                        question.isQuizQuestion = true;
                        break;
                    case "QuestionFillout":
                        question.isFilloutQuestion = true;
                        break;
                    case "QuizHinhAnh":
                        question.isQuizQuestion = true;
                        break;
                    case "QuizSapXep":
                        question.isArrangeQuestion = true;
                        break;
                    case "QuizNoiTu":
                        question.isConnectionQuestion = true;
                        break;
                    case "ToeicReading":
                        question.isReadingQuestion = true;
                        break;
                    default:
                        break;
                }
                questions.push({
                    question
                })
                console.log(this.state.subject.questions);
                this.setState({
                    subject: {
                        ...this.state.subject,
                        questions: questions,
                        questionSettings: {
                            ...this.state.questionSettings,
                            toeicPart: 0,
                            score: 5,
                            duration: 10
                        }
                    }
                })
                return true;
            }
        }

    }
    questionSetting = (e) => {
        console.log(e.target.value);
        this.setState({
            questionSettings: {
                ...this.state.questionSettings,
                [e.target.name]: e.target.value
            }
        });
    }
    // handleSubmit = (e) => {
    //     e.preventDefault();
    //     var { typeAdd, titleAdd, descriptionAdd, levelAdd } = this.state;
    //     var formData = new FormData();
    //     formData.append("type", typeAdd);
    //     formData.append("title", titleAdd);
    //     formData.append("description", descriptionAdd);
    //     formData.append("level", levelAdd);
    //     console.log(formData.get("description"));
    //     document.getElementById("addInfoQuizForm").reset();
    // }
    // handleReset = (e) => {
    //     e.preventDefault();
    //     document.getElementById("addInfoQuizForm").reset();
    // }(
    ToToggleForm = (e) => {
        console.log(e.target.value);
        switch (e.target.value) {
            case "Quiz":
                this.setState({
                    questionSettings: { ...this.state.questionSettings, type: 'Quiz' },
                    check: 1,
                })
                break;
            case "QuizHinhAnh":
                this.setState({
                    questionSettings: { ...this.state.questionSettings, type: "QuizHinhAnh" },
                    check: 2,
                })
                break;
            case "QuizSapXep":
                this.setState({
                    questionSettings: { ...this.state.questionSettings, type: "QuizSapXep" },
                    check: 3,
                })
                break;
            case "QuizNoiTu":
                this.setState({
                    questionSettings: { ...this.state.questionSettings, type: "QuizNoiTu" },
                    check: 4,
                })
                break;
            case "ToeicReading":
                this.setState({
                    questionSettings: { ...this.state.questionSettings, type: "ToeicReading" },
                    check: 5,
                })
                break;
            default:
                break;
        }
    }

    selectQuestion = (index) => {

        console.log(index);
        var questions = this.state.subject.questions;
        // var currentSelected = this.state.selectedQuestion;
        // if (currentSelected) {
        //     var question = questions.find(q => q.question === currentSelected);
        //     var currentIndex = questions.indexOf(question);
        // }
        console.log(questions);
        questions.forEach((value, i) => {
            if (i == index) {
                value.question.selected = true;
                console.log(value.question);
                this.setState({
                    selectedQuestion: value.question,
                    tempQuestion: value
                });
                question.answers = value.question.answers
                question.content = value.question.content
                question.isAudioQuestion = value.question.isAudioQuestion
                question.words = value.question.answers
                question.image = value.question.image
            } else {
                value.question.selected = false;
            }
        });
        this.setState({
            subject: {
                ...this.state.subject,
                questions: questions
            }
        })
    }
    saveQuestion = (e, values) => {
        console.log(values);
        e.preventDefault();
        var currentIndex = this.state.subject.questions.indexOf(this.state.tempQuestion);
        var questions = this.state.subject.questions;
        if (values.content != '' && values.answers.length > 0 && values.answers.some(a => a.isQuestionAnswer === true)) {
            var question = {
                content: values.content,
                image: values.file,
                isAudioQuestion: values.isAudioQuestion,
                engVoice: values.engVoice,
                toeicPart: values.toeicPart,
                explaination: values.explain,
                answers: values.answers.filter(q => q.content != ''),
                selected: false
            }
            switch (this.state.questionSettings.type) {
                case "Quiz":
                    question.isQuizQuestion = true;
                    break;
                case "QuestionFillout":
                    question.isFilloutQuestion = true;
                    break;
                case "QuizHinhAnh":
                    question.isQuizQuestion = true;
                    break;
                case "QuizSapXep":
                    question.isArrangeQuestion = true;
                    break;
                case "QuizNoiTu":
                    question.isConnectionQuestion = true;
                    break;
                case "ToeicReading":
                    question.isReadingQuestion = true;
                    break;
                default:
                    break;
            }
            questions[currentIndex].question = question;
            console.log(questions);
            this.setState({
                subject: {
                    ...this.state.subject,
                    questions: questions
                }
            })
        }

    }
    clearQuestion = () => {
        question.answers = []
        question.content = ''
        question.isAudioQuestion = false
        question.words = []
        question.image = null
    }
    deleteQuestion = () => {
        var questions = this.state.subject.questions;
        var remainQuestions = questions.filter(q => q !== this.state.tempQuestion);
        this.setState({
            subject: {
                ...this.state.subject,
                questions: remainQuestions
            },
            selectedQuestion: {}
        })
        this.clearQuestion();
    }
    createSubject = async (values) => {
        console.log(values);
        var tempQuestions = this.state.subject.questions.map((value, index) => {
            return value.question;
        })
        switch (values.type) {
            case 'Quiz':
                console.log("dm");
                var tempQuestions = this.state.subject.questions.map((value, index) => {
                    return value.question;
                })
                tempQuestions = tempQuestions.sort((a, b) => {
                    if (a.answers.some(aa => aa.image != null) && !b.answers.some(ba => ba.image != null)) {
                        return -1;
                    }
                    if (!a.answers.some(aa => aa.image != null) && b.answers.some(ba => ba.image != null)) {
                        return 1;
                    }
                    return 0;
                })
                console.log(tempQuestions);
                var formData = new FormData();
                formData.set('sectionId', values.sectionId);
                formData.set('quizName', values.title);
                formData.set('detail', values.description);
                formData.set('difficultLevel', values.difficult);
                formData.set('isPrivate', this.state.side ? false : true);
                formData.set('serializeQuestions', JSON.stringify(tempQuestions));
                tempQuestions.forEach((value) => {
                    formData.append('questionImages', value.image)
                    value.answers.forEach((answer, index) => {
                        formData.append('answerImages', answer.image)
                    })
                })

                // let quiz = {
                //     quizName: values.title,
                //     detail: values.description,
                //     difficultLevel: values.difficult,
                //     isPrivate: true,
                //     questions: tempQuestions
                // }
                // console.log(quiz);
                var result = await quizApi.create(formData, this.state.side);
                if (result) {
                    toast('Thêm thành công', { type: 'success' });
                    this.setState({
                        subject: {
                            questions: []
                        },
                    })
                } else {
                    toast('Thêm thất bại', { type: 'info' });
                }

                break;
            case 'Exam':
                console.log(values);
                // var formData = new FormData();
                // formData.set('title', values.title);
                // formData.set('detail', values.description);
                // formData.set('difficultLevel', values.difficult);
                // formData.set('isPrivate', this.state.side ? false : true);
                // formData.set('duration', 100);
                // formData.set('pass', 10);
                // tempQuestions.forEach((value) => {
                //     if (value.image != null) {
                //         formData.append('QuestionImages', value.image);
                //     }
                // })
                // formData.set('stringifyQuestions', JSON.stringify(tempQuestions));
                // // let exam = {
                // //     title: values.title,
                // //     detail: values.description,
                // //     difficultLevel: values.difficult,
                // //     isPrivate: true,
                // //     pass: 10,
                // //     examQuestions: tempQuestions,
                // //     duration: 100
                // // }
                // // console.log(exam);
                // var result = await examApiv2.create(formData, this.state.side)
                // if (result != null) {
                //     toast('Thêm exam thành công', { type: 'success' })
                //     this.setState({
                //         subject: {
                //             questions: []
                //         },
                //     })
                // } else {
                //     toast('Thêm exam thất bại', { type: 'info' })
                // }
                break;
            default:
                break;
        }
        console.log(values);

    }
    resetQuestionForm = () => {
        this.setState({
            selectedQuestion: {}
        })
        this.clearQuestion();
    }
    changeType = (e) => {
        this.setState({
            subject: {
                ...this.state.subject,
                type: e.target.value
            },
        });
        switch (e.target.value) {
            case "Quiz":
                this.setState({
                    check: 1,
                    questionSettings: {
                        ...this.state.questionSettings,
                        type: 'Quiz'
                    }
                })
                break;
            case "Exam":
                this.setState({
                    check: 5,
                    questionSettings: {
                        ...this.state.questionSettings,
                        type: 'Toeic'
                    }
                })
                break;
            default:
                break;
        }
    }
    checkAnswer = (e, values) => {
        if (e.target.checked) {
            values.answers.forEach((value, index) => {
                if (index == e.target.dataset.id) {
                    value.isQuestionAnswer = true;
                } else {
                    value.isQuestionAnswer = false;
                }
            })
        }
    }

    render() {
        // var srcc = this.state.src.replace("C:\\fakepath\\", "/image/");
        // var srcAnswer = this.state.srcAnswer.replace("C:\\fakepath\\", "/image/");
        var { check, active } = this.state;

        return (
            <div id="wrapper">
                <div id="content-wrapper" className="d-flex flex-column">
                    {/* <SubMenuClient></SubMenuClient> */}
                    <div id="quiz">

                        <div id="content"> <HeaderClient></HeaderClient>
                            {/* header: bắt đầu */}

                            {/* header: kết thúc */}
                            <section className="main">

                                <div className="container-fluid">
                                    <div className="row">
                                        <div className="col-md-3 kedoc">
                                            {/* Thông tin quiz/exam: bắt đầu */}
                                            <div className="info-quiz">
                                                <div className="info">
                                                    <h5 className="title-info">THÔNG TIN BÀI QUIZ/EXAM</h5>
                                                </div>
                                                <Formik
                                                    initialValues={info}
                                                    onSubmit={(values, { resetForm }) => {
                                                        this.createSubject(values);
                                                        resetForm({})
                                                    }}
                                                >
                                                    {({ resetForm }) => (
                                                        <Form className="content" >
                                                            <div className="type">
                                                                <label htmlFor="type">Loại bài</label>
                                                                <Field
                                                                    as="select"
                                                                    name="type"
                                                                    id="type"
                                                                    onClick={(e) => this.changeType(e)}>
                                                                    <option value="Quiz">Quiz</option>
                                                                    <option value="Exam">Exam</option>
                                                                </Field>
                                                            </div>
                                                            {this.state.subject.type == 'Quiz' && <div className="title">
                                                                <label htmlFor="section">Section</label>
                                                                <Field
                                                                    as="select"
                                                                    id="sectionId"
                                                                    name="sectionId">
                                                                    <option>Chọn tên section</option>
                                                                    {this.state.sections.map((value, index) =>
                                                                        <option key={index} value={value.id}>{value.sectionName}</option>
                                                                    )
                                                                    }
                                                                </Field>
                                                            </div>}

                                                            <div className="title">
                                                                <label htmlFor="title">Tên bài</label>
                                                                <Field
                                                                    type="text"
                                                                    placeholder="Nhập tên bài..."
                                                                    required
                                                                    id="title"
                                                                    name="title"></Field>
                                                            </div>
                                                            <div className="description">
                                                                <label htmlFor="description">Mô tả</label>
                                                                <Field
                                                                    type="text"
                                                                    placeholder="Nhập mô tả..."
                                                                    name="description"
                                                                    id="description"
                                                                    required></Field>
                                                            </div>
                                                            <div className="level">
                                                                <label htmlFor="level">Độ khó</label>
                                                                <Field
                                                                    as="select"
                                                                    id="difficult"
                                                                    name="difficult">
                                                                    <option value="easy">Dễ</option>
                                                                    <option value="medium">Vừa</option>
                                                                    <option value="hard">Khó</option>
                                                                </Field>
                                                            </div>
                                                            {this.state.subject.type === "Exam" && this.props.account.roles.some(role => role == "superadmin") &&
                                                                <div className="unlockPoint">
                                                                    <label htmlFor="level">Điểm mở khóa <i className="fa fa-info"></i></label>
                                                                    <Field
                                                                        type="number"
                                                                        placeholder="Điểm mở khóa"
                                                                        name="unlockPoint"
                                                                        id="unlockPoint"
                                                                    ></Field>
                                                                </div>

                                                            }
                                                            <div className="row justify-content-end function">
                                                                <div className="col-md-3">
                                                                    <button className="f1" onClick={() => resetForm(info)}>Cài lại</button>
                                                                </div>
                                                                <div className="col-md-3">
                                                                    <button className="f2" type="submit">Lưu lại</button>
                                                                </div>
                                                            </div>
                                                        </Form>
                                                    )}
                                                </Formik>

                                            </div>
                                            {/* Thông tin quiz/exam: kết thúc */}
                                            <div className="item-questionQuizExam">
                                                <ol type="1">
                                                    {this.state.subject.questions.map((question, index) =>
                                                        <div className={question.question.selected === true ? 'cardActive' : 'card'} key={index} data-index={index} onClick={() => this.selectQuestion(index)}>
                                                            <p className="order">Câu hỏi <li></li></p>
                                                            <div className="card bg-light">
                                                                <div className="card-body">
                                                                    <div className="card-title text-center">
                                                                        <p className="question">{question.question.content}</p>
                                                                        {question.question.image != null ? <Thumb file={question.question.image} /> : <img src="/image/english (1).jpg" />}
                                                                    </div>
                                                                    <div className="row">
                                                                        {question.question.answers !== undefined && question.question.answers.map((answer, j) =>
                                                                            <div className="col-6" key={j}>
                                                                                <p className={answer.isQuestionAnswer === true ? 'answerTrue' : 'answer'}>{answer.content}</p>
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}
                                                    {/* <button className="btn btn-add" type="submit"><img src="/image/plus (1).png" /> Thêm câu hỏi</button> */}
                                                    <a className="exit" href="#">Quay lại</a>
                                                </ol>
                                            </div>

                                        </div>
                                        <div className="col-md-9">
                                            <Formik
                                                initialValues={question}

                                                onSubmit={(values, { resetForm }) => {
                                                    console.log(values);
                                                    const result = this.addQuestion(values);
                                                    // await new Promise((r) => setTimeout(r, 500));
                                                    if (result) {
                                                        resetForm({});
                                                        this.resetQuestionForm();
                                                    }
                                                }}
                                            >
                                                {({ values, setFieldValue, resetForm }) => (
                                                    <Form>
                                                        <div className="row">
                                                            {
                                                                check === 1 ?
                                                                    (
                                                                        <div className="col-md-8 kedoc">
                                                                            <div className="question">
                                                                                <div className="boxQuestion">
                                                                                    <Field
                                                                                        className="titleQuestion"
                                                                                        placeholder="Nhập câu hỏi..."
                                                                                        type="text"
                                                                                        id="content"
                                                                                        name="content"
                                                                                        component="textarea"
                                                                                        required
                                                                                    />
                                                                                    {/* <img src="/image/picture (1).png" alt="img-question" class="img-question"> */}
                                                                                    <p>Là câu hỏi nghe:
                                                                        <Field
                                                                                            type="checkbox"
                                                                                            className="file mt-3"
                                                                                            id="isAudioQuestion"
                                                                                            name="isAudioQuestion" />
                                                                                    </p>
                                                                                    <div className="answer answerText">
                                                                                        <ol type="A">
                                                                                            <FieldArray name="answers">
                                                                                                {({ insert, remove, push }) => (
                                                                                                    <div>
                                                                                                        {values.answers.length > 0 &&
                                                                                                            values.answers.map((answer, index) => (
                                                                                                                <div className="itemAnswer" key={index}>
                                                                                                                    <div className="row" >
                                                                                                                        <div className="col-1">
                                                                                                                            <p className="textOrder"><li></li></p>

                                                                                                                        </div>
                                                                                                                        <div className="col-9">
                                                                                                                            <Field
                                                                                                                                name={`answers.${index}.content`}
                                                                                                                                placeholder="Nhập đáp án..."
                                                                                                                                type="text"
                                                                                                                                className="answerFile"
                                                                                                                                id="content"
                                                                                                                                required
                                                                                                                            />
                                                                                                                            <ErrorMessage
                                                                                                                                name={`answers.${index}.name`}
                                                                                                                                component="div"
                                                                                                                                className="field-error"
                                                                                                                            />
                                                                                                                        </div>
                                                                                                                        <div className="col-1">

                                                                                                                            <Field
                                                                                                                                name={`answers.${index}.isQuestionAnswer`}
                                                                                                                                className="radioAnswerFile"
                                                                                                                                type="checkbox"
                                                                                                                                id="isQuestionAnswer"
                                                                                                                                data-id={index}
                                                                                                                                onClick={(e) => this.checkAnswer(e, values)}
                                                                                                                            />
                                                                                                                            <ErrorMessage
                                                                                                                                name={`answers.${index}.name`}
                                                                                                                                component="div"
                                                                                                                                className="field-error"
                                                                                                                            />

                                                                                                                        </div>
                                                                                                                        <div className="col-1">
                                                                                                                            <button
                                                                                                                                type="button"
                                                                                                                                className="secondary"
                                                                                                                                onClick={() => remove(index)}
                                                                                                                                className="exit"
                                                                                                                            ><img src="/image/cross.png"></img>
                                                                                                                            </button>
                                                                                                                        </div>

                                                                                                                    </div>
                                                                                                                </div>
                                                                                                            ))}
                                                                                                        <button
                                                                                                            type="button"
                                                                                                            className="btn btn-addAnswer fa fa-plus"
                                                                                                            onClick={() => push({
                                                                                                                content: '', isQuestionAnswer: false, image: null,
                                                                                                                isAudioAnswer: false
                                                                                                            })}>
                                                                                                            Thêm đáp án
                                                          </button>
                                                                                                    </div>
                                                                                                )}
                                                                                            </FieldArray>
                                                                                        </ol>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    )
                                                                    : (check === 2 ?
                                                                        (
                                                                            <div className="col-md-8 kedoc">
                                                                                <div className="question">
                                                                                    <Field
                                                                                        className="titleQuestion"
                                                                                        placeholder="Nhập câu hỏi..."
                                                                                        type="text"
                                                                                        id="content"
                                                                                        name="content"
                                                                                        component="textarea"
                                                                                        defaultValue={""} />
                                                                                    <div className="boxImg">
                                                                                        <Thumb file={values.file} />
                                                                                        <div className="itemImg">
                                                                                            <Field type="file"
                                                                                                accept="image/png, image/jpeg"
                                                                                                className="item-question fa fa-camera "
                                                                                                id="imgQuestion"
                                                                                                name="imgQuestion"
                                                                                                onChange={(event) => {
                                                                                                    setFieldValue("file", event.currentTarget.files[0]);
                                                                                                }}
                                                                                            />
                                                                                            <img src="/image/delete1.png" className="img-question"
                                                                                                onClick={() => {
                                                                                                    setFieldValue("file", null);
                                                                                                }}></img>
                                                                                        </div>
                                                                                    </div>

                                                                                    <p>Là câu hỏi nghe:
                                                                        <Field
                                                                                            type="checkbox"
                                                                                            className="file mt-3"
                                                                                            id="isAudioQuestion"
                                                                                            name="isAudioQuestion" />
                                                                                    </p>
                                                                                    <div className="answer answerHinhAnh">
                                                                                        <ol type="A">
                                                                                            <FieldArray name="answers">
                                                                                                {({ insert, remove, push }) => (
                                                                                                    <div>
                                                                                                        {values.answers.length > 0 &&
                                                                                                            values.answers.map((answer, index) => (
                                                                                                                <div className="itemAnswer" key={index}>
                                                                                                                    <div className="row">
                                                                                                                        <div className="col-1 kedoc-2">
                                                                                                                            <p className="textOrder"><li></li></p>
                                                                                                                        </div>
                                                                                                                        <div className="col-9 kedoc-2">
                                                                                                                            <div className="row">
                                                                                                                                <div className="col-8">
                                                                                                                                    <Field name={`answers.${index}.content`} type="text" placeholder="Nhập đáp án..." className="answerTextThree" />
                                                                                                                                </div>
                                                                                                                                <div className="col-4">
                                                                                                                                    <div className="boxImgAnswer">
                                                                                                                                        {/* { srcAnswer === '' ? <img src="/image/picture (1).png" className="display-ImgAnswer"/> : (<img src={this.state.srcAnswer.replace("C:\\fakepath\\", "/image/")} className="display-ImgAnswer"/>) } */}

                                                                                                                                        <Thumb_Answer imgAnswer={values.answers[index].image}></Thumb_Answer>
                                                                                                                                        <div className="itemImg">
                                                                                                                                            <Field name={`answers.${index}.file`} type="file"
                                                                                                                                                accept="image/png, image/jpeg"
                                                                                                                                                className="item-answer fa fa-camera "
                                                                                                                                                onBlur={e => this.handleImgQuestion(e)}
                                                                                                                                                // onFocus={e => this.handleImgQuestion(e)}
                                                                                                                                                // onChange={e => this.handleImgQuestion(e)}
                                                                                                                                                id='image'
                                                                                                                                                onChange={(event) => {
                                                                                                                                                    setFieldValue(`answers.${index}.image`, event.currentTarget.files[0]);
                                                                                                                                                }}
                                                                                                                                            />
                                                                                                                                            <img src="/image/delete1.png" className="img-answer"
                                                                                                                                                // onClick={() => {this.handleResetAnswer() }} 
                                                                                                                                                // onBlur={e => this.handleResetAnswer(e)}
                                                                                                                                                onClick={() => {
                                                                                                                                                    setFieldValue(`answers.${index}.image`, null);
                                                                                                                                                }}
                                                                                                                                            >

                                                                                                                                            </img>

                                                                                                                                        </div>
                                                                                                                                    </div>
                                                                                                                                </div>
                                                                                                                            </div>
                                                                                                                        </div>
                                                                                                                        <div className="col-1">
                                                                                                                            <Field type="checkbox" name={`answers.${index}.isQuestionAnswer`} onClick={(e) => this.checkAnswer(e, values)} className="radioAnswerThree" />
                                                                                                                        </div>
                                                                                                                        <div className="col-1">
                                                                                                                            <button
                                                                                                                                type="button"
                                                                                                                                className="secondary"
                                                                                                                                onClick={() => remove(index)}
                                                                                                                                className="exitThree"
                                                                                                                            ><img src="/image/cross.png"></img>
                                                                                                                            </button>
                                                                                                                        </div>
                                                                                                                    </div>
                                                                                                                </div>
                                                                                                            ))}
                                                                                                        <button
                                                                                                            type="button"
                                                                                                            className="btn btn-addAnswer fa fa-plus"

                                                                                                            onClick={() => push({
                                                                                                                content: '', isQuestionAnswer: '', image: null,
                                                                                                                isAudioAnswer: false
                                                                                                            })}>
                                                                                                            {/* onBlur={()=>{this.handleResetAnswer()}} */}
                                                                                                Thêm đáp án
                                                              </button>
                                                                                                    </div>
                                                                                                )}
                                                                                            </FieldArray>
                                                                                        </ol>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        )
                                                                        : (check === 3 ?
                                                                            (
                                                                                <div className="col-md-8 kedoc">
                                                                                    <div className="question">
                                                                                        <Field
                                                                                            className="titleQuestion"
                                                                                            placeholder="Nhập câu hỏi..."
                                                                                            type="text"
                                                                                            id="titleQuestion"
                                                                                            name="titleQuestion"
                                                                                            component="textarea"
                                                                                            defaultValue={""} />
                                                                                        {/* <img src="/image/picture (1).png" alt="img-question" class="img-question"> */}
                                                                                        <p>Là câu hỏi nghe:
                                                                        <Field
                                                                                                type="checkbox"
                                                                                                className="file mt-3"
                                                                                                id="isAudioQuestion"
                                                                                                name="isAudioQuestion" />
                                                                                        </p>
                                                                                        <div className="boxWord">
                                                                                            <FieldArray name="answers">
                                                                                                {({ remove, push }) => (
                                                                                                    <div className="words">
                                                                                                        {values.answers.length > 0 &&
                                                                                                            values.answers.map((word, index) => (
                                                                                                                <div key={index} className="word">
                                                                                                                    <Field type="text" id="word" name={`answers.${index}.content`} value={word.content} placeholder="Nhập từ" onBlur={() => push({ content: '', isQuestionAnswer: '', image: null, isAudioAnswer: false })}>

                                                                                                                    </Field>
                                                                                                                    <button
                                                                                                                        type="button"
                                                                                                                        className="secondary"
                                                                                                                        onClick={() => remove(index)}
                                                                                                                        className="exitThree"
                                                                                                                    ><img src="/image/cross.png"></img>
                                                                                                                    </button>
                                                                                                                </div>

                                                                                                            ))}
                                                                                                    </div>)}
                                                                                            </FieldArray>

                                                                                        </div>
                                                                                        <div className="answerSort">
                                                                                            <h5>ĐÁP ÁN:</h5>
                                                                                            <Field component="textarea" name="answerSort" id="answerSort" type="text" placeholder="Nhập đáp án..." className="textareaSort" defaultValue={""} />
                                                                                        </div>
                                                                                        {/* <button class="btn btn-addAnswer"><img src="/image/plus (3).png"> Thêm đáp án</button> */}
                                                                                    </div>
                                                                                </div>
                                                                            )
                                                                            : (check === 4 ?
                                                                                (
                                                                                    <div className="col-md-8 kedoc">
                                                                                        <div className="question">
                                                                                            <Field
                                                                                                className="titleQuestion"
                                                                                                placeholder="Nhập câu hỏi..."
                                                                                                type="text"
                                                                                                id="titleQuestion"
                                                                                                name="titleQuestion"
                                                                                                component="textarea"
                                                                                                defaultValue={""} />
                                                                                            {/* <img src="/image/picture (1).png" alt="img-question" class="img-question"> */}

                                                                                            <div className="boxWord">
                                                                                                <FieldArray name="answers">
                                                                                                    {({ remove, push }) => (
                                                                                                        <div className="words">
                                                                                                            {values.answers.length > 0 &&
                                                                                                                values.answers.map((word, index) => (
                                                                                                                    <div key={index} className="word">
                                                                                                                        <Field type="text" id="word" name={`answers.${index}.content`} placeholder="Nhập từ" onBlur={() => push({ content: '', isQuestionAnswer: '', image: null, isAudioAnswer: false })}>

                                                                                                                        </Field>
                                                                                                                        <button
                                                                                                                            type="button"
                                                                                                                            className="secondary"
                                                                                                                            onClick={() => remove(index)}
                                                                                                                            className="exitThree"
                                                                                                                        ><img src="/image/cross.png"></img>
                                                                                                                        </button>
                                                                                                                    </div>

                                                                                                                ))}
                                                                                                        </div>)}
                                                                                                </FieldArray>

                                                                                            </div>
                                                                                            <div className="answerSort">
                                                                                                <h5>ĐÁP ÁN:</h5>

                                                                                                <div className="answer answerText">
                                                                                                    <ol type="1">
                                                                                                        <FieldArray name="answers">
                                                                                                            {({ insert, remove, push }) => (
                                                                                                                <div>
                                                                                                                    {values.answers.length > 0 &&
                                                                                                                        values.answers.map((answer, index) => (
                                                                                                                            <div className="itemAnswer" key={index}>
                                                                                                                                <div className="row">
                                                                                                                                    <div className="col-1">
                                                                                                                                        <p className="textOrder"><li></li></p>

                                                                                                                                    </div>
                                                                                                                                    <div className="col-10">
                                                                                                                                        <Field
                                                                                                                                            name={`answers.${index}.content`}
                                                                                                                                            placeholder="Nhập đáp án..."
                                                                                                                                            type="text"
                                                                                                                                            className="answerFile"
                                                                                                                                            id="textAnswer"
                                                                                                                                        />
                                                                                                                                        <ErrorMessage
                                                                                                                                            name={`answers.${index}.name`}
                                                                                                                                            component="div"
                                                                                                                                            className="field-error"
                                                                                                                                        />
                                                                                                                                    </div>
                                                                                                                                    <div className="col-1">
                                                                                                                                        <button
                                                                                                                                            type="button"
                                                                                                                                            className="secondary"
                                                                                                                                            onClick={() => remove(index)}
                                                                                                                                            className="exit"
                                                                                                                                        ><img src="/image/cross.png"></img>
                                                                                                                                        </button>
                                                                                                                                    </div>

                                                                                                                                </div>
                                                                                                                            </div>
                                                                                                                        ))}
                                                                                                                    <button
                                                                                                                        type="button"
                                                                                                                        className="btn btn-addAnswer fa fa-plus"
                                                                                                                        onClick={() => push({ content: '', isQuestionAnswer: '', image: null, isAudioAnswer: false })}>
                                                                                                                        Thêm đáp án
                                                                      </button>
                                                                                                                </div>
                                                                                                            )}
                                                                                                        </FieldArray>
                                                                                                    </ol>
                                                                                                </div>

                                                                                            </div>
                                                                                            {/* <button class="btn btn-addAnswer"><img src="/image/plus (3).png"> Thêm đáp án</button> */}
                                                                                        </div>
                                                                                    </div>
                                                                                )
                                                                                :
                                                                                (
                                                                                    <div className="col-md-8 kedoc">
                                                                                        <div className="question">
                                                                                            <Field
                                                                                                className="titleQuestion"
                                                                                                placeholder="Nhập câu hỏi..."
                                                                                                type="text"
                                                                                                id="content"
                                                                                                name="content"
                                                                                                component="textarea"
                                                                                                required />
                                                                                            <div className="boxImg">
                                                                                                <Thumb file={values.file} />
                                                                                                <div className="itemImg">
                                                                                                    <Field type="file"
                                                                                                        accept="image/png, image/jpeg"
                                                                                                        className="item-question fa fa-camera "
                                                                                                        id="image"
                                                                                                        name="image"
                                                                                                        onChange={(event) => {
                                                                                                            setFieldValue("file", event.currentTarget.files[0]);
                                                                                                        }}
                                                                                                    />
                                                                                                    <img src="/image/delete1.png" className="img-question"
                                                                                                        onClick={() => {
                                                                                                            setFieldValue("file", null);
                                                                                                        }}></img>
                                                                                                </div>
                                                                                            </div>
                                                                                            <p>Là câu hỏi nghe:
                                                                        <Field
                                                                                                    type="checkbox"
                                                                                                    className="file mt-3"
                                                                                                    id="isAudioQuestion"
                                                                                                    name="isAudioQuestion" />
                                                                                            </p>

                                                                                            <div className="answer answerText">
                                                                                                <ol type="A">
                                                                                                    <FieldArray name="answers">
                                                                                                        {({ insert, remove, push }) => (
                                                                                                            <div>
                                                                                                                {values.answers.length > 0 &&
                                                                                                                    values.answers.map((answer, index) => (
                                                                                                                        <div className="itemAnswer" key={index}>
                                                                                                                            <div className="row" >
                                                                                                                                <div className="col-1">
                                                                                                                                    <p className="textOrder"><li></li></p>

                                                                                                                                </div>
                                                                                                                                <div className="col-9">
                                                                                                                                    <Field
                                                                                                                                        name={`answers.${index}.content`}
                                                                                                                                        placeholder="Nhập đáp án..."
                                                                                                                                        type="text"
                                                                                                                                        className="answerFile"
                                                                                                                                        id="content"
                                                                                                                                    />
                                                                                                                                    <ErrorMessage
                                                                                                                                        name={`answers.${index}.name`}
                                                                                                                                        component="div"
                                                                                                                                        className="field-error"
                                                                                                                                    />
                                                                                                                                </div>
                                                                                                                                <div className="col-1">

                                                                                                                                    <Field
                                                                                                                                        name={`answers.${index}.isQuestionAnswer`}
                                                                                                                                        className="radioAnswerFile"
                                                                                                                                        type="checkbox"
                                                                                                                                        id="isQuestionAnswer"
                                                                                                                                        onClick={(e) => this.checkAnswer(e, values)}
                                                                                                                                    />
                                                                                                                                    <ErrorMessage
                                                                                                                                        name={`answers.${index}.name`}
                                                                                                                                        component="div"
                                                                                                                                        className="field-error"
                                                                                                                                    />

                                                                                                                                </div>
                                                                                                                                <div className="col-1">
                                                                                                                                    <button
                                                                                                                                        type="button"
                                                                                                                                        className="secondary"
                                                                                                                                        onClick={() => remove(index)}
                                                                                                                                        className="exit"
                                                                                                                                    ><img src="/image/cross.png"></img>
                                                                                                                                    </button>
                                                                                                                                </div>

                                                                                                                            </div>
                                                                                                                        </div>
                                                                                                                    ))}
                                                                                                                {values.answers.length < 4 && <button
                                                                                                                    type="button"
                                                                                                                    className="btn btn-addAnswer fa fa-plus"
                                                                                                                    onClick={() => {
                                                                                                                        if (values.answers.length < 4) {
                                                                                                                            push({ content: '', isQuestionAnswer: false })
                                                                                                                        }
                                                                                                                    }}>
                                                                                                                    Thêm đáp án
                                                                      </button>}
                                                                                                            </div>
                                                                                                        )}
                                                                                                    </FieldArray>
                                                                                                </ol>
                                                                                            </div>

                                                                                        </div>
                                                                                    </div>
                                                                                ))))
                                                            }

                                                            <div className="col-md-4">
                                                                <div className="info-question">
                                                                    <div className="content">
                                                                        <div className="type">
                                                                            <p><img src="/image/info.png" /> Loại câu hỏi</p>
                                                                            {this.state.subject.type == 'Quiz' &&
                                                                                <Field
                                                                                    id="type"
                                                                                    as="select"
                                                                                    name="type"
                                                                                    value={this.state.questionSettings.type}
                                                                                    onChange={this.ToToggleForm}
                                                                                >
                                                                                    <option value="Quiz">Quiz</option>
                                                                                    <option value="QuizHinhAnh" >Quiz hình ảnh</option>
                                                                                    <option value="QuizSapXep" >Sắp xếp từ vựng</option>
                                                                                    <option value="QuizNoiTu" >Nối từ</option></Field>}
                                                                            {this.state.subject.type == 'Exam' &&
                                                                                <Field
                                                                                    id="type"
                                                                                    as="select"
                                                                                    name="type"
                                                                                    value={this.state.questionSettings.type}
                                                                                    onChange={this.ToToggleForm}>
                                                                                    <option value="Toeic" >Toeic</option>
                                                                                </Field>
                                                                            }

                                                                        </div>
                                                                        {this.state.subject.type == 'Quiz' ? <div>
                                                                            <div className="time mt-2">
                                                                                <p><img src="/image/clock (1).png" /> Thời gian trả lời câu hỏi</p>
                                                                                <Field
                                                                                    as="select"
                                                                                    id="duration"
                                                                                    name="duration"
                                                                                    value={this.state.questionSettings.duration}
                                                                                    onChange={(e) => this.questionSetting(e)}>

                                                                                    <option value="10">10 giây</option>
                                                                                    <option value="30">30 giây</option>
                                                                                    <option value="45">45 giây</option>
                                                                                    <option value="60">60 giây</option>
                                                                                    <option value="90">90 giây</option>
                                                                                </Field>
                                                                            </div>
                                                                            <div className="point mt-2">
                                                                                <p><img src="/image/surprise.png" /> Số điểm đạt được</p>
                                                                                <Field
                                                                                    id="score"
                                                                                    name="score"
                                                                                    as="select"
                                                                                    value={this.state.questionSettings.score}
                                                                                    onChange={(e) => this.questionSetting(e)}>
                                                                                    <option value="5">5 điểm</option>
                                                                                    <option value="10">10 điểm</option>
                                                                                    <option value="15">15 điểm</option>
                                                                                    <option value="20">20 điểm</option>
                                                                                </Field>
                                                                            </div>
                                                                        </div> : <div>
                                                                            <div className="time mt-2">
                                                                                <p><img src="/image/clock (1).png" /> Thuộc toeic part</p>
                                                                                <Field
                                                                                    as="select"
                                                                                    id="toeicPart"
                                                                                    name="toeicPart"
                                                                                    value={this.state.questionSettings.toeicPart}
                                                                                    onChange={(e) => this.questionSetting(e)}>
                                                                                    <option value="1">1</option>
                                                                                    <option value="2">2</option>
                                                                                    <option value="3">3</option>
                                                                                    <option value="4">4</option>
                                                                                    <option value="5">5</option>
                                                                                    <option value="6">6</option>
                                                                                    <option value="7">7</option>
                                                                                </Field>
                                                                            </div>
                                                                        </div>}

                                                                    </div>
                                                                    {Object.keys(this.state.selectedQuestion).length > 0 ? (
                                                                        <div className="row functionQuestion">
                                                                            <div className="col-md-4 ">
                                                                                <button type="reset" className="btn btn-danger fa fa-trash-o" onClick={() => { this.deleteQuestion(); resetForm() }} >Xóa</button>
                                                                            </div>
                                                                            <div className="col-md-4 f-edit">
                                                                                <button className="btn btn-success fa fa-save" onClick={(e) => this.saveQuestion(e, values)}>Lưu</button>
                                                                            </div>
                                                                            <div className="col-md-4 f-add">
                                                                                <button className="btn btn-add fa fa-plus" type="submit">Thêm</button>
                                                                            </div>
                                                                        </div>
                                                                    ) : (
                                                                        <div className="row functionQuestion">
                                                                            <div className="col-md-4 ">
                                                                                <button type="reset" className="btn btn-danger fa fa-trash-o" onClick={() => { this.deleteQuestion(); resetForm() }} >Xóa</button>
                                                                            </div>
                                                                            <div className="col-md-8 f-add">
                                                                                <button className="btn btn-add fa fa-plus" type="submit">Thêm</button>
                                                                            </div>

                                                                        </div>
                                                                    )

                                                                    }

                                                                </div>
                                                            </div>
                                                        </div>
                                                    </Form>
                                                )}
                                            </Formik>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
                <Modal show={this.state.error.modalStatus} onHide={this.modalTrigger}>
                    <Modal.Header closeButton onClick={() => this.modalTrigger()}>
                        <Modal.Title>Xác nhận xóa câu hỏi</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Bạn có chắc chắn muốn xóa câu hỏi này ra khỏi hệ thống không?</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => this.modalTrigger()}>Trở lại</Button>
                        <Button variant="primary">Lưu lại</Button>
                    </Modal.Footer>
                </Modal>

            </div>
        )
    }
}
const mapStateToProps = state => {
    const { account } = state.auth
    return {
        account: account
    }
}
export default connect(mapStateToProps)(Quiz_Exam);