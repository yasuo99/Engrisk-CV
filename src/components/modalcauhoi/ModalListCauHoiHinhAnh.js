import React, { Component } from "react"
import ModalCauHoiHinhAnh from "./ModalCauHoiHinhAnh";

class ModalListCauHoiHinhAnh extends Component {
    render() {
        return (
            <table className="table table-bordered list-cauhoidoc" id="dataTable" width="100%" cellSpacing={0}>
                <thead>
                    <tr >
                        <th className="cauHoi">Câu hỏi</th>
                        <th className="cautraA">A</th>
                        <th className="cautraB">B</th>
                        <th className="cautraC">C</th>
                        <th className="cautraD">D</th>
                        <th className="dapAn">Đáp án câu hỏi</th>
                        <th />
                    </tr>
                </thead>
                <tbody>
                    <ModalCauHoiHinhAnh />
                    <ModalCauHoiHinhAnh />
                    <ModalCauHoiHinhAnh />
                    <ModalCauHoiHinhAnh />
                    <ModalCauHoiHinhAnh />
                    <ModalCauHoiHinhAnh />
                </tbody>
            </table>
        )
    }
}
export default ModalListCauHoiHinhAnh;