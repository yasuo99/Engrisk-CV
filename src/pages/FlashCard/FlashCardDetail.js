import React, { Component } from "react";
import HeaderClient from "../../components/client/HeaderClient";
import SubMenuClient from "../../components/client/SubMenuClient";
import { ProgressBar } from 'react-bootstrap';
import { Button, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import wordCategoryApi from "../../api/2.0/wordCategoryApi";
import ReactPlayer from "react-player";
import wordApiV2 from "../../api/2.0/wordApi";
import { connect } from "react-redux";
import { wordPractice } from "../../actions/wordActions";
import { connection } from "../../signalR/createSignalRConnection";
import { HubConnectionState } from "@microsoft/signalr";
import {FaChevronLeft,FaChevronRight} from 'react-icons/fa'
class FlashCardDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            memory: false,
            modalCreate: false,
            imageMemory: null,
            check: false,
            wordCategory: {
                vocabulary: [
                    {
                        memories: []
                    }
                ]
            },
            currentWord: {
                memories: []
            },
            wordIndex: 0,
            audioPlay: false,
            imgSrc: {},
            selectedImg: {}
        }
        this.isComponentMounted = false;
    }
    async componentDidMount() {
        this.isComponentMounted = true;
        console.log(this.props.isLoggedIn);
        const { match: { match: { params } } } = this.props;
        console.log(params);
        let cardDetail = this.props.isLoggedIn ? await wordCategoryApi.getUserDetail(params.cardId) : await wordCategoryApi.getDetail(params.cardId);
        console.log(cardDetail);
        if (this.isComponentMounted) {
            this.setState({
                wordCategory: cardDetail,
                currentWord: cardDetail.vocabulary[0]
            })
            if (this.props.isLoggedIn) {
                if (connection.state == HubConnectionState.Disconnected) {
                    connection.start();
                }
            }
        }
    }
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    ToToggleForm = () => {
        this.setState({
            memory: true,
        })
    }
    ToToggleMemory = () => {
        this.setState({
            check: true,
        })
    }
    openCreate = () => {
        this.setState({
            modalCreate: true
        })
    }
    closeCreate = () => {
        this.setState({
            imageMemory: "",
            contentMemory: "",
            modalCreate: false,
        })
    }
    submitCreate = async () => {
        if (this.state.imageMemory != null) {
            let formData = new FormData();
            console.log(this.state.imageMemory);
            formData.append('WordId', this.state.currentWord.id);
            formData.append('Image', this.state.imageMemory);
            if (this.state.title) {
                formData.append('Title', this.state.title)
            }
            const result = await wordApiV2.createMem(this.state.currentWord.id, formData);

            this.setState({
                selectedImg: {},
                imageMemory: null,
                currentWord: {
                    ...this.state.currentWord,
                    memories: [result, ...this.state.currentWord.memories]
                }
            })
            this.closeCreate();
        }
    }
    fileChange(e) {
        this.setState({
            [e.target.name]: e.target.files[0],
            selectedImg: URL.createObjectURL(e.target.files[0])
        });
        // Would see a path?
    }
    nextWord = (e) => {
        console.log("dm");
        var nextWordIndex = this.state.wordIndex + 1;
        if (nextWordIndex < this.state.wordCategory.vocabulary.length) {
            this.setState({
                wordIndex: nextWordIndex,
                currentWord: this.state.wordCategory.vocabulary[nextWordIndex],
                audioPlay: false
            })
        }
    }
    prevWord = (e) => {
        console.log("dm");
        var prevWordIndex = this.state.wordIndex - 1;
        if (prevWordIndex >= 0) {
            this.setState({
                wordIndex: prevWordIndex,
                currentWord: this.state.wordCategory.vocabulary[prevWordIndex],
                audioPlay: false
            })
        }
    }
    playAudio = (e) => {
        this.state.audioPlay ? this.setState({ audioPlay: false }) : this.setState({ audioPlay: true });
    }
    shuffleCard = (e) => {
        localStorage.setItem(this.state.wordCategory.id, "shuffle");
        var shuffled = this.state.wordCategory.vocabulary.sort(() => Math.random() - 0.5)
        console.log(shuffled);
        this.setState({
            wordCategory: { vocabulary: shuffled },
            currentWord: shuffled[this.state.wordIndex]
        })
    }
    selectMemmory = async (id) => {
        await wordApiV2.selectMemory(this.state.currentWord.id, id);
        var currentWord = this.state.currentWord;
        currentWord.memory = currentWord.memories.find(mem => mem.id == id);
        this.setState({
            currentWord: currentWord,
            memory: false
        })
    }
    vocabularyPractice() {
        const words = this.state.wordCategory.vocabulary.map((vocabulary) => vocabulary.id);
        this.props.wordPractice(words);
    }
    render() {
        var { memory, check } = this.state;
        const renderMemories = this.state.currentWord.memories.map((memory, index) =>
            <div className="carousel-item" key={index} onChange={this.handleChange} id="check">
                <div className="row">
                    <div className="col">
                        <div className="cardMemory" data-id={memory.id} onClick={() => this.selectMemmory(memory.id)}>
                            <img src={memory.memImg} alt="imageMemory" className="imageMemory"></img>
                            {memory.title && <p className="contentMemory">{memory.title}</p>}
                        </div>
                    </div>
                </div>
            </div>
        )
        return (

            <div id="wrapper">
                <SubMenuClient></SubMenuClient>
                <div id="content-wrapper" className="d-flex flex-column">
                    <div id="content">
                        <HeaderClient></HeaderClient>
                        <main id="flashcard-detail" className='mt-4'>
                            <div className="container">
                                <div className="row">
                                    <div className="col-md-3 kedoc">
                                        <Link to="/card" className="textReturn"><i className="fa fa-chevron-left"></i> Trở về</Link>
                                        <h4 className="title">Thẻ ghi nhớ</h4>
                                        <ProgressBar className="mt-5 mb-2" variant="success" now={(this.state.wordIndex + 1) / this.state.wordCategory.vocabulary.length * 100} />
                                        <div className="row">
                                            <div className="col-6 textProgress">TIẾN ĐỘ</div>
                                            <div className="col-6 textPoint">{this.state.wordIndex + 1}/{this.state.wordCategory.vocabulary.length}</div>
                                        </div>
                                        <Link to={`/vocabulary/review/flashcard`} className="btn btn-training" onClick={() => this.vocabularyPractice()}><img src="/image/training.png"></img> Luyện tập</Link>
                                        <button className="btn btn-test"><img src="/image/test1.png"></img> Test toeic</button>
                                        <button className="btn btn-mix" onClick={this.shuffleCard}><img src="/image/rgb.png"></img> Trộn thẻ</button>
                                        <button className="btn btn-add"><img src="/image/plus2.png"></img> Thêm từ vựng</button>
                                    </div>
                                    {this.state.wordCategory.vocabulary.length > 0 && <div className="col-md-9">
                                        <div className="row">
                                            <div className="col-10">
                                                <div className="boxContent">
                                                    {this.state.currentWord.wordImg && <img src={this.state.currentWord.wordImg} className='img-fluid'></img>}
                                                    <img onClick={this.playAudio} src="/image/sound.png" className="sound"></img>
                                                    {this.state.currentWord.wordVoice !== null && <ReactPlayer config={{
                                                        file: {
                                                            attributes: {
                                                                preload: 'none'
                                                            }
                                                        }
                                                    }} playing={this.state.audioPlay} height={0} width={0} onEnded={() => this.setState({ audioPlay: false })} url={this.state.currentWord.wordVoice}></ReactPlayer>}
                                                    <h1 className="word">{this.state.currentWord.eng}  <small className='text-dark'>{this.state.currentWord.spelling}</small></h1>
                                                    <p className="synonym">({this.state.currentWord.vie})</p>
                                                    <p className="typeWord">n</p>
                                                    {this.state.currentWord.memory != null && <div className="row">
                                                        <div className="row">
                                                            <div className="col">
                                                                <div className="cardMemoryDisplay">
                                                                    <img src={this.state.currentWord.memory.memImg} alt="imageMemory" className="imageMemory"></img>
                                                                    <p className="contentMemory">{this.state.currentWord.memory.title || this.state.currentWord.vie}</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>}
                                                    {memory === true ? (
                                                        <div>
                                                            <div className="container mt-4">
                                                                <div id="owl-carousel" className="carousel slide" data-ride="carousel" data-interval="false">
                                                                    <div className="carousel-inner">
                                                                        <div className="carousel-item active">
                                                                            <div className="row">
                                                                                <div className="col">
                                                                                    <div className="boxMemory">
                                                                                        <i className="fa fa-plus" onClick={e => this.openCreate(e)}></i>
                                                                                        <p className="content">Thêm mem mới</p>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        {renderMemories}
                                                                        <a className="carousel-control-prev" href="#owl-carousel" data-slide="prev"> <span className="fa fa-chevron-left" aria-hidden="true"></span></a> <a className="carousel-control-next" href="#owl-carousel" data-slide="next"> <span className="fa fa-chevron-right" aria-hidden="true"></span></a>
                                                                    </div>
                                                                    <Modal show={this.state.modalCreate} onHide={this.closeCreate}>
                                                                        <Modal.Header closeButton onClick={() => this.closeCreate()}>
                                                                            <Modal.Title>
                                                                                <p className="title">Tạo mem cho:</p>
                                                                                <h5 className="mt-2">{this.state.currentWord.eng} : {this.state.currentWord.vie}</h5>
                                                                            </Modal.Title>
                                                                        </Modal.Header>
                                                                        <Modal.Body>
                                                                            <div className="form-group">

                                                                                <div className="card-input">
                                                                                    <div className="row">
                                                                                        <div className="col-6">
                                                                                            <label htmlFor="">Ảnh mem</label>
                                                                                            <input type="file" name="imageMemory" accept="image/png, image/jpeg" onChange={e => this.fileChange(e)} />
                                                                                        </div>
                                                                                        <div className="col-6">
                                                                                            <img src={this.state.selectedImg} alt="" className="img-thumbnail" />
                                                                                        </div>
                                                                                    </div>

                                                                                </div>
                                                                                <div className="card-input mt-2">
                                                                                    <label htmlFor="">Gợi ý</label>
                                                                                    <textarea
                                                                                        placeholder="Gợi ý giúp dễ nhớ hơn..."
                                                                                        type="text"
                                                                                        name="title"
                                                                                        onChange={e => this.handleChange(e)}></textarea>
                                                                                </div>
                                                                            </div>

                                                                        </Modal.Body>
                                                                        <Modal.Footer>
                                                                            <Button variant="secondary" onClick={() => this.closeCreate()}>Hủy</Button>
                                                                            <Button variant="primary" onClick={(e) => this.submitCreate(e)}>Lưu lại</Button>
                                                                        </Modal.Footer>
                                                                    </Modal>

                                                                </div>

                                                            </div>

                                                        </div>
                                                    ) :
                                                        (
                                                            <button className="btn btn-memory"
                                                                id="memory"
                                                                onChange={this.handleChange}
                                                                onClick={this.ToToggleForm}>Giúp tôi ghi nhớ từ này</button>
                                                        )}
                                                </div>
                                            </div>
                                            <div className="col-2">
                                                {this.state.wordIndex > 0 && <button className="btn btn-next mr-1" onClick={this.prevWord}>
                                                   <FaChevronLeft></FaChevronLeft>
                                                    <h5>Lui</h5>
                                                </button>}
                                                {this.state.wordIndex < this.state.wordCategory.vocabulary.length - 1 && <button className="btn btn-next" onClick={this.nextWord}>
                                                   <FaChevronRight></FaChevronRight>
                                                    <h5>Tới</h5>
                                                </button>}
                                            </div>
                                        </div>

                                    </div>}
                                    {this.state.wordCategory.vocabulary.length == 0 && <div>Chưa có từ vựng</div>}
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
    const { isLoggedIn } = state.auth;
    return {
        isLoggedIn: isLoggedIn
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        wordPractice: (words) => dispatch(wordPractice(words))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(FlashCardDetail);