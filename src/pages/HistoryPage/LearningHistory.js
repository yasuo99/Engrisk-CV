import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import sectionApiV2 from "../../api/2.0/sectionApi";
import HeaderClient from "../../components/client/HeaderClient";
import SubMenuClient from "../../components/client/SubMenuClient";
import accountApiV2 from "../../api/2.0/accountApi";
import 'moment/locale/vi'
import Moment from 'moment';

const LearningHistory = () => {
  const dispatch = useDispatch();
  const initialDate = () => {
    var curr = new Date(); // get current date
    var first = curr.getDate(); // First day is the day of the month - the day of the week
    var last = first + 6; // last day is the first day + 6
    console.log(last);
    var firstday = new Date(curr.setDate(first));
    var lastday = new Date(curr.setDate(last));
    var end = `${lastday.getFullYear()}-${lastday.getMonth() < 9 ? `0${lastday.getMonth() + 1}` : lastday.getMonth() + 1}-${lastday.getDate() < 10 ? `0${lastday.getDate()}` : lastday.getDate()}`;
    var start = `${firstday.getFullYear()}-${firstday.getMonth() < 9 ? `0${firstday.getMonth() + 1}` : firstday.getMonth() + 1}-${firstday.getDate() < 10 ? `0${firstday.getDate()}` : firstday.getDate()}`;
    return ({
      start: start,
      end: end
    })
  }
  const { account } = useSelector(state => state.auth)
  const [dayStudied, setDayStudied] = useState([]);
  const [dayStudy, setDayStudy] = useState({})
  const [dateRange, setDateRange] = useState(initialDate)
  const [active, setActive] = useState(0);
  useEffect(async () => {
    const result = await accountApiV2.getLearningHistory(account.id, dateRange)
    var newArr = []
    for (var key in result.dayStudied) {
      const data = {
        day: key,
        isActive: result.dayStudied[key].status,
        learnedVocabulary: result.dayStudied[key].learnedVocabulary,
        sectionDone: result.dayStudied[key].sectionDone,
        vocabularyScript: result.dayStudied[key].vocabularyScript,
        listeningScript: result.dayStudied[key].listeningScript,
        readingScript: result.dayStudied[key].readingScript,
        writingScript: result.dayStudied[key].writingScript,
        grammarScript: result.dayStudied[key].grammarScript,
        conversationScript: result.dayStudied[key].conversationScript,
      }
      newArr = [...newArr, data];
    }
    setActive(newArr.filter(arr => arr.isActive).length)
    setDayStudy(newArr[0])
    setDayStudied(newArr)

  }, [dateRange.start, dateRange.end])
  function startDateChange(date) {
    var curr = new Date(date); // get current date
    var first = curr.getDate(); // First day is the day of the month - the day of the week
    var last = first + 6; // last day is the first day + 6
    console.log(last);
    var firstday = new Date(curr.setDate(first));
    var lastday = new Date(curr.setDate(last));
    var end = `${lastday.getFullYear()}-${lastday.getMonth() < 9 ? `0${lastday.getMonth() + 1}` : lastday.getMonth() + 1}-${lastday.getDate() < 10 ? `0${lastday.getDate()}` : lastday.getDate()}`;
    var start = `${firstday.getFullYear()}-${firstday.getMonth() < 9 ? `0${firstday.getMonth() + 1}` : firstday.getMonth() + 1}-${firstday.getDate() < 10 ? `0${firstday.getDate()}` : firstday.getDate()}`;
    setDateRange({
      ...dateRange,
      start: start,
      end: end
    })
  }
  function renderProgressImage(amount) {
    switch (amount) {
      case 0:
        return '../../image/zero.png'
      case 1:
        return '../../image/one.png'
      case 2:
        return '../../image/two.png'
      case 3:
        return '../../image/three.png'
      case 4:
        return '../../image/four.png'
      case 5:
        return '../../image/five.png'
      case 6:
        return '../../image/six.png'
      case 7:
        return '../../image/elevent.png'
      case 8:
        return '../../image/eight.png'
      case 9:
        return '../../image/nine.png'
      case 10:
        return '../../image/ten.png'
      default:
        return '../../image/ten.png'
    }
  }
  function endDateChange(date) {
    var curr = new Date(date); // get current date
    var first = curr.getDate(); // First day is the day of the month - the day of the week
    var last = first - 6; // last day is the first day + 6
    console.log(last);
    var firstday = new Date(curr.setDate(first));
    console.log(firstday.getMonth());
    var lastday = new Date(curr.setDate(last));
    var end = `${lastday.getFullYear()}-${lastday.getMonth() < 9 ? `0${lastday.getMonth() + 1}` : lastday.getMonth() + 1}-${lastday.getDate() < 10 ? `0${lastday.getDate()}` : lastday.getDate()}`;
    var start = `${firstday.getFullYear()}-${firstday.getMonth() < 9 ? `0${firstday.getMonth() + 1}` : firstday.getMonth() + 1}-${firstday.getDate() < 10 ? `0${firstday.getDate()}` : firstday.getDate()}`;
    setDateRange({
      ...dateRange,
      start: end,
      end: start
    })
  }
  return (
    <div id="wrapper">
      <SubMenuClient></SubMenuClient>
      <div id="content-wrapper" className="d-flex flex-column">
        <div id="content" style={{ overflow: "auto", height: "100vh" }}>
          <HeaderClient></HeaderClient>
          <main id="scroll">
            <div className="container mt-2">
              <p className="text-center font-weight-bold text-lg text-dark">
                {active >= dayStudied.length - 3 ? 'Xuất sắc' : active >= dayStudied - 5 ? 'Khá' : 'Yếu'}
              </p>
              <p className="text-center text-dark">
                Bạn có thể xem tiến trình học của bạn mọi lúc
              </p>
              <div className="mt-2">
                <div className="row">
                  <div className="section-finish-up-panel col">
                    <div className="container">
                      <div className='d-flex justify-content-between'>
                        <p className="text-left text-dark font-weight-bold">Số bài đã học</p>
                        <div className="dropdown no-arrow show">
                          <a className="dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                            <i className="fas fa-ellipsis-v fa-sm fa-fw text-gray-400"></i>
                          </a>
                          <div className="dropdown-menu dropdown-menu-right shadow animated--fade-in card-dropdown" aria-labelledby="dropdownMenuLink" x-placement="bottom-end">
                            <div className="dropdown-header">Chi tiết</div>
                            <a className="dropdown-item" href="#">Ngữ pháp: {dayStudy.grammarScript}</a>
                            <a className="dropdown-item" href="#">Từ vựng: {dayStudy.vocabularyScript}</a>
                            <a className="dropdown-item" href="#">Luyện nghe: {dayStudy.listeningScript}</a>
                            <a className="dropdown-item" href="#">Luyện đọc: {dayStudy.readingScript}</a>
                            <a className="dropdown-item" href="#">Luyện viết: {dayStudy.writingScript}</a>
                            <a className="dropdown-item" href="#">Hội thoại: {dayStudy.conversationScript}</a>
                            <div className="dropdown-divider"></div>
                            <Link className="dropdown-item" to="/home">Học ngay</Link>
                          </div>
                        </div>
                      </div>
                      <div className='d-flex justify-content-center align-items-center'>
                        <img src={renderProgressImage(dayStudy.sectionDone)} />
                        <p className='text position-absolute'>Số bài đã học {dayStudy?.sectionDone || 0}</p>
                      </div>

                    </div>
                  </div>
                  <div className="progress-stats col">
                    <div className="panel-main container-stat">
                      <div className='d-flex justify-content-between'>
                        <p className="text-left text-dark font-weight-bold">Từ đã học</p>
                        <div className="dropdown no-arrow show">
                          <a className="dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                            <i className="fas fa-ellipsis-v fa-sm fa-fw text-gray-400"></i>
                          </a>
                          <div className="dropdown-menu dropdown-menu-right shadow animated--fade-in card-dropdown" aria-labelledby="dropdownMenuLink" x-placement="bottom-end">
                            <div className="dropdown-header">Chức năng:</div>
                            <Link className="dropdown-item" to="/vocabulary/progress">Ôn tập ngay</Link>
                            <Link className="dropdown-item" to="/flashcard">Học với flashcard</Link>
                            <Link className="dropdown-item" to="/home">Học với kịch bản</Link>
                          </div>
                        </div>
                      </div>
                      <p className="text text-left">{dayStudy?.learnedVocabulary || 0}</p>
                      <img src='../../image/stats-dictionary.png' className='vocabulary' />
                    </div>
                    <div className="panel-main container-stat">
                      <p className="text-left text-dark font-weight-bold">Ngày hoạt động</p>
                      <p className="text text-left">{active}</p>
                      <img src='../../image/schedule.png' className='schedule' />
                    </div>
                  </div>
                </div>
                <div className="progress-stats">
                  <div className="panel-main container-stat" style={{ marginLeft: '1.25rem' }}>
                    <div className='d-flex justify-content-between'>
                      <div>
                        <span>Ngày bắt đầu</span>
                        <br></br>
                        <input type='date' value={dateRange.start} onChange={(e) => startDateChange(e.target.value)} />
                      </div>
                      <div>
                        <span>Ngày kết thúc</span>
                        <br></br>
                        <input type='date' value={dateRange.end} onChange={(e) => endDateChange(e.target.value)} />
                      </div>
                    </div>
                    <p className="text-left text-dark">Chuỗi ngày học</p>
                    <div className="day-list">
                      {dayStudied.map((day, index) =>
                        <div className="day-list-item" key={index} onClick={() => setDayStudy(day)}>
                          <div
                            className={day.isActive ? `day-list-item__circle complete ${dayStudy == day ? 'border-success' : ''}` : `day-list-item__circle ${dayStudy == day ? 'border-success' : ''}`}
                            style={{ animationDelay: "400ms" }}
                          >
                            <div className="day-list-item__icon">
                              <span className="icon text-light">
                                {day.isActive && <i className="icon fa fa-check text-white"></i>}

                              </span>
                            </div>
                          </div>
                          <span className={`day-list-item__text ${dayStudy == day ? 'text-success' : ''}`}>{Moment(day.day).locale('vi').format('dddd')}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};
export default LearningHistory;
