import React, { Component } from "react"
import FormMatKhau from "../../components/caidat/FormMatKhau";
import FormTaiKhoan from "../../components/caidat/FormTaiKhoan";
import HeaderClient from '../../components/client/HeaderClient';
import SubMenuClient from '../../components/client/SubMenuClient';
import Footer from '../Footer/Footer';
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import accountApi from "../../api/accountApi";
import { toast } from "react-toastify";
class CaiDatChung extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isActive: false,
      check: false,
    };
  }
  onClickTaiKhoan() {
    this.setState({ check: false });
  }
  onClickMatKhau() {
    this.setState({ check: true });
  }
  changePassword = async (accountId, currentPassword, newPassword) => {
    try {
      const result = await accountApi.changePassword(accountId, currentPassword, newPassword);
      if (result.status === 200) {
        toast("Đổi mật khẩu thành công");
      }
    } catch (error) {
      if (error.response.data.error) {
        toast(error.response.data.error);
      }
    }

  }
  render() {
    var { isActive, check } = this.state;
    return (
      <div id="wrapper">
        <SubMenuClient></SubMenuClient>
        <div id="content-wrapper" className="d-flex flex-column">
          <div id="content">
            <HeaderClient></HeaderClient>
            <main id="caidat">
              <div className="container">
                <div className="row">

                  {check === true ? <FormMatKhau changePassword={this.changePassword} /> : <FormTaiKhoan />}

                  <div className="col-4 mt-5">
                    <div className="caidat-matkhau">
                      <div className="ml-3 mt-3 info">
                        <div className="row">
                          <div className="col-4 pl-4">
                            <img width="70px" src={this.props.account.photoUrl || " image/user (1).png"} className="float-left mr-2" />
                            <input type="file" className="img-info fa fa-camera pt-1"></input>
                          </div>
                          <div className="col-8">
                            <h3 className="mt-2 text-primary">{this.props.account.username}</h3>
                            <Link to="/hoso">XEM HỒ SƠ CỦA BẠN</Link>
                          </div>
                        </div>
                      </div>
                      <div className="chucnang">
                        <div className={isActive === true ? "nd-chucnang mt-2 bg-active" : "nd-chucnang mt-2"} onClick={e => this.onClickTaiKhoan(e)}>
                          Tài khoản
                        </div>
                        <div className={isActive === true ? "nd-chucnang mt-2 bg-active" : "nd-chucnang mt-2"} onClick={e => this.onClickMatKhau(e)} >
                          Mật khẩu
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </main>
            <Footer></Footer>
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
export default connect(mapStateToProps)(CaiDatChung);