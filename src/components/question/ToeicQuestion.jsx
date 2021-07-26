import { useEffect, useRef, useState } from "react";
import parse from "html-react-parser";
import "react-h5-audio-player/lib/styles.css";
import ReactPlayer from "react-player";
import CircleControls from "react-player-circle-controls";
import "react-player-circle-controls/dist/styles.css";
const ToeicQuestion = ({ question, selectAnswer, audioLimit, audioPlayed }) => {
  const [isPlayed, setIsPlayed] = useState(question.isListened);
  const player = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [playerState, setPlayerState] = useState({
    played: 0,
    loaded: 0,
  });
  const audio = useRef(null);
  useEffect(() => {
    setIsPlayed(false);
    setPlaying(false);
  }, [question]);
  console.log(question);
  return (
    <div className="border question-box rounded" style={{ marginTop: "5%" }}>
      {question.question?.photoUrl && (
        <img
          className="responsive question-box-img img-fluid rounded mx-auto d-block ex-img mt-1"
          src={question.question?.photoUrl}
        ></img>
      )}
      <div className="text-dark font-weight-bold mt-4">
        {parse(question.question?.preQuestion || "Chọn đáp án đúng")}
      </div>
      <br></br>
      <div className="text-dark font-weight-bold">
        {question.index}. <span>{parse(question.question?.content || "")}</span>
        <span>
          {question.question?.audio && (
            <div className="d-flex justify-content-center">
              <ReactPlayer
                ref={player}
                url={question.question.audio}
                playing={playing}
                height="0"
                width="0"
                onProgress={setPlayerState}
                onEnded={() => {audioPlayed(question);setIsPlayed(true);setPlaying(false)}}
              />
              <CircleControls
                played={playerState.played}
                loaded={playerState.loaded}
                playing={playing}
                onTogglePlaying={() => {if(!isPlayed){setPlaying(true)}}}
              />
            </div>
          )}
        </span>
      </div>
      <br></br>
      <br></br>
      <div>
        <div className="answer-wrapper">
          {question.question?.answers.map((answer, index) => (
            <button
              key={index}
              value={answer.answer}
              className={`answer-card toeic-answer mt-3 ${
                answer.answer == question.answer ? "bg-primary text-white" : ""
              }`}
              data-id={index}
              onClick={(e) => selectAnswer(answer)}
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
export default ToeicQuestion;
