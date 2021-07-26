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
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { SelectedElement } from "rsuite/es/Picker";
import QuestionPreview from "../question/QuestionPreview";
import { QuestionTypes } from "../../constants/QuestionTypes";
import { ScriptTypes } from "../../constants/ScriptTypes";
import { Tabs, Tab } from "react-bootstrap";
const GrammarScript = ({ setGrammar, script }) => {
  const [newGrammarScript, setNewGrammarScript] = useState({});
  const [questionFilter, setQuestionFilter] = useState("none");
  const [grammarFilter, setGrammarFilter] = useState("grammar");
  const [theoryCollapse, setTheoryCollapse] = useState(false);
  const [questionCollapse, setQuestionCollapse] = useState(false);
  const [questions, setQuestions] = useState(script?.questions || []);
  const [theory, setTheory] = useState("");
  const [selectQuestion, setSelectQuestion] = useState({});
  const [availableQuestions, setAvailableQuestions] = useState([]);
  const [questionToast, setQuestionToast] = useState(false);
  const [isBusy, setIsBusy] = useState(true);
  useEffect(() => {
    setNewGrammarScript(script);
    setTheory(script?.theory || "");
    setQuestions(script?.questions || []);
    setIsBusy(false);
  }, [script?.questions, script?.theory, script]);
  useEffect(() => {
    setGrammar({
      id: script?.id || "00000000-0000-0000-0000-000000000000",
      theory: theory,
      questions: questions,
      type: ScriptTypes.GRAMMAR,
    });
  }, [questions, theory]);
  async function fetchQuestions() {
    const result = await questionApiV2.getFilter(questionFilter, grammarFilter);
    console.log(questions);
    setAvailableQuestions(
      result.filter(
        (value) => questions.find((q) => q.id == value.id) == undefined
      )
    );
  }
  useEffect(() => {
    if (!isBusy) {
      fetchQuestions();
    }
  }, [questionFilter, isBusy]);
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
      <Tabs defaultActiveKey="theory" id="controlled-tab-example">
        <Tab
          eventKey="theory"
          title="Lý thuyết"
          tabClassName="font-weight-bold"
        >
          <CKEditor
            config={{
              fontSize: {
                options: ["tiny", "default", "big"],
              },
              toolbar: [
                "heading",
                "fontSize",
                "|",
                "bold",
                "italic",
                "blockQuote",
                "link",
                "numberedList",
                "bulletedList",
                "imageUpload",
                "insertTable",
                "tableColumn",
                "tableRow",
                "mergeTableCells",
                "mediaEmbed",
                "|",
                "undo",
                "redo",
              ],
              ckfinder: {
                // Upload the images to the server using the CKFinder QuickUpload command
                // You have to change this address to your server that has the ckfinder php connector
                uploadUrl: `${process.env.REACT_APP_V2_API_URL}/streaming/image`,
              },
            }}
            editor={ClassicEditor}
            data={script?.theory || ""}
            onReady={(editor) => {
              // You can store the "editor" and use when it is needed.
              console.log("Editor is ready to use!", editor);
              editor.on("change:uploaded", function(evt) {
                // Prevent the default response handler.
                evt.stop();

                // Get XHR and response.
                var data = evt.data,
                  xhr = data.fileLoader.xhr,
                  response = xhr.responseText.split("|");
                console.log(data);
                if (response[1]) {
                  // An error occurred during upload.
                  data.message = response[1];
                  evt.cancel();
                } else {
                  data.url = response[0];
                  console.log(data.url);
                }
              });
            }}
            onChange={(event, editor) => {
              const data = editor.getData();
              console.log(data);
              editor.on("change:uploaded", function(evt) {
                // Prevent the default response handler.
                evt.stop();
                console.log("dkm dkm");
                // Get XHR and response.
                var data = evt.data,
                  xhr = data.fileLoader.xhr,
                  response = xhr.responseText.split("|");
                console.log(data);
                if (response[1]) {
                  // An error occurred during upload.
                  data.message = response[1];
                  evt.cancel();
                } else {
                  data.url = response[0];
                  console.log(data.url);
                }
              });
              setTheory(data);
            }}
            event={(editor) => {
              editor.on("fileUploadResponse", (data) => {
                console.log(data);
              });
            }}
            onUpload={(event, edito) => {
              console.log(event);
            }}
          />
        </Tab>
        <Tab
          eventKey="questions"
          title="Câu hỏi"
          tabClassName="font-weight-bold"
        >
          <div className="d-flex justify-content-end">
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
              <div className="sticky-top">
                <form className="form-group">
                  <input
                    type="radio"
                    value="none"
                    name="type"
                    checked={questionFilter == "none"}
                    onChange={(e) => setQuestionFilter(e.target.value)}
                  ></input>
                  <span> Tất cả</span>
                  <br></br>
                  <input
                    type="radio"
                    value="select"
                    name="type"
                    checked={questionFilter == "select"}
                    onChange={(e) => setQuestionFilter(e.target.value)}
                  ></input>
                  <span> Câu hỏi điền</span>
                  <br></br>
                  <input
                    type="radio"
                    value="writing"
                    name="type"
                    checked={questionFilter == "writing"}
                    onChange={(e) => setQuestionFilter(e.target.value)}
                  ></input>
                  <span> Câu hỏi writing</span>
                  <br></br>
                  <input
                    type="radio"
                    value="basic"
                    name="type"
                    onChange={(e) => setQuestionFilter(e.target.value)}
                  ></input>
                  <span> Câu hỏi mặc định</span>
                </form>
              </div>
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
          <Row>
            <Col
              sm={6}
              className="script-panel-sm"
              style={{ overflow: "auto" }}
            >
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
        </Tab>
      </Tabs>
    </div>
  );
};
export default GrammarScript;
