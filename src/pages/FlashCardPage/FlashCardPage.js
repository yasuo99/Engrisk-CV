import React, { Component } from 'react'
import { getAllWord, wordPractice } from '../../actions/wordActions';
import $ from "jquery";
import HeaderClient from '../../components/client/HeaderClient';
import SubMenuClient from '../../components/client/SubMenuClient';
import Footer from '../Footer/Footer';
import { Button, Dropdown, DropdownButton, Modal } from "react-bootstrap";
import axiosClient from '../../config/axiosClient';
import groupApi from '../../api/groupApi';
import { connect } from 'react-redux';
import ReactPlayer from 'react-player';
import { toast } from 'react-toastify';
import { Redirect } from 'react-router-dom';

class FlashCardPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            groups: [],
            currentGroup: { words: [] },
            words: [],
            index: 0,
            currentWord: { examples: [] },
            loading: false,
            modalDelete: false,
            practice: false
        }
        this.isComponentMounted = false;
    }
    async componentDidMount() {
        $(".flippable").on('click', function () {
            $(this).toggleClass("flipme")
        });
        this.setState({
            loading: true
        });
        this.isComponentMounted = true;
        const result = await this.fetchWord();
        if (this.isComponentMounted) {
            if (this.props.isLoggedIn) {
                const groups = await this.fetchGroups(this.props.id);
                console.log(groups);
                this.setState({
                    groups: groups
                })
            }
            this.setState({
                words: result,
                currentWord: result[this.state.index],
                loading: false
            })
            console.log(this.state);
        }

    }
    examples = () => {
        this.state.currentWord.examples.map((example) =>
            <p>{example.eng}</p>
        )
    };
    componentWillUnmount() {
        this.isComponentMounted = false;
    }
    fetchWord = async () => {
        return await getAllWord();
    }
    fetchGroups = async (id) => {
        return groupApi.getGroupsOfAccount(id);
    }
    selectGroup = async (e) => {
        console.log(e.target.id);
        if (e.target.id >= 1) {
            const currentGroup = this.state.groups[e.target.id - 1];
            this.setState({
                currentGroup: currentGroup,
                words: currentGroup.words
            });
        }
        else {
            const result = await this.fetchWord();
            this.setState({
                currentGroup: {words: []},
                words: result
            })
        }
        console.log(this.state);
    }
    selectWord = (e) => {
        e.preventDefault();
        const index = parseInt(e.target.id);
        const currentWord = this.state.words[index];
        if (currentWord) {
            this.setState({
                index: index,
                currentWord: currentWord
            });
        }
        console.log(index);
        console.log(currentWord);
    }
    previousWord = () => {
        const index = this.state.index - 1;
        console.log(index);
        if (index >= 0) {
            this.setState({
                index: index,
                currentWord: this.state.words[index]
            });
        }
    }
    nextWord = () => {
        let index = this.state.index + 1;
        console.log(index);
        if (index <= this.state.words.length) {
            this.setState({
                index: index,
                currentWord: this.state.words[index]
            });
        }
    }
    modalDelete = (e) => {
        this.state.modalDelete ? this.setState({ modalDelete: false }) : this.setState({ modalDelete: true });
    }
    submitDelete = async () => {
        if (this.state.currentGroup.id > 0) {
            const result = await groupApi.deleteGroup(this.state.currentGroup.id);
            if (result.status === 200) {
                toast('Xóa group thành công');
                this.setState({
                    modalDelete: false
                })
                if (this.isComponentMounted) {
                    if (this.props.isLoggedIn) {
                        const groups = await this.fetchGroups(this.props.id);
                        this.setState({
                            groups: groups
                        })
                    }
                    const words = await this.fetchWord();
                    this.setState({
                        currentGroup: { words: [] },
                        words: words
                    })
                }
            }
            else {
                toast('Xóa không thành công');
            }
        }
    }
    practice = (e) => {
        e.preventDefault();
        const body = [];
        this.state.words.map((word) => {
            body.push(word);
        })
        this.props.wordPractice(body);
        this.setState({
            practice: true
        })
    }
    removeWordFromGroup = async (e) => {
        e.preventDefault();
        const result = await groupApi.addWordToGroup(this.state.currentGroup.id, e.target.dataset.id);
        if(result.status === 200){
            toast('Xóa từ vựng khỏi nhóm thành công');
            const wordsInGroup = await groupApi.getDetail(this.state.currentGroup.id);
            console.log(wordsInGroup);
            if(this.isComponentMounted){
                this.setState({
                    words: wordsInGroup.words
                })
            }
        }
        else{
            toast('Xóa từ vựng khỏi nhóm thất bại');
        }
    }
    render() {
        let groups = [];
        let words = [];
        groups.push(<Dropdown.Item onClick={(e) => this.selectGroup(e)} key={0} id={0}>Tất cả từ vựng</Dropdown.Item>)
        for (let i = 1; i <= this.state.groups.length; i++) {
            groups.push(<Dropdown.Item onClick={(e) => this.selectGroup(e)} key={i} id={i}>{this.state.groups[i - 1] && this.state.groups[i - 1].groupName}</Dropdown.Item>)
        }
        for (let i = 0; i < this.state.words.length; i++) {
            words.push(<li key={i} id={i} data-id={this.state.words[i].id} className="text-center word-list" onClick={this.selectWord} onDoubleClick={(e) => this.removeWordFromGroup(e)}>{this.state.words[i].eng}</li>)
        }
        // const examples = this.state.currentWord.examples.map((example) =>
        //     <p key={example.id}>{example.eng}</p>
        // );
        const { currentWord, index } = this.state;
        if (this.state.practice) {
            return(<Redirect to="/practice"></Redirect>)
        }
        else {
            return (
                <div id="wrapper">
                    <SubMenuClient></SubMenuClient>
                    <div id="content-wrapper" className="d-flex flex-column">
                        <div id="content">
                            <HeaderClient></HeaderClient>
                            <main id="flashcard">
                                <div className="container pt-5">
                                    <div className="row">
                                        <div className="col-3">
                                            <DropdownButton id="dropdown-basic-button" title={this.state.currentGroup.groupName || "Danh sách từ vựng"}>
                                                {groups}
                                            </DropdownButton>
                                        </div>
                                        <div className="col-3 p-0">
                                            {this.state.currentGroup.words.length > 0 && <button onClick={(e) => this.modalDelete(e)} className="btn btn-danger">Xóa group</button>}

                                        </div>
                                        <div className="d-flex justify-content-end p-0 offset-md-3 col-3">
                                            <button onClick={(e) => this.practice(e)} className="btn btn-success">Luyện tập</button>
                                        </div>
                                    </div>
                                    <div className="row mt-4">
                                        <div className="col-3 bg-xam">
                                            <ol type="1">
                                                {words}
                                            </ol>
                                        </div>
                                        <div className="col-9 bg-flashcard">
                                            {index > 0 && <span className="fa fa-caret-up" onClick={this.previousWord}></span>}
                                            <div className="flip-container">
                                                <div className="flippable flashcard">
                                                    <div className="front">
                                                        <h2 className="text-primary">{currentWord.eng} <span>({currentWord.wordCategory})</span></h2>
                                                        <p>{currentWord.spelling}</p>
                                                        <ReactPlayer controls url={currentWord.wordVoice} width="150px" height="30px" style={{ margin: '0 0 5px 180px' }}></ReactPlayer>
                                                        {currentWord.examples.length > 0 && <p class="mt-2">{currentWord.examples[0].eng}</p>}
                                                    </div>
                                                    <div className="back">
                                                        <div className="row">
                                                            <div className="col-8"><img src={currentWord.wordImg || "image/card.jpeg"} className="img-flashcard card-img-top" /></div>
                                                            <div className="col-4"> <p>{currentWord.vie}</p></div>
                                                           
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            {index < this.state.words.length - 1 && <span className="fa fa-caret-down" onClick={this.nextWord} />}
                                        </div>
                                    </div>
                                </div>
                            </main>
                            <Modal show={this.state.modalDelete} onHide={this.modalDelete}>
                                <Modal.Header closeButton onClick={() => this.modalDelete()}>
                                    <Modal.Title>Xác nhận xóa group từ vựng</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>Bạn có chắc chắn muốn xóa nhóm từ vựng này không?</Modal.Body>
                                <Modal.Footer>
                                    <Button variant="secondary" onClick={() => this.modalDelete()}>Trở lại</Button>
                                    <Button variant="primary" onClick={(e) => this.submitDelete(e)}>Lưu lại</Button>
                                </Modal.Footer>
                            </Modal>
                            <Footer></Footer>
                        </div>
                    </div>

                </div>
            )
        }
    }
}
const mapStateToProps = (state) => {
    const { id } = state.auth.account;
    const { isLoggedIn } = state.auth;
    console.log(state);
    return {
        id: id,
        isLoggedIn: isLoggedIn
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        wordPractice: (body) => dispatch(wordPractice(body))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(FlashCardPage);