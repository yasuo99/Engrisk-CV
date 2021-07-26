import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import wordApi from '../../api/wordApi';
import HeaderClient from '../../components/client/HeaderClient';
import SubMenuClient from '../../components/client/SubMenuClient';
import Footer from '../Footer/Footer';

class RankingWord extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ranking: []
        };
        this.isComponentMounted = false;
    }
    async componentDidMount() {
        this.isComponentMounted = true;
        const ranking = await this.fetchRanking();
        console.log(ranking);
        if (this.isComponentMounted) {
            this.setState({
                ranking: ranking
            });
        }
    }
    fetchRanking = async () => {
        return await wordApi.ranking();
    }
    render() {
        const renderRanking = this.state.ranking.map((rank) =>
            <div className="col-md-4">
                <a href={"/blog?id=" + rank.accountId}>
                    <div className="card user-card">
                        <div className="card-block">
                            <div className="user-image">
                                <img src={rank.accountPhotourl || "/image/businessman.png"} className="img-radius" alt="User-Profile-Image" />
                            </div>
                            <h6 className="title">{rank.accountUsername}</h6>
                            <p className="text-muted">{rank.accountFullname}</p>
                            <hr />
                            <p className="text-muted mt-5 font-weight-bold">Đã học được: {rank.learned} từ vựng</p>
                            <ul className="list-unstyled activity-leval">
                                <li className="active" />
                                <li className="active" />
                                <li className="active" />
                                <li />
                                <li />
                            </ul>
                            <div className="bg-green counter-block text-center p-2">
                                <img src="/image/rankingl.png" />
                            </div>
                            <hr />
                            <div className="row justify-content-center user-social-link">
                                <div className="col-auto"><a href="#!"><i className="fa fa-facebook text-facebook" /></a></div>
                                <div className="col-auto"><a href="#!"><i className="fa fa-twitter text-twitter" /></a></div>
                                <div className="col-auto"><a href="#!"><i className="fa fa-dribbble text-dribbble" /></a></div>
                            </div>
                        </div>
                    </div>
                </a>
            </div>
        );
        return (
            <div id="wrapper">
                <SubMenuClient></SubMenuClient>
                <div id="content-wrapper" className="d-flex flex-column">
                    <div id="content">
                        <HeaderClient></HeaderClient>
                        <section id="rankingWord">
                            <div className="container">
                                <div className="row  mt-5">
                                    {renderRanking}
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
export default RankingWord;