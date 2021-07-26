import { Tab, Tabs, Row, Nav, Col } from "react-bootstrap";
import { QuestionTypes } from "../../constants/QuestionTypes";
import { Formik, Field, Form } from "formik";
import BasicQuestionCreate from "../managementquiz_exam/BasicQuestionCreate";
import { useEffect, useState } from "react";
import ConversationQuestionCreate from "../managementquiz_exam/ConversationQuestionCreate";
import ConnectionQuestionCreate from "../managementquiz_exam/ConnectionQuestionCreate";
import SelectQuestionCreate from "../managementquiz_exam/SelectQuestionCreate";
import ToeicQuestionCreate from "../managementquiz_exam/ToeicQuestionCreate";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import FillOutQuestionCreate from "../managementquiz_exam/FillOutQuestionCreate";
import * as Yup from "yup";
import { toast } from "react-toastify";
import ArrangeQuestionCreate from "../managementquiz_exam/ArrangeQuestionCreate";
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
    },
  ],
  file: null,
  audio: null,
  type: QuestionTypes.Basic,
  isMultipleAnswer: false,
  firstUser: "",
  secondUser: "",
};
const QuestionCreate = ({values,setFieldValue, errors, touched}) => {
  const [question, setQuestion] = useState({
    content: "",
    preQuestion: "",
    type: QuestionTypes.Basic,
    answers: [],
    file: null,
    isMultipleAnswer: false,
  });
  useEffect(() => {

  },[question])
  const [type, setType] = useState(QuestionTypes.Basic);
  const checkAnswer = (e, values) => {
    if (e.target.checked) {
      values.answers.forEach((value, index) => {
        if (index == e.target.dataset.id) {
          value.isQuestionAnswer = true;
        } else {
          value.isQuestionAnswer = false;
        }
      });
    }
  };
  const validationSchema = Yup.object().shape({
    preQuestion: Yup.string().required("Number of tickets is required"),
    answers: Yup.array().of(
      Yup.object().shape({
        required: Yup.string().required("Name is required"),
        firstAnswer: Yup.string().required(
          "Đáp án bắt buộc không được để trống"
        ),
      })
    ),
  });
  const createQuestion = (values) => {
    const question = {
      content: values.content,
      preQuestion: values.preQuestion,
      type: type,
      image: values.file,
      audio: values.audio,
    };
    switch (type) {
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
          toast("Câu hỏi thiếu cặp thẻ <p></p> ở vị trí điền khuyết");
        } else {
          question.answers = values.answers.map((answer, index) => {
            if (answer.content != "") {
              return {
                content: answer.content,
                isQuestionAnswer: answer.isQuestionAnswer,
              };
            }
          });
        }

        break;
      case QuestionTypes.Toeic:
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
  };
  return (
    <div>
      <div id="content-wrapper" className="d-flex flex-column script-panel-2">
        {/* <SubMenuClient></SubMenuClient> */}
        <div id="quiz">
          <div>
            {/* header: bắt đầu */}
            {/* header: kết thúc */}
            <section className="main">
              <div>
               
               
                 
                      <div className='nav d-flex flex-column'></div>
                      <Tab.Container
                        id="left-tabs-example"
                        defaultActiveKey={QuestionTypes.Basic}
                        className="h-100"
                        transition={false}
                        onSelect={(e) => {setType(e); values.type = e}}
                        mountOnEnter={true}
                      >
                        <Row title="Loại câu hỏi" className="script-panel-2">
                          <Col sm={2} title="Kịch bản" className="col">
                            <h5>Kịch bản</h5>
                            <Nav
                              variant="pills"
                              title="Kịch bản"
                              className="d-flex flex-column align-self-center sticky-top"
                            >
                              <Nav.Item className="border rounded">
                                <Nav.Link eventKey={QuestionTypes.Basic}>Câu hỏi mặc định</Nav.Link>
                              </Nav.Item>
                              <Nav.Item className="border rounded mt-2">
                                <Nav.Link eventKey={QuestionTypes.Connection}>
                                  Câu hỏi nối từ
                                </Nav.Link>
                              </Nav.Item>
                              <Nav.Item className="border rounded mt-2">
                                <Nav.Link eventKey={QuestionTypes.Arrange}>
                                  Câu hỏi sắp xếp
                                </Nav.Link>
                              </Nav.Item>
                              <Nav.Item className="border rounded mt-2">
                                <Nav.Link eventKey={QuestionTypes.Select}>
                                Câu hỏi điền - dạng 1
                                </Nav.Link>
                              </Nav.Item>
                              <Nav.Item className="border rounded mt-2">
                                <Nav.Link eventKey={QuestionTypes.FillOut}>
                                  Câu hỏi điền - dạng 2
                                </Nav.Link>
                              </Nav.Item>
                              <Nav.Item className="border rounded mt-2">
                                <Nav.Link eventKey={QuestionTypes.Conversation}>
                                  Câu hỏi hội thoại
                                </Nav.Link>
                              </Nav.Item>
                              <Nav.Item className="border rounded mt-2">
                                <Nav.Link eventKey={QuestionTypes.Toeic}>
                                  Câu hỏi toeic
                                  </Nav.Link>
                              </Nav.Item>
                            </Nav>
                          </Col>
                          <Col sm={10} className="col">
                            <Tab.Content>
                              <Tab.Pane eventKey={QuestionTypes.Basic}>
                                {type == QuestionTypes.Basic && (
                                  <BasicQuestionCreate
                                    values={values}
                                    setFieldValue={setFieldValue}
                                    checkAnswer={checkAnswer}
                                    touched={touched}
                                    errors={errors}
                                  ></BasicQuestionCreate>
                                )}
                                <div className="d-flex justify-content-end">
                                  <p>(*) là phần bắt buộc</p>
                                </div>
                              </Tab.Pane>
                              <Tab.Pane eventKey={QuestionTypes.Connection}>
                                {type == QuestionTypes.Connection && (
                                  <ConnectionQuestionCreate
                                    values={values}
                                    setFieldValue={setFieldValue}
                                  ></ConnectionQuestionCreate>
                                )}
                              </Tab.Pane>
                              <Tab.Pane eventKey={QuestionTypes.Arrange}>
                                {type == QuestionTypes.Arrange && (
                                  <ArrangeQuestionCreate
                                    values={values}
                                    setFieldValue={setFieldValue}
                                  ></ArrangeQuestionCreate>
                                )}
                              </Tab.Pane>
                              <Tab.Pane eventKey={QuestionTypes.Select}>
                                {type == QuestionTypes.Select && (
                                  <SelectQuestionCreate
                                    values={values}
                                    setFieldValue={setFieldValue}
                                    checkAnswer={checkAnswer}
                                  ></SelectQuestionCreate>
                                )}
                              </Tab.Pane>
                              <Tab.Pane eventKey={QuestionTypes.FillOut}>
                                {type == QuestionTypes.FillOut && (
                                  <FillOutQuestionCreate
                                    values={values}
                                    setFieldValue={setFieldValue}
                                  ></FillOutQuestionCreate>
                                )}
                              </Tab.Pane>
                              <Tab.Pane eventKey={QuestionTypes.Toeic}>
                                {type == QuestionTypes.Toeic && (
                                  <ToeicQuestionCreate
                                    values={values}
                                    setFieldValue={setFieldValue}
                                    checkAnswer={checkAnswer}
                                  ></ToeicQuestionCreate>
                                )}
                              </Tab.Pane>
                              <Tab.Pane eventKey={QuestionTypes.Conversation}>
                                {type == QuestionTypes.Conversation && (
                                  <ConversationQuestionCreate
                                    values={values}
                                    setFieldValue={setFieldValue}
                                  ></ConversationQuestionCreate>
                                )}
                              </Tab.Pane>
                            </Tab.Content>
                          </Col>
                        </Row>
                      </Tab.Container>
              
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};
export default QuestionCreate;
