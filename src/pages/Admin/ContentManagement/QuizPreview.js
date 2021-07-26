import { useEffect, useState } from "react";
import { ProgressBar } from "react-bootstrap";
import ArrangeQuestion from "../../../components/question/ArrangeQuestion";
import BasicQuestion from "../../../components/question/BasicQuestion";
import ConnectionQuestion from "../../../components/question/ConnectionQuestion";
import ConversationQuestion from "../../../components/question/ConversationQuestion";
import FilloutQuestion from "../../../components/question/FilloutQuestion";
import { QuestionTypes } from "../../../constants/QuestionTypes";
const QuizPreview = ({ quiz, closeReview }) => {
    const [index, setIndex] = useState(0)
    const [currentQuestion, setCurrentQuestion] = useState(null)
    useEffect(() => {
        setCurrentQuestion(quiz.questions[index])
        console.log('?');
        console.log(quiz.questions);
    }, [index])
    function indexChange() {
        if (index < quiz.questions.length - 1) {
            setIndex(index + 1)
        } else {
            setIndex(0);
        }

    }
    function switchAnswerDisplay(length) {
        if (length == 2) {
            return 'd-flex flex-row'
        }
        return 'd-flex flex-column'
    }
    function renderQuestion() {
        switch (currentQuestion.type) {
            case QuestionTypes.Arrange:
                return (<ArrangeQuestion question={currentQuestion} isReviewing={true} />)
            case QuestionTypes.Connection:
                return <ConnectionQuestion question={currentQuestion} isReviewing={true} />
            case QuestionTypes.Conversation:
                return (<ConversationQuestion question={currentQuestion} isReviewing={true} />)
            case QuestionTypes.FillOut:
                return (<FilloutQuestion question={currentQuestion} isReviewing={true} />)
            default:
                return <BasicQuestion switchAnswerDisplay={switchAnswerDisplay} question={currentQuestion} isReviewing={true} />
        }
    }
    console.log(currentQuestion);
    return (
        <div id="wrapper" style={{ height: '700px' }}>
            <div id="content-wrapper" className="d-flex flex-column">
                <div id="content" style={{ overflow: "hidden", height: "100vh" }}>
                    <main id="scroll">
                        <div className="mt-2">
                            <div className="row">
                                <div className='col-3'>
                                    {quiz.questions && <ProgressBar
                                        variant="primary"
                                        className="mt-3 w-75 ml-4"
                                        now={index + 1}
                                        max={
                                            quiz.questions.length
                                        }
                                    ></ProgressBar>}

                                </div>
                                <div className="offset-md-11 col-1">
                                    <button className="btn btn-light rounded-circle" onClick={() => closeReview()}>
                                        <i className="fa fa-remove"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="container learning-layout">
                            <div className="container">
                                {currentQuestion && renderQuestion()}
                                <div className="drawer-content">
                                    <div className="page-wrap">
                                        <button
                                            className="feedback-bar-btn"
                                            onClick={() => indexChange()}
                                        >
                                            Kế tiếp
                                        </button>
                                    </div></div>
                            </div>

                        </div>
                    </main>
                </div>
            </div>
        </div>
    )
}
export default QuizPreview;