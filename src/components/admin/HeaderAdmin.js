import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FormSearchAdmin from "./FormSearchAdmin";
import TaiKhoanAdmin from "./TaiKhoanAdmin";
import ThongBaoAdmin from "./ThongBaoAdmin";
import { connect } from "react-redux";
import { connection } from "../../signalR/createSignalRConnection";
import { HubConnectionState } from "@microsoft/signalr";
import { appendScript } from "../../config/appendScript";
import { useJwt } from "react-jwt";
const HeaderAdmin = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  const account = useSelector(state => state.auth.account)
  const token = localStorage.getItem('token');
  const [routeSideNav, setRouteSideNav] = useState(false);
  const { isExpired } = useJwt(token);

  useEffect(() => {
    if (isLoggedIn) {
      if (connection.state == HubConnectionState.Disconnected) {
        connection.start();
      }
    }

  }, [connection])
  useEffect(() => {
    if (isExpired) {
      localStorage.removeItem('account');
      localStorage.removeItem('token');
      dispatch({ type: "TOKEN_EXPIRED" });
    }
  }, [isExpired]);
  useEffect(() => {
    if (!isLoggedIn) {
      localStorage.removeItem('account');
      localStorage.removeItem('token');
      dispatch({ type: "TIME_OUT" });
    }
  }, [isLoggedIn])
  return (
    <nav id="nav" className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow sticky-top">
      <button id="sidebarToggleTop" className="btn btn-link d-md-none rounded-circle mr-3">
        <i className="fa fa-bars" />
      </button>
      {/* <FormSearchAdmin></FormSearchAdmin> */}
      <ul className="navbar-nav ml-auto">
        <div className="topbar-divider d-none d-sm-block" />
        <TaiKhoanAdmin account={account}></TaiKhoanAdmin>
      </ul>
    </nav>
  )

}
export default HeaderAdmin;