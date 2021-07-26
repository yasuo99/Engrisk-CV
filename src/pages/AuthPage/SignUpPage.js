import jwtDecode from "jwt-decode";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import SignUp from "./../../components/auth/SignUp"

class SignUpPage extends Component {
  constructor(props) {
    super(props);
    console.log(this.props);
    this.state = {
      url: this.props.location.location.state !== undefined ? this.props.location.location.state.url : "/home"
    }
  }
  render() {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwtDecode(token);
      console.log(decodedToken);
      if (Array.isArray(decodedToken.role)) {
        if (decodedToken.role.includes("superadmin") || decodedToken.role.includes("manager")) {
          return <Redirect to="/admin" />
        }
      }
      console.log(decodedToken);
    }
    const { isLoggedIn } = this.props;
    if (isLoggedIn) return <Redirect to={this.state.url} />
    return (
      <div className="container-login100">
        <div className="wrap-login100">
          <div className="login100-form-title">
            <h3 className="text-primary">Đăng Ký</h3>
          </div>
          <SignUp />

        </div>
      </div>

    );
  }
}

const mapStateToProps = (state) => {
  const { isLoggedIn } = state.auth;
  return {
    isLoggedIn: isLoggedIn
  };
};
const mapDispatchToProps = (dispatch) => {
  return {

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUpPage);