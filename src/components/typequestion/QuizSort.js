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
class QuizSort extends Component {
    handleResetAnswer = (e) => {
        this.setState({
            srcAnswer: '',
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
                                </Form>)}
                        </Formik>
                    </section>
                </div>
            </div>
        )
    }
} export default QuizSort;