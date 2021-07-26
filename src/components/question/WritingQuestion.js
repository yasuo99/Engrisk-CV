import React, { useRef, useState } from "react"
import parse, { domToReact } from 'html-react-parser';
const WritingQuestion = ({ question, isReviewing, checkAnswer, isLastQuestion }) => {

    const [answers, setAnswers] = useState([])
    const temp = []
    function writeAnswer(value, index) {
        const data = {
            answer: value,
            index: index
        };
        let already = answers.find(ans => ans.index == index);
        console.log(answers);
        if (already != undefined) {
            already.answer = value
        }
        else {
            answers.push(data);
        }
        console.log(data);
        setAnswers(answers);
    }
    const options = {
        replace: ({ attribs, children }) => {
            if (!attribs) {
                return;
            }
            if (attribs.class === 'empty') {
                return (
                    <input onChange={(e) => writeAnswer(e.target.value, attribs.data)}>
                        {/* {domToReact(children, options)} */}
                    </input>
                );
            }
        }
    };

    console.log(answers);
    return (
        <div>
            <h2>{question.preQuestion}</h2>
            <div className='arrange-box p-0'>
                {question.answers.sort(() => Math.random() - 0.5).map((answer, index) => {
                    if (!answer.isQuestionAnswer) {
                        return( <p className='mr-2 mt-2 mb-2 missing-box' key={index}>{answer.answer.substring(0, answer.answer.length - 3)}</p>)
                       
                    }
                }

                )}
            </div>
            {parse(question.content, options)}
        </div>
    )
}
export default WritingQuestion