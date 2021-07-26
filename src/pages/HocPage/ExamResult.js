import HeaderClient from "../../components/client/HeaderClient";
import SubMenuClient from "../../components/client/SubMenuClient";
import { Link } from 'react-browser-router';

const ExamResult = ({ }) => {
    return (
        <div id="wrapper">
            <SubMenuClient></SubMenuClient>
            <div id="content-wrapper" className="d-flex flex-column">
                <div id="content">
                    <HeaderClient></HeaderClient>
                    <main className='vertical-center-result'>

                        <div className="container mt-4">
                            <div className='row'>
                                <div className="section-finish-up-panel col">
                                    <div className='container'>
                                        <div className='text-center d-flex justify-content-center align-items-center'>
                                            <img src='../../image/score.png' />
                                            <h4 className='engrisk-score text-dark'>Engrisk score <br></br>100</h4>
                                        </div>
                                    </div>

                                </div>
                                <div className="progress-stats col">
                                    <div className="panel-main container-stat text-left position-relative">
                                        <h4 className='text-dark'>Chứng chỉ<br></br>
                                        </h4>
                                        <h6 className='text-dark text-start'> ℹ️ Unfortunately, due to No Score Given, an Engrisk Certificate™ cannot be issued. Please try taking the test again.</h6>
                                        <div className='container border result-backdrop'>
                                            <div className='p-4 d-flex justify-content-between'>
                                                <div>
                                                    Xem chứng chỉ
                                                </div>
                                                <div>
                                                    Tải chứng chỉ
                                                </div>
                                            </div>

                                        </div>
                                        <button className='retest-btn border btn btn-light rounded-pill bg-white shadow-sm'>Thực hiện lại</button>
                                    </div>
                                    <div className="panel-main container-stat text-left">
                                        <h4 className='text-dark'>Chi tiết điểm của bạn <br></br>
                                        </h4>
                                        <div className='d-flex justify-content-center mt-4'>
                                            <div className='col-3'>
                                                <div className='unit-row__activity'>
                                                    <div className='activity-circle'>
                                                        <div className='text-center logo toeic-score-circle'>
                                                            0
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
                                                            0
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
                    </main>
                </div>
            </div>
        </div>
    )
}
export default ExamResult;