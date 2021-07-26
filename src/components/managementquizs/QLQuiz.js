import React, { Component } from "react";
import { Link } from "react-browser-router"
import ListCauHoi from "./ListCauHoi";
import ModalListCauHoiDoc from "../modalcauhoi/ModalListCauHoiDoc";
import ModalListCauHoiHinhAnh from "../modalcauhoi/ModalListCauHoiHinhAnh";
import ModalListCauHoiNghe from "../modalcauhoi/ModalListCauHoiNghe";
import { Button, Modal } from 'react-bootstrap'
class QLQuiz extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalCreate: false,
            modalDelete:false,
        };
    }
    handleChange(e) {
        var target = e.target;
        var name = target.name;
        var value = target.value;
        this.setState({
            [name]: value
        });
    }
    // Phần xử lý modal Create
    submitCreate(e) {
        this.setState({

        });
        this.modalClose();
    }

    openCreate() {
        this.setState({ modalCreate: true, });
    }

    closeCreate() {
        this.setState({
            modalCreate: false,
        });
    }
    // Phần xử lý moda Delete
    closeDelete() {
        this.setState({
            modalDelete:false,
        });
    }
    openDelete() {
        this.setState({ modalDelete: true });
    }
    submitDelete(e) {
        this.setState({

        });
        this.modalClose();
    }
    render() {
        return (
            <tr>
                <td style={{width: "300px"}}>{this.props.quiz.quizName}</td>
                <td style={{width: "300px"}}>{this.props.quiz.sectionName}</td>
                <td style={{width: "100px"}}>{this.props.quiz.difficultLevel}</td>
                <td style={{width: "100px"}}>{this.props.quiz.totalQuestion}</td>
                <td>
                <Button data-id={this.props.quiz.id} variant="primary" className="btn btn-success mr-2" onClick={e => this.props.modalQuestionCreate(e)} ><i data-id={this.props.quiz.id} className="fa fa-plus" /></Button>
                <Button data-id={this.props.quiz.id} variant="primary" className="btn btn-primary mr-2" onClick={e => { this.props.modalEdit(e)}}><i data-id={this.props.quiz.id} className="fa fa-edit" /></Button>
                <Button data-id={this.props.quiz.id} variant="primary" className="btn btn-danger" onClick={e => this.props.modalDelete(e)}><i data-id={this.props.quiz.id} className="fa fa-trash" /></Button>
                 {/* Modal create */}
               
                </td>
            </tr>
        );
    }
}
export default QLQuiz;