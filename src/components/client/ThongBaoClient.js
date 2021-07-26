import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import Moment from 'moment';
import * as signalR from '@microsoft/signalr';
import { connect } from 'react-redux';
import { connection } from '../../signalR/createSignalRConnection';
import notificationApiV2 from '../../api/2.0/notificationApi';
import { currentOnline, newFollower, newOffline, newOnline, unseenMessage } from '../../actions/authActions';
import { Button, Form, Modal } from 'react-bootstrap'
import accountApiV2 from '../../api/2.0/accountApi';
class ThongBaoClient extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notifications: [],
      params: {
        currentPage: 1,
        pageSize: 5
      },
      selectNotification: {},
      yesnoModal: false
    }
    this.isComponentMounted = false;

  }
  async componentDidMount() {
    Moment.locale("en");
    this.isComponentMounted = true;
    if (this.props.isLoggedIn) {
      if (connection.state == signalR.HubConnectionState.Disconnected) {
        try {
          connection.start();
          connection.on('NewNotification', (data) => {
            var notification = JSON.parse(data);
            var filteredNotifications = this.state.notifications.filter(notify => notify.id != notification.id);
            filteredNotifications.pop();
            if (this.isComponentMounted) {
              this.setState({
                notifications: [notification, ...filteredNotifications]
              })
            }
          });
          connection.on('NewFollower', (data) => {
            console.log("dkm");
            var notification = JSON.parse(data);
            var filteredNotifications = this.state.notifications.filter(notify => notify.id != notification.id);
            filteredNotifications.pop();
            if (this.isComponentMounted) {
              this.setState({
                notifications: [notification, ...filteredNotifications]
              })
            }
            this.props.newFollower(notification.from);
          });
          connection.on('UnFollow', (data) => {
            var follower = JSON.parse(data);
            this.props.newFollower(follower);
          });
          connection.on('NewOnline', (data) => {
            console.log(data);
            this.props.newOnline(data);
          })
          connection.on('CurrentOnline', (data) => {
            const result = JSON.parse(data);
            this.props.currentOnline(result);
          })
          connection.on('NewOffline', (data) => {
            this.props.newOffline(data);
          })
          connection.on('NewMessage',(data) => {
            const result = JSON.parse(data);
            this.props.unseenMessage(result);
          })
        } catch {
          console.log('loi');
        }
      }

    }
    const result = await this.fetchNotifications(this.props.account.id, this.state.params);
    if (this.isComponentMounted) {
      if (result) {
        this.setState({
          notifications: result.items
        });
      }
    }
  }
  toggleYesnoModal = () => {
    this.setState({yesnoModal: this.state.yesnoModal ? false : true})
  }
  fetchNotifications = async (id, params) => {
    try {
      const notifications = await notificationApiV2.get(id, params);
      return notifications;
    } catch (error) {
      console.log(error);
    }
  }
  displayNotificationType = (type) => {
    switch (type) {
      case 0:
        return "info"
      case 1:
        return "success"
      case 2:
        return "danger"
      case 3:
        return "primary"
      default:
        break;
    }
  }
  seenNotification = async (id) => {
    const selectedNotification = this.state.notifications.find(notify => notify.id == id);
    this.setState({selectNotification: selectedNotification});
    if(selectedNotification.type === 3 && selectedNotification.status != 'Seen'){
      this.toggleYesnoModal();
    }
    if (selectedNotification.status === 'Unseen') {
      selectedNotification.status = 'Seen'
      await notificationApiV2.seenNotification(this.props.account.id, id);
      this.setState({
        notifications: [...this.state.notifications.filter(notify => notify.id != id),selectedNotification]
      })
    }
  }
  refuseInvite = async () => {
    await accountApiV2.reponseInviteBoxchatRequest(this.props.account.id, this.state.selectNotification.id, "refuse");
    this.toggleYesnoModal();
  }
  acceptInvite = async () => {
    await accountApiV2.reponseInviteBoxchatRequest(this.props.account.id, this.state.selectNotification.id, "accept");
    this.toggleYesnoModal();
  }
  render() {
    const { notifications } = this.state;
    const renderNotifications = this.state.notifications.map((notify) =>
      <Link key={notify.id} data-id={notify.id} className="dropdown-item d-flex align-items-center" to={notify.url || "#"} onClick={() => this.seenNotification(notify.id)}>
        <div className="mr-3">
          <div className={"icon-circle" + " bg-" + this.displayNotificationType(notify.type)}>
            <i className="fa fa-donate text-white" />
          </div>
        </div>
        <div>
          <div className="small text-black-500 font-weight-bold">{notify.createdBy} {Moment(notify.createdDate).format("MMMM Do YYYY")}</div>
          {notify.content} {notify.status}
        </div>
      </Link>
    )
    return (
      <li className="nav-item dropdown no-arrow mx-1">
        <Link className="nav-link dropdown-toggle" to="#" id="alertsDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          <i className="fa fa-bell fa-fw" />
          <span className="badge badge-danger badge-counter">{this.props.isLoggedIn ? notifications.length : 1}+</span>
        </Link>
        <div className="dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="alertsDropdown">
          <h6 className="dropdown-header text-center">
            Thông báo
          </h6>
          {this.props.isLoggedIn ? renderNotifications : <div className="dropdown-item d-flex align-items-center"> <div className="mr-3">
            <div className={"icon-circle" + " bg-info"}>
              <i className="fa fa-donate text-white" />
            </div>
          </div>
            <div>
              <div className="small text-gray-500">{Moment(Date.now()).format("MMMM Do YYYY")}</div>
              Chào mừng bạn đến với Engrisk
            </div></div>}
          <Link className="dropdown-item text-center small text-gray-500" to="/thongbao">Show All Alerts</Link>
        </div>
        <Modal animation={true} show={this.state.yesnoModal} onHide={this.toggleYesnoModal}>
          <Modal.Header closeButton onClick={this.toggleYesnoModal}>
            <Modal.Title>Xác nhận tham gia</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Bạn có xác nhận với nội dung thông báo này
                                </Modal.Body>
          <Modal.Footer className='align-content-center'>
            <Button variant="secondary" onClick={() => this.refuseInvite()}>Không đồng ý</Button>
            <Button variant="primary" onClick={() => this.acceptInvite()}>Đồng ý</Button>
          </Modal.Footer>
        </Modal>
      </li>
    )
  }
  componentWillUnmount() {
    this.isComponentMounted = false;
  }
}
const mapStateToProps = (state) => {
  const { isLoggedIn, account } = state.auth;
  return ({
    isLoggedIn: isLoggedIn,
    account: account
  })
}
const mapDispatchToProps = (dispatch) => {
  return {
    newFollower: (follower) => dispatch(newFollower(follower)),
    newOnline: (online) => dispatch(newOnline(online)),
    newOffline: (offline) => dispatch(newOffline(offline)),
    currentOnline: (users) => dispatch(currentOnline(users)),
    unseenMessage: (message) => dispatch(unseenMessage(message))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ThongBaoClient);