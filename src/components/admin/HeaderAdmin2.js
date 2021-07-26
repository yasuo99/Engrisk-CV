import React, { Component } from "react"
import TaiKhoanAdmin from "./TaiKhoanAdmin";
import ThongBaoAdmin from "./ThongBaoAdmin";
import { connect } from "react-redux";

class HeaderAdmin2 extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand navbar-light bg-white topbar static-top shadow">
        <button id="sidebarToggleTop" className="btn btn-link d-md-none rounded-circle mr-3">
          <i className="fa fa-bars" />
        </button>
        {/* <FormSearchAdmin></FormSearchAdmin> */}
        <img src="/image/logo1.png" alt="logo" className="logo" style={{width: "100px"}}/>
        <ul className="navbar-nav ml-auto">
          <ThongBaoAdmin></ThongBaoAdmin>
          <div className="topbar-divider d-none d-sm-block" />
          <TaiKhoanAdmin account={this.props.account}></TaiKhoanAdmin>
        </ul>
      </nav>
    )
  }
}
const mapStateToProps = (state) => {
  const account = state.auth;
  return {
    account: account
  }
}
export default connect(mapStateToProps)(HeaderAdmin2);