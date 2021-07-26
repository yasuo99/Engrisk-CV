import ArrangeQuestion from "../../components/question/ArrangeQuestion";
import BasicQuestion from "../../components/question/BasicQuestion";
import ConnectionQuestion from "../../components/question/ConnectionQuestion";
import ConversationQuestion from "../../components/question/ConversationQuestion";
import FilloutQuestion from "../../components/question/FilloutQuestion";
import { QuestionTypes } from "../../constants/QuestionTypes";
import SelectQuestion from "./SelectQuestion";
const QuestionPreview = ({ question }) => {
  function switchAnswerDisplay(length) {
    if (length == 2) {
      return "d-flex flex-row";
    }
    return "d-flex flex-column";
  }
  function renderQuestion() {
    switch (question.type) {
      case QuestionTypes.Arrange:
        return (
          <ArrangeQuestion question={question} isReviewing={true} />
        );
      case QuestionTypes.Connection:
        return (
          <ConnectionQuestion question={question} isReviewing={true} />
        );
      case QuestionTypes.Conversation:
        return (
          <ConversationQuestion question={question} isReviewing={true} />
        );
      case QuestionTypes.FillOut:
        return (
          <FilloutQuestion question={question} isReviewing={true} />
        );
      case QuestionTypes.Select:
        return(
          <SelectQuestion question={question} isReviewing={true}></SelectQuestion>
        )
      default:
        return (
          <BasicQuestion
            switchAnswerDisplay={switchAnswerDisplay}
            question={question}
            isReviewing={true}
          />
        );
    }
  }

  return <div className="container">{question && renderQuestion()}</div>;
};
export default QuestionPreview;
