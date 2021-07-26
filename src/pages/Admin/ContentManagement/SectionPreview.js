import { useEffect, useState } from "react";
import { Link } from "react-browser-router";
import sectionApiV2 from "../../../api/2.0/sectionApi";
import QuestionPreview from "../../../components/question/QuestionPreview";
import Loader from 'react-loader-spinner';
const SectionPreview = ({ section, closeReview }) => {
    const [scripts, setScripts] = useState([{
        words: [],
        questions: []
    }])
    const [currentScript, setCurrentScript] = useState({})
    const [scriptIndex, setScriptIndex] = useState(0);
    const [step, setStep] = useState(0);
    const [isBusy, setIsBusy] = useState(true);
    const [isWordScreen, setIsWordScreen] = useState(true);
    const [currentWord, setCurrentWord] = useState({})
    const [wordIndex, setWordIndex] = useState(0);
    const [questionIndex, setQuestionIndex] = useState(0);
    const [currentQuestion, setCurrentQuestion] = useState({})
    const [isPrevious, setIsPrevious] = useState(false);
    useEffect(async () => {
        if (section) {
            const result = await sectionApiV2.preview(section.id);
            if (result.scripts.length > 0) {
                setScripts(result.scripts);
                setCurrentScript(result.scripts[scriptIndex])
                setCurrentWord(result.scripts[scriptIndex].words[wordIndex])
                setCurrentQuestion(result.scripts[scriptIndex].questions[questionIndex])
                setIsBusy(false);
            }

        }
    }, [section])
    useEffect(() => {
        if (!isBusy) {
            console.log('Word thay đổi', scripts[scriptIndex].words[wordIndex]);
            setCurrentWord(scripts[scriptIndex].words[wordIndex])
        }

    }, [wordIndex, scriptIndex]);
    useEffect(() => {
        if (!isBusy) {
            console.log(questionIndex);
            console.log('Question', scripts[scriptIndex].questions[questionIndex]);
            setCurrentQuestion(scripts[scriptIndex].questions[questionIndex])
        }
    }, [questionIndex, scriptIndex])
    useEffect(() => {
        if (!isBusy) {
            if (scriptIndex == 0) {
                console.log('amen');
            }
            setCurrentScript(scripts[scriptIndex]);
            if (!isPrevious) {
                setQuestionIndex(0);
                setWordIndex(0);
                if (scripts[scriptIndex].words.length > 0) {
                    setIsWordScreen(true)
                }
            } else {
                if (scripts[scriptIndex].questions.length > 0) {
                    setQuestionIndex(scripts[scriptIndex].questions.length - 1);
                    setWordIndex(scripts[scriptIndex].words.length - 1)
                    setIsWordScreen(false)
                }
                else {
                    if (scripts[scriptIndex].words.length > 0) {
                        setWordIndex(scripts[scriptIndex].words.length - 1)
                        setIsWordScreen(true)
                    }
                }
            }
        }

    }, [scriptIndex])

    // useEffect(() => {
    //     if (!isBusy) {
    //         if (isWordScreen) {
    //             if (step < currentScript.words.length) {
    //                 console.log('?');
    //                 setWordIndex(wordIndex + 1);
    //             }
    //             else{
    //                 console.log('!');
    //                 setIsWordScreen(false)
    //             }
    //         }else{
    //             console.log('tăng question index');
    //             if(step < currentScript.questions.length + currentScript.words.length){
    //                 setQuestionIndex(questionIndex + 1);
    //             }
    //         }
    //     }
    // }, [step])
    function indexChange() {
        setIsPrevious(false)
        if (wordIndex < currentScript.words.length - 1) {
            setWordIndex(wordIndex + 1);
        }
        else {
            if (currentScript.questions.length > 0) {
                setIsWordScreen(false);
            }
        }
        if (!isWordScreen && questionIndex < currentScript.questions.length - 1) {
            setQuestionIndex(questionIndex + 1);
        }
        if (step == currentScript.words.length + currentScript.questions.length - 1) {
            console.log('Tăng script index');
            if (scripts[scriptIndex + 1] != undefined) {
                setScriptIndex(scriptIndex + 1);
                setStep(0)

                if (scripts[scriptIndex + 1].words.length > 0) {
                    setIsWordScreen(true);
                }
            } else {
                // if (scripts[0].words.length > 0) {
                //     setIsWordScreen(true);
                // }
                console.log('quay trở lại từ đầu');
                setScriptIndex(0)
                setStep(0)
            }


        } else {
            console.log('Tăng step');
            setStep(step + 1);
        }

    }
    function previousChange() {
        setIsPrevious(true)
        if (step > 0) {
            setStep(step - 1);
            if (isWordScreen) {
                if (wordIndex > 0) {
                    setWordIndex(wordIndex - 1);
                    setIsWordScreen(true)
                }
            } else {
                if (questionIndex > 0) {
                    setQuestionIndex(questionIndex - 1);
                    setIsWordScreen(false)
                } else {
                    console.log('??');
                    if (currentScript.words.length > 0) {
                        setWordIndex(currentScript.words.length - 1);
                        setIsWordScreen(true);
                    }
                }
            }
        }
        if (step == 0) {
            if (scriptIndex > 0) {
                setScriptIndex(scriptIndex - 1);
                setStep(scripts[scriptIndex - 1].words.length + scripts[scriptIndex - 1].questions.length - 1);
            }
        }

    }
    return (
        <div id="wrapper">
            {!isBusy ? (
                <div id="content-wrapper" className="d-flex flex-column">
                    <div id="content" style={{ overflow: "auto", height: "100vh" }}>
                        <main id="scroll">
                            <div className="mt-2">
                                <div className="row">
                                    <div className="offset-md-11 col-1">
                                        <button className="btn btn-light rounded-circle" onClick={() => closeReview()}>
                                            <i className="fa fa-remove"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="container learning-layout">
                                {isWordScreen ? (
                                    <div>
                                        <div className="mt-4">
                                            <h5>{currentWord.flashcardTitle}</h5>
                                            <img
                                                className="img-fluid rounded mx-auto d-block ex-img fluid-content-item"
                                                src="https://cdn.busuu.com/media/resized/entity/1440/company_1528111874_1440.jpg"
                                            ></img>
                                            <h4 className="">
                                                {currentWord.eng}
                                                <img src="../../image/sound.png" className="sound"></img>
                                            </h4>
                                            <h4 className="">{currentWord.vie}</h4>
                                            <hr className="d-flex justify-content-center w-75"></hr>
                                            <div className="mt-2 example">
                                                <h5>Ví dụ</h5>
                                                Vd1: We are going to Camping
                                                <img src="/image/sound.png" className="sound"></img>
                                                <br></br>
                                                Vd2: We should camping here
                                            </div>
                                        </div>

                                    </div>
                                ) : (
                                    <QuestionPreview question={currentQuestion}></QuestionPreview>
                                )}
                            </div>
                            <div className="drawer-content">
                                <div className="page-wrap d-flex justify-content-between">
                                    <button
                                        className="feedback-bar-btn-secondary btn-secondary"
                                        onClick={() => previousChange()}
                                    >
                                        Trở lại
                                    </button>
                                    <button
                                        className="feedback-bar-btn"
                                        onClick={() => indexChange()}
                                    >
                                        Kế tiếp
                                    </button>
                                </div></div>
                        </main>
                    </div>
                </div>) : <div id="content-wrapper" className="d-flex flex-column">
                <div id="content" style={{ overflow: "auto", height: "100vh" }}>
                    <main id="scroll">
                        <div className="mt-2 container">
                            <div className="row">
                                <div className="offset-md-11 col-1">
                                    <button className="btn btn-light rounded-circle" onClick={() => closeReview()}>
                                        <i className="fa fa-remove"></i>
                                    </button>
                                </div>
                            </div>
                            <div className='d-flex justify-content-center'>
                                <Loader type="Oval"
                                    color="#00BFFF"
                                    height={400}
                                    width={400} />
                            </div>
                            <p className='d-flex justify-content-center'>Section không có nội dung</p>
                        </div>
                    </main>
                </div>
            </div>}
        </div>
    )
}
export default SectionPreview;