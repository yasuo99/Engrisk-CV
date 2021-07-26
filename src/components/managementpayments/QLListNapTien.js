import React, { Component } from "react"
import QLNapTien from "./QLNapTien"

class QLListNapTien extends Component {
    render() {
        return (
            <table className="table table-bordered" id="dataTable" width="100%" cellSpacing={0}>
                <thead>
                    <tr>
                        <th className="taikhoan">Tài khoản</th>
                        <th >Số tiền</th>
                        <th className="thoigian">Thời gian nạp tiền</th>
                        <th className="hinhthuc">Hình thức thanh toán</th>
                        <th className="chucnang"/>
                    </tr>
                </thead>
                <tbody>
                    <QLNapTien></QLNapTien>
                </tbody>
            </table>
        )
    }
}
export default QLListNapTien;