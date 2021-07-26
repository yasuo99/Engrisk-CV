import React, { Component } from "react";
import { Formik, Field, Form, ErrorMessage, FieldArray, FormikProvider } from 'formik';
const question = {
    answers: [
        {
            content: '',
            isQuestionAnswer: false,
        },
    ],
    content: '',
    type: '',
    isAudioQuestion: false,
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
class QuizImage extends Component {
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
    render() {
        return (
            <div id="wrapper">
                <div id="quiz">
                    <section className="main">
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
                                    </div> </Form>)}
                        </Formik>
                    </section>
                </div>
            </div>
        )
    }
} export default QuizImage;