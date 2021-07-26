import React, { Component } from "react"
import HistoryTopup from "./HistoryTopup"

class ListHistoryTopup extends Component {
    render() {
        return (
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>Tài khoản</th>
                        <th>Ngày nạp tiền</th>
                        <th>Sô tiền nạp</th>
                        <th>Hình thức thanh toán</th>
                    </tr>
                </thead>
                <tbody>
                    <HistoryTopup></HistoryTopup>
                    <HistoryTopup></HistoryTopup>
                    <HistoryTopup></HistoryTopup>
                    <HistoryTopup></HistoryTopup>
                </tbody>
            </table>
        )
    }
}
export default ListHistoryTopup;