import React, { Component } from 'react'

class Answer extends Component {
    componentDidMount(){
    }
    render() {
        return (
            <div>
                <div className="row mt-2">
                    <div className="col-6">
                        <button data-id={this.props.answers[0]?.id} data-answer={this.props.answers[0]?.content} className={this.props.answers[0] ? "dapan" : "dapan hidden"} style={{ backgroundColor: this.props.setColor(1) }} onClick={(e) => this.props.selectedAnswer(e, 1)}>
                            A. {this.props.question.toeicPart !== '1' && this.props.question.toeicPart !== '2' && this.props.answers[0]?.content}
                        </button>
                    </div>
                    <div className="col-6">
                        <button data-id={this.props.answers[1]?.id} data-answer={this.props.answers[1]?.content} className={this.props.answers[1] ? "dapan" : "dapan hidden"} style={{ backgroundColor: this.props.setColor(2) }} onClick={(e) => this.props.selectedAnswer(e, 2)}>
                        B. {this.props.question.toeicPart !== '1' && this.props.question.toeicPart !== '2' && this.props.answers[1]?.content}
                        </button>
                    </div>
                </div>
                <div className="row">
                    <div className="col-6">
                        <button data-id={this.props.answers[2]?.id} data-answer={this.props.answers[2]?.content} className={this.props.answers[2] ? "dapan" : "dapan hidden"} style={{ backgroundColor: this.props.setColor(3) }} onClick={(e) => this.props.selectedAnswer(e, 3)}>
                        C. {this.props.question.toeicPart !== '1' && this.props.question.toeicPart !== '2' && this.props.answers[2]?.content}
                        </button>
                    </div>
                    <div className="col-6">
                        <button data-id={this.props.answers[3]?.id} data-answer={this.props.answers[3]?.content} className={this.props.answers[3] ? "dapan" : "dapan hidden"} style={{ backgroundColor: this.props.setColor(4) }} onClick={(e) => this.props.selectedAnswer(e, 4)}>
                        D. {this.props.question.toeicPart !== '1' && this.props.question.toeicPart !== '2' && this.props.answers[3]?.content}
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}

export default Answer
