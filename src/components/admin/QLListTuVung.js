import React, { Component } from "react"
import QLTuVung from "./QLTuVung"

class QLListTuVung extends Component {
    render() {
        return (
            <table className="table table-bordered" id="dataTable" width="100%" cellSpacing={0}>
                <thead>
                    <tr>
                        <th>English</th>
                        <th>Việt Nam</th>
                        <th>Loại từ vựng</th>
                        <th>Ví dụ</th>
                        <th>Hình ảnh</th>
                        <th />
                    </tr>
                </thead>
                <tbody>
                    <QLTuVung></QLTuVung>
                </tbody>
            </table>
        )
    }
}
export default QLListTuVung;