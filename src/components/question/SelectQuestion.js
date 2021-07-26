import React, { useEffect, useState } from "react";
import parse from 'html-react-parser'
const SelectQuestion = ({ question, isReviewing, checkAnswer, isLastQuestion }) => {
    console.log(question);
    const [answer,setAnswer] = useState('')
    function submitQuestion(value){
        setAnswer(value);
        if(value != '' && !isReviewing){
            checkAnswer(value)
        }
    }
    useEffect(() => {
        setAnswer('')
    },[question])
    useEffect(() => {
        if(isLastQuestion){
            setAnswer('')
        }
    },[isLastQuestion])
    function renderQuestion(content) {
        const firstIndex = content.indexOf('<p>');
        const lastIndex = content.indexOf('</p>');
        const firstSubStr = content.substring(0, firstIndex);
        const secondSubStr = content.substring(lastIndex + 4, content.length);
        const select = React.createElement("select", {key: Math.random(-3,-1),onChange: (e) => submitQuestion(e.target.value), value: answer, disabled: answer != '', className:'pagination-select'} ,
            React.createElement("option", {key: Math.random(-2,-1), value: "" }, ""),
            [question.answers.map((answer, index) =>
                React.createElement("option", {id: index, key: index, className: 'pagination-select', value: `${answer.answer}` }, answer.answer)
            )],
        );
        const div = React.createElement('div', { key: question.id }, [firstSubStr, select], secondSubStr);
        return div;
    }
    return (
        <div>
            <img
                className="img-fluid rounded mx-auto d-block ex-img fluid-content-item mt-1"
                src='https://cdn.busuu.com/media/resized/entity/1440/company_1528111874_1440.jpg'
            ></img>
            <br></br>
            <div className='font-weight-bold'>{parse(question.preQuestion || '')}</div>
            <div className='text-dark font-weight-bold'>{renderQuestion(question.content)}</div>
        </div>
    )
}
export default SelectQuestion;