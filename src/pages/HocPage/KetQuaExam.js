import React, { Component, useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import { connect, useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import examApi from '../../api/examApi';
import HeaderClient from '../../components/client/HeaderClient';
import SubMenuClient from '../../components/client/SubMenuClient';
import Footer from '../Footer/Footer';
import moment from 'moment';
import { toast } from 'react-toastify';
import { ExamPurpose } from './../../constants/ExamPurpose';
import { removeResult } from '../../actions/examActions';
const KetQuaExam = ({ }) => {
    const { examId } = useParams();
    const { result } = useSelector(state => state.exam);
    const [data, setData] = useState({})
    const [isBusy, setIsBusy] = useState(true);
    const dispatch = useDispatch();
    useEffect(() => {
        if (result) {
            setData(result)
            setIsBusy(false);
        } else {

        }
    }, [])
    return (
        <div id="wrapper">
            <SubMenuClient></SubMenuClient>
            <div id="content-wrapper" className="d-flex flex-column">
                <div id="content">
                    <HeaderClient></HeaderClient>
                    {!isBusy && <main className='vertical-center-result'>

                        <div className="container mt-4">
                            <div className='row'>
                                <div className='panel-main text-center'>
                                    {data.purpose == ExamPurpose.LEARN && (data.isFinishScript ? <h5 className='font-weight-bold text-success'>Chúc mừng bạn đã hoàn thành bài học</h5> : <h5 className='font-weight-bold'>Bạn không hoàn thành bài học do không đạt yêu cầu</h5>)}
                                </div>

                            </div>
                            <div className='row'>
                                <div className="section-finish-up-panel col">
                                    <div className='container'>
                                        <div className='text-center d-flex justify-content-center align-items-center'>
                                            <img src='../../image/score.png' />
                                            <h4 className='engrisk-score text-dark'>Engrisk score <br></br>{data.score}</h4>
                                        </div>
                                    </div>

                                </div>
                                <div className="progress-stats col">
                                    <div className="panel-main container-stat text-left">
                                        <h4 className='text-dark'>Thông tin bài thi<br></br>
                                        </h4>
                                        <hr></hr>
                                        <br></br>
                                        <h6 className='text-dark text-start'>Tên bài thi: {data.answer.title}</h6>
                                        <h6 className='text-dark text-start'>Tổng điểm: {data.answer.totalScore}</h6>
                                        <h6 className='text-dark text-start'>Thời gian làm bài: {data.answer.duration}</h6>
                                        <h6 className='text-dark text-start'>Thời điểm bắt đầu: {moment(data.timestamp_start).format('DD/MM/yyyy')}</h6>
                                        <h6 className='text-dark text-start'>Thời gian hoàn thành: {data.spent} phút</h6>
                                        <div className='text-center mt-4'>
                                            <button className='border btn btn-primary rounded-pill bg-white shadow-sm'>Làm lại</button>
                                        </div>

                                    </div>
                                    <div className="panel-main container-stat text-left">
                                        <h4 className='text-dark'>Chi tiết<br></br>
                                        </h4>
                                        <hr></hr>
                                        <div className='d-flex justify-content-center mt-4'>
                                            <div className='col-3'>
                                                <div className='unit-row__activity'>
                                                    <div className='activity-circle'>
                                                        <div className='text-center logo toeic-score-circle'>
                                                            {data.listening}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='col-4 pt-3 text-dark font-weight-normal'>
                                                <img className='toeic-icon' src='../../image/headphone.png' />  Listening
                                            </div>
                                        </div>
                                        <div className='d-flex justify-content-center'>
                                            <div className='col-3'>
                                                <div className='unit-row__activity'>
                                                    <div className='activity-circle'>
                                                        <div className='text-center logo toeic-score-circle'>
                                                            {data.reading}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='col-4 pt-3 text-dark font-weight-normal'>
                                                <img className='toeic-icon' src='../../image/reading.png' /> Reading
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </main>}

                </div>
            </div>
        </div>
    );
}

export default KetQuaExam;