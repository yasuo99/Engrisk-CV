import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import wordApi from "../../api/wordApi";
import Suggestions from "../../pages/XemThemPage/Suggestion";

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            en: '',
            result: [],
            params: {
                currentPage: 1,
                pageSize: 4
            }
        }
        this.isComponentMounted = false;
    }
    componentDidMount = async () => {
        this.isComponentMounted = true;
    }
    handleChange = async (e) => {
        this.setState({
            en: e.target.value
        });
        if (e.target.value !== '') {
            let result = await this.fetchResult(e.target.value, this.state.params)
            console.log(e.target.value);
            if (this.isComponentMounted) {
                this.setState({
                    result: result
                });
            }
        }
        else {
            this.setState({
                result: []
            })
        }

    }
    selectedSuggest = (suggest) => {
        this.setState({
            en: suggest
        })
        this.search = suggest;
    }
    hideSuggestion = () => {
        this.setState({
            result: []
        })
    }
    handleSubmit = async (e) => {
        e.preventDefault();
        if (this.state.en !== '') {
            window.location.href = "/ketquatracuu?search=" + this.state.en;
        }
    }
    fetchResult = async (keyword, params) => {
        var result = await wordApi.searchWord(keyword, params);
        return result;
    }
    onClickOutsideListener = () => {
        this.setState({
            result: []
        })
    }
    render() {
        return (

            <form onSubmit={this.handleSubmit}>
                <div className="inner-form">
                    <div className="input-field first-wrap">
                        <img src="image/english-language.png" alt="languar" />
                    </div>
                    <div className="input-field second-wrap">
                        <input id="search" type="text" placeholder="Nhập bằng Tiếng Anh hoặc Tiếng Việt" onChange={this.handleChange} value={this.state.en} />
                    </div>
                    <div className="input-field third-wrap">
                        <button onClick={this.handleSubmit} className="btn btn-primary" to={"/ketquatracuu?search=" + this.state.en}>
                            DỊCH NGHĨA
                                            </button>
                    </div>
                </div>
                <div style={{ position: "relative", backgroundColor: "#fff" }} onMouseLeave={() => {
                    document.addEventListener("click", this.onClickOutsideListener)
                }}><Suggestions result={this.state.result} selectedSuggest={this.selectedSuggest} /></div>

            </form>
        )
    }
    componentWillUnmount() {
        this.isComponentMounted = false;
    }
}
export default Search;