import React, { Component } from "react";
import { Formik, Field, Form, ErrorMessage, FieldArray } from 'formik';
import HeaderClient from "../client/HeaderClient";
import SubMenuClient from "../client/SubMenuClient";
import { Button, Modal } from 'react-bootstrap'
import quizApi from "../../api/2.0/quizApi";
import SubMenu from "../admin/SubMenu";
import HeaderAdmin3 from "../admin/HeaderAdmin3";
import { Link } from 'react-browser-router'
const section = {
    title: "",
    description: "",
    quiz: [{
        titleQuiz: "",
        descriptionQuiz: "",
    }],
    word: [{
        vocabulary: "",
        topic: "",
    }],
}
class Section extends Component {

    constructor(props) {
        super(props);
        this.state = {
            error: {
                content: '',
                modalStatus: false
            }

        }
    }
    handleOnchange = (e) => {
        this.setState({ selectValue: e.target.value });

    }
    render() {

        return (
            <div id="wrapper">
                <SubMenuClient></SubMenuClient>
                <div id="content-wrapper" className="d-flex flex-column">

                    <div id="section">
                        <div id="content">
                            <HeaderAdmin3></HeaderAdmin3>
                            <section className="main">
                                <div className="container mt-4">
                                    <div className="row">
                                    <Link className="fa fa-chevron-left" to="/user/quanly-section"> <i>Trở về</i></Link>
                                        <div className="col-md-10 offset-md-1">
                                            <Formik
                                                initialValues={section}
                                                onSubmit={async (values, { resetForm }) => {
                                                    await new Promise((r) => setTimeout(r, 500));
                                                    alert(JSON.stringify(values, null, 2));
                                                    resetForm({})
                                                }}>
                                                {({ resetForm }) => (
                                                    <Form className="content">
                                                        <p className="titleSection">THÔNG TIN BÀI HỌC</p>
                                                        <div className="title">
                                                            <div className="row">
                                                                <div className="col-md-3 text-right pt-2">  <label htmlFor="title">Tên bài học</label></div>
                                                                <div className="col-md-9">
                                                                    <Field
                                                                        placeholder="Nhập tên bài học"
                                                                        type="text"
                                                                        name='title'
                                                                        id='title'></Field>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="description">
                                                            <div className="row">
                                                                <div className="col-md-3 text-right pt-2"><label htmlFor="description">Mô tả</label></div>
                                                                <div className="col-md-9">
                                                                    <Field
                                                                        placeholder="Mô tả bài học"
                                                                        type="text"
                                                                        name='description'
                                                                        id='description'></Field>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="listQuiz ">
                                                            <div className="row">
                                                                <div className="col-md-3 text-right pt-2"><label htmlFor="listQuiz">Danh sách bài quiz</label></div>
                                                                <div className="col-md-9">
                                                                    <Field
                                                                        as="select"
                                                                        name="quiz"
                                                                        id="quiz"
                                                                    >
                                                                        <option value="communication1">Giao tiếp cơ bản 1</option>
                                                                        <option value="communication2">Giao tiếp cơ bản 2</option>

                                                                    </Field>
                                                                </div>
                                                                <div className="col-md-9 offset-md-3 ">
                                                                    <div className="boxQuiz">
                                                                        <Formik
                                                                            initialValues={section}
                                                                            onSubmit={(values, { resetForm }) => {
                                                                                resetForm({})
                                                                            }}>
                                                                            {({ values, resetForm }) => (
                                                                                <Form className="content">
                                                                                    <FieldArray name="quiz">
                                                                                        {({ remove, push }) => (
                                                                                            <div>{
                                                                                                values.quiz.map((quiz, index) => (

                                                                                                    <div className="row" key={index}>
                                                                                                        <div className="col">
                                                                                                                <div className="cardQuiz" >
                                                                                                                    <div className="row">
                                                                                                                        <div className="col-md-10">
                                                                                                                            <h4 className="titleQuiz"
                                                                                                                                name={`quiz.${index}.titleQuiz`}
                                                                                                                                id={`quiz.${index}.titleQuiz`}>
                                                                                                                                Giao tiếp cơ bản 1</h4></div>
                                                                                                                        <div className="col-md-2 text-right mt-1">
                                                                                                                            <button
                                                                                                                                type="button"
                                                                                                                                className="fa fa-lg fa-times-circle"
                                                                                                                                onClick={() => remove(index)}
                                                                                                                            >
                                                                                                                            </button>
                                                                                                                        </div>
                                                                                                                        <p className="descriptionQuiz"
                                                                                                                            name={`quiz.${index}.descriptionQuiz`}
                                                                                                                            id={`quiz.${index}.descriptionQuiz`}>
                                                                                                                            Chủ đề giao tiếp hằng ngày gồm: chào hỏi, giới thiệu bản thân
                                                                                                                    </p>
                                                                                                                    </div>
                                                                                                                </div>
                                                                                                            </div>
                            
                                                                                                    </div>

                                                                                                ))
                                                                                            }
                                                                                            </div>
                                                                                        )}
                                                                                    </FieldArray>

                                                                                </Form>
                                                                            )}

                                                                        </Formik>

                                                                    </div>
                                                                </div>
                                                            </div>


                                                        </div>
                                                        <div className="listWord ">
                                                            <div className="row">
                                                                <div className="col-md-3 text-right pt-2"> <label htmlFor="listQuiz">Danh sách từ vựng</label></div>
                                                                <div className="col-md-9">
                                                                    <Field
                                                                        as="select"
                                                                        name="word"
                                                                        id="word">
                                                                        <option value="animal">Động vật</option>
                                                                        <option value="family">Gia đình</option>
                                                                        <option value="house">Nhà cửa</option>
                                                                        <option value="school">Trường học</option>
                                                                    </Field>
                                                                </div>
                                                                <div className="col-md-9 offset-md-3 ">
                                                                    <div className="boxWord">
                                                                        <Formik
                                                                            initialValues={section}
                                                                            onSubmit={(values, { resetForm }) => {
                                                                                resetForm({})
                                                                            }}>
                                                                            {({ values, resetForm }) => (
                                                                                <Form className="content">
                                                                                    <FieldArray name="quiz">
                                                                                        {({ remove, push }) => (
                                                                                            <div>{
                                                                                                values.word.map((word, index) => (

                                                                                                    <div className="row" key={index}>
                                                                                                        <div className="col">
                                                                                                                <div className="cardWord" >
                                                                                                                    <div className="row">
                                                                                                                        <div className="col-md-10">
                                                                                                                            <h4 className="titleWord"
                                                                                                                                name={`word.${index}.titleWord`}
                                                                                                                                id={`word.${index}.titleWord`}>
                                                                                                                                Động vật</h4></div>
                                                                                                                        <div className="col-md-2 text-right mt-1">
                                                                                                                            <button
                                                                                                                                type="button"
                                                                                                                                className="fa fa-lg fa-times-circle"
                                                                                                                                onClick={() => remove(index)}
                                                                                                                            >
                                                                                                                            </button>
                                                                                                                        </div>
                                                                                                                        <p className="descriptionWord"
                                                                                                                            name={`wprd.${index}.descriptionWord`}
                                                                                                                            id={`word.${index}.descriptionWord`}>
                                                                                                                            Chủ đề từ vựng về động vật
                                                                                                                    </p>
                                                                                                                    </div>
                                                                                                                </div>
                                                                                                            </div>
                            
                                                                                                    </div>

                                                                                                ))
                                                                                            }
                                                                                            </div>
                                                                                        )}
                                                                                    </FieldArray>

                                                                                </Form>
                                                                            )}

                                                                        </Formik>

                                                                    </div>
                                                                </div>
                                                          
                                                            </div>
                                                          </div>
                                                        <div className="row justify-content-center function mb-4">
                                                            <div className="col-md-2">
                                                                <button className="btn f1" onClick={() => resetForm(section)}>Cài lại</button>
                                                            </div>
                                                            <div className="col-md-2">
                                                                <button className="btn f2" type="submit">Lưu lại</button>
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
export default Section;