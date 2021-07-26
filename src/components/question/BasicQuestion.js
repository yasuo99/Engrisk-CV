import { useEffect } from "react"
import ReactPlayer from "react-player";
import parse from'html-react-parser'
const BasicQuestion = ({ question, switchAnswerDisplay, checkAnswer, renderAnswerClass, checked, isLastQuestion, reset, isReviewing }) => {
    useEffect(() => {
        if (isLastQuestion) {
            reset()
        }
    }, [isLastQuestion])
    return (
        <div>
           {question.photoUrl && <img
                className="responsive question-box-img img-fluid rounded mx-auto d-block ex-img mt-1"
                src={question.photoUrl}
            ></img> } 

            <div className='text-dark font-weight-bold'>{parse(question.preQuestion || 'Chọn đáp án đúng')}</div>
            <div className='text-dark font-weight-bold mt-1'>{parse(question.content || '')} <span>{question.audio && !isReviewing && <div><img src="/image/sound.png" className="sound"></img> <ReactPlayer
                // config={{
                //     file: {
                //         attributes: {
                //             preload: 'none'
                //         }
                //     }
                // }}
                src={question.audio}
                playing={true}
                style={{ height: '30px' }}
            /></div>}</span></div>
            <div className={switchAnswerDisplay(question.answers.length)}>
                {question.answers.map((answer, index) => (
                    <button key={index} value={answer.answer} disabled={checked || isReviewing} className={`answer-card mt-4 ${!isReviewing && renderAnswerClass(index)} `} data-id={index} onClick={(e) => checkAnswer(answer.answer, index)}>
                        {answer.answer} <div className='keyboard-shortcut'><div className='key'>{index+1}</div></div>
                    </button>
                ))}
            </div>
        </div>
    )
}
export default BasicQuestion