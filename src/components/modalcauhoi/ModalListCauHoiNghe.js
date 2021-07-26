import React, { Component } from "react"
import ReactPlayer from "react-player";
import "datatables.net-dt/js/dataTables.dataTables.js"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import $ from 'jquery';
import Switch from "react-switch";
class ModalListCauHoiNghe extends Component {
    constructor(props){
        super(props);
    }
    componentDidMount(){
        $(function() {
            $("#dataTable1").DataTable();
            $("#dataTable").DataTable();
        });
    }
    addQuestion(id){
        this.props.addQuestion(this.props.exam.id, Number.parseInt(id));
    }
    render() {
        const renderQuestions = this.props.questions.map((question) =>
            <tr key={question.id}>
                <td className="cauhoi-quiz"><ReactPlayer height="30px" width="100px" controls url={question.audio}></ReactPlayer></td>
                <td>
                    {question.a}
                </td>
                <td>
                    {question.b} </td>
                <td>
                    {question.c}</td>
                <td>
                    {question.c}
                </td>
                <td>{question.answer}</td>
                <td>
                <Switch id={question.id.toString()} onChange={(props,event,id) => this.props.addQuestion(this.props.exam.id, id)} checked={this.props.exam.questions.some(el => el.id === question.id)}></Switch>
                </td>
            </tr>
        );
        return (
            <table className="table table-bordered list-cauhoidoc question-table" id="dataTable1" width="100%" cellSpacing={0}>
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
export default ModalListCauHoiNghe;