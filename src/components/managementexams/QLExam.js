import React, { Component } from "react";
import { Link } from "react-browser-router"
import { Button, Modal } from 'react-bootstrap'
import ListCauHoi from "./ListCauHoi";
import ModalListCauHoiDoc from "../modalcauhoi/ModalListCauHoiDoc";
import ModalListCauHoiHinhAnh from "../modalcauhoi/ModalListCauHoiHinhAnh";
import ModalListCauHoiNghe from "../modalcauhoi/ModalListCauHoiNghe";
class QLExam extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalCreate: false,
            modalDelete: false,
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
            modalDelete: false,
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
                <td style={{width: "100px"}}>{this.props.exam.title}</td>
                <td style={{width: "500px"}}>{this.props.exam.detail}</td>
                <td style={{width: "120px"}}>{this.props.exam.duration}</td>
                <td>
                    <Button data-id={this.props.exam.id} variant="primary" className="btn btn-success mr-2" onClick={e => this.props.modalQuestionCreate(e)} ><i data-id={this.props.exam.id} className="fa fa-plus" /></Button>
                    <Button data-id={this.props.exam.id} variant="primary" className="btn btn-primary mr-2" onClick={e => this.props.modalUpdate(e)} ><i data-id={this.props.exam.id} className="fa fa-pencil" /></Button>
                    <Button data-id={this.props.exam.id} variant="primary" className="btn btn-danger mr-2" onClick={e => this.props.modalDelete(e)}><i data-id={this.props.exam.id} className="fa fa-trash" /></Button>
                    {/* Modal create */}
                </td>
            </tr>
        );
    }
}
export default QLExam;