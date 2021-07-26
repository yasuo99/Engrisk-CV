import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../Footer/Footer';
import HeaderClient from '../../components/client/HeaderClient';
import SubMenuClient from '../../components/client/SubMenuClient';
import { connect } from 'react-redux';
import ReactTimeAgo from 'react-time-ago/commonjs/ReactTimeAgo';
import wordApi from '../../api/wordApi';

class TuVungPage extends Component {
    constructor(props) {
        super(props);
        this.isComponentMounted = false;
        this.state = {
            words: []
        }
    }
    async componentDidMount(){
        this.isComponentMounted = true;
        const words = await this.fetchLearntWord();
        if(this.isComponentMounted){
            this.setState({
                words: words
            })
        }
    }
    fetchLearntWord = async () => {
        return await wordApi.getLearntWord(this.props.account.id);
    }
    render() {
        const renderWordLearnts = this.state.words.map((word) =>
            <tr key={word.wordId}>
                <td><a href="#">{word.eng}</a></td>
                <td>{word.wordCategory}</td>
                <td><ReactTimeAgo date={word.lastPractice}></ReactTimeAgo></td>
            </tr>
        );
        return (
            <div id="wrapper">
                <SubMenuClient></SubMenuClient>
                <div id="content-wrapper" className="d-flex flex-column">
                    <div id="content">
                        <HeaderClient></HeaderClient>
                        <main id="tuvung">
                            <div className="container mt-5">
                                <h2 className="pb-3">Đã học từ vựng Tiếng Anh</h2>
                                <table className="table table-bordered table-hover">
                                    <thead>
                                        <tr>
                                            <th>Từ vựng</th>
                                            <th>Từ loại</th>
                                            <th>Lần cuối luyện tập</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {renderWordLearnts}
                                    </tbody>
                                </table>
                            </div>
                        </main>

                        <Footer></Footer>
                    </div>
                </div>

            </div>

        );
    }
    componentWillUnmount(){
        this.isComponentMounted = false;
    }
}
const mapStateToProps = (state) => {
    const { account } = state.auth;
    console.log(account);
    return {
        account: account
    }
}
export default connect(mapStateToProps)(TuVungPage);