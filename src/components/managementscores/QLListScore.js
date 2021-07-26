import React, { Component } from "react"
import { appendScript } from "../../config/appendScript";
import "datatables.net-dt/js/dataTables.dataTables.js"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import $ from 'jquery'
import { Button, Modal } from 'react-bootstrap'
class QLListScore extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        this.handleChange = this.handleChange.bind(this);
    }
    async componentDidMount() {

        $(function () {
            $("#dataTable1").DataTable();
        });

    }
    fetchWord = async () => {

    }
    handleChange(e) {
        var target = e.target;
        var name = target.name;
        var value = target.value;
        this.setState({
            [name]: value
        });
    }
    render() {
        const renderListeningToeicRedeems = (() =>
            <tr>
                {/* XỬ LÝ LẤY DATA */}
                <td>
                    <Button variant="primary" className="btn btn-primary mr-2" onClick={e => this.openEdit(e)}><i className="fa fa-edit" /></Button>
                    <Button variant="primary" className="btn btn-danger" onClick={e => this.openDelete(e)}><i className="fa fa-trash" /></Button>
                </td>
            </tr>
        );
        const renderReadingToeicRedeems = (() =>
            <tr>
                {/* XỬ LÝ LẤY DATA */}
                <td>
                    <Button variant="primary" className="btn btn-primary mr-2" onClick={e => this.openEdit(e)}><i className="fa fa-edit" /></Button>
                    <Button variant="primary" className="btn btn-danger" onClick={e => this.openDelete(e)}><i className="fa fa-trash" /></Button>
                </td>
            </tr>
        );
        return (
            <div>
                <button className="btn btn-success mr-2 mb-3" ><i className="fa fa-plus" /> Import</button>
                <ul className="nav nav-tabs">
                    <li className="nav-item"> <a className="active nav-link" data-toggle="pill" data-target="#tabone"><i className="fa fa-book" /> Điểm quy đổi phần đọc</a> </li>
                    <li className="nav-item"> <a className="nav-link" data-toggle="pill" data-target="#tabtwo"><i className="fa fa-star" /> Điểm quy đổi phần nghe </a> </li>
                </ul>
                <div className="tab-content mt-3">
                    <div className="tab-pane fade show active" id="tabone" role="tabpanel">
                        <table className="table table-bordered" id="dataTable" width="100%" cellSpacing={0}>
                            <thead>
                                <tr>
                                    <th >Số câu đúng</th>
                                    <th >Điểm</th>
                                    <th className="chucnang" />
                                </tr>
                            </thead>
                            <tbody>
                                <renderReadingToeicRedeems></renderReadingToeicRedeems>
                            </tbody>
                        </table>

                    </div>

                    <div className="tab-pane fade" id="tabtwo" role="tabpanel">
                        <table className="table table-bordered" id="dataTable" width="100%" cellSpacing={0}>
                            <thead>
                                <tr>
                                    <th >Số câu đúng</th>
                                    <th >Điểm</th>
                                    <th className="chucnang" />
                                </tr>
                            </thead>
                            <tbody>
                                <renderReadingToeicRedeems></renderReadingToeicRedeems>
                            </tbody>
                        </table>

                    </div>
                </div>
            </div>
        )
    }
}
export default QLListScore;