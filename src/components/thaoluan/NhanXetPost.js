import React, { Component } from "react"

class NhanXetPost extends Component {
    render() {
        return (
            <div className="binhluan">
                <div className="row mt-5">
                    <div className="col-md-1 nd-img"><img className="img-fluid d-block mb-4 img-chitietthaoluan" src="image/imag-01.jpg" /></div>
                    <div className="col-md-11">
                        <textarea rows={2} cols={120} placeholder="Gửi một444 bình luận mới" defaultValue={""} />
                        <button type="button" className="btn btn-primary mr-3 mt-2">ĐĂNG</button>
                        <button type="button" className="btn btn-primary mt-2">HỦY</button>
                    </div>
                </div>
            </div>

        )
    }
}
export default NhanXetPost;