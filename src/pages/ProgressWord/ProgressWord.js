import React, { Component } from 'react'
import HeaderClient from '../../components/client/HeaderClient';
import SubMenuClient from '../../components/client/SubMenuClient';
import ReactAudioPlayer from 'react-audio-player';
import { connect } from 'react-redux';
import accountApiV2 from '../../api/2.0/accountApi';
import { Link } from 'react-router-dom';
import { wordPractice } from '../../actions/wordActions';
class ProgressWord extends Component {
    constructor(props) {
        super(props);
        this.state = {
            vocabularyLearntResult: {
                weakLearnedWords: [],
                mediumLearnedWords: [],
                strongLearnedWords: []
            },
            currentWordsList: []
        }
        this.isComponentMounted = false;
    }
    async componentDidMount() {
        this.isComponentMounted = true;
        var learntResult = await accountApiV2.getVocabularyLearntResult(this.props.account.id);
        if (this.isComponentMounted) {
            this.setState({
                vocabularyLearntResult: learntResult,
                currentWordsList: [...learntResult.weakLearnedWords, ...learntResult.mediumLearnedWords, ...learntResult.strongLearnedWords]
            })
        }
    }
    filterWordsLearnt = (e) => {
        e.preventDefault();
        console.log(e.target.value);
        switch (e.target.value) {
            case "all":
                this.setState({
                    currentWordsList: [...this.state.vocabularyLearntResult.weakLearnedWords, ...this.state.vocabularyLearntResult.mediumLearnedWords, ...this.state.vocabularyLearntResult.strongLearnedWords]
                })
                break;
            case "weak":
                this.setState({
                    currentWordsList: [...this.state.vocabularyLearntResult.weakLearnedWords]
                })
                break;
            case "medium":
                this.setState({
                    currentWordsList: [...this.state.vocabularyLearntResult.mediumLearnedWords]
                })
                break;
            case "strong":
                this.setState({
                    currentWordsList: [...this.state.vocabularyLearntResult.strongLearnedWords]
                })
                break;
            default:
                break;
        }
    }
    vocabularyReview(){
        if(this.state.currentWordsList.length > 0){
            this.props.wordPractice(this.state.currentWordsList.map((word) => word.id))
        }
    }
    render() {
        const { vocabularyLearntResult, currentWordsList } = this.state;
        const renderWords = currentWordsList.map((word, index) =>
            <tr key={index}>
                <td>
                    <div className="row">
                        <div className="box">
                            <img src="/image/english (1).jpg" className="img-contentWord"></img>
                            {/* <ReactAudioPlayer
                                                            src="my_audio_file.ogg"
                                                            autoPlay
                                                            controls
                                                            style={{width:'80px', height:'40px'}}
                                                        /> */}
                            <img src="/image/play.png" className="audio"></img>
                            <p className="content">{word.eng}</p>
                        </div>
                    </div>

                </td>
                <td><p style={{ paddingTop: 10, fontSize: 16 }}>{word.vie}</p></td>
                <td>
                    <div className="box">
                        {word.learnStatus == "weak" && <span class="icon "><svg width="16" height="16" viewBox="0 0 16 16">
                            <g fill="none" fill-rule="nonzero">
                                <path fill="#DDE0E3" d="M7.5 5h1A1.5 1.5 0 0 1 10 6.5v7A1.5 1.5 0 0 1 8.5 15h-1A1.5 1.5 0 0 1 6 13.5v-7A1.5 1.5 0 0 1 7.5 5zm5-4h1A1.5 1.5 0 0 1 15 2.5v11a1.5 1.5 0 0 1-1.5 1.5h-1a1.5 1.5 0 0 1-1.5-1.5v-11A1.5 1.5 0 0 1 12.5 1z"></path>
                                <path fill="#E2222E" d="M2.5 9h1A1.5 1.5 0 0 1 5 10.5v3A1.5 1.5 0 0 1 3.5 15h-1A1.5 1.5 0 0 1 1 13.5v-3A1.5 1.5 0 0 1 2.5 9z"></path>
                            </g>
                        </svg>
                        </span>}

                        {word.learnStatus == "medium" && <span class="icon "><svg width="16" height="16" viewBox="0 0 16 16">
                            <g fill="none" fill-rule="nonzero">
                                <path fill="#DDE0E3" d="M7.5 5h1A1.5 1.5 0 0 1 10 6.5v7A1.5 1.5 0 0 1 8.5 15h-1A1.5 1.5 0 0 1 6 13.5v-7A1.5 1.5 0 0 1 7.5 5zm5-4h1A1.5 1.5 0 0 1 15 2.5v11a1.5 1.5 0 0 1-1.5 1.5h-1a1.5 1.5 0 0 1-1.5-1.5v-11A1.5 1.5 0 0 1 12.5 1z"></path>
                                <path fill="#f0ad4e" d="M7.5 5h1A1.5 1.5 0 0 1 10 6.5v7A1.5 1.5 0 0 1 8.5 15h-1A1.5 1.5 0 0 1 6 13.5v-7A1.5 1.5 0 0 1 7.5 5z"></path>
                                <path fill="#f0ad4e" d="M2.5 9h1A1.5 1.5 0 0 1 5 10.5v3A1.5 1.5 0 0 1 3.5 15h-1A1.5 1.5 0 0 1 1 13.5v-3A1.5 1.5 0 0 1 2.5 9z"></path>
                            </g>
                        </svg></span>
                        }
                        {word.learnStatus == "strong" &&
                            <span class="icon ">
                                <svg width="16" height="16" viewBox="0 0 16 16">
                                    <g fill="none" fill-rule="nonzero">
                                        <path fill="#DDE0E3" d="M7.5 5h1A1.5 1.5 0 0 1 10 6.5v7A1.5 1.5 0 0 1 8.5 15h-1A1.5 1.5 0 0 1 6 13.5v-7A1.5 1.5 0 0 1 7.5 5zm5-4h1A1.5 1.5 0 0 1 15 2.5v11a1.5 1.5 0 0 1-1.5 1.5h-1a1.5 1.5 0 0 1-1.5-1.5v-11A1.5 1.5 0 0 1 12.5 1z"></path>
                                        <path fill="#5cb85c" d="M7.5 5h1A1.5 1.5 0 0 1 10 6.5v7A1.5 1.5 0 0 1 8.5 15h-1A1.5 1.5 0 0 1 6 13.5v-7A1.5 1.5 0 0 1 7.5 5zm5-4h1A1.5 1.5 0 0 1 15 2.5v11a1.5 1.5 0 0 1-1.5 1.5h-1a1.5 1.5 0 0 1-1.5-1.5v-11A1.5 1.5 0 0 1 12.5 1z"></path>
                                        <path fill="#5cb85c" d="M2.5 9h1A1.5 1.5 0 0 1 5 10.5v3A1.5 1.5 0 0 1 3.5 15h-1A1.5 1.5 0 0 1 1 13.5v-3A1.5 1.5 0 0 1 2.5 9z"></path>
                                    </g>
                                </svg></span>}
                        <p className="text-progress">{word.learnStatus == "weak" ? "Chưa vững" : (word.learnStatus == "medium" ? "Khá vững" : "Vững")}</p>
                    </div>
                </td>
                <td>
                    <div className="boxMore">
                        <span className="fa fa-star mr-3"></span>
                        <span>
                            <svg width="30" height="6" viewBox="0 0 116 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 24.666C18.6274 24.666 24 19.2934 24 12.666C24 6.0386 18.6274 0.666016 12 0.666016C5.37258 0.666016 0 6.0386 0 12.666C0 19.2934 5.37258 24.666 12 24.666Z" />
                                <path d="M58 25C64.6274 25 70 19.6274 70 13C70 6.37258 64.6274 1 58 1C51.3726 1 46 6.37258 46 13C46 19.6274 51.3726 25 58 25Z" />
                                <path d="M104 25C110.627 25 116 19.6274 116 13C116 6.37258 110.627 1 104 1C97.3726 1 92 6.37258 92 13C92 19.6274 97.3726 25 104 25Z" />
                            </svg>
                        </span>
                    </div>
                </td>
            </tr>
        )
        return (
            <div id="wrapper">
                <SubMenuClient></SubMenuClient>
                <div id="content-wrapper" className="d-flex flex-column">
                    <div id="content">
                        <HeaderClient></HeaderClient>
                        <main id="progressWord">
                            <div className="container">
                                <div className="boxProgressWord">
                                    <div className="head">
                                        Theo dõi và cải thiện từ vựng của bạn
                                </div>

                                    <div className="contentProgress">
                                        <h2 className="title">TỪ VỰNG CỦA BẠN</h2>
                                        <div className="row">
                                            <div className="col-md-4">
                                                <div className="row">
                                                    <div className="col-md-4">
                                                        <div className="graphOne" style={{ height: "100%" }}> </div>
                                                    </div>
                                                    <div className="col-md-8">
                                                        <div className="content">
                                                            <span>{vocabularyLearntResult.weakLearnedWordsCount}</span>
                                                            <p>Các từ còn yếu</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="row">
                                                    <div className="col-md-4">
                                                        <div className="graphTwo" style={{ height: "100%" }}>
                                                            <div className="contentGraphTwo" style={{ width: "100%" }}></div></div>
                                                    </div>
                                                    <div className="col-md-8">
                                                        <div className="content">
                                                            <span>{vocabularyLearntResult.mediumLearnedWordsCount}</span>
                                                            <p>Các từ khá vững</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="row">
                                                    <div className="col-md-4">
                                                        <div className="graphThree" style={{ height: "100%" }}>
                                                            <div className="contentGraphThree" style={{ width: "100%" }}></div> </div>
                                                    </div>
                                                    <div className="col-md-8">
                                                        <div className="content">
                                                            <span>{vocabularyLearntResult.strongLearnedWordsCount}</span>
                                                            <p>Các từ nắm vững</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="contentWord">
                                        <div className="row">
                                            <div className="col-md-6">
                                                <span>Lọc theo:</span>
                                                <select
                                                    type="select"
                                                    name="filter"
                                                    id="filter"
                                                    onChange={(e) => this.filterWordsLearnt(e)}
                                                >
                                                    <option value="all">Tất cả từ vựng ({vocabularyLearntResult.weakLearnedWords.length + vocabularyLearntResult.mediumLearnedWords.length + vocabularyLearntResult.strongLearnedWords.length})</option>
                                                    <option value="weak">Các từ vựng còn yếu ({vocabularyLearntResult.weakLearnedWords.length})</option>
                                                    <option value="medium">Các từ vựng khá vững ({vocabularyLearntResult.mediumLearnedWords.length})</option>
                                                    <option value="strong">Các từ vựng nắm vững ({vocabularyLearntResult.strongLearnedWords.length})</option>

                                                </select>
                                            </div>
                                            <div className="col-md-6 text-right">
                                                <Link className={currentWordsList.length > 0 ? "btn btn-primary rounded-pill" : "btn btn-primary rounded-pill disabled"} to={`/vocabulary/review/flashcard`}>Ôn tập ngay</Link>
                                            </div>
                                        </div>
                                        <table className="table table-hover mt-5">
                                            <thead>
                                                <tr>
                                                    <th>Tiếng anh</th>
                                                    <th>Tiếng việt</th>
                                                    <th>Mức độ nắm vững từ</th>
                                                    <th></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {this.isComponentMounted && renderWords}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </main>
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
const mapDispatchToProps = (dispatch) => {
    return{
        wordPractice: (words) => dispatch(wordPractice(words))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(ProgressWord);