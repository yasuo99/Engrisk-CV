import { useEffect, useState } from "react";
import { Test, QuestionGroup, Question, Option } from "react-multiple-choice";
import questionApiV2 from "../../api/2.0/questionApi";
import ArrangeQuestion from "../question/ArrangeQuestion";
import ConnectionQuestion from "../question/ConnectionQuestion";
import ConversationQuestion from "../question/ConversationQuestion";
import FilloutQuestion from "../question/FilloutQuestion";
import BasicQuestion from "../question/BasicQuestion"
import { QuestionTypes } from "../../constants/QuestionTypes";
import SelectQuestion from "../question/SelectQuestion";
import WritingQuestion from "../question/WritingQuestion";
import ToeicQuestion from "../question/ToeicQuestion";
import ToeicBasicQuestion from "../question/ToeicBasicQuestion";
const NormalQuestion = ({ question, check, answerCheck, addRemainQuestion, removeRemainQuestion, isLastQuestion }) => {
  const [selected, setSelected] = useState(null);
  const [result, setResult] = useState(null);
  const [checked, setChecked] = useState(false);
  const CheckAnswer = async (answer, id) => {
    console.log(answer);
    AnswerCheck(answer)
    setSelected(id)
  }
  const AnswerCheck = async (answer) => {
    const checkResult = await questionApiV2.checkAnswer(question.id, answer);
    setResult(checkResult.result);
    setChecked(true)
    answerCheck(checkResult.result ? 1 : 0);
    if (!checkResult.result) {
      addRemainQuestion(question)
    }
    else {
      removeRemainQuestion(question)
    }
  }
  useEffect(() => {
    if (isLastQuestion) {
      setChecked(false)
      setSelected(null);
      setResult(null);
      answerCheck(-1)
    }
  }, [isLastQuestion])
  useEffect(() => {
    setChecked(false)
    setSelected(null);
    setResult(null);
    answerCheck(-1)
  }, [question])
  useEffect(() => {
    check(true)
    return () => {
      check(false)
    }
  })
  function RenderAnswerClass(index) {
    if (result != null) {
      if (index == selected) {
        if (result) {
          return 'right-selected-answer'
        }
        return 'wrong-selected-answer'
      }
      else {
        return 'disabled'
      }
    }
    return '';
  }
  function SwitchAnswerDisplay(length) {
    if (length == 2) {
      return 'd-flex flex-row'
    }
    return 'd-flex flex-column'
  }
  function ResetQuestion() {
    setChecked(false)
    setSelected(null);
    setResult(null);
    answerCheck(-1)
  }
  function RenderQuestion() {
    switch (question.type) {
      case QuestionTypes.Arrange:
        return (<ArrangeQuestion question={question} checkAnswer={AnswerCheck} isLastQuestion={isLastQuestion} />)
      case QuestionTypes.Connection:
        return <ConnectionQuestion question={question} checkAnswer={AnswerCheck} isLastQuestion={isLastQuestion} />
      case QuestionTypes.Conversation:
        return (<ConversationQuestion question={question} checkAnswer={AnswerCheck} isLastQuestion={isLastQuestion} />)
      case QuestionTypes.FillOut:
        return (<FilloutQuestion question={question} checked={checked} checkAnswer={AnswerCheck} isLastQuestion={isLastQuestion} />)
      case QuestionTypes.Select:
        return (<SelectQuestion question={question} checkAnswer={AnswerCheck} isLastQuestion={isLastQuestion}></SelectQuestion>)
      case QuestionTypes.Writing:
        return (<WritingQuestion question={question}></WritingQuestion>)
      case QuestionTypes.Toeic:
        return (<ToeicBasicQuestion question={ question} renderAnswerClass={RenderAnswerClass} checkAnswer={CheckAnswer} checked={checked}></ToeicBasicQuestion>)
      default:
        return <BasicQuestion question={question} switchAnswerDisplay={SwitchAnswerDisplay} checkAnswer={CheckAnswer} renderAnswerClass={RenderAnswerClass} checked={checked} isLastQuestion={isLastQuestion} reset={ResetQuestion} />
    }
  }
  return (
    <div>
      {RenderQuestion()}
    </div>
  );
};
export default NormalQuestion;
