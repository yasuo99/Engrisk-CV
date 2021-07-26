import React, { Component } from "react"
import ModalCauHoiDoc from "./ModalCauHoiDoc";
import Switch from "react-switch";
class ModalListCauHoiDoc extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount(){
    }
    addQuestion(id){
        console.log(id);
        this.props.addQuestion(this.props.exam.id, Number.parseInt(id));
    }
    render() {
        const renderQuestions = this.props.questions.map((question) =>
            <tr key={question.id}>
                <td className="cauhoi-quiz">{question.content}</td>
                <td>
                    {question.a}
                </td>
                <td>
                    {question.b} </td>
                <td>
                    {question.c}</td>
                <td>
                    {question.d}
                </td>
                <td>{question.answer}</td>
                <td>
                    <Switch id={question.id.toString()} onChange={(props,event,id) => this.addQuestion(id)} checked={this.props.exam.questions.some(el => el.id === question.id)}></Switch>
                </td>
            </tr>
        );
        return (
            <table className="table table-bordered list-cauhoidoc question-table" id="dataTable" width="100%" cellSpacing={0}>
                <thead>
                    <tr >
                        <th className="cauHoi">Câu hỏi</th>
                        <th className="cautraA">A</th>
                        <th className="cautraB">B</th>
                        <th className="cautraC">C</th>
                        <th className="cautraD">D</th>
                        <th className="dapAn">Đáp án</th>
                        <th />
                    </tr>
                </thead>
                <tbody>
                    {renderQuestions}
                </tbody>
            </table>
        )
    }
}
export default ModalListCauHoiDoc;