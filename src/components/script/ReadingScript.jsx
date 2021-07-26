import { useEffect, useState } from "react";
import {
  Toast,
  OverlayTrigger,
  Popover,
  ListGroup,
  Col,
  Row,
} from "react-bootstrap";
import questionApiV2 from "../../api/2.0/questionApi";
import { QuestionTypes } from "../../constants/QuestionTypes";
import { ScriptTypes } from "../../constants/ScriptTypes";
import QuestionPreview from "../question/QuestionPreview";
const ReadingScript = ({ script, setReading }) => {
  const [questions, setQuestions] = useState(script?.questions || []);
  const [query, setQuery] = useState("");
  const [questionToast, setQuestionToast] = useState(false);
  const [selectQuestion, setSelectQuestion] = useState({});
  const [availableQuestions, setAvailableQuestions] = useState([]);
  useEffect(() => {
    setQuestions(script?.questions || []);
    fetchData();
  }, [script]);
  useEffect(() => {
    setReading({
      id: script?.id || "00000000-0000-0000-0000-000000000000",
      questions: questions,
      type: ScriptTypes.READING,
    });
  }, [questions]);
  async function fetchData() {
    const result = await questionApiV2.getFilter(QuestionTypes.Reading);
    setAvailableQuestions(
      result.filter(
        (value) => questions.findIndex((q) => q.id == value.id) == -1
      )
    );
  }
  useEffect(() => {
    fetchData();
  }, [query]);
  function addQuestion(question) {
    setQuestions([...questions, question]);
    setAvailableQuestions([
      ...availableQuestions.filter((value) => value != question),
    ]);
  }
  function removeQuestion(question) {
    if (selectQuestion == question) {
      setSelectQuestion({});
    }
    setQuestions([...questions.filter((value) => value !== question)]);
    setAvailableQuestions([question, ...availableQuestions]);
  }
  return (
    <div>
      <Row>
        <Col sm={6} className="script-panel-sm" style={{ overflow: "auto" }}>
          <div className="d-flex justify-content-between sticky-top">
            <h6 className="mt-2 pt-1">Câu hỏi</h6>
            <button
              className="btn btn-light rounded-circle"
              onClick={() => setQuestionToast(!questionToast)}
            >
              <i className="fa fa-cog"></i>
            </button>
          </div>
          <Toast
            onClose={() => setQuestionToast(!questionToast)}
            show={questionToast}
            animation={true}
            className="data-toast-md"
          >
            <Toast.Header>
              <strong className="mr-auto">Lựa chọn câu hỏi</strong>
            </Toast.Header>
            <Toast.Body className="container">
              <div className="sticky-top"></div>
              <ListGroup className="list-group-sm overflow-auto">
                {availableQuestions.map((question, index) => (
                  <OverlayTrigger
                    key={index}
                    trigger={["hover", "focus"]}
                    placement="left"
                    overlay={
                      <Popover id="popover-basic" className="big">
                        <Popover.Title as="h6">Thông tin câu hỏi</Popover.Title>
                        <Popover.Content>
                          <QuestionPreview
                            question={question}
                          ></QuestionPreview>
                        </Popover.Content>
                      </Popover>
                    }
                  >
                    <ListGroup.Item
                      className="p-2 text-dark border cursor-pointer mt-1"
                      onClick={() => addQuestion(question)}
                    >
                      {question.preQuestion}: {question.content}
                    </ListGroup.Item>
                  </OverlayTrigger>
                ))}
              </ListGroup>
            </Toast.Body>
          </Toast>
          <ListGroup className="border">
            {questions.map((question, index) => (
              <ListGroup.Item
                className={`p-1 ${
                  index == 0 ? "" : "mt-1"
                } border cursor-pointer ${
                  selectQuestion == question ? "bg-primary text-white" : ""
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
        </Col>
        <Col
          sm={6}
          className="d-flex align-middle justify-content-center script-panel-sm"
        >
          {Object.keys(selectQuestion).length == 0 ? (
            <p>Chọn câu hỏi để xem</p>
          ) : (
            <QuestionPreview question={selectQuestion}></QuestionPreview>
          )}
        </Col>
      </Row>
    </div>
  );
};
export default ReadingScript;
