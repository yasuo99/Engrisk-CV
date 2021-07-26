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
import { toast } from 'react-toastify';

const ExamCreate = ({ }) => {
  const [questions, setQuestions] = useState([]);
  const [exam, setExam] = useState({
    title: '',
    detail: '',
    difficult: 'Easy',
    duration: 10,
    questions: [],
  });
  const [selectQuestion, setSelectQuestion] = useState({});
  const [selectQuestions, setSelectQuestions] = useState([]);
  const [selectPart, setSelectPart] = useState(ToeicParts.Part1);
  const { tempQuestions, setTempQuestions } = useState([])
  const [toeicPartQuestion, setToeicPartQuestion] = useState({
    Part1: [],
    Part2: [],
    Part3: [],
    Part4: [],
    Part5: [],
    Part6: [],
    Part7: [],
  });
  const [availableToeicQuestion, setAvailableToeicQuestion] = useState({
    Part1: [],
    Part2: [],
    Part3: [],
    Part4: [],
    Part5: [],
    Part6: [],
    Part7: [],
  });
  const { examId } = useParams();
  const [questionModal, setQuestionModal] = useState(false);
  useEffect(() => {
    async function fetchQuestions() {
      if (examId) {
        const result = await examApiv2.get(examId);
        setExam(result);
        setToeicPartQuestion({
          ...toeicPartQuestion,
          Part1: result.questions.filter((q) => q.toeic == ToeicParts.Part1),
          Part2: result.questions.filter((q) => q.toeic == ToeicParts.Part2),
          Part3: result.questions.filter((q) => q.toeic == ToeicParts.Part3),
          Part4: result.questions.filter((q) => q.toeic == ToeicParts.Part4),
          Part5: result.questions.filter((q) => q.toeic == ToeicParts.Part5),
          Part6: result.questions.filter((q) => q.toeic == ToeicParts.Part6),
          Part7: result.questions.filter((q) => q.toeic == ToeicParts.Part7),
        });
        const data = await questionApiV2.getFilter(QuestionTypes.Toeic);
        setAvailableToeicQuestion({
          ...availableToeicQuestion,
          Part1: data.filter(
            (q) => result.questions.find(val => val.id == q.id) == undefined && q.toeic == ToeicParts.Part1
          ),
          Part2: data.filter(
            (q) => result.questions.find(val => val.id == q.id) == undefined  && q.toeic == ToeicParts.Part2
          ),
          Part3: data.filter(
            (q) => result.questions.find(val => val.id == q.id) == undefined  && q.toeic == ToeicParts.Part3
          ),
          Part4: data.filter(
            (q) => result.questions.find(val => val.id == q.id) == undefined  && q.toeic == ToeicParts.Part4
          ),
          Part5: data.filter(
            (q) => result.questions.find(val => val.id == q.id) == undefined  && q.toeic == ToeicParts.Part5
          ),
          Part6: data.filter(
            (q) => result.questions.find(val => val.id == q.id) == undefined  && q.toeic == ToeicParts.Part6
          ),
          Part7: data.filter(
            (q) => result.questions.find(val => val.id == q.id) == undefined  && q.toeic == ToeicParts.Part7
          ),
        });
      }
      else {
        const data = await questionApiV2.getFilter(QuestionTypes.Toeic);
        setAvailableToeicQuestion({
          ...availableToeicQuestion,
          Part1: data.filter(
            (q) => q.toeic == ToeicParts.Part1
          ),
          Part2: data.filter(
            (q) => q.toeic == ToeicParts.Part2
          ),
          Part3: data.filter(
            (q) => q.toeic == ToeicParts.Part3
          ),
          Part4: data.filter(
            (q) => q.toeic == ToeicParts.Part4
          ),
          Part5: data.filter(
            (q) => q.toeic == ToeicParts.Part5
          ),
          Part6: data.filter(
            (q) => q.toeic == ToeicParts.Part6
          ),
          Part7: data.filter(
            (q) => q.toeic == ToeicParts.Part7
          ),
        });
      }
    }
    fetchQuestions();
  }, [examId]);
  useEffect(() => {
    renderAvailableQuestions();
  }, [selectPart, availableToeicQuestion]);
  useEffect(() => {
    setToeicPartQuestion({
      ...toeicPartQuestion,
      Part1: exam.questions.filter((q) => q.toeic == ToeicParts.Part1),
      Part2: exam.questions.filter((q) => q.toeic == ToeicParts.Part2),
      Part3: exam.questions.filter((q) => q.toeic == ToeicParts.Part3),
      Part4: exam.questions.filter((q) => q.toeic == ToeicParts.Part4),
      Part5: exam.questions.filter((q) => q.toeic == ToeicParts.Part5),
      Part6: exam.questions.filter((q) => q.toeic == ToeicParts.Part6),
      Part7: exam.questions.filter((q) => q.toeic == ToeicParts.Part7),
    });
  }, [exam.questions])
  function renderAvailableQuestions() {
    setQuestions(availableToeicQuestion[selectPart]);
  }
  function reRenderAvailableQuestions() {
    setAvailableToeicQuestion({
      ...availableToeicQuestion,
      [selectPart]: questions
    });
  }
  function submitAdd() {
    setExam({
      ...exam,
      questions: [...exam.questions, ...selectQuestions]
    })
    console.log(selectQuestions);
    setAvailableToeicQuestion({
      ...availableToeicQuestion,
      [selectPart]: questions.filter(q => !selectQuestions.includes(q))
    });
    // switch (selectPart) {
    //   case ToeicParts.Part1:
    //     setAvailableToeicQuestion({
    //       ...availableToeicQuestion,
    //       part1: questions.filter(q => !selectQuestions.includes(q))
    //     });
    //     break;
    //   case ToeicParts.Part2:
    //     setAvailableToeicQuestion({
    //       ...availableToeicQuestion,
    //       part2: questions.filter(q => !selectQuestions.includes(q))
    //     });
    //     break;
    //   case ToeicParts.Part3:
    //     setAvailableToeicQuestion({
    //       ...availableToeicQuestion,
    //       part3: questions.filter(q => !selectQuestions.includes(q))
    //     });
    //     break;
    //   case ToeicParts.Part4:
    //     setAvailableToeicQuestion({
    //       ...availableToeicQuestion,
    //       part4: questions.filter(q => !selectQuestions.includes(q))
    //     });
    //     break;
    //   case ToeicParts.Part5:
    //     setAvailableToeicQuestion({
    //       ...availableToeicQuestion,
    //       part5: questions.filter(q => !selectQuestions.includes(q))
    //     });
    //     break;
    //   case ToeicParts.Part6:
    //     setAvailableToeicQuestion({
    //       ...availableToeicQuestion,
    //       part6: questions.filter(q => !selectQuestions.includes(q))
    //     });
    //     break;
    //   case ToeicParts.Part7:
    //     setAvailableToeicQuestion({
    //       ...availableToeicQuestion,
    //       part7: questions.filter(q => !selectQuestions.includes(q))
    //     });
    //     break;
    // }
    setSelectQuestions([])
  }
  function removeQuestion(question) {
    setExam({
      ...exam,
      questions: [...exam.questions.filter(q => q != question)]
    })
    setQuestions([...questions, question]);
    setAvailableToeicQuestion({
      ...availableToeicQuestion,
      [selectPart]: [...questions, question]
    })
  }
  function search(query) {
    if (query != '') {
      setQuestions([...questions.filter(q => q.content.includes(query.trim()))])
    } else {
      renderAvailableQuestions();
    }
  }
  async function submit() {
    if (examId) {
      const result = await examApiv2.edit(exam.id, exam);
      if (result.status == 200) {
        toast('Thành công', { type: 'success' })
      } else {
        toast('Thất bại', { type: 'error' })
      }
    }
    else {
      const result = await examApiv2.create(exam,true);
      if (result.status == 200) {
        toast('Thành công', { type: 'success' })
      } else {
        toast('Thất bại', { type: 'error' })
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
                <div className="row p-2">

                  <div className="col-4">
                    <h6 className="mt-2">Tiêu đề</h6>
                    <input
                      className="form-control"
                      value={exam.title}
                      type='text'
                      onChange={(e) =>
                        setExam({ ...exam, title: e.target.value })
                      }
                      required
                    ></input>
                  </div>
                  <div className="col-5">
                    <h6 className="mt-2">Mô tả</h6>
                    <input
                      className="form-control"
                      value={exam.detail}
                      type='text'
                      onChange={(e) =>
                        setExam({ ...exam, detail: e.target.value })
                      }
                      required
                    ></input>
                  </div>
                  <div className="col-2">
                    <h6 className="mt-2">Thời gian làm</h6>
                    <input
                      className="form-control"
                      value={exam.duration || 10}
                      min={10}
                      type='number'
                      onChange={(e) =>
                        setExam({ ...exam, duration: e.target.value })
                      }
                      required
                    ></input>
                  </div>
                  <div className="col-1">
                    <h6 className="mt-2">Độ khó</h6>
                    <select className="pagination-select" onChange={(e) => setExam({ ...exam, difficult: e.target.value })}>
                      <option value={Difficult.Easy}>Dễ</option>
                      <option value={Difficult.Medium}>Vừa</option>
                      <option value={Difficult.Hard}>Khó</option>
                    </select>
                  </div>
                </div>
                <br></br>
                <div className='rounded card p-1'>
                  <div className='card-header'>
                    <h5>Các phần trong bài thi toeic</h5>
                  </div>
                  <div className='card-body'>
                    <Tabs
                      defaultActiveKey={ToeicParts.Part1}
                      id="controlled-tab-example"
                      transition={false}
                    >
                      <Tab
                        eventKey={ToeicParts.Part1}
                        title="Part 1"
                        tabClassName="font-weight-bold"
                      >
                        <div className='script-panel'>

                          <div className="d-flex justify-content-between">
                            <p className='mt-1 p-1'>Phần part 1 trong bài thi toeic. Đối với 1 bài thi toeic tiêu chuẩn phần này sẽ có 6 câu hỏi</p>
                            <button
                              className="btn btn-light rounded-circle mr-1"
                              onClick={() => {
                                setQuestionModal(!questionModal);
                                setSelectPart(ToeicParts.Part1);
                              }}
                            >
                              <i className="fa fa-cog"></i>
                            </button>
                          </div>
                          <ListGroup className="border">
                            {toeicPartQuestion.Part1.map((question, index) => (
                              <ListGroup.Item
                                className={`p-1 ${index == 0 ? "" : "mt-1"
                                  } border cursor-pointer ${selectQuestion == question
                                    ? "bg-primary text-white"
                                    : ""
                                  }`}
                                key={index}
                              >
                                <div className="d-flex justify-content-between align-items-middle">
                                  <p
                                    onClick={() => setSelectQuestion(question)}
                                    className={`p-2 ${selectQuestion == question ? "text-white" : ""
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
                      </Tab>
                      <Tab
                        eventKey={ToeicParts.Part2}
                        title="Part 2"
                        tabClassName="font-weight-bold"
                      >
                        <div className='script-panel'>
                          <div className="d-flex justify-content-end">
                            <button
                              className="btn btn-light rounded-circle mr-1"
                              onClick={() => {
                                setQuestionModal(!questionModal);
                                setSelectPart(ToeicParts.Part2);
                              }}
                            >
                              <i className="fa fa-cog"></i>
                            </button>
                          </div>
                          <ListGroup className="border">
                            {toeicPartQuestion.Part2.map((question, index) => (
                              <ListGroup.Item
                                className={`p-1 ${index == 0 ? "" : "mt-1"
                                  } border cursor-pointer ${selectQuestion == question
                                    ? "bg-primary text-white"
                                    : ""
                                  }`}
                                key={index}
                              >
                                <div className="d-flex justify-content-between align-items-middle">
                                  <p
                                    onClick={() => setSelectQuestion(question)}
                                    className={`p-2 ${selectQuestion == question ? "text-white" : ""
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
                      </Tab>
                      <Tab
                        eventKey={ToeicParts.Part3}
                        title="Part 3"
                        tabClassName="font-weight-bold"
                      >
                        <div className='script-panel'>
                          <div className="d-flex justify-content-end">
                            <button
                              className="btn btn-light rounded-circle mr-1"
                              onClick={() => {
                                setQuestionModal(!questionModal);
                                setSelectPart(ToeicParts.Part3);
                              }}
                            >
                              <i className="fa fa-cog"></i>
                            </button>
                          </div>
                          <ListGroup className="border">
                            {toeicPartQuestion.Part3.map((question, index) => (
                              <ListGroup.Item
                                className={`p-1 ${index == 0 ? "" : "mt-1"
                                  } border cursor-pointer ${selectQuestion == question
                                    ? "bg-primary text-white"
                                    : ""
                                  }`}
                                key={index}
                              >
                                <div className="d-flex justify-content-between align-items-middle">
                                  <p
                                    onClick={() => setSelectQuestion(question)}
                                    className={`p-2 ${selectQuestion == question ? "text-white" : ""
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
                      </Tab>
                      <Tab
                        eventKey={ToeicParts.Part4}
                        title="Part 4"
                        tabClassName="font-weight-bold"
                      >
                        <div className='script-panel'>
                          <div className="d-flex justify-content-end">
                            <button
                              className="btn btn-light rounded-circle mr-1"
                              onClick={() => {
                                setQuestionModal(!questionModal);
                                setSelectPart(ToeicParts.Part4);
                              }}
                            >
                              <i className="fa fa-cog"></i>
                            </button>
                          </div>
                          <ListGroup className="border">
                            {toeicPartQuestion.Part4.map((question, index) => (
                              <ListGroup.Item
                                className={`p-1 ${index == 0 ? "" : "mt-1"
                                  } border cursor-pointer ${selectQuestion == question
                                    ? "bg-primary text-white"
                                    : ""
                                  }`}
                                key={index}
                              >
                                <div className="d-flex justify-content-between align-items-middle">
                                  <p
                                    onClick={() => setSelectQuestion(question)}
                                    className={`p-2 ${selectQuestion == question ? "text-white" : ""
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
                      </Tab>
                      <Tab
                        eventKey={ToeicParts.Part5}
                        title="Part 5"
                        tabClassName="font-weight-bold"
                      >
                        <div className='script-panel'>
                          <div className="d-flex justify-content-end">
                            <button
                              className="btn btn-light rounded-circle mr-1"
                              onClick={() => {
                                setQuestionModal(!questionModal);
                                setSelectPart(ToeicParts.Part5);
                              }}
                            >
                              <i className="fa fa-cog"></i>
                            </button>
                          </div>
                          <ListGroup className="border">
                            {toeicPartQuestion.Part5.map((question, index) => (
                              <ListGroup.Item
                                className={`p-1 ${index == 0 ? "" : "mt-1"
                                  } border cursor-pointer ${selectQuestion == question
                                    ? "bg-primary text-white"
                                    : ""
                                  }`}
                                key={index}
                              >
                                <div className="d-flex justify-content-between align-items-middle">
                                  <p
                                    onClick={() => setSelectQuestion(question)}
                                    className={`p-2 ${selectQuestion == question ? "text-white" : ""
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
                      </Tab>
                      <Tab
                        eventKey={ToeicParts.Part6}
                        title="Part 6"
                        tabClassName="font-weight-bold"
                      >
                        <div className='script-panel'>
                          <div className="d-flex justify-content-end">
                            <button
                              className="btn btn-light rounded-circle mr-1"
                              onClick={() => {
                                setQuestionModal(!questionModal);
                                setSelectPart(ToeicParts.Part6);
                              }}
                            >
                              <i className="fa fa-cog"></i>
                            </button>
                          </div>
                          <ListGroup className="border">
                            {toeicPartQuestion.Part6.map((question, index) => (
                              <ListGroup.Item
                                className={`p-1 ${index == 0 ? "" : "mt-1"
                                  } border cursor-pointer ${selectQuestion == question
                                    ? "bg-primary text-white"
                                    : ""
                                  }`}
                                key={index}
                              >
                                <div className="d-flex justify-content-between align-items-middle">
                                  <p
                                    onClick={() => setSelectQuestion(question)}
                                    className={`p-2 ${selectQuestion == question ? "text-white" : ""
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
                      </Tab>
                      <Tab
                        eventKey={ToeicParts.Part7}
                        title="Part 7"
                        tabClassName="font-weight-bold"
                      >
                        <div className='script-panel'>
                          <div className="d-flex justify-content-end">
                            <button
                              className="btn btn-light rounded-circle mr-1"
                              onClick={() => {
                                setQuestionModal(!questionModal);
                                setSelectPart(ToeicParts.Part7);
                              }}
                            >
                              <i className="fa fa-cog"></i>
                            </button>
                          </div>
                          <ListGroup className="border">
                            {toeicPartQuestion.Part7.map((question, index) => (
                              <ListGroup.Item
                                className={`p-1 ${index == 0 ? "" : "mt-1"
                                  } border cursor-pointer ${selectQuestion == question
                                    ? "bg-primary text-white"
                                    : ""
                                  }`}
                                key={index}
                              >
                                <div className="d-flex justify-content-between align-items-middle">
                                  <p
                                    onClick={() => setSelectQuestion(question)}
                                    className={`p-2 ${selectQuestion == question ? "text-white" : ""
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
                      </Tab>
                    </Tabs>
                  </div>
                </div>
                <br></br>
                <div className="form-group d-flex justify-content-end">
                  <Link className="btn btn-secondary rounded mr-1" to="/admin/quan-ly-quiz-exam">
                    Hủy
                  </Link>
                  <button className="btn btn-primary rounded" onClick={() => submit()}>Lưu lại</button>
                </div>
              </div>
              <Modal
                show={questionModal}
                onHide={() => setQuestionModal(!questionModal)}
                animation
                size="lg"
                dialogClassName="modal-full-screen"
              >
                <Modal.Body className='modal-background'>
                  <h5>Danh sách câu hỏi khả dụng</h5>
                  <h6>Chọn một hoặc nhiều để thêm vào bài kiểm tra</h6>
                  <br></br>
                  <Search queryFunction={search}></Search>
                  <div className="row">
                    <div className="col-6">
                      <ListGroup className="border p-2 script-panel" style={{ overflowY: 'auto' }}>
                        {questions.map((question, index) => (
                          <ListGroup.Item
                            className={`p-1 ${index == 0 ? "" : "mt-2"
                              } border cursor-pointer ${selectQuestion == question
                                ? "bg-primary text-white"
                                : ""
                              }`}
                            key={index}
                          >
                            <div className="d-flex justify-content-between align-items-center" onClick={() => setSelectQuestion(question)}>
                              <p

                                className={`p-2 ${selectQuestion == question ? "text-white" : ""
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
                                    setSelectQuestions([...selectQuestions, question])
                                  }
                                  else {
                                    setSelectQuestions([...selectQuestions.filter(q => q != question)])
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
                  <Button variant="primary" onClick={() => {submitAdd()}}>Lưu lại</Button>
                </Modal.Footer>
              </Modal>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ExamCreate;
