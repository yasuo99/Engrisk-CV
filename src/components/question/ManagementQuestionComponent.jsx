import React, { Component, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import questionApiV2 from "../../api/2.0/questionApi";
import { QuestionTypes } from "../../constants/QuestionTypes";
import { Table } from "react-bootstrap";
import parse from "html-react-parser";
import { FaSortAlphaDown } from "react-icons/fa";
import { FaSortAlphaUp } from "react-icons/fa";
import { Modal, Button } from "react-bootstrap";
import { FaRedo, FaSave } from "react-icons/fa";
import { Formik, Field, Form } from "formik";
import { toast } from "react-toastify";
import Paginate from "../pagination/Paginate";
import QuestionPreview from "./QuestionPreview";
import QuestionCreate from "./QuestionCreate";
import Search from "../search/Search";
import MapQuestionStatus, {
  QuestionStatus,
} from "../../constants/QuestionStatus";
const initial = {
  content: "",
  preQuestion: "",
  answers: [
    {
      content: "",
      contentLeft: "",
      contentRight: "",
      firstLine: "",
      secondLine: "",
      isQuestionAnswer: true,
    },
  ],
  file: null,
  audio: null,
  type: QuestionTypes.Basic,
  isMultipleAnswer: false,
  firstUser: "",
  secondUser: "",
};
const ManagementQuestionComponent = ({ header, fetch }) => {
  const [questions, setQuestions] = useState({
    currentPage: 1,
    pageSize: 5,
    totalPages: 1,
    items: [],
  });
  const [analystic, setAnalystic] = useState({});
  const [filter, setFilter] = useState({
    type: "None",
    grammar: "",
  });
  const [sort, setSort] = useState({
    ascending: true,
  });
  const [status, setStatus] = useState(QuestionStatus.FREE);
  const [modalCreate, setModalCreate] = useState(false);
  const [modalPreview, setModalPreview] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [selectQuestion, setSelectQuestion] = useState({});
  const [livePreview, setLivePreview] = useState(false);
  const [isRefresh, setIsRefresh] = useState(false);
  const [query, setQuery] = useState("");
  async function fetchData() {
    const params = {
      currentPage: questions.currentPage,
      pageSize: questions.pageSize,
      type: filter.type,
      status: status,
    };
    console.log(params);
    const result = await fetch(params, filter.grammar, query);
    setQuestions(result);
  }
  useEffect(() => {
    fetchAnalystic();
  }, [setAnalystic]);
  async function fetchAnalystic() {
    const analysticResult = await questionApiV2.getAnalystic();
    setAnalystic(analysticResult);
  }
  useEffect(() => {
    fetchData();
  }, [
    questions.currentPage,
    questions.pageSize,
    filter.type,
    filter.grammar,
    status,
    query,
  ]);
  useEffect(() => {
    if (isRefresh) {
      fetchData();
      setIsRefresh(false);
    }
  }, [isRefresh]);
  function paginationChange(currentPage, pageSize) {
    setQuestions({
      ...questions,
      currentPage: currentPage,
      pageSize: pageSize,
    });
  }
  function querySearch(query) {
    setQuestions({
      ...questions,
      currentPage: 1,
    });
    setQuery(query);
  }
  function toggleModalDelete(question) {
    setSelectQuestion(question);
    setModalDelete(!modalDelete);
  }
  function sortByAnswerCount() {
    if (!sort.ascending) {
      setQuestions({
        ...questions,
        itesm: [
          ...questions.items.sort((a, b) =>
            a.answers.length > b.answers.length ? 1 : -1
          ),
        ],
      });
      setSort({
        ...sort,
        ascending: true,
      });
    } else {
      setQuestions({
        ...questions,
        itesm: [
          ...questions.items.sort((a, b) =>
            a.answers.length < b.answers.length ? 1 : -1
          ),
        ],
      });
      setSort({
        ...sort,
        ascending: false,
      });
    }
  }
  function typeChange(e) {
    setFilter({
      ...filter,
      type: e.target.value,
    });
  }
  async function submitCreate(values) {
    const preProcessQuestion = createQuestion(values);
    console.log(preProcessQuestion);
    if (Object.keys(preProcessQuestion).length > 0) {
      let question = new FormData();
      question.set("preQuestion", preProcessQuestion.preQuestion);
      question.set("content", preProcessQuestion.content);
      question.set("image", preProcessQuestion.file);
      question.set("toeic", preProcessQuestion.toeic || 0);
      question.set("audio", preProcessQuestion.audio);
      question.set("type", preProcessQuestion.type);
      question.set("explaination", preProcessQuestion.explaination || "");
      preProcessQuestion.answers.forEach((answer, index) => {
        question.append(`answers[${index}].content`, answer.content);
        question.append(
          `answers[${index}].isQuestionAnswer`,
          answer.isQuestionAnswer
        );
      });

      const result = await questionApiV2.createQuestion(question);
    }
  }
  const createQuestion = (values) => {
    const question = {
      content: values.content,
      preQuestion: values.preQuestion,
      type: values.type,
      image: values.file,
      audio: values.audio,
      explaination: values.explaination,
    };
    switch (values.type) {
      case QuestionTypes.Basic:
        question.answers = values.answers.map((answer, index) => {
          if (answer.content != "") {
            return {
              content: answer.content,
              isQuestionAnswer: answer.isQuestionAnswer,
            };
          }
        });
        break;
      case QuestionTypes.Connection:
        question.answers = values.answers.map((answer, index) => ({
          content: `<p>${answer.contentLeft.trim()}</p><p>${answer.contentRight.trim()}</p>`,
          isQuestionAnswer: true,
        }));
        break;
      case QuestionTypes.Conversation:
        const newAnswers = [];
        values.firstUser = values.firstUser || "Engrisk";
        values.secondUser = values.secondUser || "Thanh";
        values.answers.map((answer, index) => {
          if (answer.firstLine != "" || answer.secondLine != "") {
            const firstLine = {
              content: `${values.firstUser}: ${answer.firstLine.trim()}`,
              isQuestionAnswer: true,
            };
            const secondLine = {
              content: `${answer.secondLine.trim()} :${values.secondUser}`,
              isQuestionAnswer: true,
            };
            newAnswers.push(firstLine);
            newAnswers.push(secondLine);
          }
        });
        question.answers = newAnswers.map((ans, index) => ({
          content: `${ans.content} (${index})`,
          isQuestionAnswer: true,
        }));
        break;
      case QuestionTypes.FillOut:
        question.answers = values.answers.map((answer, index) => {
          if (answer.content != "") {
            return {
              content: answer.content,
              isQuestionAnswer: true,
            };
          }
        });
        break;
      case QuestionTypes.Select:
        if (!question.content.includes("<p></p>")) {
          toast("Câu hỏi thiếu cặp thẻ <p></p> ở vị trí điền khuyết", {
            type: "warning",
          });
          return {};
        }
        if (values.answers.length == 0 || values.answers.length == 1) {
          toast("Câu hỏi điền dạng 1 phải có tối thiểu 2 đáp án", {
            type: "warning",
          });
          return {};
        }
        question.answers = values.answers.map((answer, index) => {
          if (answer.content != "") {
            return {
              content: answer.content,
              isQuestionAnswer: answer.isQuestionAnswer,
            };
          }
        });

        break;
      case QuestionTypes.Toeic:
        question.toeic = values.toeic;
        question.answers = values.answers.map((answer, index) => {
          if (answer.content != "") {
            return {
              content: answer.content,
              isQuestionAnswer: answer.isQuestionAnswer,
            };
          }
        });
        break;
    }
    console.log(question);
    return question;
  };
  function createPreview(values) {
    const question = {
      content: values.content,
      preQuestion: values.preQuestion,
      type: values.type,
      image: values.file,
      audio: values.audio,
      explaination: values.explaination,
    };
    console.log(question);
    switch (values.type) {
      case QuestionTypes.Basic:
        question.answers = values.answers.map((answer, index) => {
          return {
            answer: answer.content,
            isQuestionAnswer: answer.isQuestionAnswer,
          };
        });
        break;
      case QuestionTypes.Connection:
        question.answers = values.answers.map((answer, index) => ({
          answer: `<p>${answer.contentLeft.trim()}</p><p>${answer.contentRight.trim()}</p>`,
          isQuestionAnswer: true,
        }));
        break;
      case QuestionTypes.Conversation:
        const newAnswers = [];
        values.firstUser = values.firstUser || "Engrisk";
        values.secondUser = values.secondUser || "Thanh";
        values.answers.map((answer, index) => {
          if (answer.firstLine != "" || answer.secondLine != "") {
            const firstLine = {
              content: `${values.firstUser}: ${answer.firstLine.trim()}`,
              isQuestionAnswer: true,
            };
            if (answer.firstLine == "") {
              firstLine.content = `<hidden></hidden>`;
            }
            newAnswers.push(firstLine);
            const secondLine = {
              content: `${answer.secondLine.trim()} :${values.secondUser}`,
              isQuestionAnswer: true,
            };
            if (answer.secondLine == "") {
              secondLine.content = `<hidden></hidden>`;
            }
            newAnswers.push(secondLine);
          }
        });
        question.answers = newAnswers.map((ans, index) => ({
          answer: `${ans.content}(${index})`,
          isQuestionAnswer: true,
        }));
        break;
      case QuestionTypes.FillOut:
        question.answers = values.answers.map((answer, index) => {
          if (answer.content != "") {
            return {
              answer: answer.content,
              isQuestionAnswer: true,
            };
          }
        });
        break;
      case QuestionTypes.Select:
        if (!question.content.includes("<p></p>")) {
          toast("Câu hỏi thiếu cặp thẻ <p></p> ở vị trí điền khuyết", {
            type: "warning",
          });
          return {};
        }
        if (values.answers.length == 0 || values.answers.length == 1) {
          toast("Câu hỏi điền dạng 1 phải có tối thiểu 2 đáp án", {
            type: "warning",
          });
          return {};
        }
        question.answers = values.answers.map((answer, index) => {
          return {
            answer: answer.content,
            isQuestionAnswer: answer.isQuestionAnswer,
          };
        });
        break;
      case QuestionTypes.Toeic:
        question.toeic = values.toeic;
        question.answers = values.answers.map((answer, index) => {
          return {
            answer: answer.content,
            isQuestionAnswer: answer.isQuestionAnswer,
          };
        });
        break;
      case QuestionTypes.Arrange:
        question.answers = [];
        break;
    }
    console.log(question);
    return question;
  }
  const submitDelete = async () => {
    const result = await questionApiV2.deleteQuestion(selectQuestion.id);
    if (result.status == 200) {
      toast("Xóa thành công", { type: "success" });
      toggleModalDelete({});
      setIsRefresh(true);
    } else {
      toast("Xóa thất bại", { type: "error" });
    }
  };
  return (
    <div>
      <div className="container-fluid">
        <div className="row">
          <div
            className={`col-lg-10 col-md-10 col-10 ${
              !header ? "p-0" : ""
            } border-0`}
          >
            <div className="card shadow mb-4">
              <div className="card-header py-3">
                <div
                  className={`d-flex ${
                    header ? "justify-content-between" : "justify-content-end"
                  }`}
                >
                  {header && (
                    <h6 className="m-0 font-weight-bold text-primary">
                      Quản lý câu hỏi
                    </h6>
                  )}
                  <button
                    className="btn btn-light rounded-btn"
                    onClick={() => setIsRefresh(true)}
                  >
                    <FaRedo></FaRedo>
                  </button>
                </div>
              </div>
              <div className="card-body">
                <div className="d-flex justify-content-between">
                  <button
                    className="btn btn-word mt-1 h-50"
                    onClick={() => setModalCreate(!modalCreate)}
                  >
                    <i className="fa fa-plus"></i> Thêm câu hỏi
                  </button>

                  <Search queryFunction={querySearch}></Search>
                </div>
                <div className="table-responsive">
                  <Table striped bordered hover responsive>
                    <thead>
                      <tr>
                        <th className="dokhoquiz pointer-card">Câu hỏi</th>
                        <th className="table-image pointer-card">Nội dung</th>
                        <th className="tenbaiquiz pointer-card">
                          Loại câu hỏi
                        </th>
                        <th
                          className="dokhoquiz pointer-card"
                          onClick={() => sortByAnswerCount()}
                        >
                          Số đáp án{" "}
                          {sort.ascending ? (
                            <FaSortAlphaDown></FaSortAlphaDown>
                          ) : (
                            <FaSortAlphaUp></FaSortAlphaUp>
                          )}
                        </th>
                        <th className="dokhoquiz pointer-card">Trạng thái</th>
                        <th className="table-function"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {questions.items.map((question, index) => (
                        <tr key={index}>
                          <td className="cell-4">
                            <span className="text-overflow">
                              {parse(question.preQuestion || "")}
                            </span>
                          </td>
                          <td>{parse(question.content || "")}</td>
                          <td>{question.type}</td>
                          <td>{question.answers.length}</td>
                          <td>{MapQuestionStatus(question.status)}</td>
                          <td>
                            <button
                              type="button"
                              className="btn btn-success btn-delete mr-1"
                              onClick={() => {
                                setSelectQuestion(question);
                                setModalPreview(!modalPreview);
                              }}
                            >
                              <i className="fa fa-play-circle"></i>
                            </button>
                            <button
                              type="button"
                              className="btn btn-primary mr-1"
                            >
                              <i className="fa fa-edit"></i>
                            </button>
                            <button
                              type="button"
                              className="btn btn-danger btn-delete "
                              onClick={() => toggleModalDelete(question)}
                            >
                              <i className="fa fa-trash"></i>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                  <Paginate
                    currentPage={questions.currentPage}
                    pageSize={questions.pageSize}
                    change={paginationChange}
                    totalPages={questions.totalPages}
                  ></Paginate>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-2 col-md-2 col-2">
            <div className="card mb-3">
              <div className="card-header">
                <h6>Phân loại</h6>
              </div>
              <div className="card-body">
                <form className="form-group">
                  <div className="custom-control custom-radio">
                    <input
                      type="radio"
                      name="type"
                      value={"None"}
                      className="custom-control-input top"
                      checked={filter.type == "None"}
                      onChange={(e) => typeChange(e)}
                    ></input>
                    <label className="custom-control-label text-dark">
                      All
                    </label>
                  </div>
                  <div className="custom-control custom-radio">
                    <input
                      type="radio"
                      name="type"
                      value={QuestionTypes.Basic}
                      className="custom-control-input top"
                      checked={filter.type == QuestionTypes.Basic}
                      onChange={(e) => typeChange(e)}
                    ></input>
                    <label className="custom-control-label text-dark">
                      Cơ bản
                    </label>
                  </div>
                  <div className="custom-control custom-radio">
                    <input
                      type="radio"
                      name="type"
                      value={QuestionTypes.Connection}
                      className="custom-control-input top"
                      checked={filter.type == QuestionTypes.Connection}
                      onChange={(e) => typeChange(e)}
                    ></input>
                    <label className="custom-control-label text-dark">
                      Nối từ
                    </label>
                  </div>
                  <div className="custom-control custom-radio">
                    <input
                      type="radio"
                      name="type"
                      value={QuestionTypes.Select}
                      className="custom-control-input top"
                      checked={filter.type == QuestionTypes.Select}
                      onChange={(e) => typeChange(e)}
                    ></input>
                    <label className="custom-control-label text-dark">
                      Điền khuyết - danh sách
                    </label>
                  </div>
                  <div className="custom-control custom-radio">
                    <input
                      type="radio"
                      name="type"
                      value={QuestionTypes.FillOut}
                      className="custom-control-input top"
                      checked={filter.type == QuestionTypes.FillOut}
                      onChange={(e) => typeChange(e)}
                    ></input>
                    <label className="custom-control-label text-dark">
                      Điền khuyết - điền
                    </label>
                  </div>
                  <div className="custom-control custom-radio">
                    <input
                      type="radio"
                      name="type"
                      value={QuestionTypes.Conversation}
                      className="custom-control-input top"
                      checked={filter.type == QuestionTypes.Conversation}
                      onChange={(e) => typeChange(e)}
                    ></input>
                    <label className="custom-control-label text-dark">
                      Hội thoại
                    </label>
                  </div>
                  <div className="custom-control custom-radio">
                    <input
                      type="radio"
                      name="type"
                      value={QuestionTypes.Toeic}
                      className="custom-control-input top"
                      checked={filter.type == QuestionTypes.Toeic}
                      onChange={(e) => typeChange(e)}
                    ></input>
                    <label className="custom-control-label text-dark">
                      Toeic
                    </label>
                  </div>
                </form>
              </div>
            </div>
            <div className="card mb-3">
              <div className="card-header">
                <h6>Trạng thái</h6>
              </div>
              <div className="card-body">
                <input
                  type="radio"
                  name="type"
                  value={QuestionStatus.FREE}
                  checked={status == QuestionStatus.FREE}
                  onChange={(e) => setStatus(e.target.value)}
                ></input>{" "}
                <span className="mr-1 text-dark">
                  {MapQuestionStatus(QuestionStatus.FREE)}
                </span>
                <br></br>
                <input
                  type="radio"
                  name="type"
                  value={QuestionStatus.IN_USE}
                  checked={status == QuestionStatus.IN_USE}
                  onChange={(e) => setStatus(e.target.value)}
                ></input>{" "}
                <span className="mr-1 text-dark">
                  {MapQuestionStatus(QuestionStatus.IN_USE)}
                </span>
                <br></br>
                <p></p>
              </div>
            </div>
            <div className="card">
              <div className="card-header">
                <h6>Thống kê</h6>
              </div>
              <div className="card-body">
                <p>Tổng: {analystic.total}</p>
                <p>Chưa sử dụng: {analystic.free}</p>
                <p>Sử dụng cho quiz: {analystic.quizUsing}</p>
                <p>Sử dụng cho exam: {analystic.examUsing}</p>
                <p>Sử dụng cho script: {analystic.scriptUsing}</p>
                <p></p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {modalCreate && (
        <Modal
          show={modalCreate}
          animation
          backdrop="static"
          centered
          size="lg"
          dialogClassName="modal-90w question-create-modal"
        >
          <Modal.Body>
            <div
              id="content"
              style={{ overflowY: "auto", overflowX: "hidden" }}
              className="modal-background"
            >
              <main id="scroll">
                <div className="mt-2">
                  <div className="row">
                    <div className="offset-md-11 col-1">
                      <button
                        className="btn btn-light rounded-circle"
                        onClick={() => setModalCreate(!modalCreate)}
                      >
                        <i className="fa fa-remove"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </main>
              <div>
                <Formik
                  initialValues={initial}
                  onSubmit={(values, { resetForm }) => {
                    console.log(values);
                    submitCreate(values);
                  }}
                >
                  {({ values, setFieldValue, errors, touched, resetForm }) => (
                    <Form>
                      <QuestionCreate
                        values={values}
                        setFieldValue={setFieldValue}
                        errors={errors}
                        touched={touched}
                      ></QuestionCreate>
                      <div className="fixed-bottom">
                        <button
                          type="button"
                          className="btn btn-secondary btn-delete rounded ml-1 mr-1"
                          onClick={(e) => {
                            e.preventDefault();
                            resetForm(initial);
                          }}
                        >
                          <FaRedo></FaRedo>
                        </button>
                        <button
                          className="btn btn-success btn-delete rounded ml-1 mr-1"
                          onClick={(e) => {
                            e.preventDefault();
                            setLivePreview(!livePreview);
                            setSelectQuestion(createPreview(values));
                          }}
                        >
                          <i className="fa fa-play-circle"></i>
                        </button>
                        <button
                          className="btn btn-primary btn-delete rounded"
                          type="submit"
                        >
                          <FaSave></FaSave>
                        </button>
                      </div>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      )}
      {livePreview && Object.keys(selectQuestion).length > 0 && (
        <Modal
          show={livePreview}
          animation
          backdrop="static"
          size="lg"
          centered
        >
          <Modal.Body>
            <div
              id="content"
              style={{ overflowY: "auto", overflowX: "hidden" }}
              className="modal-background"
            >
              <main id="scroll">
                <div className="mt-2">
                  <div className="row">
                    <div className="offset-md-11 col-1">
                      <button
                        className="btn btn-light rounded-circle"
                        onClick={() => setLivePreview(!livePreview)}
                      >
                        <i className="fa fa-remove"></i>
                      </button>
                    </div>
                  </div>
                </div>
                <div className="p-2">
                  <QuestionPreview question={selectQuestion}></QuestionPreview>
                </div>
              </main>
              <div></div>
            </div>
          </Modal.Body>
        </Modal>
      )}
      {Object.keys(selectQuestion).length > 0 && (
        <Modal
          animation
          size="lg"
          show={modalPreview}
          onHide={() => setModalPreview(!modalPreview)}
        >
          <Modal.Body>
            <div
              id="content"
              style={{ overflowY: "auto", overflowX: "hidden" }}
              className="modal-background"
            >
              <main id="scroll">
                <div className="row">
                  <div className="offset-md-11 col-1">
                    <button
                      className="btn btn-light rounded-circle"
                      onClick={() => setModalPreview(!modalPreview)}
                    >
                      <i className="fa fa-remove"></i>
                    </button>
                  </div>
                </div>
                <div className="p-2">
                  <QuestionPreview question={selectQuestion}></QuestionPreview>
                </div>
              </main>
            </div>
          </Modal.Body>
        </Modal>
      )}
      {Object.keys(selectQuestion).length > 0 && (
        <Modal
          show={modalDelete}
          onHide={() => toggleModalDelete({})}
          dialogClassName="sweet-alert-modal rounded"
          contentClassName="modal-basic-content"
        >
          <Modal.Body>
            <div className="text-center">
              <i className="fa fa-4x fa-warning text-danger"></i>
              <br></br>
              <br></br>
              <h3 className="text-info">Bạn có chắc muốn xóa câu hỏi này</h3>
              <p className="text-danger">Không thể hoàn tác</p>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => toggleModalDelete({})}>
              Hủy
            </Button>
            <Button variant="danger" onClick={(e) => submitDelete()}>
              Xác nhận
            </Button>
          </Modal.Footer>
        </Modal>
      )}
      <Link className="scroll-to-top rounded" to="#page-top">
        <i className="fa fa-angle-up" />
      </Link>
    </div>
  );
};
export default ManagementQuestionComponent;
