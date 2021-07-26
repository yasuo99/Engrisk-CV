import ReactPlayer from "react-player";
const ExamPreview = ({ exam, closeReview }) => {
    return (
        <div id="wrapper" style={{ height: '700px' }}>
            <div id="content-wrapper" className="d-flex flex-column">
                <div id="content" style={{ overflow: "hidden", height: "100vh" }}>
                    <main id="scroll">
                        <div className='mt-2'>
                            <div className="d-flex justify-content-end">
                                <button className="btn btn-light rounded-circle" onClick={() => closeReview()}>
                                    <i className="fa fa-remove"></i>
                                </button>
                            </div>
                        </div>
                        <div className="container learning-layout">
                            <div className='text-center font-weight-bold'>
                                <div>Bài thi: {exam.title}</div>
                                <div>Kinh nghiệm: {exam.expGain}</div>
                                <div>Thời gian làm bài: {exam.duration} phút</div>
                            </div>

                            <div id="ketquaexam" className="container">
                                {exam.questions && exam.questions.map((question, index) =>
                                    <div key={question.id} className="ketquacauhoi">
                                        <div className="cauhoi">
                                            {question.isListeningQuestion && <ReactPlayer url={question.audio} controls width="500px" height="30px" />}
                                            Câu hỏi {index + 1}:
                                            <h5>{question.preQuestion || 'Chọn đáp án đúng'}</h5>
                                            <h5>{question.content}</h5>
                                        </div>
                                        <div className="dapan">
                                            Đáp án:
                                            <ol type="A" className="ml-4">
                                                {question.answers.map((answer, index) =>
                                                    <li>{answer.answer}</li>
                                                )}
                                            </ol>
                                        </div>
                                    </div>
                                )}
                            </div>

                        </div>
                    </main>
                </div>
            </div>
        </div>
    )
}
export default ExamPreview;