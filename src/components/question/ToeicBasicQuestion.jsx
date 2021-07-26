import { useEffect, useRef, useState } from "react";
import parse from "html-react-parser";
import "react-h5-audio-player/lib/styles.css";
import ReactPlayer from "react-player";
import CircleControls from "react-player-circle-controls";
import "react-player-circle-controls/dist/styles.css";
const ToeicBasicQuestion = ({ question, checkAnswer, renderAnswerClass, checked }) => {
  const [selected,setSelected] = useState('')
  const [playing, setPlaying] = useState(false);
  const [playerState, setPlayerState] = useState({
    played: 0,
    loaded: 0,
  });
  useEffect(() => {
    setSelected('')
  }, [question]);
  console.log(question);
  return (
    <div className="border question-box rounded" style={{ marginTop: "5%" }}>
      {question.photoUrl && (
        <img
          className="responsive question-box-img img-fluid rounded mx-auto d-block ex-img mt-1"
          src={question.photoUrl}
        ></img>
      )}
      <div className="text-dark font-weight-bold mt-4">
        {parse(question.preQuestion || "Chọn đáp án đúng")}
      </div>
      <br></br>
      <div className="text-dark font-weight-bold">
         <span>{parse(question.content || "")}</span>
        <span>
          {question.audio && (
            <div className="d-flex justify-content-center">
              <ReactPlayer
                url={question.audio}
                playing={playing}
                height="0"
                width="0"
                onProgress={setPlayerState}
                onEnded={() => {setPlaying(false)}}
              />
              <CircleControls
                played={playerState.played}
                loaded={playerState.loaded}
                playing={playing}
                onTogglePlaying={() => {setPlaying(true)}}
              />
            </div>
          )}
        </span>
      </div>
      <br></br>
      <br></br>
      <div>
        <div className="answer-wrapper">
          {question.answers.map((answer, index) => (
            <button
              disabled={checked}
              key={index}
              value={answer.answer}
              className={`answer-card toeic-answer mt-3 ${
                renderAnswerClass(index)
              }`}
              data-id={index}
              onClick={(e) => {checkAnswer(answer.answer, index)}}
              autoFocus
            >
              {answer.answer}
              <div className="keyboard-shortcut">
                <div className="key">{index + 1}</div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
export default ToeicBasicQuestion;
