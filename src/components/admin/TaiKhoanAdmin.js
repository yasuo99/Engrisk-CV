import React, { Component } from "react"
import { connect } from "react-redux";
import { Link } from "react-router-dom"
import { logout } from '../../actions/authActions';
class TaiKhoanAdmin extends Component {
  render() {
    if (this.props.isLoggedIn) {
      return (
        <li className="nav-item dropdown no-arrow">
          <Link className="nav-link dropdown-toggle" to="#" id="userDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <span className="mr-2 d-none d-lg-inline text-gray-600 small">{this.props.account.username}</span>
            <img className="img-profile rounded-circle" src={this.props.account.photoUrl !== null ? this.props.account.photoUrl : "/image/default-user-image.png"} alt="avatar" />
          </Link>
          <div className="dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="userDropdown">
            <Link className="dropdown-item" to="/admin">
              <i className="fa fa-columns fa-sm fa-fw mr-2 text-gray-400" />
                  Dashboard
                </Link>
            <Link className="dropdown-item" to="/home">
              <i className="fa fa-home fa-sm fa-fw mr-2 text-gray-400" />
                  Trang chủ
                </Link>
            <div className="dropdown-divider" />
            <Link className="dropdown-item" to="#" onClick={this.props.logout}>
              <i className="fa fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400" />
                  Đăng Xuất
                </Link>
          </div>
        </li>

      )
    }
    else {
      return (
        <li className="nav-item dropdown no-arrow">
          <Link className="nav-link dropdown-toggle" to="#" id="userDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <span className="mr-2 d-none d-lg-inline text-gray-600 small"></span>
            <img className="img-profile rounded-circle" src="/image/default-user-image.png" />
          </Link>
          <div className="dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="userDropdown">
            <Link className="dropdown-item" to={{ pathname: "/signin", state: { url: window.location.pathname } }}>Đăng nhập</Link>
            <Link className="dropdown-item" to={{ pathname: "/signup", state: { url: window.location.pathname } }}>Đăng ký</Link>
          </div>
        </li>
      )
    }
  }
}
const mapStateToProps = (state) => {
  const { isLoggedIn, account } = state.auth;
  return {
    isLoggedIn: isLoggedIn,
    account: account
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logout()),
    timeout: () => dispatch({ type: "TIME_OUT" })
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(TaiKhoanAdmin);