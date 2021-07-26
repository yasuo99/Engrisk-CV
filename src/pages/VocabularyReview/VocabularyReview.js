import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import accountApiV2 from "../../api/2.0/accountApi";
import { Button, Modal, ProgressBar } from "react-bootstrap";
import WrongAnswer from "../../components/questionresult/WrongAnswer";
import RightAnswer from "../../components/questionresult/RightAnswer";
import NormalQuestion from "../../components/typequestion/NormalQuestion";
import AnonymousSplashPage from "../SplashPage/AnonymousSplash";
import wordApiV2 from "../../api/2.0/wordApi";
import Loader from 'react-loader-spinner';
import { Link } from "react-router-dom";
const VocabularyReview = () => {
    const [isBusy, setIsBusy] = useState(true);
    const [questions, setQuestions] = useState([]);
    const [remainQuestions, setRemainQuestions] = useState([]);
    const { option } = useParams();
    const { account } = useSelector(state => state.auth)
    const { isLoggedIn } = useSelector(state => state.auth)
    const [isDisplaySplash, setIsDisplaySplash] = useState(false);
    const [isQuestionScreen, setIsQuestionScreen] = useState(false);
    const [index, setIndex] = useState(0)
    const [isFinish, setIsFinish] = useState(false);
    const [currentQuestion, setCurrentQuestion] = useState({})
    const [isLastQuestion, setIsLastQuestion] = useState(false)
    const [answerCheck, setAnswerCheck] = useState(-1);
    const { words } = useSelector(state => state.word)
    const [modalExit, setModalExit] = useState(false);
    useEffect(async () => {


        console.log(option);
        let result;
        switch (option) {
            case "weak":
                console.log("weak");
                result = await accountApiV2.vocabularyReview(account.id, option);
                setQuestions(result);
                break;
            case "medium":
                console.log("medium");
                result = await accountApiV2.vocabularyReview(account.id, option);
                setQuestions(result);
                break;
            case "strong":
                console.log("strong");
                result = await accountApiV2.vocabularyReview(account.id, option);
                setQuestions(result);
                break;
            case "all":
                console.log("all");
                result = await accountApiV2.vocabularyReview(account.id, option);
                setQuestions(result);
                break;
            case "flashcard":
                result = await wordApiV2.vocabularyReview(words);
                setQuestions(result);
                break;
            default:
                break;
        }
        if (result.length > 0) {
            setIsBusy(false);
            setCurrentQuestion(result[index])
        }

    }, [option])
    function indexChange() {
        console.log(remainQuestions);
        if (!isDisplaySplash) {
            setIsDisplaySplash(true)
        }
        if (remainQuestions.length > 0) {
            setQuestions([...questions, ...remainQuestions])
            setRemainQuestions([])
        }
        setIndex(index + 1);
    }
    useEffect(() => {
        if (index == questions.length - 1) {
            setIsLastQuestion(true)
        }
        setCurrentQuestion(questions[index])
    }, [index])
    function addRemainQuestion(question) {
        setIsLastQuestion(false)
        setRemainQuestions([...remainQuestions.filter(q => q !== question), question])
    }
    function removeRemainQuestion(question) {
        const newRemain = remainQuestions.filter(q => q !== question);
        console.log(newRemain);
        if (newRemain.length == 0 && index == questions.length - 1) {
            setIsFinish(true);
        }
        setRemainQuestions([...newRemain])
    }
    function checkAnswer(result) {
        setAnswerCheck(result)
    }

    return (

        <div>
            {!isBusy ? (
                <div id="wrapper">
                    <div id="content-wrapper" className="d-flex flex-column">
                        <div id="content" style={{ overflow: "auto", height: "100vh" }}>
                            <main id="scroll">
                                <div className="mt-2">
                                    <div className="row">
                                        <div className="offset-md-11 col-1">
                                            <Link className="btn btn-light rounded-circle" to={`${isFinish ? `/home` : '#'}`} onClick={() => setModalExit(!modalExit)}>
                                                <i className="fa fa-remove"></i>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                                <div className="container learning-layout">
                                    {!isLoggedIn && !isDisplaySplash ? <AnonymousSplashPage /> : ''}
                                    {currentQuestion && <NormalQuestion question={currentQuestion} addRemainQuestion={addRemainQuestion} removeRemainQuestion={removeRemainQuestion} check={setIsQuestionScreen} answerCheck={checkAnswer} isLastQuestion={isLastQuestion} />}
                                    {!isLoggedIn && !isDisplaySplash && <div className="container">
                                        <div className="drawer-content">
                                            <div className="page-wrap">
                                                <button
                                                    className="feedback-bar-btn"
                                                    onClick={() => indexChange()}
                                                >
                                                    Kế tiếp
                                                </button>
                                            </div></div>
                                    </div>}
                                    {/* <ProgressBar
                                        variant="primary"
                                        className="mt-3 w-75 ml-4"
                                        now={index}
                                        max={
                                            questions.length
                                        }
                                    ></ProgressBar>
                                    
                                    <NormalQuestion question={currentQuestion} addRemainQuestion={addRemainQuestion} removeRemainQuestion={removeRemainQuestion} answerCheck={selectAnswer} />
                                    
                                     */}
                                    {answerCheck === 1 && <RightAnswer indexChange={indexChange} isFinish={isFinish} />}
                                    {answerCheck === 0 && <WrongAnswer indexChange={indexChange} />}
                                </div>
                            </main>
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
                    </div>
                </div>
            ) : <div id="wrapper">
                <div id="content-wrapper" className="d-flex flex-column">
                    <div id="content" style={{ overflow: "auto", height: "100vh" }}>
                        <main id="scroll">
                            <div className="mt-2 container">
                                <div className="row">
                                    <div className="offset-md-11 col-1">
                                        <Link className="btn btn-light rounded-circle" to="/card">
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
                                <p className='d-flex justify-content-center'>Hiện chưa có câu hỏi luyện tập cho các từ vựng này! <br />Vui lòng thử lại sau</p>
                            </div>
                        </main>
                    </div>
                </div>
            </div>}
        </div>
    )
}
export default VocabularyReview;