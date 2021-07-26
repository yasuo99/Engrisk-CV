import React, {Component} from 'react'

class FormTaiKhoan extends Component{
    render(){
        return(
            <div className="col-8 mt-5">
            <form>
              <div className="row">
                <div className="col-8"><h3>Cài đặt tài khoản</h3></div>
                <div className="col-4 text-right"><button className="btn btn-primary">Lưu thay đổi</button></div>
              </div>
              <div className="nd">
                <div className="row">
                  <div className="col-4 text-right"><span className="mr-5">Tên đăng nhập</span></div>
                  <div className="col-8"><input type="text" name="tendangnhap" /></div>
                </div>
                <div className="row mt-4">
                  <div className="col-4 text-right"><span className="mr-5">Email</span></div>
                  <div className="col-8"><input type="text" name="tendangnhap" /></div>
                </div>
              </div>
            </form>
          </div>
          
        )
    }
}
export default FormTaiKhoan;