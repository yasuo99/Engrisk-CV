import React, { Component } from "react";
import { Link } from "react-browser-router"
// import Modal from "../modal/Modal";
class QLScore extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            modalInputSorce:"",
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
    handleSubmit(e) {
        this.setState({ 

        });
        this.modalClose();
    }
    modalOpen() {
        this.setState({ modal: true });
    }

    modalClose() {
        this.setState({
            modal: false
        });
    }
    render() {
        return (
            <tr>
                <td>1</td>
                <td>5</td>
                
                <td>
                    <a href="#" className="btn btn-primary mr-2" onClick={e => this.modalOpen(e)} ><i className="fa fa-edit" /></a>
                    <a href="#" className="btn btn-danger"><i className="fa fa-trash" /></a>
                    {/* <Modal show={this.state.modal} handleClose={e => this.modalClose(e)}>
                        <h2 className="text-center text-primary">Điểm quy đổi</h2>
                        <hr className="sidebar-divider my-0" />
                        <div className="form-group form-group-account">
                            <div className="card-input mt-4">
                                <span>Số câu đúng:</span>&nbsp;
                                <span>1</span>
                            </div>
                            <div className="card-input mt-4 input-score">
                                <span>Điểm</span>&nbsp;
                                <input
                                    type="number"
                                    value={this.state.modalInputSorce}
                                    name="modalInputSorce"
                                    onChange={e => this.handleChange(e)}
                                />
                            </div>
                          
                        </div>
                        <div className="card-button">
                            <button onClick={e => this.handleSubmit(e)} type="button" className="btn btn-primary float-left">
                                Lưu lại
                                </button>
                        </div>
                    </Modal> */}
                </td>
            </tr>
        );
    }
}
export default QLScore;