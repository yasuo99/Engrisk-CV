import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import HeaderClient from '../../components/client/HeaderClient';
import SubMenuClient from '../../components/client/SubMenuClient';
import Footer from '../Footer/Footer';

class ListQuiz extends Component {
    render() {
        return (
            <div id="wrapper">
                <SubMenuClient></SubMenuClient>
                <div id="content-wrapper" className="d-flex flex-column">
                    <div id="content">
                        <HeaderClient></HeaderClient>
                        <section id="listquiz">
                            <div className="container pt-3">
                                <h4 className="title">Danh sách bài quiz</h4>
                                <div className="row mt-3">
                                    <div className="col-lg-4 col-md-4 pb-3">
                                        <div className="boxInfor">
                                            <img src="/image/banner1.jpg" className="img-100 img-fluid img-infor" />
                                            <h6 className="title">Gia đình</h6>
                                            <div className="content">
                                                <p>Hôm này website đã cập nhật một số bài quiz mới với chủ đề rất hay và thực tế. Cùng nhau học nào!!! </p>
                                                <button type="button" className="btn btn-primary">DO</button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-4 col-md-4 pb-3">
                                        <div className="boxInfor">
                                            <img src="/image/banner1.jpg" className="img-100 img-fluid img-infor" />
                                            <h6 className="title">Gia đình</h6>
                                            <div className="content">
                                                <p>Hôm này website đã cập nhật một số bài quiz mới với chủ đề rất hay và thực tế. Cùng nhau học nào!!! </p>
                                                <button type="button" className="btn btn-primary">DO</button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-4 col-md-4 pb-3">
                                        <div className="boxInfor">
                                            <img src="/image/banner1.jpg" className="img-100 img-fluid img-infor" />
                                            <h6 className="title">Gia đình</h6>
                                            <div className="content">
                                                <p>Hôm này website đã cập nhật một số bài quiz mới với chủ đề rất hay và thực tế. Cùng nhau học nào!!! </p>
                                                <button type="button" className="btn btn-primary">DO</button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-4 col-md-4 pb-3">
                                        <div className="boxInfor">
                                            <img src="/image/banner1.jpg" className="img-100 img-fluid img-infor" />
                                            <h6 className="title">Gia đình</h6>
                                            <div className="content">
                                                <p>Hôm này website đã cập nhật một số bài quiz mới với chủ đề rất hay và thực tế. Cùng nhau học nào!!! </p>
                                                <button type="button" className="btn btn-primary">DO</button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-4 col-md-4 pb-3">
                                        <div className="boxInfor">
                                            <img src="/image/banner1.jpg" className="img-100 img-fluid img-infor" />
                                            <h6 className="title">Gia đình</h6>
                                            <div className="content">
                                                <p>Hôm này website đã cập nhật một số bài quiz mới với chủ đề rất hay và thực tế. Cùng nhau học nào!!! </p>
                                                <button type="button" className="btn btn-primary">DO</button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-4 col-md-4 pb-3">
                                        <div className="boxInfor">
                                            <img src="/image/banner1.jpg" className="img-100 img-fluid img-infor" />
                                            <h6 className="title">Gia đình</h6>
                                            <div className="content">
                                                <p>Hôm này website đã cập nhật một số bài quiz mới với chủ đề rất hay và thực tế. Cùng nhau học nào!!! </p>
                                                <button type="button" className="btn btn-primary">DO</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                        <Footer></Footer>
                    </div>
                </div>

            </div>
        )
    }
}
export default ListQuiz;