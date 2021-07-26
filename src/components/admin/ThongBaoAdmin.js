import React, { Component } from "react";
import notificationApi from "../../api/notificationApi";
import { Link } from 'react-router-dom';
import Moment from 'moment';
class ThongBaoAdmin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      params: { currentPage: 1, pageSize: 5 },
      notifications: []
    }
    this.isComponentMounted = false;
  }
  async componentDidMount() {
    this.isComponentMounted = true;
    const notifications = await this.fetchNotification();
    if (this.isComponentMounted) {
      this.setState({
        notifications: notifications
      })
    }
  }
  fetchNotification = async () => {
    return await notificationApi.getAdminNotification(this.state.params);
  }
  render() {
    const renderNotifications = this.state.notifications.map((notify) =>
      <Link key={notify.id} className="dropdown-item d-flex align-items-center" to={notify.url || "/"}>
        <div className="mr-3">
          <div className={`icon-circle bg-${notify.type}`}>
            <i className="fa fa-donate text-white" />
          </div>
        </div>
        <div>
          <div className="small text-gray-500">{Moment(notify.publishedDate).format("MMMM Do YYYY")}</div>
          {notify.content}
        </div>
      </Link>
    )
    return (
      <li className="nav-item dropdown no-arrow mx-1">
        <a className="nav-link dropdown-toggle" href="/" id="alertsDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          <i className="fa fa-bell fa-fw" />
          <span className="badge badge-danger badge-counter">{this.state.notifications.length}+</span>
        </a>
        <div className="dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="alertsDropdown">
          <h6 className="dropdown-header">
            Alerts Center
              </h6>
          {renderNotifications}
          <a className="dropdown-item text-center small text-gray-500" href="/">Show All Alerts</a>
        </div>
      </li>

    )
  }
  componentWillUnmount() {
    this.isComponentMounted = false;
  }
}
export default ThongBaoAdmin;