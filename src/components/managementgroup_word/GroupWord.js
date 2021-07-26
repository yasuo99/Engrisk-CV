import React, { Component } from "react";
import { Formik, Field, Form, ErrorMessage, FieldArray } from 'formik';
import SubMenu from "../admin/SubMenu";
import HeaderAdmin3 from "../admin/HeaderAdmin3";
import { Button, Modal } from 'react-bootstrap'
import Switch from "react-switch";
import { Link } from 'react-browser-router'
const groupWord = {
    title: "",
    description: "",
    word: [{
        vocabulary: "",
        topic: "",
    }],
}
class GroupWord extends Component {

    constructor(props) {
        super(props);
        this.state = {
            error: {
                content: '',
                modalStatus: false,
            },
            checked: false
        }
        this.handleChange = this.handleChange.bind(this);
    }
    handleOnchange = (e) => {
        this.setState({ selectValue: e.target.value });

    }
    handleChange(checked) {
        this.setState({ checked });
    }
    render() {

        return (
            <div id="wrapper">
                <SubMenu></SubMenu>
                <div id="content-wrapper" className="d-flex flex-column">

                    <div id="groupWord">
                        <div id="content">
                            <HeaderAdmin3></HeaderAdmin3>
                            <section className="main">
                                <div className="container-fluid mt-4">
                                    <Link className="fa fa-chevron-left" to="/quanly-groupword"> <i>Trở về</i></Link>
                                    <div className="row">
                                        <div className="col-md-10 offset-md-1">
                                            <Formik
                                                initialValues={groupWord}
                                                onSubmit={async (values, { resetForm }) => {
                                                    await new Promise((r) => setTimeout(r, 500));
                                                    alert(JSON.stringify(values, null, 2));
                                                    resetForm({})
                                                }}>
                                                {({ resetForm }) => (
                                                    
                                                    <Form className="content">
                                                        <p className="titleGroupWord">THÔNG TIN NHÓM TỪ VỰNG</p>
                                                        <div className="title">
                                                                    <div className="row">
                                                                        <div className="col-md-3 text-right pt-2"><label htmlFor="title">Tên nhóm từ vựng</label></div>
                                                                        <div className="col-md-9">
                                                                            <Field
                                                                                placeholder="Nhập tên nhóm từ vựng"
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
                                                                                placeholder="Mô tả nhóm từ vựng"
                                                                                type="text"
                                                                                name='description'
                                                                                id='description'></Field>
                                                                        </div>
                                                                    </div>


                                                        </div>
                                                        {/* <div className="kengang"></div> */}
                                                        <div className="boxWord">
                                                            <div className="headerBox">
                                                                <h4>Danh sách từ vựng giao tiếp</h4>
                                                            </div>
                                                            <div className="contentBox">
                                                                <div className="topicWord ">
                                                                    <select
                                                                        type="select"
                                                                        name="topicWord"
                                                                        id="topicWord"
                                                                    >
                                                                        <option value="communication">Giao tiếp</option>
                                                                        <option value="toeic">Toeic</option>

                                                                    </select>
                                                                </div>
                                                                <div className="row mb-3">
                                                                    <div className="col-md-3">
                                                                        <div className="card">
                                                                            <div className="row">
                                                                                <div className="col-md-8">
                                                                                    <h6>Mother (n)</h6>
                                                                                    <p>Mẹ</p>
                                                                                </div>
                                                                                <div className="col-md-4 text-right">
                                                                                    <input type="checkbox"></input>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-md-3">
                                                                        <div className="card">
                                                                            <div className="row">
                                                                                <div className="col-md-8">
                                                                                    <h6>Mother (n)</h6>
                                                                                    <p>Mẹ</p>
                                                                                </div>
                                                                                <div className="col-md-4 text-right">
                                                                                    <input type="checkbox"></input>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-md-3">
                                                                        <div className="card">
                                                                            <div className="row">
                                                                                <div className="col-md-8">
                                                                                    <h6>Mother (n)</h6>
                                                                                    <p>Mẹ</p>
                                                                                </div>
                                                                                <div className="col-md-4 text-right">
                                                                                    <input type="checkbox"></input>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-md-3">
                                                                        <div className="card">
                                                                            <div className="row">
                                                                                <div className="col-md-8">
                                                                                    <h6>Mother (n)</h6>
                                                                                    <p>Mẹ</p>
                                                                                </div>
                                                                                <div className="col-md-4 text-right">
                                                                                    <input type="checkbox"></input>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="row mb-3">
                                                                    <div className="col-md-3">
                                                                        <div className="card">
                                                                            <div className="row">
                                                                                <div className="col-md-8">
                                                                                    <h6>Mother (n)</h6>
                                                                                    <p>Mẹ</p>
                                                                                </div>
                                                                                <div className="col-md-4 text-right">
                                                                                    <input type="checkbox"></input>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-md-3">
                                                                        <div className="card">
                                                                            <div className="row">
                                                                                <div className="col-md-8">
                                                                                    <h6>Mother (n)</h6>
                                                                                    <p>Mẹ</p>
                                                                                </div>
                                                                                <div className="col-md-4 text-right">
                                                                                    <input type="checkbox"></input>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-md-3">
                                                                        <div className="card">
                                                                            <div className="row">
                                                                                <div className="col-md-8">
                                                                                    <h6>Mother (n)</h6>
                                                                                    <p>Mẹ</p>
                                                                                </div>
                                                                                <div className="col-md-4 text-right">
                                                                                    <input type="checkbox"></input>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-md-3">
                                                                        <div className="card">
                                                                            <div className="row">
                                                                                <div className="col-md-8">
                                                                                    <h6>Mother (n)</h6>
                                                                                    <p>Mẹ</p>
                                                                                </div>
                                                                                <div className="col-md-4 text-right">
                                                                                    <input type="checkbox"></input>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="row mb-3">
                                                                    <div className="col-md-3">
                                                                        <div className="card">
                                                                            <div className="row">
                                                                                <div className="col-md-8">
                                                                                    <h6>Mother (n)</h6>
                                                                                    <p>Mẹ</p>
                                                                                </div>
                                                                                <div className="col-md-4 text-right">
                                                                                    <input type="checkbox"></input>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-md-3">
                                                                        <div className="card">
                                                                            <div className="row">
                                                                                <div className="col-md-8">
                                                                                    <h6>Mother (n)</h6>
                                                                                    <p>Mẹ</p>
                                                                                </div>
                                                                                <div className="col-md-4 text-right">
                                                                                    <input type="checkbox"></input>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-md-3">
                                                                        <div className="card">
                                                                            <div className="row">
                                                                                <div className="col-md-8">
                                                                                    <h6>Mother (n)</h6>
                                                                                    <p>Mẹ</p>
                                                                                </div>
                                                                                <div className="col-md-4 text-right">
                                                                                    <input type="checkbox"></input>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-md-3">
                                                                        <div className="card">
                                                                            <div className="row">
                                                                                <div className="col-md-8">
                                                                                    <h6>Mother (n)</h6>
                                                                                    <p>Mẹ</p>
                                                                                </div>
                                                                                <div className="col-md-4 text-right">
                                                                                    <input type="checkbox"></input>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="row mb-3">
                                                                    <div className="col-md-3">
                                                                        <div className="card">
                                                                            <div className="row">
                                                                                <div className="col-md-8">
                                                                                    <h6>Mother (n)</h6>
                                                                                    <p>Mẹ</p>
                                                                                </div>
                                                                                <div className="col-md-4 text-right">
                                                                                    <input type="checkbox"></input>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-md-3">
                                                                        <div className="card">
                                                                            <div className="row">
                                                                                <div className="col-md-8">
                                                                                    <h6>Mother (n)</h6>
                                                                                    <p>Mẹ</p>
                                                                                </div>
                                                                                <div className="col-md-4 text-right">
                                                                                    <input type="checkbox"></input>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-md-3">
                                                                        <div className="card">
                                                                            <div className="row">
                                                                                <div className="col-md-8">
                                                                                    <h6>Mother (n)</h6>
                                                                                    <p>Mẹ</p>
                                                                                </div>
                                                                                <div className="col-md-4 text-right">
                                                                                    <input type="checkbox"></input>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-md-3">
                                                                        <div className="card">
                                                                            <div className="row">
                                                                                <div className="col-md-8">
                                                                                    <h6>Mother (n)</h6>
                                                                                    <p>Mẹ</p>
                                                                                </div>
                                                                                <div className="col-md-4 text-right">
                                                                                    <input type="checkbox"></input>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="row justify-content-center function">
                                                            <div className="col-md-2">
                                                                <button className="btn f1" onClick={() => resetForm(groupWord)}>Cài lại</button>
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
export default GroupWord;