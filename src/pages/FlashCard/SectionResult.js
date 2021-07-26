import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Moment from 'moment';
import { Link, useParams } from "react-router-dom";
import sectionApiV2 from "../../api/2.0/sectionApi";
import { FinishUp } from "../../actions/sectionActions";
const SectionResult = () => {
  const dispatch = useDispatch();
  const {sectionId} = useParams();
  const { progress } = useSelector(state => state.section)
  const [dayStudied, setDayStudied] = useState([]);
  useEffect( async () => {
    if (progress.dayStudied) {
      console.log(progress.dayStudied);
      let newDayStudied = []
      for (var key in progress.dayStudied) {
        const data = {
          day: key,
          isActive: progress.dayStudied[key]
        }
        console.log(data);
        newDayStudied = [...newDayStudied,data]
      }
      console.log(newDayStudied);
      setDayStudied(newDayStudied)
    }
    else{
      const progressReview = await sectionApiV2.getSectionProgressReview(sectionId);
      dispatch(FinishUp(progressReview));
    }
  }, [progress])
  Moment.locale("en");
  return (
    <div id="wrapper">
      <div id="content-wrapper" className="d-flex flex-column">
        <div id="content" style={{ overflow: "auto", height: "100vh" }}>
          <main id="scroll">
            <div className="mt-2">
              <div className="row">
                <div className="offset-md-11 col-1">
                  <a className="btn btn-light rounded-circle" href="/home">
                    <i className="fa fa-remove"></i>
                  </a>
                </div>
              </div>
            </div>
            <div className="container">
              <p className="text-center font-weight-bold text-lg text-dark">
                Xuất sắc
              </p>
              <p className="text-center text-dark">
                Bạn có thể xem tiến trình học của bạn mọi lúc
              </p>
              <div className="mt-2">
                <div className="row">
                  <div className="section-finish-up-panel col">
                    <div className="container">
                      <p className="text-left text-dark">Tiến độ học của bạn</p>
                      <img src='../../image/one.png' />
                      <p className='align-self-center stat'>{progress.sectionDone}/{progress.totalSection}</p>
                    </div>
                  </div>
                  <div className="progress-stats col">
                    <div className="panel-main container-stat">
                      <p className="text-left text-dark">Từ đã học</p>
                      <p className="text text-left">{progress.learnedVocabulary}</p>
                      <img src='../../image/stats-dictionary.png' className='vocabulary' />
                    </div>
                    <div className="panel-main container-stat">
                      <p className="text-left text-dark">Ngày hoạt động</p>
                      <p className="text text-left">{progress.active_Days}</p>
                      <img src='../../image/schedule.png' className='schedule' />
                    </div>
                  </div>
                </div>
                <div className="progress-stats">
                  <div className="panel-main container-stat" style={{ marginLeft: '1.25rem' }}>
                    <p className="text-left text-dark">Chuỗi ngày học</p>
                    <div className="day-list">
                      {dayStudied.map((day, index) =>
                        <div className="day-list-item" key={index}>
                          <div
                            className={day.isActive ? "day-list-item__circle complete" : "day-list-item__circle"}
                            style={{ animationDelay: "400ms" }}
                          >
                            <div className="day-list-item__icon">
                              <span className="icon text-light">
                                {day.isActive && <i className="icon fa fa-check text-white"></i>}

                              </span>
                            </div>
                          </div>
                          <span className="day-list-item__text">{Moment(day.day).format('dddd')}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="container">
              <div className="drawer-content">
                <div className="page-wrap">
                  <Link className="feedback-bar-btn" to='/home'>Tiếp tục</Link>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};
export default SectionResult;
