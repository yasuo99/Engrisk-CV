import React, { Component } from 'react';
import { Link } from "react-browser-router";
import SubMenu from "../admin/SubMenu";
import HeaderAdmin3 from "../admin/HeaderAdmin3";
import { Formik, Field, Form, ErrorMessage, FieldArray } from 'formik';
const word = {
    vocabulary: '',
    topic: 'Giao tiếp hàng ngày',
    typeOfWords: [{

    }],
}
const typeOfWord = {
    type: '',
    defines: [{
    }]
}
const define = {
    pronounce: '',
    position: '',
    mean: '',
    example: '',
    synonyms: [{}],
}
const synonym = {
    synonym: '',
}

const memory = {
    fileMemory: '',
    contentMemory: '',
}
class Word extends Component {

    render() {
        return (
            <div>
                <div id="wrapper">
                    <SubMenu></SubMenu>
                    <div id="content-wrapper" className="d-flex flex-column">
                        <div id="content">
                            <HeaderAdmin3></HeaderAdmin3>
                            <div className="container word">
                                <Link className="fa fa-chevron-left mt-2" to="/quanly-tuvung"> <i>Trở về</i></Link>
                                <div className="row p-LeftRight">
                                    <div className="col-md-4 border-wordLeft"></div>
                                    <div className="col-md-4 text-center title">
                                        <h4>THÔNG TIN TỪ VỰNG</h4>
                                    </div>
                                    <div className="col-md-4 border-wordRight"></div>
                                </div>
                                <Formik
                                    initialValues={word}
                                    onSubmit={async (values, { resetForm }) => {
                                        await new Promise((r) => setTimeout(r, 500));
                                        alert(JSON.stringify(values, null, 2));
                                        resetForm({})
                                    }}
                                >
                                    {({ values, resetForm }) => (
                                        <Form className="content">
                                            <div className="row">
                                                <div className="col-md-10 offset-md-1">
                                                    <div className="vocabulary">
                                                        <div className="row">
                                                            <div className="col-md-3 text-right pt-2">
                                                                <label htmlFor="vocabulary">
                                                                    Từ vựng:
                                                                </label>

                                                            </div>
                                                            <div className="col-md-9">
                                                                <Field
                                                                    type="text"
                                                                    placeholder="Nhập từ vựng"
                                                                    required
                                                                    id="vocabulary"
                                                                    name="vocabulary">
                                                                </Field>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="topic">
                                                        <div className="row">
                                                            <div className="col-md-3 text-right pt-2">
                                                                <label htmlFor="topic">Chủ đề:</label>
                                                            </div>
                                                            <div className="col-md-9">
                                                                <Field
                                                                    as="select"
                                                                    name="topic"
                                                                    id="topic">
                                                                    <option value="Giao tiếp hằng ngày">Giao tiếp hằng ngày</option>
                                                                    <option value="Toeic">Toeic</option>
                                                                </Field>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="boxType">
                                                        <FieldArray name="typeOfWords">
                                                            {({ remove, push }) => (
                                                                <div className="typeOfWords">
                                                                    {values.typeOfWords.length > 0 &&
                                                                        values.typeOfWords.map((typeOfWords, index) => (
                                                                            <div>
                                                                                <div key={index} className="typeOfWord">
                                                                                    <div className="row">
                                                                                        <div className="col-md-1">
                                                                                            <button
                                                                                                type="button"
                                                                                                onClick={() => remove(index)}
                                                                                                className="exit fa fa-lg fa-times-circle pl-3"
                                                                                            >
                                                                                            </button>
                                                                                        </div>
                                                                                        <div className="col-md-2 text-right pt-2">
                                                                                            <label htmlFor="typeOfWord">
                                                                                                Loại từ:
                                                                                        </label>
                                                                                        </div>
                                                                                        <div className="col-md-9">
                                                                                            <Field
                                                                                                type="text"
                                                                                                placeholder="Nhập loại từ"
                                                                                                required
                                                                                                id={`typeOfWords.${index}.type`}
                                                                                                name={`typeOfWords.${index}.type`}>
                                                                                            </Field>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>

                                                                                <Formik
                                                                                    initialValues={typeOfWord}
                                                                                    onSubmit={async (values, { resetForm }) => {
                                                                                        await new Promise((r) => setTimeout(r, 500));
                                                                                        alert(JSON.stringify(values, null, 2));
                                                                                        resetForm({})
                                                                                        }
                                                                                    }
                                                                                >
                                                                                    {({ values, resetForm }) => (
                                                                                        <Form className="content">
                                                                                            <FieldArray name="defines">
                                                                                                {({ remove, push }) => (
                                                                                                    <div className="row">
                                                                                                    <div className="col-md-10 offset-md-1">
                                                                                                    <div className="defines">
                                                                                                        {values.defines.length > 0 &&
                                                                                                            values.defines.map((defines, index) => (
                                                                                                                <div>
                                                                                                                    <div key={index} className="pronounce">
                                                                                                                        <div className="row">
                                                                                                                            <div className="col-md-3 text-right pt-2">
                                                                                                                                <button
                                                                                                                                    type="button"
                                                                                                                                    onClick={() => remove(index)}
                                                                                                                                    className="exit pr-5 fa fa-lg fa-times-circle"
                                                                                                                                >
                                                                                                                                </button>
                                                                                                                                <label htmlFor="pronounce">
                                                                                                                                    Phát âm: </label>
                                                                                                                            </div>
                                                                                                                            <div className="col-md-9">
                                                                                                                                <Field
                                                                                                                                    type="text"
                                                                                                                                    placeholder="Nhập phát âm"
                                                                                                                                    required
                                                                                                                                    id={`defines.${index}.pronounce`}
                                                                                                                                    name={`defines.${index}.pronounce`}>
                                                                                                                                </Field>
                                                                                                                            </div>
                                                                                                                        </div>
                                                                                                                    </div>
                                                                                                                    <div key={index} className="position">
                                                                                                                        <div className="row">
                                                                                                                            <div className="col-md-3 text-right pt-2">
                                                                                                                                <label htmlFor="position">
                                                                                                                                    Vị trí:
                                                                                                    </label>
                                                                                                                            </div>
                                                                                                                            <div className="col-md-9">
                                                                                                                                <Field
                                                                                                                                    type="text"
                                                                                                                                    placeholder="Nhập vị trí trong câu"
                                                                                                                                    required
                                                                                                                                    id={`defines.${index}.position`}
                                                                                                                                    name={`defines.${index}.position`}>
                                                                                                                                </Field>
                                                                                                                            </div>
                                                                                                                        </div>
                                                                                                                    </div>
                                                                                                                    <div key={index} className="mean">
                                                                                                                        <div className="row">
                                                                                                                            <div className="col-md-3 text-right pt-2">
                                                                                                                                <label htmlFor="mean">
                                                                                                                                    Nghĩa của từ:
                                                                                                    </label>
                                                                                                                            </div>
                                                                                                                            <div className="col-md-9">
                                                                                                                                <Field
                                                                                                                                    type="text"
                                                                                                                                    placeholder="Nhập nghĩa của từ"
                                                                                                                                    required
                                                                                                                                    id={`defines.${index}.mean`}
                                                                                                                                    name={`defines.${index}.mean`}>
                                                                                                                                </Field>
                                                                                                                            </div>
                                                                                                                        </div>
                                                                                                                    </div>
                                                                                                                    <div key={index} className="example">
                                                                                                                        <div className="row">
                                                                                                                            <div className="col-md-3 text-right pt-2">
                                                                                                                                <label htmlFor="example">
                                                                                                                                    Ví dụ:
                                                                                                    </label>
                                                                                                                            </div>
                                                                                                                            <div className="col-md-9">
                                                                                                                                <Field
                                                                                                                                    type="text"
                                                                                                                                    placeholder="Nhập ví dụ"
                                                                                                                                    required
                                                                                                                                    id={`defines.${index}.example`}
                                                                                                                                    name={`defines.${index}.example`}>
                                                                                                                                </Field>
                                                                                                                            </div>
                                                                                                                        </div>
                                                                                                                    </div>
                                                                                                                    <Formik
                                                                                                                        initialValues={define}
                                                                                                                        onSubmit={async (values, { resetForm }) => {
                                                                                                                            await new Promise((r) => setTimeout(r, 500));
                                                                                                                            alert(JSON.stringify(values, null, 2));
                                                                                                                            resetForm({})
                                                                                                                        }}
                                                                                                                    >
                                                                                                                        {({ values, resetForm }) => (
                                                                                                                            <Form>
                                                                                                                                <div className="boxSynonym">
                                                                                                                                    <div className="row">
                                                                                                                                        <div className="col-md-3 text-right pt-2">
                                                                                                                                            <label htmlFor="synonym">Từ đồng nghĩa:</label>
                                                                                                                                        </div>
                                                                                                                                        <div className="col-md-9">
                                                                                                                                            <div className="contentSynonym">

                                                                                                                                                <FieldArray name="synonyms">
                                                                                                                                                    {({ remove, push }) => (
                                                                                                                                                        <div className="synonyms">
                                                                                                                                                            {values.synonyms.length > 0 &&
                                                                                                                                                                values.synonyms.map((synonym, index) => (
                                                                                                                                                                    <div key={index} className="synonym">
                                                                                                                                                                        <Field type="text" id="synonym" name={`synonyms.${index}.synonym`} placeholder="Nhập từ" onBlur={() => push({ synonym: '', })}>

                                                                                                                                                                        </Field>
                                                                                                                                                                        <button
                                                                                                                                                                            type="button"
                                                                                                                                                                            onClick={() => remove(index)}
                                                                                                                                                                            className="exitThree fa fa-lg fa-times-circle"
                                                                                                                                                                        >
                                                                                                                                                                        </button>
                                                                                                                                                                    </div>

                                                                                                                                                                ))}
                                                                                                                                                        </div>)}
                                                                                                                                                </FieldArray>


                                                                                                                                            </div>
                                                                                                                                        </div>
                                                                                                                                    </div>
                                                                                                                                    {/* <div className="kengang"></div> */}
                                                                                                                                </div>

                                                                                                                            </Form>)}
                                                                                                                    </Formik>
                                                                                                                   
                                                                                                                </div>
                                                                                                            ))}
                                                                                                        <button
                                                                                                            type="button"
                                                                                                            className="btn btn-addDefine fa fa-plus"

                                                                                                            onClick={() => push({
                                                                                                                pronounce: '',
                                                                                                                position: '',
                                                                                                                mean: '',
                                                                                                                example: '',

                                                                                                            })}> Thêm định nghĩa </button>
                                                                                                    </div>
                                                                                                    </div></div>
                                                                                                )}
                                                                                            </FieldArray>

                                                                                        </Form>)}
                                                                                </Formik>

                                                                            </div>
                                                                        ))}

                                                                    <button
                                                                        type="button"
                                                                        className="btn btn-addTypeOfWord fa fa-plus"
                                                                        onClick={() => push({
                                                                        })}> Thêm loại từ
                                                                                </button>
                                                                </div>
                                                            )}
                                                        </FieldArray>
                                                    </div>

                                                </div>
                                            </div>
                                            <div className="row justify-content-center function">
                                                <button className="save" onClick={() => resetForm(word)}>Cài lại</button>
                                                <button className="reset" type="submit">Lưu lại</button>
                                            </div>
                                        </Form>

                                    )}
                                </Formik>
                            </div>
                        </div>
                    </div>
                </div>
                <Link className="scroll-to-top rounded" to="#page-top">
                    <i className="fa fa-angle-up" />
                </Link>
                <div className="modal fade" id="logoutModal" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Bạn có chắc chắn muốn đăng xuất không?</h5>
                                <button className="close" type="button" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">×</span>
                                </button>
                            </div>
                            <div className="modal-body">Chọn "Đăng xuất" bên dưới nếu bạn đã sẵn sàng kết thúc phiên hiện tại của mình.</div>
                            <div className="modal-footer">
                                <button className="btn btn-secondary" type="button" data-dismiss="modal">Hủy</button>
                                <Link className="btn btn-primary" to="login.html">Đăng xuất</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}
export default Word;