import React, { Component, useEffect } from 'react';
import { Switch, BrowserRouter as Router, BrowserRouter } from 'react-router-dom';
import './App.css';
import menu from './components/menu/menu';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import routes from './routes';
import GuardRoute from './guards/GuardRoute';
import { useDispatch, useSelector } from 'react-redux';
import { connection } from './signalR/createSignalRConnection';
import { HubConnectionState } from '@microsoft/signalr';
import { useJwt } from "react-jwt";
const App = ({ }) => {
  const dispatch = useDispatch();
  const {isLoggedIn} = useSelector(state => state.auth)
  const { isExpired } = useJwt(localStorage.getItem('token'));
  useEffect(() => {
    if(isLoggedIn){
      if(connection.state == HubConnectionState.Disconnected){
        connection.start();
      }
    }else{
      if(connection.state == HubConnectionState.Connected){
        connection.stop();
      }
    }
  },[isLoggedIn])
  useEffect(() => {
    if (isExpired) {
      localStorage.removeItem('account');
      localStorage.removeItem('token');
      dispatch({ type: "TOKEN_EXPIRED" });
    }
  }, [isExpired]);
  const showContentMenus = (routes) => {
    var result = null;
    if (routes.length > 0) {
      result = routes.map((route, index) => {
        return (
          <GuardRoute key={index}
            path={route.path}
            exact={route.exact}
            Component={route.main}
            guard={route.guard}
            roles={route.roles} />
        )
      })
    }
    return <Switch>{result}</Switch>;

  }
  return (
    <div>
      <BrowserRouter>
        <Router>
          <ToastContainer />
          <menu></menu>
          <div>
            {showContentMenus(routes)}
          </div>
        </Router>
      </BrowserRouter>
    </div>
  );
 
}
export default App;
