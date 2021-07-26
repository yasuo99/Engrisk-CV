import React, { Component } from 'react'
import { connect } from 'react-redux';

class FormMatKhau extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPassword: '',
      newPassword: ''
    }
    this.changePassword = this.changePassword.bind(this);
  }
  handleChange = (e) => {
    e.preventDefault();
    this.setState({
      [e.target.id]: e.target.value
    });
  }
  changePassword = (e) => {
    e.preventDefault();
    this.props.changePassword(this.props.account.id,this.state.currentPassword, this.state.newPassword);
  }
  render() {
    return (
      <div className="col-8 mt-5">
        <form onSubmit={this.changePassword}>
          <div className="row">
            <div className="col-8"><h3>Mật khẩu</h3></div>
            <div className="col-4 text-right"><button className="btn btn-primary" type="submit">Lưu thay đổi</button></div>
          </div>
          <div className="nd">
            <div className="row">
              <div className="col-4 text-right"><span className="mr-5">Mật khẩu hiện tại</span></div>
              <div className="col-8"><input id="currentPassword" type="text" name="tendangnhap" onChange={this.handleChange} required /></div>
            </div>
            <div className="row mt-4">
              <div className="col-4 text-right"><span className="mr-5">Mật khẩu mới</span></div>
              <div className="col-8"><input id="newPassword" type="text" name="tendangnhap" onChange={this.handleChange} required /></div>
            </div>
          </div>
        </form>
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
export default connect(mapStateToProps)(FormMatKhau);