import { useEffect, useState } from "react";
import parse from "html-react-parser";
import ReactPlayer from "react-player";
const ToeicPartQuestions = ({
  questions,
  currentPart,
  selectAnswer,
  listenedAudio,
  audioLimit
}) => {
  let temp = questions;
  console.log(questions);
  return (
    <div
      className="card shadow-sm border-0 rounded question-box"
      style={{ top: "50px" }}
    >
      {temp.map((question, index) => {
        console.log("Đang duyệt", question);
        const same = questions.filter(
          (q) => q.question.preQuestion == question.question.preQuestion
        );
        console.log(same);
        temp = temp.splice(index, same.length);
        if (same.length > 1) {
          return (
            <div key={index}>
              <div className="text-info font-weight-bold">
                Câu hỏi {same[0].index}-{same[same.length - 1].index}
              </div>
              {question.question?.photoUrl && (
                <img
                  className="responsive question-box-img img-fluid rounded mx-auto d-block ex-img mt-1"
                  src={
                    question.question?.photoUrl ||
                    "https://cdn.busuu.com/media/resized/entity/1440/company_1528111874_1440.jpg"
                  }
                ></img>
              )}
              <div className="text-dark font-weight-bold">
                {parse(question.question?.preQuestion || "Chọn đáp án đúng")}
              </div>
              <br></br>
              {same.map((question, index) => (
                <div key={question.question.id} className="mt-1">
                  <div className="text-dark font-weight-bold">
                    {question.index}.{" "}
                    <span> {parse(question.question?.content || "")}</span>
                    <span>
                      {question.question?.audio && (
                        <div>
                          <ReactPlayer
                            config={{
                              file: {
                                attributes: {
                                  preload: "none",
                                  controlsList: 'nodownload'
                                },
                              },
                            }}
                            url={question.question.audio}
                            playing={false}
                            onEnded={() => listenedAudio(question)}
                            height="30px"
                            controls={audioLimit ? !question.isListened : true}
                          />
                          {question.isListened && audioLimit && <p className='text-info'>Đã nghe</p>}
                        </div>
                      )}
                    </span>
                  </div>
                  <div>
                    <form>
                      <ol type="A">
                        {question.question?.answers.map((answer, index) => (
                          <div
                            className="ml-4 d-flex flex-row mt-2"
                            key={answer.id}
                          >
                            <div className="mr-4">
                              <input
                                className="answer-radio"
                                id={answer.id}
                                type="radio"
                                name="answer"
                                checked={question.answer == answer.answer}
                                onChange={() => selectAnswer(answer)}
                              ></input>
                            </div>
                            <div className="ml-2 text-dark">
                              <label htmlFor={answer.id}>
                                <li>{answer.answer}</li>
                              </label>
                            </div>
                          </div>
                        ))}
                      </ol>
                    </form>
                  </div>
                </div>
              ))}
            </div>
          );
        } else {
          return (
            <div key={index}>
              {question.index}.
              <img
                className="responsive question-box-img img-fluid rounded mx-auto d-block ex-img mt-1"
                src={
                  question.question?.photoUrl ||
                  "https://cdn.busuu.com/media/resized/entity/1440/company_1528111874_1440.jpg"
                }
              ></img>
              <div className="text-dark font-weight-bold">
                {parse(question.question?.preQuestion || "Chọn đáp án đúng")}
              </div>
              <br></br>
              <div className="text-dark font-weight-bold">
                {question.index}.{" "}
                <span>{parse(question.question?.content || "")}</span>
                <span>
                  {question.question?.audio && (
                    <div>
                      <img src="/image/sound.png" className="sound"></img>{" "}
                      <ReactPlayer
                        config={{
                            file: {
                                attributes: {
                                    preload: 'none',
                                    controlsList: 'nodownload'
                                }
                            }
                        }}
                        url={question.question.audio}
                        playing={false}
                        controls={audioLimit ? !question.isListened : true}
                        onEnded={() => listenedAudio(question)}
                        height="30px"
                      />
                      {question.isListened && audioLimit && <p className='text-info'>Đã nghe</p>}
                    </div>
                  )}
                </span>
              </div>
              <div>
                <form>
                  <ol type="A">
                    {question.question?.answers.map((answer, index) => (
                      <div
                        className="ml-4 d-flex flex-row mt-2"
                        key={answer.id}
                      >
                        <div className="mr-4">
                          <input
                            className="answer-radio"
                            id={answer.id}
                            type="radio"
                            name="answer"
                            checked={question.answer == answer.answer}
                            onChange={() => selectAnswer(answer)}
                          ></input>
                        </div>
                        <div className="ml-2 text-dark">
                          <label htmlFor={answer.id}>
                            <li>{answer.answer}</li>
                          </label>
                        </div>
                      </div>
                    ))}
                  </ol>
                </form>
              </div>
            </div>
          );
        }
      })}
    </div>
  );
};
export default ToeicPartQuestions;
