import React, { Component } from "react";
import { Link } from "react-browser-router"

class QLBaiViet extends Component {
    render() {
        return (
            <tr>
                <td>Học tập</td>
                <td className="nd-baiviet">ổng thống Mandela đã từng khẳng định: “Ai làm chủ tri thức, người đó sẽ làm chủ thế giới”. Lời của vị tổng thống đề cao vai trò và tầm quan trọng bậc nhất của tri thức đối với sự thành công trong cuộc sống con người. Muốn chiếm lĩnh và làm chủ tri thức ấy, không có cách nào khác ngoài việc chăm chỉ học tập. Ngày nay, vấn đề học tập của học sinh đang được quan tâm hơn bao giờ hết bởi chúng ta nhận thức rõ sức mạnh của giáo dục đối với vấn đề an ninh và tương lai của đất nước.</td>
                <td>
                    <span class="fa fa-star checked"></span>
                    <span class="fa fa-star checked"></span>
                    <span class="fa fa-star checked"></span>
                    <span class="fa fa-star"></span>
                    <span class="fa fa-star"></span>
                </td>
                <td><img src="../image/english.jpg" className="img-baiviet"></img></td>
                <td>
                    <Link to="/them-baiviet" className="btn btn-success mr-2"><i className="fa fa-plus" /></Link>
                    <a href="#" className="btn btn-primary mr-2" ><i className="fa fa-edit" /></a>
                    <a href="#" className="btn btn-danger"><i className="fa fa-trash" /></a>
                </td>
            </tr>
        );
    }
}
export default QLBaiViet;