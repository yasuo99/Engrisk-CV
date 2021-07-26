import React, { Component, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { appendScript } from "../../config/appendScript";
import $ from 'jquery'; 
import { useDispatch, useSelector } from "react-redux";
import { toggleSidenav } from "../../actions/sidenavAction";
const SubMenu = () => {
  const [toggleSidebar, setToggleSideBar] = useState(false);
  const {collapse} = useSelector(state => state.sidenav)
  const dispatch = useDispatch();
  function toggle() {
    console.log(!collapse);
    dispatch(toggleSidenav(collapse))
  }
  return (
    <ul
      className={`navbar-nav bg-gradient-primary sidebar sidebar-dark accordion ${collapse ? "toggled" : ""}`}
      id="accordionSidebar" style={{width: '7.5rem !important'}}
    >
      <Link
        className="sidebar-brand d-flex align-items-center justify-content-center"
        to="#"
      >
        <div className="sidebar-brand-icon rotate-n-15">
          <i className="fa fa-smile-o" />
        </div>
        <div className="sidebar-brand-text mx-3">Engrisk</div>
      </Link>
      <hr className="sidebar-divider my-0" />
      <hr className="sidebar-divider" />
      <div className="sidebar-heading">Interface</div>
      <li className="nav-item">
        <Link
          className="nav-link collapsed"
          to="#"
          data-toggle="collapse"
          data-target="#collapseUtilities1"
          aria-expanded="true"
          aria-controls="collapseUtilities"
        >
          <i className="fa fa-fw fa-database" />
          <span>Nội dung</span>
        </Link>
        <div
          id="collapseUtilities1"
          className="collapse"
          aria-labelledby="headingUtilities"
          data-parent="#accordionSidebar"
        >
          <div className="bg-white py-2 collapse-inner rounded">
            <h6 className="collapse-header">Quản lý nội dung:</h6>
            <Link className="collapse-item" to="/admin/quan-ly-tu-vung">
              Từ vựng
            </Link>
            <Link className="collapse-item" to="/admin/quan-ly-nhom-tu">
              Nhóm từ
            </Link>
            <Link className="collapse-item" to="/admin/quan-ly-tag">
              Tag
            </Link>
            <Link className="collapse-item" to="/admin/quan-ly-bai-viet">
              Bài viết
            </Link>
            <Link className="collapse-item" to="/admin/quan-ly-cau-hoi">
              Ngân hàng câu hỏi
            </Link>
            <Link className="collapse-item" to="/admin/quan-ly-quiz-exam">
              Quiz/Exam
            </Link>
            <Link className="collapse-item" to="/admin/quan-ly-chung-chi">
              Chứng chỉ
            </Link>
            <Link className="collapse-item" to="/admin/quan-ly-bai-hoc">
              Bài học
            </Link>
            <Link className="collapse-item" to="/admin/quan-ly-lo-trinh">
              Lộ trình học
            </Link>
          </div>
        </div>
      </li>

      <li className="nav-item">
        <Link
          className="nav-link collapsed"
          to="#"
          data-toggle="collapse"
          data-target="#collapseUtilities"
          aria-expanded="true"
          aria-controls="collapseUtilities"
        >
          <i className="fa fa-fw fa-wrench" />
          <span>Quản trị</span>
        </Link>
        <div
          id="collapseUtilities"
          className="collapse"
          aria-labelledby="headingUtilities"
          data-parent="#accordionSidebar"
        >
          <div className="bg-white py-2 collapse-inner rounded">
            <h6 className="collapse-header">Quản lý nội dung:</h6>
            <Link className="collapse-item" to="/admin/quan-ly-thong-bao">
              Thông báo
            </Link>
            <Link className="collapse-item" to="/admin/quan-ly-tai-khoan">
              Tài khoản
            </Link>
            <Link className="collapse-item" to="/admin/quan-ly-phan-quyen">
              Phân quyền
            </Link>
            <Link className="collapse-item" to="/admin/quan-ly-bang-diem">
              Quy đổi điểm
            </Link>
          </div>
        </div>
      </li>
      <li className="nav-item">
        <Link
          className="nav-link collapsed"
          to="#"
          data-toggle="collapse"
          data-target="#collapseCensor"
          aria-expanded="true"
          aria-controls="collapseCensor"
        >
          <i className="fa fa-fw fa-wrench" />
          <span>Kiểm duyệt</span>
        </Link>
        <div
          id="collapseCensor"
          className="collapse"
          aria-labelledby="headingCensor"
          data-parent="#accordionSidebar"
        >
          <div className="bg-white py-2 collapse-inner rounded">
            <h6 className="collapse-header">Quản lý nội dung:</h6>
            <Link className="collapse-item" to="/admin/quan-ly-noi-dung/bai-viet-binh-luan">
              Post/Comment
            </Link>
            <Link className="collapse-item" to="/admin/quan-ly-noi-dung/the-ghi-nho">
              Thẻ nhớ
            </Link>
            <Link className="collapse-item" to="/admin/quan-ly-noi-dung/dong-gop">
              Đóng góp
            </Link>
          </div>
        </div>
      </li>
     
      <div className="text-center d-none d-md-inline">
        <button onClick={() => toggle()}
          className={`rounded-circle border-0`}
          id="sidebarToggle"
        ></button>
      </div>
    </ul>)
}
export default SubMenu;
