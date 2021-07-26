import React, { Component } from "react";
import { connect } from "react-redux";
import examApi from "../../api/examApi";
import HeaderClient from '../../components/client/HeaderClient';
import SubMenuClient from '../../components/client/SubMenuClient';
import ListHistoryExam from "../../components/histories/ListHistoryExam";
import Footer from '../Footer/Footer';
class HistroriesExam extends Component {
    constructor(props) {
        super(props);
        this.state = {
            histories: []
        }
        this.isComponentMounted = false;
    }
    async componentDidMount(){
        this.isComponentMounted = true;
        var histories = await this.fetchHistory(this.props.account.id);
        if(this.isComponentMounted){
            this.setState({
                histories: histories
            })
        }
    }
    fetchHistory = async (id) => {
        return await examApi.getHistories(id);
    }
    render() {
        return (
            <div id="wrapper">
                <SubMenuClient></SubMenuClient>
                <div id="content-wrapper" className="d-flex flex-column">
                    <div id="content">
                        <HeaderClient></HeaderClient>
                        <section id="lichsuexam">
                            <div className="container">
                                <h2>Lịch sử exam</h2>
                                <p>Đây là những lần làm bài exam trên website</p>
                                <ListHistoryExam histories={this.state.histories}></ListHistoryExam>
                            </div>
                        </section>
                        <Footer></Footer>
                    </div>
                </div>

            </div>
        )
    }
    componentWillUnmount(){
        this.isComponentMounted = false;
    }
}
const mapStateToProps = (state) => {
    const { account } = state.auth;
    return {
        account: account
    }
}
export default connect(mapStateToProps)(HistroriesExam);