import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import SignIn from "./../../components/auth/SignIn"
import Facebook from '../../components/facebook/Facebook'
import Google from '../../components/google/Google'
import jwtDecode from "jwt-decode";
class SignInPage extends Component {
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
      else {
        if (decodedToken.role === "superadmin" || decodedToken.role === "manager") {
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
            <h3 className="text-primary">Đăng nhập</h3>
          </div>
          <SignIn />
          <Facebook />
          <Google />
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

export default connect(mapStateToProps, mapDispatchToProps)(SignInPage);
