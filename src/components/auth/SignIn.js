import React, { Component } from "react";
import { connect } from "react-redux";
import { signIn } from "./../../actions/authActions"

class SignIn extends Component {
  state = {
    loginMethod: "",
    password: ""
  };
  handleChange = (e) => {
    // const fetchWordList = async () => {
    //   try {
    //     const params = {};
    //     const response = await wordApi.getAll(params);
    //     console.log('Fetch successful', response);

    //   } catch (error) {
    //     console.log('Fail', error);
    //   }
    // };
    // const fetchWord = async () => {
    //   try {
    //     const response = await wordApi.getDetail(1);
    //     console.log('Fetch successful', response);
    //   } catch (error) {
    //     console.log('Fail', error);
    //   }
    // }
    // fetchWordList();
    // fetchWord();
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.signIn(this.state);
  };
  render() {
    return (
      <form className="login100-form validate-form"
        autoComplete="off"
        onSubmit={this.handleSubmit}
      >
        <div className="wrap-input100 validate-input mb-4"> <span className="label-input100">Tài khoản</span>
          <input className="input100" name="loginMethod" placeholder="Nhập username hoặc email"
            type="text"
            id="loginMethod"
            onChange={this.handleChange}
          ></input>
        </div>
        <div className="wrap-input100 validate-input mb-4"> <span className="label-input100">Mật khẩu</span>
          <input className="input100" name="password" placeholder="Nhập mật khẩu"
            type="password"
            id="password"
            onChange={this.handleChange}
          ></input>
        </div>

        <div className="container-login100-form-btn mt-2">
          <button className="btn btn-primary"> Đăng Nhập </button>
        </div>
        <a href="/home" className="mt-2">Về trang chủ</a>
        <a href="/quenmatkhau" className="mt-2">Quên mật khẩu</a>
      </form>
    )
  }
}

const mapStateToProps = (state) => {
  console.log(state);
  const { isLoggedIn } = state.auth;
  return {
    isLoggedIn: isLoggedIn
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    signIn: (cred) => dispatch(signIn(cred))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
