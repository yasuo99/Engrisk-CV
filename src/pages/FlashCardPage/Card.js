import React, { Component } from 'react'
import $ from "jquery";

export default class Card extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    componentDidMount = () => {
        $(".flippable").on('click', function () {
            $(this).toggleClass("flipme")
        });
    }
    render() {
        return (
            <div className="flippable flashcard">
                <div className="front">
                    <h2 className="text-primary">abide by</h2>
                    <p>/ əˈbaɪd baɪ /</p>
                    <p>To cooperate with that company, he had to abide by the contract's conditions.</p>
                </div>
                <div className="back">
                    <div className="row">
                        <div className="col-8"><img src="image/card.jpeg" className="img-100" /></div>
                        <div className="col-4"> <p>tuân theo</p></div>
                    </div>
                </div>
            </div>
        )
    }
}

