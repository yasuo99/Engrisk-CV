import React, { Component } from 'react'
import HeaderClient from '../../components/client/HeaderClient'
import SubMenuClient from '../../components/client/SubMenuClient'
import Footer from '../Footer/Footer'
import { Line, Pie } from 'react-chartjs-2'
import accountApi from '../../api/accountApi'
import { connect } from 'react-redux'
export class Progress extends Component {
    constructor(props) {
        super(props);
        this.state = {
            examLabels: [],
            examData: [],
            examScoreData: [],
            examTimeData: [],
            wordLabels: [],
            wordData: [],
            totalWord: 0
        };
        this.isComponentMounted = false;
    }
    async componentDidMount() {
        this.isComponentMounted = true;
        const result = await this.fetchExamProgressData(this.props.account.id)
        let examLabels = [];
        let examData = [];
        let examScoreData = [];
        let examTimeData = [];
        for (var key in result) {
            examLabels.push(key);
            examData.push(result[key].totalExam);
            examScoreData.push(result[key].score);
            examTimeData.push(Math.round(result[key].totalTime/60));
        }
        let wordLabels = [];
        let wordData = [];

        const wordResult = await this.fetchWordProgressData(this.props.account.id);
        for (var key in wordResult.words) {
            wordLabels.push(key);
            wordData.push(wordResult.words[key]);
        }
        wordLabels.push('Tổng số từ vựng');
        wordData.push(wordResult.totalWord)
        if (this.isComponentMounted) {
            this.setState({
                examLabels: examLabels,
                examData: examData,
                examScoreData: examScoreData,
                examTimeData: examTimeData,
                wordLabels: wordLabels,
                wordData: wordData,
                totalWord: wordResult.totalWord
            })
        }
    }
    fetchExamProgressData = async (id) => {
        return await accountApi.getExamProgress(id);
    }
    fetchWordProgressData = async (id) => {
        return await accountApi.getWordProgress(id);
    }
    render() {
        const data = {
            labels: this.state.wordLabels,
            datasets: [
                {
                    label: 'Từ vựng đã học',
                    data: this.state.wordData,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)',
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)',
                    ],
                    borderWidth: 1,
                }
            ],
        }
        const wordOptions = {
            scales: {
                yAxes: [
                    {
                        ticks: {
                            beginAtZero: false,
                        },
                    },
                ],
            },
            title: {
                display: true,
                text: 'Từ vựng đã học'
            }
        }
        const examData = {
            labels: this.state.examLabels,
            datasets: [
                {
                    label: 'Số bài exam làm',
                    data: this.state.examData,
                    fill: false,
                    borderColor: '#3e95cd',
                },
                {
                    label: 'Điểm cao nhất',
                    data: this.state.examScoreData,
                    fill: false,
                    borderColor: '#8e5ea2',
                },
                {
                    label: 'Thời gian làm bài (phút)',
                    data: this.state.examTimeData,
                    fill: false,
                    borderColor: '#e8c3b9',
                }
            ],
        }

        const examOptions = {
            title: {
                display: true,
                text: 'Tiến trình làm exam của bạn'
            }
        }
        return (
            <div id="wrapper">
                <SubMenuClient></SubMenuClient>
                <div id="content-wrapper" className="d-flex flex-column">
                    <div id="content">
                        <HeaderClient></HeaderClient>
                        <main>
                            <div className="container">
                                <div className="row">
                                    <div id="trangchu" className="col-10 offset-1">
                                        <div className="row">
                                            <div className="col-6">
                                                <div
                                                    style={{
                                                        width: '400px',
                                                        height: '400px'
                                                    }}
                                                >
                                                    <Line data={examData} options={examOptions} width={400} height={400} />
                                                </div>
                                            </div>
                                            <div className="col-6">
                                                <div
                                                    style={{
                                                        width: '400px',
                                                        height: '400px'
                                                    }}
                                                >
                                                    <Pie data={data} options={wordOptions} width={400} height={400} />
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>

                            </div>
                        </main>
                        <Footer></Footer>
                    </div>
                </div>
            </div>
        )
    }
    componentWillUnmount() {
        this.isComponentMounted = false;
    }
}
const mapStateToProps = (state) => {
    const { account } = state.auth;
    return {
        account: account
    }
}
export default connect(mapStateToProps)(Progress) 
