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
import wordApiV2 from "../../api/2.0/wordApi";
import { ScriptTypes } from "../../constants/ScriptTypes";
import QuestionPreview from "../question/QuestionPreview";
import Search from "../search/Search";
import { Tabs, Tab } from "react-bootstrap";
import wordCategoryApi from "../../api/2.0/wordCategoryApi";
import VocabularyPreview from "../../pages/VocabularyReview/VocabularyPreview";
const VocabularyScript = ({ script, setVocabulary }) => {
  const [words, setWords] = useState(script?.words || []);
  const [availableWords, setAvailableWords] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [selectWord, setSelectWord] = useState({});
  const [wordToast, setWordToast] = useState(false);
  const [categories, setCategories] = useState([]);
  const [query, setQuery] = useState("");
  function addWord(word) {
    setWords([...words, word]);
    setAvailableWords([...availableWords.filter((value) => value != word)]);
  }
  function removeWord(word) {
    setWords([...words.filter((value) => value != word)]);
    setAvailableWords([word, ...availableWords]);
    setSelectWord({});
  }
  async function fetchData() {
    var wordPracticeQuestion = await wordApiV2.getAllPracticeQuestion(
      selectWord.id
    );
    setQuestions(wordPracticeQuestion);
  }
  useEffect(() => {
    if (Object.keys(selectWord).length > 0) {
      fetchData();
    }
  }, [selectWord]);
  useEffect(() => {
    setVocabulary({
      id: script?.id || "00000000-0000-0000-0000-000000000000",
      words: words,
      type: ScriptTypes.VOCABULARY,
    });
  }, [words]);
  useEffect(() => {
    async function fetchCategories() {
      const categories = await wordCategoryApi.getAllWithoutPaginate();
      setCategories(categories);
    }
    setWords(script?.words || []);
    fetchCategories();
  }, [script]);
  function searchVocabulary(query) {
    setQuery(query);
  }
  useEffect(() => {
    async function fetchData() {
      const result = await wordApiV2.getVocabularyForScript(query);
      setAvailableWords(
        result.filter((value) => words.findIndex((w) => w.id == value.id) == -1)
      );
    }
    fetchData();
  }, [query]);
  return (
    <div>
      <Tabs defaultActiveKey="vocabulary" id="controlled-tab-example">
        <Tab
          eventKey="vocabulary"
          title="Từ vựng"
          tabClassName="font-weight-bold"
        >
          <Row>
            <Col
              sm={5}
              className="script-panel-sm"
              style={{ overflow: "auto" }}
            >
              <div className="d-flex justify-content-between sticky-top">
                <h5 className="text-dark mt-2 pt-1">Từ vựng</h5>
                <button
                  className="btn btn-light rounded-circle"
                  onClick={() => setWordToast(!wordToast)}
                >
                  <i className="fa fa-cog"></i>
                </button>
              </div>
              {/* <select name="" id="" className="pagination-select">
              <option value="">Chọn nhanh với nhóm từ hoặc lựa chọn từng từ vựng</option>
                {categories.map((category,index) => 
                  <option value={category.id} key={index}>{category.categoryName}</option>
                )}
               
              </select> */}
              <ListGroup className="border">
                {words.map((word, index) => (
                  <ListGroup.Item
                    className={`p-1 ${
                      index == 0 ? "" : "mt-1"
                    } border cursor-pointer ${
                      selectWord == word ? "bg-primary text-white" : ""
                    }`}
                    key={index}
                  >
                    <div className="d-flex justify-content-between align-items-middle">
                      <p
                        onClick={() => setSelectWord(word)}
                        className={`p-2 ${
                          selectWord == word ? "text-white" : ""
                        }`}
                      >
                        {word.eng}
                      </p>
                      <button
                        className="btn btn-light"
                        onClick={() => removeWord(word)}
                      >
                        {" "}
                        <i className="fa fa-remove text-danger"></i>
                      </button>
                    </div>
                  </ListGroup.Item>
                ))}
              </ListGroup>
              <Toast
                onClose={() => setWordToast(!wordToast)}
                show={wordToast}
                animation={true}
                className="data-toast-sm"
              >
                <Toast.Header>
                  <strong className="mr-auto">Lựa chọn từ vựng</strong>
                </Toast.Header>
                <Toast.Body className="container">
                  <div className="sticky-top">
                    <Search queryFunction={searchVocabulary}></Search>
                  </div>
                  <ListGroup className="list-group-sm overflow-auto">
                    {availableWords.map((word, index) => (
                      <OverlayTrigger
                        key={index}
                        trigger={["hover", "focus"]}
                        placement="left"
                        overlay={
                          <Popover id="popover-basic" className="big">
                            <Popover.Title as="h6">
                              Thông tin câu hỏi
                            </Popover.Title>
                            <Popover.Content>{word.eng}</Popover.Content>
                          </Popover>
                        }
                      >
                        <ListGroup.Item
                          className="p-2 text-dark border cursor-pointer mt-1"
                          onClick={() => addWord(word)}
                        >
                          {word.eng}
                        </ListGroup.Item>
                      </OverlayTrigger>
                    ))}
                  </ListGroup>
                </Toast.Body>
              </Toast>
            </Col>
            <Col sm={3}>
              {Object.keys(selectWord).length > 0 && <VocabularyPreview vocabulary={selectWord}></VocabularyPreview>}
            </Col>
            <Col sm={3}>
              {Object.keys(selectWord).length == 0 ? (
                <div className="d-flex justify-content-center align-items-middle">
                  <p>Chọn từ vựng để xem câu hỏi luyện tập</p>
                </div>
              ) : questions.length > 0 ? (
                <ListGroup className="list-group-sm overflow-auto">
                  {questions.map((question, index) => (
                    <OverlayTrigger
                      key={index}
                      trigger={["hover", "focus"]}
                      placement="left"
                      overlay={
                        <Popover id="popover-basic" className="big">
                          <Popover.Title as="h6">
                            Thông tin câu hỏi
                          </Popover.Title>
                          <Popover.Content>
                            <QuestionPreview
                              question={question}
                            ></QuestionPreview>
                          </Popover.Content>
                        </Popover>
                      }
                    >
                      <ListGroup.Item className="p-2 text-dark border cursor-pointer mt-1">
                        {question.preQuestion}: {question.content}
                      </ListGroup.Item>
                    </OverlayTrigger>
                  ))}
                </ListGroup>
              ) : (
                <div className="d-flex justify-content-center align-items-middle">
                  <p>Từ vựng chưa có câu hỏi luyện tập</p>
                </div>
              )}
            </Col>
          </Row>
        </Tab>
      </Tabs>
    </div>
  );
};
export default VocabularyScript;
