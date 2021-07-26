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
import { Link } from "react-browser-router";
import BasicQuestionCreate from "./BasicQuestionCreate";
import ToeicQuestionCreate from "./ToeicQuestionCreate";
import ArrangeQuestionCreate from "./ArrangeQuestionCreate";
import ConnectionQuestionCreate from "./ConnectionQuestionCreate";
import { QuestionTypes } from "../../constants/QuestionTypes";
import QuestionPreview from "../question/QuestionPreview";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import parse from 'html-react-parser';
const info = {
    type: 'Quiz',
    title: '',
    description: '',
    difficult: 'easy',
    unlockPoint: 0,
    questions: [{

    }],
    duration: 0
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
    preQuestion: '',
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
        thumb: {},
    };
    constructor(props) {
        super(props)
        this.isComponentMounted = false;
    }

    componentDidMount() {
        this.isComponentMounted = true;
    }
    componentWillReceiveProps(nextProps) {
        if (!nextProps.file) {
            return;
        }

        this.setState({ loading: true }, () => {
            let reader = new FileReader();

            reader.onloadend = () => {
                if (this.isComponentMounted) {
                    this.setState({ loading: false, thumb: reader.result });
                }

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
            check: QuestionTypes.Basic,
            srcAnswer: '',
            active: true,

            subject: {
                type: 'Quiz',
                title: '',
                duration: 10,
                description: '',
                difficult: 'easy',
                questions: [
                ],
                pass: 0,
            },
            questionSettings: {
                type: 'Basic',
                duration: 10,
                score: 1,
                answerType: 1,
                toeicPart: 1,
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
            sections: [],
            modalQuestionPreview: false
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

        }
    }
    previewQuestion(question) {
        question = {
            preQuestion: question.preQuestion,
            content: question.content,
            answers: question.answers.map((answer, index) => ({ answer: answer.content })),
            type: question.type
        }
        return question
    }
    toggleQuestionPreviewModal() {
        this.setState({
            modalQuestionPreview: !this.state.modalQuestionPreview
        });
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
        console.log(this.state.questionSettings.type);
        switch (this.state.questionSettings.type) {
            case QuestionTypes.Conversation:
                return true;
            case QuestionTypes.Connection:
                if (values.answers.length == 0) {
                    toast('Câu hỏi thiếu đáp án', { type: 'warning', position: 'bottom-right' });
                } else {
                    var question = {
                        type: this.state.questionSettings.type,
                        preQuestion: values.preQuestion,
                        answers: values.answers.map((answer, index) => ({ content: `<p>${answer.contentLeft.trim()}</p><p>${answer.contentRight.trim()}</p>`, isQuestionAnswer: true }))
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
            case QuestionTypes.Arrange:
                if (values.content == '') {
                    toast('Nội dung câu hỏi sắp xếp không được để trống', { type: 'warning' })
                    return false;
                }
                var question = {
                    type: this.state.questionSettings.type,
                    preQuestion: values.preQuestion,
                    content: values.content.trim(),
                    answers: values.answers.map((answer, index) => ({ content: `<p>${answer.contentLeft.trim()}</p><p>${answer.contentRight.trim()}</p>`, isQuestionAnswer: true }))
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
            default:
                if (!values.answers.some(ans => ans.isQuestionAnswer) && this.state.questionSettings.type) {
                    toast('Câu hỏi phải có đáp án đúng', { type: 'warning', position: 'bottom-right' })
                    return false;
                }
                else {
                    if (values.content != '' && values.answers.length > 0 && values.answers.some(a => a.isQuestionAnswer === true)) {
                        var question = {
                            type: this.state.questionSettings.type,
                            preQuestion: values.preQuestion,
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
    ToToggleForm = (value) => {
        this.setState({
            questionSettings: { ...this.state.questionSettings, type: value },
            check: value,
        })
        this.resetQuestionForm();
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
                this.ToToggleForm(value.question.type)
                this.setState({
                    ...this.state,
                    selectedQuestion: value.question,
                    tempQuestion: value,
                    questionSettings: {
                        ...this.state.questionSettings,
                        check: value.question.type
                    }
                });

                question.answers = value.question.answers
                question.content = value.question.content
                question.isAudioQuestion = value.question.isAudioQuestion
                question.words = value.question.answers
                question.image = value.question.image
                question.preQuestion = value.question.preQuestion
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
        if (values.content != '' && values.answers.length > 0 && values.answers.some(a => a.isQuestionAnswer === true) || this.state.questionSettings.type == QuestionTypes.Arrange) {
            var question = {
                preQuestion: values.preQuestion,
                content: values.content,
                image: values.file,
                isAudioQuestion: values.isAudioQuestion,
                engVoice: values.engVoice,
                toeicPart: Number.parseInt(this.state.questionSettings.toeicPart),
                explaination: values.explain,
                answers: values.answers.filter(q => q.content != ''),
                selected: false
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
        switch (this.state.subject.type) {
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
                console.log(this.state.subject);
                var formData = new FormData();
                formData.set('title', values.title);
                formData.set('detail', values.description);
                formData.set('difficultLevel', values.difficult);
                formData.set('isPrivate', this.state.side ? false : true);
                formData.set('duration', values.duration);
                tempQuestions.forEach((value) => {
                    formData.append('QuestionImages', value.image);
                })
                formData.set('stringifyQuestions', JSON.stringify(tempQuestions));
                // let exam = {
                //     title: values.title,
                //     detail: values.description,
                //     difficultLevel: values.difficult,
                //     isPrivate: true,
                //     pass: 10,
                //     examQuestions: tempQuestions,
                //     duration: 100
                // }
                // console.log(exam);
                var result = await examApiv2.create(formData, this.state.side)
                if (result != null) {
                    toast('Thêm exam thành công', { type: 'success' })
                    this.setState({
                        subject: {
                            questions: []
                        },
                    })
                } else {
                    toast('Thêm exam thất bại', { type: 'info' })
                }
                break;
            default:
                break;
        }

    }
    resetQuestionForm = () => {
        this.setState({
            selectedQuestion: {},
            tempQuestion: {}
        })
        this.clearQuestion();
    }
    changeType = (e) => {
        e.preventDefault();
        switch (e.target.value) {
            case "Quiz":
                this.setState({
                    check: 1,
                    questionSettings: {
                        ...this.state.questionSettings,
                        type: QuestionTypes.Basic
                    },
                    subject: {
                        ...this.state.subject,
                        selectedQuestion: {},
                        type: e.target.value,
                        questions: []
                    }
                })
                break;
            case "Exam":
                this.setState({
                    check: 5,
                    questionSettings: {
                        ...this.state.questionSettings,
                        type: 'Toeic'
                    },
                    subject: {
                        ...this.state.subject,
                        selectedQuestion: {},
                        type: e.target.value,
                        questions: []
                    }
                })
                break;
            default:
                break;
        }
    }
    checkAnswer = (e, values) => {
        if (e.target.checked) {
            if (this.state.questionSettings.type == QuestionTypes.Basic || this.state.subject.type == 'Exam') {
                values.answers.forEach((value, index) => {
                    if (index == e.target.dataset.id) {
                        value.isQuestionAnswer = true;
                    } else {
                        value.isQuestionAnswer = false;
                    }
                })
            }
        }
    }

    render() {
        // var srcc = this.state.src.replace("C:\\fakepath\\", "/image/");
        // var srcAnswer = this.state.srcAnswer.replace("C:\\fakepath\\", "/image/");
        var { check, active } = this.state;
        console.log(this.state.selectedQuestion);
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
                                        <div className="col-md-3 border border-top-0 border-primary">
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
                                                                    onChange={(e) => this.changeType(e)}
                                                                    value={this.state.subject.type}>
                                                                    <option value="Quiz">Quiz</option>
                                                                    <option value="Exam">Exam</option>
                                                                </Field>
                                                            </div>

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
                                                                    name="difficult"
                                                                >
                                                                    <option value="easy">Dễ</option>
                                                                    <option value="medium">Vừa</option>
                                                                    <option value="hard">Khó</option>
                                                                </Field>
                                                            </div>
                                                            {this.state.subject.type == 'Exam' && <div className="level">
                                                                <label htmlFor="level">Thời gian làm bài</label>
                                                                <Field
                                                                    type="number"
                                                                    placeholder="Thời gian làm bài (phút)"
                                                                    name="duration"
                                                                    id="duration"
                                                                    required></Field>
                                                            </div>}

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
                                                        <div className={this.state.selectedQuestion == question.question ? 'cardActive' : 'card'} key={index} data-index={index} onClick={() => { this.selectQuestion(index); this.toggleQuestionPreviewModal() }}>
                                                            <p className="order">Câu hỏi <li></li></p>
                                                            <div className="card bg-light">
                                                                <div className="card-body">
                                                                    <div className="question">{parse(question.question.preQuestion || '')}</div>
                                                                    <div className="card-title text-center">
                                                                        <div className="question">{parse(question.question.content || '')}</div>
                                                                        {question.question.image != null ? <Thumb file={question.question.image} /> : <img src="/image/english (1).jpg" />}
                                                                    </div>
                                                                    <div className="row">
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}
                                                    {/* <button className="btn btn-add" type="submit"><img src="/image/plus (1).png" /> Thêm câu hỏi</button> */}

                                                </ol>
                                            </div>
                                            <Modal show={this.state.modalQuestionPreview} onHide={() => this.toggleQuestionPreviewModal()} contentClassName="modal-basic-content">
                                                <Modal.Header closeButton onClick={() => this.toggleQuestionPreviewModal()}>
                                                    <Modal.Title>Preview câu hỏi</Modal.Title>
                                                </Modal.Header>
                                                <Modal.Body>
                                                    {Object.keys(this.state.selectedQuestion).length > 0 && <QuestionPreview question={this.previewQuestion(this.state.selectedQuestion)}></QuestionPreview>}
                                                </Modal.Body>
                                                <Modal.Footer>
                                                    <Button variant="secondary" onClick={() => this.toggleQuestionPreviewModal()}>
                                                        Đóng
                                                    </Button>
                                                </Modal.Footer>
                                            </Modal>
                                            <Link className="exit" to="/admin/quan-ly-quiz-exam" >Quay lại</Link>
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
                                                {({ values, setFieldValue, resetForm, errors, touched }) => (
                                                    <Form>
                                                        <div className="row">
                                                            {
                                                                check === QuestionTypes.Basic ?
                                                                    (
                                                                        <BasicQuestionCreate errors={errors} touched={touched} values={values} checkAnswer={this.checkAnswer} setFieldValue={setFieldValue}></BasicQuestionCreate>
                                                                    )
                                                                    : (check === QuestionTypes.Arrange ?
                                                                        (
                                                                            <ArrangeQuestionCreate values={values} setFieldValue={setFieldValue}></ArrangeQuestionCreate>
                                                                        )
                                                                        : (check === QuestionTypes.Connection ?
                                                                            (
                                                                                <ConnectionQuestionCreate values={values}></ConnectionQuestionCreate>
                                                                            )
                                                                            : (check === QuestionTypes.Select ?
                                                                                (
                                                                                    <ConnectionQuestionCreate values={values}></ConnectionQuestionCreate>
                                                                                )
                                                                                :
                                                                                (
                                                                                    <ToeicQuestionCreate values={values} setFieldValue={setFieldValue} checkAnswer={this.checkAnswer}></ToeicQuestionCreate>
                                                                                ))))
                                                            }

                                                            <div className="col-md-4 border border-top-0 border-info">
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
                                                                                    onChange={(e) => this.ToToggleForm(e.target.value)}
                                                                                >
                                                                                    <option value="Basic">Mặc định</option>
                                                                                    <option value="Arrange" >Sắp xếp</option>
                                                                                    <option value="Connection" >Nối từ</option>
                                                                                    <option value="Conversation" >Hội thoại</option>
                                                                                    <option value="FillOut" >Điền chỗ trống 1</option>
                                                                                    <option value="Select" >Điền chỗ trống 2</option>
                                                                                </Field>
                                                                            }
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