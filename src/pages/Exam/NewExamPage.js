import { useEffect, useRef, useState } from "react";
import Loader from 'react-loader-spinner';
import { Modal, Button } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import { QuestionTypes } from './../../constants/QuestionTypes';
import ToeicQuestion from "../../components/question/ToeicQuestion";
import { ToeicParts } from './../../constants/ToeicParts';
import Countdown from 'react-countdown';
import examApiv2 from "../../api/2.0/examApi";
import ToeicPartQuestions from "../../components/question/ToeicPartQuestions";
import { GrNext, GrPrevious } from 'react-icons/gr'
import { useDispatch } from "react-redux";
import { doneExam } from "../../actions/examActions";
const NewExamPage = ({ }) => {
    const dispatch = useDispatch();
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
    const [examConfig, setExamConfig] = useState({ grouped: false })
    const [menu, setMenu] = useState(false);
    const [currentPart, setCurrentPart] = useState(ToeicParts.Part1)
    const questionBox = useRef(null)
    const [menuHeight, setMenuHeight] = useState(600)
    //Modal
    const [modalExit, setModalExit] = useState(false);
    const [modalSubmit, setModalSubmit] = useState(false);
    const [modalTimeUp, setModalTimeUp] = useState(false);
    const [firstTimeConfig, setFirstTimeConfig] = useState(false);
    const [start, setStart] = useState(Date.now())
    const { examId } = useParams();
    useEffect(() => {
        async function fetchQuestions() {
            const result = await examApiv2.doExam(examId);
            const formatQuestions = result.questions.map((value, index) => ({ question: value, index: index + 1, answer: '', isListened: false }))
            setQuestions(formatQuestions);
            setCurrentQuestion(formatQuestions[index]);
            setIsBusy(false)
        }
        fetchQuestions();

    }, [])
    useEffect(() => {
        var temp = localStorage.getItem('exam_config');
        if (temp == undefined) {
            const examConf = {
                grouped: false
            };
            localStorage.setItem('exam_config', JSON.stringify(examConf));
        } else {
            setExamConfig(JSON.parse(temp))
        }
    }, [setExamConfig])
    useEffect(() => {
        if (!isBusy) {
            localStorage.setItem('exam_config', JSON.stringify(examConfig));
        }
    }, [examConfig])
    useEffect(() => {
        if (currentQuestion) {
            setCurrentPart(currentQuestion.question.toeic)
        }
    }, [currentQuestion])
    useEffect(() => {
        setCurrentQuestion(questions.filter(q => q.question.toeic == currentPart).shift())
    }, [currentPart])
    function selectAnswer(answer) {
        console.log(answer);
        console.log(questions);
        if (!examConfig.grouped) {
            const index = questions.findIndex(q => q.question.id == currentQuestion.question.id);
            questions[index].answer = answer.answer;
            setQuestions([...questions]);

            setCurrentQuestion({
                ...currentQuestion,
                answer: answer.answer
            })
        }
        else {
            const index = questions.findIndex(q => q.question.id == answer.questionId);
            questions[index].answer = answer.answer;
            setQuestions([...questions]);
        }
    }
    useEffect(() => {
        if (questions.length > 0) {
            setCurrentQuestion(questions[index]);
        }
    }, [index])
    useEffect(() => {
        if (questionBox.current) {
            setMenuHeight(questionBox.current.offsetHeight > 0 ? questionBox.current.offsetHeight + 100 : 300)
        }
    }, [questionBox.current, examConfig])
    function nextIndex() {
        if (index < questions.length - 1) {
            setIndex(index + 1);
        }
    }
    function previousIndex() {
        if (index > 0) {
            setIndex(index - 1);
        }
    }
    function nextPart() {
        const keys = Object.keys(ToeicParts)
        const temp = keys.filter(key => questions.filter(q => q.question.toeic == ToeicParts[key]).length > 0);
        if (temp.indexOf(currentPart) < temp.length - 1) {

            setCurrentPart(ToeicParts[temp[temp.indexOf(currentPart) + 1]])
        } else {
            setCurrentPart(ToeicParts[temp[0]])
        }
    }
    function previousPart() {
        const keys = Object.keys(ToeicParts)
        const temp = keys.filter(key => questions.filter(q => q.question.toeic == ToeicParts[key]).length > 0);
        if (temp.indexOf(currentPart) > 0) {
            setCurrentPart(ToeicParts[temp[temp.indexOf(currentPart) - 1]])
        } else {
            setCurrentPart(ToeicParts[temp[temp.length - 1]])
        }
    }
    function listenedAudio(question) {
        const index = questions.findIndex(q => q == question);
        console.log(index);
        questions[index].isListened = true;
        setQuestions([...questions]);
    }
    async function submitFinish() {
        const answers = questions.map((val) => ({ answer: val.answer, questionId: val.question.id }))
        dispatch(doneExam(examId, answers));
        setIsFinish(true);
    }
    console.log(examConfig);
    return (
        <div>
            {!isBusy ? (<div id="wrapper">
                <div id="content-wrapper" className="d-flex flex-column " style={{ backgroundColor: '#f0f2f5' }}>
                    <div id="content" style={{ overflow: "auto", height: "100vh" }}>
                        <main id="scroll">
                            <div className="container-fluid fixed-top shadow-sm" style={{ backgroundColor: '#ffffff' }}>
                                <div className='d-flex justify-content-between p-2'>
                                    <div>
                                        <button className='btn btn-light rounded-circle' onClick={(e) => { setConfigToast(!configToast) }}>
                                            <i className='fa fa-cog'></i>
                                        </button>
                                    </div>

                                    <div className={`card border-0 mt-4 p-2 ${!configToast ? 'config-slide-hidden' : 'config-slide'}`}>
                                        <div className='d-flex justify-content-end'>
                                        </div>
                                        <div>
                                            <div className="custom-control custom-checkbox">
                                                <input type="checkbox" className="custom-control-input" checked={examConfig?.grouped} id="check1" onChange={(e) => setExamConfig({ ...examConfig, grouped: e.currentTarget.checked })} />
                                                <label className="custom-control-label text-dark" htmlFor="check1">Nhóm theo phần</label>

                                            </div>
                                            <div className="custom-control custom-checkbox">
                                                <input type="checkbox" className="custom-control-input" checked={examConfig?.audioLimit} id="check2" onChange={(e) => { if (!firstTimeConfig) { setExamConfig({ ...examConfig, audioLimit: e.currentTarget.checked }); setFirstTimeConfig(true) } }} />
                                                <label className="custom-control-label text-dark" htmlFor="check2">Nghe 1 lần</label>
                                            </div>
                                        </div>
                                    </div>

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
                                    <div>
                                        <h5 className='text-dark'> <Countdown className='pt-2' date={start + 3 * 60 * 1000} onComplete={() => console.log('dkm')} />  <span>
                                            <button className='btn btn-warning font-weight-bold mr-2' onClick={() => setModalSubmit(!modalSubmit)}>Nộp bài</button>
                                            <button className='btn btn-light mr-2' onClick={() => setMenu(!menu)}>
                                                <i className='fa fa-list'></i>
                                            </button>
                                            <Link className="btn btn-light rounded-circle" to={`${isFinish ? `/home` : '#'}`} onClick={() => setModalExit(!modalExit)}>
                                                <i className="fa fa-remove"></i>
                                            </Link>
                                        </span></h5>


                                        <div className={`card mt-4  ${!menu ? 'menu-slide-hidden' : 'menu-slide'}`}>
                                            <div>
                                                {examConfig.grouped ? <div className="list-item-body outline-learn-body ps-container ps-active-y" style={{ height: '629px', width: '328px' }}>

                                                    <div className="section-learn-outline">
                                                        <h5 className="section-title bg-primary">LISTENING TEST</h5>
                                                        <ul className="section-list">
                                                            {questions.filter(q => q.question.toeic == ToeicParts.Part1).length > 0 && <li className={`cursor-pointer ${currentPart == ToeicParts.Part1 ? 'o-view' : ''}`} onClick={() => setCurrentPart(ToeicParts.Part1)}>
                                                                <div className="list-body">
                                                                    <div>
                                                                        <h6>Part I</h6>
                                                                        <p>Picture Description</p>
                                                                    </div>
                                                                </div>
                                                                <div className="div-x"><i className="fa fa-check text-white"></i></div>
                                                            </li>}
                                                            {questions.filter(q => q.question.toeic == ToeicParts.Part2).length > 0 && <li className={`cursor-pointer ${currentPart == ToeicParts.Part2 ? 'o-view' : ''}`} onClick={() => setCurrentPart(ToeicParts.Part2)}>
                                                                <div className="list-body">
                                                                    <div>
                                                                        <h6>Part II</h6>
                                                                        <p>Question - Response</p>
                                                                    </div>
                                                                </div>
                                                                <div className="div-x"><i className="fa fa-check text-white"></i></div>
                                                            </li>}
                                                            {questions.filter(q => q.question.toeic == ToeicParts.Part3).length > 0 && <li className={`cursor-pointer ${currentPart == ToeicParts.Part3 ? 'o-view' : ''}`} onClick={() => setCurrentPart(ToeicParts.Part3)}>
                                                                <div className="list-body">
                                                                    <div>
                                                                        <h6>Part III</h6>
                                                                        <p>Short Conversations</p>
                                                                    </div>
                                                                </div>
                                                                <div className="div-x"><i className="fa fa-check text-white"></i></div>
                                                            </li>}
                                                            {questions.filter(q => q.question.toeic == ToeicParts.Part4).length > 0 && <li className={`cursor-pointer ${currentPart == ToeicParts.Part4 ? 'o-view' : ''}`} onClick={() => setCurrentPart(ToeicParts.Part4)}>
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
                                                            {questions.filter(q => q.question.toeic == ToeicParts.Part5).length > 0 && <li className={`cursor-pointer ${currentPart == ToeicParts.Part5 ? 'o-view' : ''}`} onClick={() => setCurrentPart(ToeicParts.Part5)}>
                                                                <div className="list-body">
                                                                    <div>
                                                                        <h6>Part V</h6>
                                                                        <p>Incomplete Sentences</p>
                                                                    </div>
                                                                </div>
                                                                <div className="div-x"><i className="fa fa-check text-white"></i></div>
                                                            </li>}
                                                            {questions.filter(q => q.question.toeic == ToeicParts.Part6).length > 0 && <li className={`cursor-pointer ${currentPart == ToeicParts.Part6 ? 'o-view' : ''}`} onClick={() => setCurrentPart(ToeicParts.Part6)}>
                                                                <div className="list-body">
                                                                    <div>
                                                                        <h6>Part VI</h6>
                                                                        <p>Text Completion</p>
                                                                    </div>
                                                                </div>
                                                                <div className="div-x"><i className="fa fa-check text-white"></i></div>
                                                            </li>}
                                                            {questions.filter(q => q.question.toeic == ToeicParts.Part7).length > 0 && <li className={`cursor-pointer ${currentPart == ToeicParts.Part7 ? 'o-view' : ''}`} onClick={() => setCurrentPart(ToeicParts.Part7)}>
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
                                                    {/* <div className="ps-scrollbar-x-rail" style={{ width: '327px', display: 'none', left: '0px' }}><div className="ps-scrollbar-x" style={{ left: '0px', width: '0px' }}></div></div><div className="ps-scrollbar-y-rail" style="top: 0px; height: 629px; display: inherit; right: 0px;"><div className="ps-scrollbar-y" style="top: 0px; height: 150px;"></div> */}
                                                </div> : <div className="list-item-body outline-learn-body ps-container" style={{ height: `${menuHeight}px`, width: '330px' }}>
                                                    <div className="section-learn-outline">
                                                        <h5 className="section-title bg-primary">LISTENING TEST</h5>
                                                        <div className='d-flex justify-content-center mt-1'>
                                                            <select className='pagination-select' value={currentPart} onChange={(e) => setCurrentPart(e.target.value)}>
                                                                {questions.filter(q => q.question.toeic == ToeicParts.Part1).length > 0 && <option value={ToeicParts.Part1}>Part I: Picture Description</option>}
                                                                {questions.filter(q => q.question.toeic == ToeicParts.Part2).length > 0 && <option value={ToeicParts.Part2}>Part II: Question - Response Instruction</option>}
                                                                {questions.filter(q => q.question.toeic == ToeicParts.Part3).length > 0 && <option value={ToeicParts.Part3}> Part III: Short Conversations Instruction</option>}
                                                                {questions.filter(q => q.question.toeic == ToeicParts.Part4).length > 0 && <option value={ToeicParts.Part4}>Part IV: Short Talks Instruction</option>}
                                                                {questions.filter(q => q.question.toeic == ToeicParts.Part5).length > 0 && <option value={ToeicParts.Part5}>Part V: Incomplete Sentences Instruction</option>}
                                                                {questions.filter(q => q.question.toeic == ToeicParts.Part6).length > 0 && <option value={ToeicParts.Part6}>Part VI: Incomplete Sentences Instruction</option>}
                                                                {questions.filter(q => q.question.toeic == ToeicParts.Part7).length > 0 && <option value={ToeicParts.Part7}>Part VII: Reading Comprehension Instruction</option>}
                                                            </select>
                                                        </div>
                                                        <div className="section-list">
                                                            <div className="o-view active p-2">
                                                                <div className="list-body" ref={questionBox}>

                                                                    <div className="list-q-n">
                                                                        {questions.filter(q => q.question.toeic == currentPart).map((value, index) =>
                                                                            <button onClick={() => setIndex(value.index - 1)} className={`btn btn-default question-n mr-1 rounded ${questions[value.index - 1].answer && currentQuestion.question != value.question ? 'bg-success text-white' : ''} ${currentQuestion.question == value.question ? 'bg-primary text-white' : ''}`} key={index}>{value.index}</button>
                                                                        )}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>}

                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div>

                                <div style={{ position: 'absolute', left: '16%', top: '11%' }}>
                                    <button className='btn btn-light rounded shadow-sm' onClick={() => { if (examConfig.grouped) { previousPart() } else { previousIndex() } }}>
                                        <GrPrevious></GrPrevious>
                                    </button>

                                </div>
                                <div className="container learning-layout d-flex justify-content-center" style={{ marginTop: '1%' }}>
                                    {!isBusy && currentQuestion && !examConfig.grouped && <ToeicQuestion question={currentQuestion} selectAnswer={selectAnswer} audioLimit={examConfig?.audioLimit} audioPlayed={listenedAudio}></ToeicQuestion>}
                                    {examConfig.grouped && <ToeicPartQuestions questions={questions.filter(q => q.question.toeic == currentPart)} currentPart={currentPart} selectAnswer={selectAnswer} listenedAudio={listenedAudio} audioLimit={examConfig?.audioLimit}></ToeicPartQuestions>}
                                </div>
                            </div>
                            <div style={{ position: 'absolute', right: '16%', top: '11%' }}>
                                <button className='btn btn-light rounded shadow-sm' onClick={() => { if (examConfig.grouped) { nextPart() } else { nextIndex() } }}>
                                    <GrNext></GrNext>
                                </button>
                            </div>
                        </main>
                    </div>
                </div>
            </div>
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
                        {questions.some(q => q.answer == '') && <p className='text-warning'>Vẫn có câu hỏi bạn chưa chọn đáp án</p>}
                    </div>

                </Modal.Body>
                <div className='d-flex justify-content-end mb-2'>
                    <Button variant="secondary mr-2" onClick={() => setModalSubmit(!modalSubmit)}>Làm tiếp</Button>
                    <Link className='btn btn-primary' onClick={() => submitFinish()} to={`/ketqua-exam/${examId}`}>Nộp bài</Link>
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
                    <Link className='btn btn-info' to={'/home'}>Ok</Link>
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
export default NewExamPage;