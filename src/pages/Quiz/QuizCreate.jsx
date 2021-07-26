import { useEffect, useRef, useState } from "react";
import { Tabs, Tab, ListGroup, Modal, Button } from "react-bootstrap";
import { Link } from "react-browser-router";
import { useParams } from "react-router-dom";
import examApiv2 from "../../api/2.0/examApi";
import questionApiV2 from "../../api/2.0/questionApi";
import HeaderClient from "../../components/client/HeaderClient";
import QuestionPreview from "../../components/question/QuestionPreview";
import Search from "../../components/search/Search";
import { Difficult } from "../../constants/Difficult";
import { QuestionTypes } from "../../constants/QuestionTypes";
import { ToeicParts } from "../../constants/ToeicParts";
import { toast } from "react-toastify";
import quizApi from "../../api/2.0/quizApi";
import QuizPreview from './../Admin/ContentManagement/QuizPreview';

const QuizCreate = ({}) => {
  const [questions, setQuestions] = useState([]);
  const [quiz, setQuiz] = useState({
    quizName: "",
    difficultLevel: "Easy",
    duration: 10,
    questions: [],
  });
  const [selectQuestion, setSelectQuestion] = useState({});
  const [selectQuestions, setSelectQuestions] = useState([]);
  const [availableQuestions, setAvailableQuestions] = useState([]);
  const { quizId } = useParams();
  const [questionModal, setQuestionModal] = useState(false);
  const [isBusy, setIsBusy] = useState(true);
  const [type, setType] = useState(QuestionTypes.Basic);
  const [quizInspectModal, setQuizInspectModal] = useState(false);
  useEffect(() => {
    async function fetchQuiz() {
      if (quizId) {
        const result = await quizApi.get(quizId);
        setQuiz(result);
        setIsBusy(false);

        // const data = await questionApiV2.getFilter(type);
        // setAvailableQuestions(data.filter((q) => !result.questions.includes(q)));
      }
    }
    fetchQuiz();
  }, [quizId]);
  useEffect(() => {
    async function fetchQuestions() {
      const data = await questionApiV2.getFilter(type);
      setAvailableQuestions(
        data.filter(
          (q) => quiz.questions.find((value) => value.id == q.id) == undefined
        )
      );
    }
    if (!isBusy) {
      fetchQuestions();
    }
  }, [type, isBusy]);
  function submitAdd() {
    setQuiz({
      ...quiz,
      questions: [...quiz.questions, ...selectQuestions],
    });
    setAvailableQuestions(
      availableQuestions.filter((q) => !selectQuestions.includes(q))
    );
    setSelectQuestions([]);
  }
  function removeQuestion(question) {
    setQuiz({
      ...quiz,
      questions: [...quiz.questions.filter((q) => q != question)],
    });
    setAvailableQuestions([...availableQuestions, question]);
  }
  function search(query) {
    if (query != "") {
      setQuestions([
        ...questions.filter((q) => q.content.includes(query.trim())),
      ]);
    } else {
    }
  }
  async function submit() {
    if (quizId) {
      const result = await quizApi.edit(quiz.id, quiz);
      if (result.status == 200) {
        toast("Thành công", { type: "success" });
      } else {
        toast("Thất bại", { type: "error" });
      }
    } else {
      const result = await quizApi.create(quiz, true);
      if (result.status == 200) {
        toast("Thành công", { type: "success" });
      } else {
        toast("Thất bại", { type: "error" });
      }
    }
  }
  return (
    <div id="wrapper">
      <div id="content-wrapper" className="d-flex flex-column">
        {/* <SubMenuClient></SubMenuClient> */}
        <div id="quiz">
          <div id="content">
            <HeaderClient></HeaderClient>
            {/* header: bắt đầu */}
            {/* header: kết thúc */}
            <section className="main">
              <div className="container">
                <div>
                  <Link to="/admin/quan-ly-quiz-exam">Trở lại</Link>
                </div>
                <div className="row">
                  <div className="col-5">
                    <h6 className="mt-2">Tiêu đề</h6>
                    <input
                      className="form-control"
                      value={quiz.quizName}
                      type="text"
                      onChange={(e) =>
                        setQuiz({ ...quiz, quizName: e.target.value })
                      }
                      required
                    ></input>
                  </div>
                  <div className="col-1">
                    <h6 className="mt-2">Độ khó</h6>
                    <select
                      className="pagination-select"
                      value={quiz.difficultLevel}
                      onChange={(e) =>
                        setQuiz({ ...quiz, difficultLevel: e.target.value })
                      }
                    >
                      <option value={Difficult.Easy}>Dễ</option>
                      <option value={Difficult.Medium}>Vừa</option>
                      <option value={Difficult.Hard}>Khó</option>
                    </select>
                  </div>
                </div>
                <br></br>
                <div className="rounded card p-1">
                  <div className="card-header d-flex justify-content-between">
                    <h5>Các câu hỏi trong bài quiz</h5>
                    <button className="btn btn-success" onClick={() => setQuizInspectModal(!quizInspectModal)}><i className="fa fa-play-circle"></i></button>
                  </div>
                  <div className="card-body">
                    <div className="d-flex justify-content-end">
                      <button
                        className="btn btn-light rounded-circle mr-1"
                        onClick={() => {
                          setQuestionModal(!questionModal);
                        }}
                      >
                        <i className="fa fa-cog"></i>
                      </button>
                    </div>
                    <ListGroup className="border">
                      {quiz.questions.map((question, index) => (
                        <ListGroup.Item
                          className={`p-1 ${
                            index == 0 ? "" : "mt-1"
                          } border cursor-pointer ${
                            selectQuestion == question
                              ? "bg-primary text-white"
                              : ""
                          }`}
                          key={index}
                        >
                          <div className="d-flex justify-content-between align-items-middle">
                            <p
                              onClick={() => setSelectQuestion(question)}
                              className={`p-2 ${
                                selectQuestion == question ? "text-white" : ""
                              }`}
                            >
                              {question.preQuestion}: {question.content}
                            </p>
                            <button
                              className="btn btn-light"
                              onClick={() => removeQuestion(question)}
                            >
                              {" "}
                              <i className="fa fa-remove text-danger"></i>
                            </button>
                          </div>
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                  </div>
                </div>
              </div>
              <br></br>
              <div className="container form-group d-flex justify-content-end">
                <Link
                  className="btn btn-secondary rounded mr-1"
                  to="/admin/quan-ly-quiz-exam"
                >
                  Hủy
                </Link>
                <button
                  className="btn btn-primary rounded"
                  onClick={() => submit()}
                >
                  Lưu lại
                </button>
              </div>
              <Modal
                show={questionModal}
                onHide={() => setQuestionModal(!questionModal)}
                animation
                size="lg"
                dialogClassName="modal-full-screen"
              >
                <Modal.Body className="modal-background">
                  <h5>Danh sách câu hỏi khả dụng</h5>
                  <h6>Chọn một hoặc nhiều để thêm vào bài kiểm tra</h6>
                  <br></br>
                  <Search queryFunction={search}></Search>
                  <div className="row">
                    <div className="col-6">
                      <ListGroup
                        className="border p-2 script-panel"
                        style={{ overflowY: "auto" }}
                      >
                        {availableQuestions.map((question, index) => (
                          <ListGroup.Item
                            className={`p-1 ${
                              index == 0 ? "" : "mt-2"
                            } border cursor-pointer ${
                              selectQuestion == question
                                ? "bg-primary text-white"
                                : ""
                            }`}
                            key={index}
                          >
                            <div
                              className="d-flex justify-content-between align-items-center"
                              onClick={() => setSelectQuestion(question)}
                            >
                              <p
                                className={`p-2 ${
                                  selectQuestion == question ? "text-white" : ""
                                }`}
                              >
                                {question.preQuestion}: {question.content}
                              </p>
                              <input
                                id={`select${index}`}
                                className="form-check-input p-1"
                                type="checkbox"
                                checked={selectQuestions.includes(question)}
                                onChange={(e) => {
                                  if (e.currentTarget.checked) {
                                    setSelectQuestions([
                                      ...selectQuestions,
                                      question,
                                    ]);
                                  } else {
                                    setSelectQuestions([
                                      ...selectQuestions.filter(
                                        (q) => q != question
                                      ),
                                    ]);
                                  }
                                }}
                              ></input>
                            </div>
                          </ListGroup.Item>
                        ))}
                      </ListGroup>
                    </div>
                    <div className="col-6 script-panel">
                      {Object.keys(selectQuestion).length == 0 ? (
                        <p>Chọn câu hỏi để xem</p>
                      ) : (
                        <QuestionPreview
                          question={selectQuestion}
                        ></QuestionPreview>
                      )}
                    </div>
                  </div>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="primary" onClick={() => submitAdd()}>
                    Lưu lại
                  </Button>
                </Modal.Footer>
              </Modal>
              <Modal
                show={quizInspectModal}
                onHide={() => setQuizInspectModal(!quizInspectModal)}
                dialogClassName="modal-90w"
                size="lg"
                animation
              >
                <Modal.Body>
                  <QuizPreview
                    quiz={quiz}
                    closeReview={() => setQuizInspectModal(!quizInspectModal)}
                  ></QuizPreview>
                </Modal.Body>
                <Modal.Footer bsPrefix="d-flex justify-content-end mb-2">
                  <Button
                    className="mr-4"
                    variant="secondary"
                    onClick={() => setQuizInspectModal(!quizInspectModal)}
                  >
                    Kết thúc preview
                  </Button>
                </Modal.Footer>
              </Modal>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};
export default QuizCreate;
