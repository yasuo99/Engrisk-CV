import { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import parse from 'html-react-parser'
const FilloutQuestion = ({ question, checked, checkAnswer, isLastQuestion, isReviewing }) => {
    const [value, setValue] = useState('');
    const [isPlay, setIsPlay] = useState(false);
    useEffect(() => {
        if (isLastQuestion) {
            setValue('')
        }
    }, [isLastQuestion])
    function EnterPress(e) {
        if (e.key == 'Enter' && e.target.value != '') {
            if(!isReviewing){
                checkAnswer(e.target.value)
            }
        }
    }
    return (
        <div className='ml-1 mt-4'>
            {question.photoUrl && <img
                className="img-fluid rounded mx-auto d-block ex-img fluid-content-item mt-1"
                src='https://cdn.busuu.com/media/resized/entity/1440/company_1528111874_1440.jpg'
            ></img>}  
            <div className='text-center'>{parse(question.preQuestion || 'Điền đáp án đúng')}</div>
            <div className='text-center'>
            <small className='text-dark'>(Lưu ý quy tắc viết hoa, chính tả và dấu câu!)</small>
            </div>
           
            <h3 className='text-center'>{parse(question.content || '')} <span>{question.audio && !isReviewing && <div><ReactPlayer
                config={{
                    file: {
                        attributes: {
                            controlsList: 'nodownload',
                        }
                    }
                }}
                url={question.audio}
                playing={true}
                onEnded={() => setIsPlay(false)}
                controls
                height={30}
                style={{
                    color: 'blue'
                }}
            /></div>}</span></h3>
            <input value={value} type='text' disabled={checked} className='form-control mt-4 fillout-input' placeholder='Điền đáp án của bạn tại đây' onKeyDown={(e) => EnterPress(e)} onChange={(e) => setValue(e.target.value)} />
        </div>)

}
export default FilloutQuestion