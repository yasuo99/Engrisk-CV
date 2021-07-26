import React, { Component } from "react";
import SubMenu from '../../components/admin/SubMenu'
import DashBoard from "../../components/admin/DashBoard";
import HeaderAdmin from "../../components/admin/HeaderAdmin";

class Admin extends Component {
  
  render() {
    return (
      <div>
        <div id="wrapper">
          <SubMenu></SubMenu>
          <div id="content-wrapper" className="d-flex flex-column">
            <div id="content">
              <HeaderAdmin></HeaderAdmin>
              <DashBoard></DashBoard>
            </div>
            <footer className="sticky-footer bg-white">
              <div className="container my-auto">
                <div className="copyright text-center my-auto">
                </div>
              </div>
            </footer>
          </div>
        </div>


      </div>
    )
  }
}


export default Admin;
