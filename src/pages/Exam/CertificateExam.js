import { useEffect, useRef, useState } from "react";
import Loader from 'react-loader-spinner';
import { Modal, Button, OverlayTrigger, Tooltip, ProgressBar } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import { QuestionTypes } from './../../constants/QuestionTypes';
import ToeicQuestion from "../../components/question/ToeicQuestion";
import { ToeicParts } from './../../constants/ToeicParts';
import Countdown from 'react-countdown';
import examApiv2 from "../../api/2.0/examApi";
import ToeicPartQuestions from "../../components/question/ToeicPartQuestions";
import { GrNext, GrPrevious } from 'react-icons/gr'
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import { BiCollapse } from 'react-icons/bi'
import { CountdownCircleTimer } from 'react-countdown-circle-timer'
const CertificateExam = ({ }) => {
    const handle = useFullScreenHandle();
    const [isBusy, setIsBusy] = useState(true);
    const [questions, setQuestions] = useState([])
    const [currentQuestion, setCurrentQuestion] = useState({
        question: {
            toeic: ToeicParts.Part1
        },
    })
    const [index, setIndex] = useState(0)
    const [isFinish, setIsFinish] = useState(false);
    const [answers, setAnswers] = useState([]);
    const [configToast, setConfigToast] = useState(false);
    const [menu, setMenu] = useState(false);
    const [currentPart, setCurrentPart] = useState(ToeicParts.Part1)
    const questionBox = useRef(null)
    const [menuHeight, setMenuHeight] = useState(600)
    //Modal
    const [modalExit, setModalExit] = useState(false);
    const [modalSubmit, setModalSubmit] = useState(false);
    const [modalTimeUp, setModalTimeUp] = useState(false);

    const [start, setStart] = useState(Date.now())
    const [leaveCount, setLeaveCount] = useState(0)
    const [doneParts, setDoneParts] = useState([])
    const [duration,setDuration] = useState(0);

    const {examId} = useParams();
    useEffect(() => {
        async function fetchQuestions() {
            const result = await examApiv2.doExam(examId);
            const formatQuestions = result.questions.map((value, index) => ({ question: value, index: index + 1, answer: '', isListened: false }))
            setQuestions(formatQuestions);
            setDuration(result.duration)
            setCurrentQuestion(formatQuestions[index]);
            setIsBusy(false)
        }
        fetchQuestions();

    }, []) //effect to fetch questions from exam
    useEffect(() => {
        console.log('Đã tab ra ngoài ', leaveCount);
    }, [leaveCount])
    useEffect(() => {
        if (currentQuestion) {
            setCurrentPart(currentQuestion.question.toeic)
        }
    }, [currentQuestion])
    useEffect(() => {
        if (!isBusy) {
            setCurrentQuestion(questions.filter(q => q.question.toeic == currentPart).shift())
        }

    }, [currentPart])
    function selectAnswer(answer) {
        console.log(answer);
        console.log(questions);
        const index = questions.findIndex(q => q.question.id == currentQuestion.question.id);
        questions[index].answer = answer.answer;
        setQuestions([...questions]);

        setCurrentQuestion({
            ...currentQuestion,
            answer: answer.answer
        })

    }
    useEffect(() => {
        if (questions.length > 0) {
            const next = questions[index];
            if (next.question.toeic != currentPart) {
                setDoneParts([...doneParts, currentPart])
            }
            setCurrentQuestion(next);
        }
    }, [index])
    useEffect(() => {
        if (questionBox.current) {
            setMenuHeight(questionBox.current.offsetHeight > 0 ? questionBox.current.offsetHeight + 100 : 300)
        }
    }, [questionBox.current])
    function nextIndex() {
        if (index < questions.length - 1) {
            setIndex(index + 1);
        } else {
            setIsFinish(true);
            setDoneParts([...doneParts, currentPart])
        }
    }
    function previousIndex() {
        if (index > 0) {
            setIndex(index - 1);
        }
    }
    function listenedAudio(question) {
        console.log(question);
        const index = questions.findIndex(q => q.question == question.question);
        console.log(index);
        questions[index].isListened = true;
        setQuestions([...questions]);
    }
    async function submitFinish() {

    }
    const renderTime = ({ remainingTime }) => {
        if (remainingTime === 0) {
          return <div className="timer">Too lale...</div>;
        }
      
        return (
          <div className="timer">
            <div className="text">Remaining</div>
            <div className="value">{remainingTime}</div>
            <div className="text">seconds</div>
          </div>
        );
      };
    console.log(doneParts);
    return (
        <div>
            {!isBusy ? (
                <FullScreen handle={handle}>
                    <div id="wrapper" onBlur={() => setLeaveCount(leaveCount + 1)}>
                        <div id="content-wrapper" className="d-flex flex-column " style={{ backgroundColor: '#f0f2f5' }}>
                            <div id="content" style={{ overflow: "auto", height: "100vh" }}>
                                <main id="scroll">
                                    <div className="container-fluid fixed-top shadow-sm" style={{ backgroundColor: '#ffffff' }}>
                                        <div className='d-flex justify-content-between p-2'>
                                            {/* <Toast
                                        onClose={() => setConfigToast(!configToast)}
                                        show={configToast}
                                        animation={true}
                                        className="config-toast"
                                    >
                                        <Toast.Header>
                                            <strong className="mr-auto">Lựa chọn câu hỏi</strong>
                                        </Toast.Header>
                                        <Toast.Body className="container">
                                            <div className="sticky-top">
                                               
                                            </div>
                                        </Toast.Body>
                                    </Toast> */}
                                            <div style={{ width: '241px' }}></div>
                                            <ProgressBar max={questions.length} now={index + 1} className='mt-2' style={{ width: '1110px' }}></ProgressBar>
                                            <div>
                                                <h5 className='text-dark'> <span>
                                                    <button className='btn btn-warning font-weight-bold mr-2' onClick={() => setModalSubmit(!modalSubmit)}>Nộp bài</button>
                                                    <button className="btn btn-light rounded-circle" onClick={() => setModalExit(!modalExit)}>
                                                        <i className="fa fa-remove"></i>
                                                    </button>
                                                </span></h5>


                                                <div className={`card mt-4 menu-slide`}>
                                                    <div>
                                                        <div className="list-item-body outline-learn-body ps-container ps-active-y" style={{ height: '629px', width: '328px' }}>

                                                            <div className="section-learn-outline">
                                                                <h5 className="section-title bg-primary">LISTENING TEST</h5>
                                                                <ul className="section-list">
                                                                    {questions.filter(q => q.question.toeic == ToeicParts.Part1).length > 0 && <li className={`cursor-pointer ${currentPart == ToeicParts.Part1 ? 'o-view' : ''} ${doneParts.some(p => p == ToeicParts.Part1) ? 'done-view' : ''}`}>
                                                                        <div className="list-body">
                                                                            <div>
                                                                                <h6>Part I</h6>
                                                                                <p>Picture Description</p>
                                                                            </div>
                                                                        </div>
                                                                        <div className="div-x"><i className="fa fa-check text-white"></i></div>
                                                                    </li>}
                                                                    {questions.filter(q => q.question.toeic == ToeicParts.Part2).length > 0 && <li className={`cursor-pointer ${currentPart == ToeicParts.Part2 ? 'o-view' : ''} ${doneParts.some(p => p == ToeicParts.Part2) ? 'done-view' : ''}`}>
                                                                        <div className="list-body">
                                                                            <div>
                                                                                <h6>Part II</h6>
                                                                                <p>Question - Response</p>
                                                                            </div>
                                                                        </div>
                                                                        <div className="div-x"><i className="fa fa-check text-white"></i></div>
                                                                    </li>}
                                                                    {questions.filter(q => q.question.toeic == ToeicParts.Part3).length > 0 && <li className={`cursor-pointer ${currentPart == ToeicParts.Part3 ? 'o-view' : ''} ${doneParts.some(p => p == ToeicParts.Part3) ? 'done-view' : ''}`}>
                                                                        <div className="list-body">
                                                                            <div>
                                                                                <h6>Part III</h6>
                                                                                <p>Short Conversations</p>
                                                                            </div>
                                                                        </div>
                                                                        <div className="div-x"><i className="fa fa-check text-white"></i></div>
                                                                    </li>}
                                                                    {questions.filter(q => q.question.toeic == ToeicParts.Part4).length > 0 && <li className={`cursor-pointer ${currentPart == ToeicParts.Part4 ? 'o-view' : ''} ${doneParts.some(p => p == ToeicParts.Part4) ? 'done-view' : ''}`} >
                                                                        <div className="list-body">
                                                                            <div>
                                                                                <h6>Part IV</h6>
                                                                                <p>Short Talks</p>
                                                                            </div>
                                                                        </div>
                                                                        <div className="div-x"><i className="fa fa-check text-white"></i></div>
                                                                    </li>}
                                                                </ul>
                                                            </div>
                                                            <div className="section-learn-outline">
                                                                <h5 className="section-title bg-primary">READING TEST</h5>
                                                                <ul className="section-list">
                                                                    {questions.filter(q => q.question.toeic == ToeicParts.Part5).length > 0 && <li className={`cursor-pointer ${currentPart == ToeicParts.Part5 ? 'o-view' : ''} ${doneParts.some(p => p == ToeicParts.Part5) ? 'done-view' : ''}`}>
                                                                        <div className="list-body">
                                                                            <div>
                                                                                <h6>Part V</h6>
                                                                                <p>Incomplete Sentences</p>
                                                                            </div>
                                                                        </div>
                                                                        <div className="div-x"><i className="fa fa-check text-white"></i></div>
                                                                    </li>}
                                                                    {questions.filter(q => q.question.toeic == ToeicParts.Part6).length > 0 && <li className={`cursor-pointer ${currentPart == ToeicParts.Part6 ? 'o-view' : ''} ${doneParts.some(p => p == ToeicParts.Part6) ? 'done-view' : ''}`}>
                                                                        <div className="list-body">
                                                                            <div>
                                                                                <h6>Part VI</h6>
                                                                                <p>Text Completion</p>
                                                                            </div>
                                                                        </div>
                                                                        <div className="div-x"><i className="fa fa-check text-white"></i></div>
                                                                    </li>}
                                                                    {questions.filter(q => q.question.toeic == ToeicParts.Part7).length > 0 && <li className={`cursor-pointer ${currentPart == ToeicParts.Part7 ? 'o-view' : ''} ${doneParts.some(p => p == ToeicParts.Part7) ? 'done-view' : ''}`}>
                                                                        <div className="list-body">
                                                                            <div>
                                                                                <h6>Part VII</h6>
                                                                                <p>Reading Comprehension</p>
                                                                            </div>
                                                                        </div>
                                                                        <div className="div-x"><i className="fa fa-check text-white"></i></div>
                                                                    </li>}
                                                                </ul>
                                                            </div>

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                    <div>
                                        <div className='fixed-timer'> <CountdownCircleTimer
                                            isPlaying
                                            duration={duration * 60}
                                            colors={[["#004777", 0.33], ["#F7B801", 0.33], ["#A30000"]]}
                                            onComplete={() => setModalTimeUp(!modalTimeUp)}
                                        >
                                            {renderTime}
                                        </CountdownCircleTimer></div>
                                        <div className="container learning-layout d-flex justify-content-center" style={{ marginTop: '1%' }}>

                                            {!isBusy && currentQuestion && <ToeicQuestion question={currentQuestion} selectAnswer={selectAnswer} audioLimit={true} audioPlayed={listenedAudio}></ToeicQuestion>}
                                            <div className='d-flex justify-content-end mt-2'>
                                                {!isFinish ? <button className='btn btn-primary rounded shadow-sm w-20 exam-next-btn' onClick={() => nextIndex()}>
                                                    <h5>Next</h5>
                                                </button> : <button className='btn btn-primary rounded shadow-sm w-20 exam-next-btn' onClick={() => nextIndex()}>
                                                    <h5>Finish</h5>
                                                </button>}
                                            </div>

                                        </div>
                                    </div>
                                </main>
                                {!handle.active ? <OverlayTrigger
                                    id='enter'
                                    placement={'top'}
                                    overlay={
                                        <Tooltip>
                                            Enter fullscreen mode
                                        </Tooltip>
                                    }
                                >
                                    <button id='enter-btn' className='fixed-bottom-btn btn btn-light btn-expand shadow-sm rounded mr-4' onClick={handle.enter}><i className='fa fa-expand'></i></button>
                                </OverlayTrigger> : <OverlayTrigger
                                    id='exit'
                                    placement={'top'}
                                    overlay={
                                        <Tooltip>
                                            Exit fullscreen mode
                                        </Tooltip>
                                    }
                                >
                                    <button id='exit-btn' className='fixed-bottom-btn btn btn-light btn-expand shadow-sm rounded mr-4' onClick={handle.exit}><BiCollapse></BiCollapse></button>
                                </OverlayTrigger>}
                            </div>
                        </div>
                    </div>
                </FullScreen>
            ) : <div id="wrapper">
                <div id="content-wrapper" className="d-flex flex-column">
                    <div id="content" style={{ overflow: "auto", height: "100vh" }}>
                        <main id="scroll">
                            <div className="mt-2 container">
                                <div className="row">
                                    <div className="offset-md-11 col-1">
                                        <Link className="btn btn-light rounded-circle" to="/home">
                                            <i className="fa fa-remove"></i>
                                        </Link>
                                    </div>
                                </div>
                                <div className='d-flex justify-content-center'>
                                    <Loader type="Oval"
                                        color="#00BFFF"
                                        height={400}
                                        width={400} />
                                </div>
                                {/* <p className='d-flex justify-content-center'>Hiện nội dung section này chưa được thêm vào vui lòng thử lại sau!</p> */}
                            </div>
                        </main>
                    </div>
                </div>
            </div>}
            <Modal show={modalSubmit} animation onHide={() => setModalSubmit(!modalSubmit)} centered size="md" dialogClassName='sweet-alert-modal' contentClassName='p-3'>
                <Modal.Body>
                    <div className='text-center'>
                        <i className='fa fa-4x fa-warning'></i>
                        <br></br>
                        <br></br>
                        <h3>Bạn có chắc muốn nộp bài</h3>
                        <p>
                            {questions.some(q => q.answer == '') && <p className='text-warning'>Vẫn có câu hỏi bạn chưa chọn đáp án</p>}
                        </p>
                    </div>

                </Modal.Body>
                <div className='d-flex justify-content-end mb-2'>
                    <Button variant="secondary mr-2" onClick={() => setModalSubmit(!modalSubmit)}>Làm tiếp</Button>
                    <Link className='btn btn-primary' to={'/home'}>Nộp bài</Link>
                </div>
            </Modal>
            <Modal show={modalTimeUp} animation backdrop='static' centered size="md" dialogClassName='sweet-alert-modal' contentClassName='p-3'>
                <Modal.Body>
                    <div className='text-center'>
                        <i className='fa fa-4x fa-warning text-info'></i>
                        <br></br>
                        <br></br>
                        <h3>Hết thời gian</h3>
                        <p>
                            Nhấn để kiểm tra kết quả
                        </p>
                    </div>

                </Modal.Body>
                <div className='d-flex justify-content-end mb-2'>
                    <Link className='btn btn-info' to={'/result'}>Ok</Link>
                </div>
            </Modal>
            <Modal show={modalExit} animation onHide={() => setModalExit(!modalExit)} centered size="md" dialogClassName='sweet-alert-modal' contentClassName='p-3'>
                <Modal.Body>
                    <div className='text-center'>
                        <i className='fa fa-4x fa-warning text-danger'></i>
                        <br></br>
                        <br></br>
                        <h3 className='text-info'>Bạn có chắc muốn thoát</h3>
                        <p className='text-danger'>
                            Mọi kết quả có thể sẽ không được lưu!
                        </p>
                    </div>

                </Modal.Body>
                <div className='d-flex justify-content-end mb-2'>
                    <Button variant="secondary mr-2" onClick={() => setModalExit(!modalExit)}>Làm tiếp</Button>
                    <Link className='btn btn-danger' to={'/home'}>Thoát</Link>
                </div>
            </Modal>
        </div>
    )
}
export default CertificateExam