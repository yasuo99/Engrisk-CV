const ListQuestionModal = ({ questions }) => {
    return (
        <div className='container'>
            {questions.map((question, index) =>
                <div key={index} className="ketquacauhoi">
                    <div className="cauhoi">
                        {question.isListeningQuestion && <ReactPlayer url={question.audioFileName} controls width="500px" height="30px" />}
                        {question.imageFileName && <img src={question.imageFileName}></img>}
                        {question.content}
                    </div>
                    <div className="dapan">
                        <ol type="A" className="ml-4">
                            {question.answers.map((answer, index) =>
                                <li key={index}>{answer.answer}</li>
                            )}
                        </ol>
                    </div>
                </div>
            )}
        </div>
    )
}
export default ListQuestionModal;