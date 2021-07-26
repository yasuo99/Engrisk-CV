import { useParams } from "react-router";
import { ProgressBar } from "react-bootstrap";
import WrongAnswer from "../../components/questionresult/WrongAnswer";
import RightAnswer from "../../components/questionresult/RightAnswer";
import { useEffect, useState } from "react";
import NormalQuestion from "../../components/typequestion/NormalQuestion";
import { connection } from "../../signalR/createSignalRConnection";
import { HubConnectionState } from "@microsoft/signalr";
import { useDispatch, useSelector } from "react-redux";
import { FinishUp } from "../../actions/sectionActions";
import Loader from 'react-loader-spinner';
import { Link, useHistory } from "react-router-dom";
import { ScriptTypes } from "../../constants/ScriptTypes";
import routeApi from "../../api/2.0/routeApi";
import TheoryScreen from "./TheoryScreen";
import StartPhaseScreen from "./StartPhaseScreen";
import ReactPlayer from "react-player";
import { AudioPlayer } from "../../components/utils/AudioPlayer";
import { Button, Modal } from "react-bootstrap";
import sectionApiV2 from '../../api/2.0/sectionApi';
import { QuestionTypes } from "../../constants/QuestionTypes";
import { toast } from "react-toastify";
const cardData = [
  {
    front: {
      text: "what the fuck",
      image: "https://o.quizlet.com/RWRdgDus.uuqNDUrJ0ernA.jpg",
    },
    back: {
      text: "Camping",
    },
  },
];
const SectionFlashcard = () => {
  const { account, isLoggedIn } = useSelector(state => state.auth)
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [currentScript, setCurrentScript] = useState({
    words: [],
    questions: [],
  });
  const [remainQuestions, setRemainQuestions] = useState([])
  const [scriptIndex, setScriptIndex] = useState(0);
  const [isBusy, setBusy] = useState(true);
  const [isFinish, setIsFinish] = useState(false);
  const [currentWord, setCurrentWord] = useState({});
  const [wordIndex, setWordIndex] = useState(0);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [vocabularyScreen, setVocabularyScreen] = useState(true);
  const [step, setStep] = useState(0);
  const [answerCheck, setAnswerCheck] = useState(-1);
  const [currentQuestion, setCurrentQuestion] = useState({
    answers: [],
  });

  const [isLastQuestion, setIsLastQuestion] = useState(true);
  const { route } = useSelector(state => state.route);
  const { type } = useParams();
  let { sectionId, scriptId, routeId } = useParams();
  const [theory, setTheory] = useState('');
  const [questions, setQuestions] = useState([

  ])
  const history = useHistory();
  const [words, setWords] = useState([])
  const [isStartPhaseScreen, setIsStartPhaseScreen] = useState(false); //Screen check
  const [isTheoryScreen, setIsTheoryScreen] = useState(false); //Screen check
  const [isVocabularyScreen, setIsVocabularyScreen] = useState(false); //Screen check
  const [isQuestionScreen, setIsQuestionScreen] = useState(false) //Screen check
  const [isQuestionLoop, setIsQuestionLoop] = useState(false);
  const [modalExit, setModalExit] = useState(false);
  const [isFail, setIsFail] = useState(false);
  const [serverError, setServerError] = useState('')
  useEffect(async () => {
    async function fetchData() {
      try {
        const result = await routeApi.routeLearn(routeId, sectionId, scriptId);
        console.log(result);
        setIsStartPhaseScreen(true);
        setCurrentScript(result);
        // if (result.scripts.length > 0) {
        //   setBusy(false);
        //   setData(result.scripts);

        setCurrentWord(result.words[wordIndex]);
        setCurrentQuestion(result.questions[questionIndex]);
        setBusy(false);
      } catch (error) {
        setServerError(error.response.data.error)
      }

      // console.log(result);
      // if (result.status == 400 || result.status == 404) {
      //   setServerError(result.error)
      // } else {

      // };


    }
    fetchData();
    if (isLoggedIn) {
      if (connection.state == HubConnectionState.Disconnected) {
        connection.start();
      }
    }

    //   setCurrentScript(result.scripts[scriptIndex]);
    // }
  }, [setData]);
  function start() {
    setIsStartPhaseScreen(false);
    if (currentScript.words.length > 0 || currentScript.questions.length > 0) {
      setWords(currentScript.words);
      setQuestions(currentScript.questions);
      if (currentScript.theory) {
        setIsTheoryScreen(true);
        setTheory(currentScript.theory)
      } else {
        if (currentScript.words.length > 0) {
          setIsVocabularyScreen(true);

        } else {
          if (currentScript.questions.length > 0) {
            setIsQuestionScreen(true);

          } else {
            finishScript();
          }

        }
      }
    }
    else {
      setBusy(true);
    }
  }
  useEffect(() => {
    if (!isBusy) {
      if (remainQuestions.length == 0) {
        console.log('clgv');
        setIsQuestionLoop(false);
        setIsStartPhaseScreen(true);
        setIsQuestionScreen(false);
        setIsVocabularyScreen(false);
        setIsTheoryScreen(false);
      }
    }
  }, [currentScript]);
  useEffect(() => {
    if (!isBusy) {
      console.log("?", currentScript);
      setCurrentWord(currentScript.words[wordIndex]);
    }
  }, [wordIndex, currentScript]);
  useEffect(() => {
    if (!isBusy) {
      if (currentScript.questions.length == 1) {
        setIsLastQuestion(true)
      }
      setCurrentQuestion(currentScript.questions[questionIndex]);
    }
  }, [questionIndex, currentScript]);
  useEffect(() => {
    if (connection.state == HubConnectionState.Disconnected) {
      connection.start();
    }
  }, [connection])
  function vocabularyIndexChange() {
    if (wordIndex < currentScript.words.length - 1) {
      setWordIndex(wordIndex + 1);
    } else {
      if (currentScript.questions.length > 0) {
        console.log('cc');
        setIsQuestionScreen(true)
        setIsVocabularyScreen(false);
      }
      else {
        console.log('clm');
        finishScript()
      }
    }
  }
  function questionIndexChange() {
    if (questionIndex < currentScript.questions.length - 1) {
      setQuestionIndex(questionIndex + 1)
    } else {
      if (remainQuestions.length > 0) {
        setCurrentScript({
          ...currentScript,
          questions: [...remainQuestions]
        })
        setIsQuestionLoop(true);
        setQuestionIndex(0);
        setIsLastQuestion(true);
      } else {
        finishScript();
      }
    }
  }
  function indexChange() {
    const currentStep = step;
    setStep(currentStep + 1);
    console.log(wordIndex);
    if (wordIndex < currentScript.words.length - 1) {
      setWordIndex(wordIndex + 1);
    } else {
      if (currentScript.questions.length > 0) {
        setVocabularyScreen(false);
        setIsQuestionScreen(true);
      } else {
        console.log('dkm');
      }
    }
    if (!vocabularyScreen && questionIndex < currentScript.questions.length - 1) {
      setQuestionIndex(questionIndex + 1);
      console.log("dit con me");
    }
    console.log(currentStep);
    if (currentStep == currentScript.words.length + currentScript.questions.length - 1) {
      if (remainQuestions.length > 0) {
        setStep(0);
        setQuestionIndex(0);
        setQuestions([...data, {
          words: [],
          questions: remainQuestions
        }])
      } else {
        finishScript();
      }
    }
  }
  function Check(bool) {
    setIsQuestionScreen(bool);
  }
  function SelectAnswer(result) {
    console.log(result);
    setAnswerCheck(result);
  }
  useEffect(() => {
    if (!isQuestionScreen) {
      setAnswerCheck(-1);
    }
  }, [isQuestionScreen])
  function AddRemainQuestion(question) {
    if (question.type != QuestionTypes.Toeic) {
      setIsLastQuestion(false);
      setRemainQuestions([...remainQuestions.filter(q => q !== question), question])
    } else {
      setIsFail(true);
    }

  }
  function RemoveRemainQuestion(question) {
    if (question.type != QuestionTypes.Toeic) {
      console.log(...remainQuestions.filter(q => q !== question));
      setRemainQuestions([...remainQuestions.filter(q => q !== question)])
    }
  }
  function finishScript() {
    if (isLoggedIn) {
      connection.on("SectionProgress", (data) => {
        const result = JSON.parse(data);
        console.log(result);
        dispatch(FinishUp(result))
        setIsFinish(true);
      })
      connection.on("ExamScriptFail", () => {
        setIsFinish(true);
        toast('Bạn không hoàn thành bài kiểm tra này', { type: 'info' })
      });
      connection.on("NextScript", (data) => {
        console.log(data);
        const result = JSON.parse(data);
        console.log(result);
        setCurrentScript(result);
        setWordIndex(0);
        setQuestionIndex(0);
        history.push(`/routes/${routeId}/sections/${sectionId}/scripts/${result.id}`)
      })
      const data = {
        sectionId: sectionId,
        accountId: account.id,
        scriptId: scriptId,
        status: isFail
      }
      console.log(data);
      connection.send("ScriptDone", data);
    }
    else {
      console.log('finish');
      setIsFinish(true);
    }
  }

  function next() {
    setIsTheoryScreen(false);
    if (currentScript.words.length > 0) {
      setCurrentWord(currentScript.words[wordIndex])
      setIsVocabularyScreen(true);
    } else {
      if (currentScript.questions.length > 0) {
        setIsQuestionScreen(true);
        setQuestions(currentScript.questions);
      }
      else {
        console.log('cc');
        finishScript();
      }
    }
  }

  console.log(currentWord);
  console.log(currentQuestion);
  return (
    <div>
      {!isBusy ? (
        <div id="wrapper">
          <div id="content-wrapper" className="d-flex flex-column">
            <div id="content" style={{ overflow: "auto", height: "100vh" }}>
              <main id="scroll">
                <div className="mt-2 container">
                  <div className='d-flex justify-content-start'>
                    {!isStartPhaseScreen && <ProgressBar
                      variant={isQuestionLoop ? 'danger' : 'primary'}
                      className="mt-3 w-75"
                      now={wordIndex + questionIndex}
                      max={
                        currentScript.words.length + currentScript.questions.length - 1
                      }
                    ></ProgressBar>}


                  </div>
                  <div className='d-flex justify-content-end'>
                    <Link className="btn btn-light rounded-circle" to={`${isFinish ? `/home` : '#'}`} onClick={() => setModalExit(!modalExit)}>
                      <i className="fa fa-remove"></i>
                    </Link>
                  </div>
                </div>
                <div className="container learning-layout">

                  {/* {
                  ) : (
                    <NormalQuestion question={currentQuestion} addRemainQuestion={AddRemainQuestion} removeRemainQuestion={RemoveRemainQuestion} check={Check} answerCheck={SelectAnswer} isLastQuestion={isLastQuestion} />
                  )} */}
                  {/* 
                  {data[0].questions.length > 0 && (
                    <NormalQuestion question={data[0].questions[index]} />
                  )} */}
                  {/* {!isQuestionScreen && <div className="container">
                    <div className="drawer-content">
                      <div className="page-wrap">
                        {!isFinish ? <button
                          className="feedback-bar-btn"
                          onClick={() => {
                            {
                              indexChange();
                            }
                          }}
                        >
                          Kế tiếp
                        </button> : <Link
                          className="btn feedback-bar-btn"
                          to={`/sections/${sectionId}/finish`}
                        >
                          Kết thúc
                        </Link>}

                      </div></div>
                  </div>} */}

                  {isStartPhaseScreen && <StartPhaseScreen type={currentScript.type} start={start}></StartPhaseScreen>}
                  {isTheoryScreen && <TheoryScreen theory={theory} next={next} isFinish={isFinish} sectionId={sectionId} scriptId={scriptId}></TheoryScreen>}
                  {isVocabularyScreen &&
                    <div>
                      <div className="mt-4">
                        <h5>{currentWord.flashcardTitle}</h5>
                        <img
                          className="vocabulary-box-img img-fluid rounded mx-auto d-block ex-img fluid-content-item w-75"
                          src={currentWord.wordImg || 'https://cdn.busuu.com/media/resized/entity/1440/company_1528111874_1440.jpg'}
                        ></img>
                        <h4 className="">
                          {currentWord.eng}
                          <span>{currentWord.wordVoice && <div className='d-flex justify-content-center'><AudioPlayer src={currentWord.wordVoice}></AudioPlayer></div>}</span>
                        </h4>
                        <br></br>
                        <h4 className="">{currentWord.vie}</h4>
                        <hr className="d-flex justify-content-center w-75"></hr>
                        <div className="mt-2 example">
                          <h5>Ví dụ</h5>
                          {currentWord.examples.map((example, idx) =>
                            <h6 key={idx} className='text-dark'>{example.eng} ~ {example.vie}</h6>
                          )}
                        </div>
                      </div>
                      <div className="container">
                        <div className="drawer-content">
                          <div className="page-wrap">
                            {!isFinish ? <button
                              className="feedback-bar-btn"
                              onClick={() => {
                                {
                                  vocabularyIndexChange();
                                }
                              }}
                            >
                              Kế tiếp
                            </button> : isLoggedIn ? <Link
                              className="btn feedback-bar-btn"
                              to={`/sections/${sectionId}/finish`}
                            >
                              Kết thúc
                            </Link> : <Link
                              className="btn feedback-bar-btn"
                              to='/home'
                            >
                              Kết thúc
                            </Link>}

                          </div></div>
                      </div>
                    </div>}
                  {isQuestionScreen && <NormalQuestion question={currentQuestion} addRemainQuestion={AddRemainQuestion} removeRemainQuestion={RemoveRemainQuestion} check={Check} answerCheck={SelectAnswer} isLastQuestion={isLastQuestion} />}
                  {answerCheck === 1 && <RightAnswer indexChange={questionIndexChange} isFinish={isFinish} sectionId={sectionId} />}
                  {answerCheck === 0 && (currentQuestion.type == QuestionTypes.Toeic ? <WrongAnswer indexChange={questionIndexChange} isFinish={isFinish} sectionId={sectionId} /> : <WrongAnswer indexChange={questionIndexChange} />)}
                </div>
              </main>
            </div>
          </div>
        </div>
      ) : <div id="wrapper">
        <div id="content-wrapper" className="d-flex flex-column">
          <div id="content" style={{ overflow: "auto", height: "100vh" }}>
            <main id="scroll">
              <div className="mt-2 container">
                <div className="row">
                  <div className="offset-md-11 col-1">
                    <Link className="btn btn-light rounded-circle" to="/home">
                      <i className="fa fa-remove"></i>
                    </Link>
                  </div>
                </div>
                <div className='d-flex justify-content-center'>
                  <Loader type="Oval"
                    color="#00BFFF"
                    height={400}
                    width={400} />
                </div>
                <p className='d-flex justify-content-center'>{serverError ? serverError : 'Hiện nội dung học này chưa được thêm vào vui lòng thử lại sau'}!</p>
              </div>
            </main>
          </div>
        </div>
      </div>
      }
      <Modal show={modalExit} animation onHide={() => setModalExit(!modalExit)} centered size="lg" dialogClassName='sweet-alert-modal'>
        <Modal.Body>
          <div className='text-center'>
            <i className='fa fa-4x fa-warning text-danger'></i>
            <br></br>
            <br></br>
            <h3 className='text-info'>Bạn có chắc muốn thoát</h3>
            <p className='text-danger'>
              Mọi kết quả có thể sẽ không được lưu!
            </p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setModalExit(!modalExit)}>Hủy</Button>
          <Link className='btn btn-danger' to={'/home'}>Xác nhận</Link>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
export default SectionFlashcard;
