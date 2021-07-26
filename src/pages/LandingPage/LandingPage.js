import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import Footer from "../Footer/Footer"


class LandingPage extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    if (this.props.isLoggedIn) {
      return <Redirect to='/home' />
    }
    return (
      <div >
        <header id="duolingo">
          <div className="container-fluid">
            <div className="row">
              <div className="col-6">
                <div id="orbit-container">
                  <div className="orbit">
                    <ul className="orbit-wrap">
                      <li className="orbit-center">
                        <a href="/learn">
                          <img className="img-fluid" src="image/hocngay.png" />
                        </a>
                      </li>
                      <li>
                        <ul className="ring-1">
                          <li></li>
                          <li>
                            <a href="https://www.facebook.com/howkteam/" className="orbit-icon">
                              <img className="img-fluid" src="image/hoidap.png" />
                            </a>
                          </li>
                          <li>
                            <a href="/donate" className="orbit-icon">
                              <img className="img-fluid" src="image/taitro.png" />
                            </a>
                          </li>

                        </ul>
                      </li>
                      <li>
                        <ul className="ring-2">
                          <li />
                          <li>
                            <a href="/about/contact" className="orbit-icon">
                              <img className="img-fluid" src="image/phanhoi.png" />
                            </a>
                          </li>
                          <li />
                          <li>
                            <a href="https://www.facebook.com/groups/howkteam/" className="orbit-icon">
                              <img className="img-fluid" src="image/tailieu.png" />
                            </a>
                          </li>
                        </ul>
                      </li>
                      <li>
                        <ul className="ring-3">
                        </ul>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-6 nd ">
                <div className="row">
                  <h3 className="title">The limits of my language mean the limits of my world.</h3>
                </div>
                <div className="row">
                  <div className="col-md-6 offset-3">
                    <Link type="button" className="btn btn-home mt-4" to="/home">Bắt Đầu</Link>
                  </div>

                </div>
                <div className="row">
                  <div className="col-md-6 offset-3">
                    <Link type="button" className="btn btn-signin mt-4" to="/signin">Tôi Đã Có Tài Khoản</Link>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </header>
        <main id="nd-duolingo">
          <div className="container mb-5">
            <div className="row cachhoc mt-5 pb-5 kechan">
              <div className="col-2 offset-1"><img src="image/owl.png" /></div>
              <div className="col-8">
                <h3 className="title">Cách tốt nhất để học một ngôn ngữ</h3>
                <p className="content">Học tập cùng THANHLAP sẽ vô cùng vui nhộn và gây nghiện. Kiếm điểm khi trả lời các câu hỏi đúng,
                chạy đua cùng thời gian, hay nâng lên cấp độ. Những bài học nhỏ gọn thực sự hiệu quả giúp người
                  học nâng cao trình độ tiếng anh.</p>
              </div>
            </div>
            <div className="row mt-5">
              <div className="col-6 offset-3 text-center">
                <h3>Mỗi bài học đều được trò chơi hoá</h3>
              </div>
            </div>
            <div className="row mt-5 mb-5 pb-5 kechan">
              <div className="col-4">
                <h4><img src="/image/rating.png"></img> Cá nhân hóa bài học</h4>
                <p className="pt-2">Những bài học của Duolingo phù hợp với cách học tập của riêng bạn. Các bài tập được tùy chỉnh để
                  giúp bạn học và ôn luyện từ vựng thật hiệu quả.</p>
                <h4 className="pt-4"><img src="/image/rating.png"></img> Được chấm điểm ngay lập tức</h4>
                <p className="pt-2">Ngay lập tức biết được câu trả lời nào bạn làm đúng. Khi bạn bỏ lỡ một thử thách, chúng tôi sẽ
                  nhanh chóng chỉ cho bạn cách cải thiện.</p>
              </div>
              <div className="col-4 text-center"><img src="image/laptop.png" /></div>
              <div className="col-4">
                <h4><img src="/image/rating.png"></img> Nhận phần thưởng ảo khích lệ việc học</h4>
                <p className="pt-2">Mỗi khi bạn học được kỹ năng mới hoặc lên cấp, bạn sẽ nhận được tiền tệ ảo dùng để mua vật phẩm.
                </p>
                <h4 className="pt-4"><img src="/image/rating.png"></img> Cải thiện trình độ một cách nhanh chóng</h4>
                <p className="pt-2">Một nghiên cứu đã cho thấy 34 giờ học trên Duolingo tương đương với một học kỳ tại bậc đại học.
                </p>
              </div>
            </div>
            <div className="row mb-5">
              <div className="col-6 offset-3 text-center"><h3>LỘ TRÌNH HỌC VỚI THANHLAP</h3></div>
            </div>
            <section id="conference-timeline">
              <div className="timeline-start">BẮT ĐẦU</div>
              <div className="conference-center-line" />
              <div className="conference-timeline-content">
                <div className="timeline-article">
                  <div className="content-left-container">
                    <div className="content-left">
                      <h5>Kiểm tra đầu vào miễn phí</h5>
                      <p>Thiết lập lộ trình học phù hợp riêng của bạn<span className="article-number">01</span></p>
                    </div>
                  </div>
                  <div className="meta-date text-center">
                    <img src="/image/shooting-stars.png" className="mt-3" />
                  </div>
                </div>
                <div className="timeline-article">
                  <div className="content-right-container">
                    <div className="content-right">
                      <h5>Lựa chọn chủ đề yêu thích</h5>
                      <p>Luyện tập theo các chủ đề ngữ pháp, giao tiếp hằng ngày <span className="article-number">02</span></p>
                    </div>
                  </div>
                  <div className="meta-date text-center">
                    <img src="/image/shooting-stars.png" className="mt-3" />
                  </div>
                </div>
                <div className="timeline-article">
                  <div className="content-left-container">
                    <div className="content-left">
                      <h5>30 phút mỗi ngày</h5>
                      <p>Mỗi ngày dành 30 phút vào khung giờ quen thuộc để luyện tập các chủ đề<span className="article-number">03</span></p>
                    </div>
                  </div>
                  <div className="meta-date text-center">
                    <img src="/image/shooting-stars.png" className="mt-3" />
                  </div>
                </div>
                <div className="timeline-article">
                  <div className="content-right-container">
                    <div className="content-right">
                      <h5>Học từ vựng</h5>
                      <p>Xem lại các từ vựng đã được học trong các chủ đề <span className="article-number">04</span></p>
                    </div>
                  </div>
                  <div className="meta-date text-center">
                    <img src="/image/shooting-stars.png" className="mt-3" />
                  </div>
                </div>
              </div>
              <div className="timeline-end">End</div>
            </section>
          </div>
        </main>
        <footer id="footer-duolingo">
          <div className="container">
            <div className="row pt-5">
              <div className="col-8 offset-2 text-center">
                <h3 className="mb-3 text-primary">Học tiếng anh cùng với THANHLAP</h3>
                <button type="button" className="btn btn-primary">BẮT ĐẦU</button>
              </div>
            </div>
            <Footer></Footer>
          </div>
        </footer>
      </div>
    );

  }
}
const mapStateToProps = (state) => {
  const { isLoggedIn } = state.auth
  return {
    isLoggedIn: isLoggedIn
  }
}
export default connect(mapStateToProps)(LandingPage);


