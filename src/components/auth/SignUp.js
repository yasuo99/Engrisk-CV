import React, { Component, useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { signUp } from "./../../actions/authActions"
import { useForm } from "react-hook-form";
import { Redirect, Link } from "react-router-dom";
import accountApi from "../../api/accountApi";
import { toast } from "react-toastify";
const SignUp = ({ }) => {
  const dispatch = useDispatch();
  const init = {
    username: "",
    email: "",
    password: "",
    passwordConfirm: "",
    dateOfBirth: "",
    address: "",
    phoneNumber: "",
    fullname: '',
    file: null,
  }
  const [data, setData] = useState(init)
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [submitted, setSubmitted] = useState(false);
  const [samePass, setSamePass] = useState(true);
  const onFileChange = event => {
    setData({
      ...data,
      file: event.target.files[0]
    })

  };
  const handleChange = (event) => {
    setData({
      ...data,
      [event.target.id]: event.target.value,
    })
  };
  const handlePasswordChange = event => {
    setData({
      ...data,
      password: event.target.value,
    });
  };
  const handleConfirmPassword = event => {
    setData({
      ...data,
      passwordConfirm: event.target.value,
    });
  };
  useEffect(() => {
    if (data.password != data.passwordConfirm) {
      setSamePass(false);
    } else {
      setSamePass(true);
    }
  }, [data.password, data.passwordConfirm])
  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   var { id, email, password, passwordConfirm, username, dateOfBirth, address, phoneNumber, file, fullname } = this.state;
  //   var user = {
  //     id: id,
  //     email: email,
  //     password: password,
  //     username: username,
  //     fullname: fullname,
  //     dateOfBirth: dateOfBirth,
  //     address: address,
  //     phone: phoneNumber,
  //     passwordConfirm: passwordConfirm,
  //     file: file,
  //     roles: ["learner"]
  //   };
  //   this.props.signUp(user);
  // };
  const onSubmit = async (data) => {
    console.log(data);
    var { id, email, password, passwordConfirm, username, birthdate, address, phone, fullname } = data;
    var user = {
      id: id,
      email: email,
      password: password,
      username: username,
      fullname: fullname,
      dateOfBirth: birthdate || '1/1/0001',
      address: address,
      phone: phone,
      passwordConfirm: passwordConfirm,
      roles: ["learner"]
    };
    const result = await accountApi.register(user);
    if (result.status == 200) {
      setSubmitted(true);
    } else {
      toast('Đăng ký thất bại', { type: 'error' })
    }

  };
  return (
    <>
      {!submitted ? <form className="login100-form"
        autoComplete="off"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="wrap-input100 mb-3">
          <span className="label-input100">Username <span className='text-danger'>*</span></span>
          <input className="input100" name="cc" placeholder='Nhập tên tài khoản' {...register('username',
            {
              required: 'Tên tài khoản không được để trống'
              , minLength: { value: 8, message: 'Tên tài khoản tối thiểu 8 kí tự' },
              maxLength: { value: 11, message: 'Tên tài khoản tối đa 11 kí tự' },
              pattern: { value: /^(?=[a-zA-Z0-9._]{8,11}$)(?!.*[_.]{2})[^_.].*[^_.]$/, message: 'Không sử dụng kí tự đặc biệt' }
            })}
            type="text"
            id="username"
            autoComplete="off"
            onChange={handleChange}
          ></input>
          {errors.username && <div className='invalid'>{errors.username.message}</div>}
        </div>
        <div className="wrap-input100 mb-3" data-validate="Username is required" > <span className="label-input100">Email <p className='text-danger'>*</p></span>
          <input className="input100" placeholder="Nhập email"
            {...register('email', { required: 'Địa chỉ email không được để trống', pattern: { value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, message: 'Email không đúng chuẩn' } })}
            type="email"
            id="email"
            onChange={handleChange}
          ></input>
        </div>
        <div className="wrap-input100 mb-3" data-validate="Username is required"> <span className="label-input100">Họ và tên</span>
          <input className="input100" placeholder="Họ và tên"
            {...register('fullname')}
            type="text"
            id="fullname"
            onChange={handleChange}
          ></input>
        </div>
        <div className="wrap-input100 mb-3" data-validate="Password is required"> <span className="label-input100">Mật khẩu <p className='text-danger'>*</p></span>
          <input className="input100" type="password" name="pass" placeholder="Nhập mật khẩu"
            {...register('password', { required: 'Mật khẩu không được để trống' })}
            minLength="6" maxLength="32"
            id="password"
            onChange={handlePasswordChange}
          ></input>
        </div>
        <div className="wrap-input100 mb-3"> <span className="label-input100">Nhập lại mật khẩu <p className='text-danger'>*</p></span>
          <input className="input100" type="password" name="pass" placeholder="Nhập lại mật khẩu"
            {...register('confirmPassword')}
            minLength="6" maxLength="32"
            id="confirmPassword"
            onChange={handleConfirmPassword}
          ></input>
          {!samePass && <div className='invalid'>Mật khẩu xác nhận không khớp</div>}
        </div>

        <div className="wrap-input100 mb-3">
          <span className="label-input100">Ngày sinh</span>
          <input className="input100" name="dateOfBirth"
            {...register('birthdate')}
            type="date"
            id="dateOfBirth"
            placeholder="tháng/ngày/năm"
            onChange={handleChange}
          ></input>
        </div>
        <div className="wrap-input100 mb-3"> <span className="label-input100">Địa chỉ</span>
          <input className="input100" name="address" placeholder="Nhập địa chỉ"
            {...register('address')}
            type="text"
            id="address"
            onChange={handleChange}
          ></input>
        </div>
        <div className="wrap-input100 mb-3"> <span className="label-input100">Số điện thoại</span>
          <input className="input100" name="phoneNumber" placeholder="Nhập số điện thoại"
            {...register('phone')}
            type="text"
            id="phoneNumber"
            onChange={handleChange}
          ></input>
        </div>
        <div className="container-login100-form-btn d-flex justify-content-center">
          <input type="submit" className="btn btn-primary rounded-pill" value="Đăng ký" />
        </div>
        <Link to="/home" className="mt-2">Trang chủ</Link>
      </form> : <Redirect to="/signin"></Redirect>}

    </>
  );
}

export default SignUp;