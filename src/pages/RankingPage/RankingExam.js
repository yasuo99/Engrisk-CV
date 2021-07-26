import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import examApi from '../../api/examApi';
import HeaderClient from '../../components/client/HeaderClient';
import SubMenuClient from '../../components/client/SubMenuClient';
import Footer from '../Footer/Footer';

class RankingExam extends Component {
    constructor(props) {
        super(props);
        this.state = {
            examRanking: []
        }
        this.isComponentMounted = false;
    }
    async componentDidMount() {
        this.isComponentMounted = true;
        const examRanking = await this.fetchExamRanking();
        if (this.isComponentMounted) {
            this.setState({
                examRanking: examRanking
            })
        }
    }
    fetchExamRanking = async () => {
        return examApi.getRanking();
    }
    render() {
        const renderRanking = this.state.examRanking.map((rank) =>
            <tr key={rank.examId} className="table-warning">
                <td><img src="/image/ranking.png" /></td>
                <td><span><a href={"/blog?id="+rank.accountId}><img src="/image/teamwork.png" />{rank.accountUsername}</a></span></td>
                <td>{rank.examTitle}</td>
                <td><span className="label label-success">{rank.score}/{rank.totalScore}</span></td>
                <td>{Math.round(rank.totalTime / 60)} phút</td>
            </tr>
        );
        return (
            <div id="wrapper">
                <SubMenuClient></SubMenuClient>
                <div id="content-wrapper" className="d-flex flex-column">
                    <div id="content">
                        <HeaderClient></HeaderClient>
                        <section id="rankingExam">
                            <div className="container">
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="panel">
                                            <div className="panel-heading">
                                                <div className="row">
                                                    <h4 className="title">BẢNG XẾP HẠNG</h4>
                                                </div>
                                            </div>
                                            <table className="table table-hover table-bordered table-striped">
                                                <thead>
                                                    <tr className="active text-center">
                                                        <th>#</th>
                                                        <th className="taikhoan">Tên tài khoản</th>
                                                        <th>Bài exam</th>
                                                        <th>Số điểm đạt được</th>
                                                        <th>Thời gian hoàn thành</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="text-center">
                                                   {renderRanking}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        );
    }
    componentWillUnmount() {
        this.isComponentMounted = false;
    }
}
export default RankingExam;