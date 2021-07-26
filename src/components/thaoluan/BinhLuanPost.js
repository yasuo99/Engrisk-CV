import React, { Component } from "react"
import { connect } from "react-redux";

class BinhLuanPost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            comment: ""
        }
    }
    handleChange = event => {
        this.setState({
            comment: event.target.value
        })
        console.log(this.state);
    }
    render() {
        return (
            <div className="binhluan">
                <div className="row mt-5">
                    <div className="col-md-1 nd-img"><img className="img-fluid d-block mb-4 img-chitietthaoluan" src={this.props.account.photoUrl || "/image/default-user-image.png"} /></div>
                    <div className="col-md-11">
                        <form>
                            <textarea rows={2} cols={120} placeholder="Gửi một bình luận mới" value={this.state.comment} onChange={this.handleChange}/>
                            <button type="button" className="btn btn-primary mr-3 mt-2">ĐĂNG</button>
                            <button type="button" className="btn btn-primary mt-2">HỦY</button>
                        </form>
                    </div>
                </div>
            </div>

        )
    }
}
const mapStateToProps = (state) => {
    const { account } = state.auth;
    return {
        account: account
    }
}
export default connect(mapStateToProps)(BinhLuanPost);