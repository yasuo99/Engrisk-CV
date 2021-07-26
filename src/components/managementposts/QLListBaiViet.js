import React, { Component } from "react"
import QLBaiViet from "./QLBaiViet"

class QLListBaiViet extends Component {
    render() {
        return (
            <table className="table table-bordered" id="dataTable" width="100%" cellSpacing={0}>
                <thead>
                    <tr>
                        <th>Tiêu đề</th>
                        <th>Nội dung</th>
                        <th>Xếp hạng</th>
                        <th>Hình ảnh</th>
                        <th />
                    </tr>
                </thead>
                <tbody>
                    <QLBaiViet></QLBaiViet>
                </tbody>
            </table>
        )
    }
}
export default QLListBaiViet;