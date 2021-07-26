import React from "react";
import { Link } from "react-router-dom";
import TaiKhoan from "./TaiKhoan";

const Header = () => {
    return (
        <section id="menu-chinh">
        <nav className="navbar navbar-expand-lg navbar-light">
          <div className="container">
            <div className="row">
              <div className="col-2"><img src="image/logo1.png" className="img-fluid logo" /></div>
              <div className="col-8 pt-2">
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#menu"> </button>
                <div className="collapse navbar-collapse" id="menu">
                  <ul className="navbar-nav">
                    <li className="nav-item active mr-1"> <Link className="nav-link a-hoc" to="/home"><img src="image/shooting-stars.png" />&nbsp;&nbsp; HỌC</Link> </li>
                    <li className="nav-item"> <Link className="nav-link " to="/thaoluan"><img src="image/book.png" />&nbsp;&nbsp;
                        THẢO LUẬN</Link> </li>
                    <li className="nav-item"> <Link className="nav-link" to="/cuahang"><img src="image/shop.png" />&nbsp;&nbsp;
                        CỬA HÀNG</Link></li>
                    <li className="nav-item dropdown mr-2"> <Link className="nav-link " to="#" data-toggle="dropdown"><img src="image/more.png" />&nbsp;&nbsp; XEM THÊM</Link>
                      <div className="dropdown-menu sub1"> <Link className="dropdown-item" to="/tudien"><img src="image/data.png" className="mr-5" />TỪ ĐIỂN</Link> <Link className="dropdown-item" to="/tuvung"><img src="image/dictionary.png" className="mr-5" /> TỪ VỰNG</Link> </div>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-2 pt-2">
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#menu2"> </button>
                <div className="collapse navbar-collapse" id="menu2">
                  <ul className="navbar-nav ">
                    <li className="nav-item dropdown"> <Link className="nav-link " to="#" data-toggle="dropdown"><img src="image/gem.png" /></Link>
                      <div className="dropdown-menu">
                        <div className="row sub2">
                          <div className="col-4"><img src="image/chest.png" /></div>
                          <div className="col-8">
                            <h5>Lingots</h5>
                            <p>Bạn có 96 Lingots</p>
                            <Link to="/cuahang">ĐẾN CỬA HÀNG</Link>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li className="nav-item dropdown ml-3"> <Link className="nav-link " to="#" data-toggle="dropdown"><img src="image/user.png" /></Link>
                      <div className="dropdown-menu sub3">
                        <div className="thongbao">
                          <div className="row pt-2">
                            <div className="col-6">
                              <h5 className="pl-2">Thông báo</h5>
                            </div>
                            <div className="col-6"><Link to="#" className="text-right">
                                <h5 className="pr-2">Xem tất cả</h5>
                              </Link></div>
                          </div>
                        </div>
                        <div className="thongbao">
                          <div className="row mt-2">
                            <div className="col-2"> <img src="image/gem.png" className="pl-2" /></div>
                            <div className="col-10">
                              <p className="pl-2">Bạn nhận được phần thưởng là 10 lingot vì giữ được 7 ngày steak</p>
                            </div>
                          </div>
                        </div>
                        <TaiKhoan status ={false}></TaiKhoan>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </section>
    )
}
export default Header;