import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import notificationApiV2 from '../../api/2.0/notificationApi';
import notificationApi from '../../api/notificationApi';
import HeaderClient from '../../components/client/HeaderClient';
import SubMenuClient from '../../components/client/SubMenuClient';
import ThongBao from '../../components/thongbao/ThongBao';
import Footer from '../Footer/Footer';

class DanhSachThongBao extends Component {
    constructor(props) {
        super(props);
        this.isComponentMounted = false;
        this.state = {
            notifications: [],
            params: { pageSize: 100 }
        }
    }
    async componentDidMount() {
        this.isComponentMounted = true;
        var result = await this.fetchNotification(this.state.params);
        if (this.isComponentMounted) {
            this.setState({
                notifications: result.items
            })
        }
    }
    fetchNotification = async (params) => {
        return await notificationApiV2.get(this.props.account.id,params);
    }
    render() {
        const renderNotifications = this.state.notifications.map((notify,index) =>
            <div key={notify.id}>
                <ThongBao notify={notify} index={index}></ThongBao>
            </div>
        );
        return (
            <div id="wrapper">
                <SubMenuClient></SubMenuClient>
                <div id="content-wrapper" className="d-flex flex-column">
                    <div id="content">
                        <HeaderClient></HeaderClient>
                        <section id="danhsachthongbao">
                        <div className="container">
                                <div className="col-md-10 offset-1">
                                <h4 className="title">Danh sách thông báo</h4>
                                    {this.isComponentMounted && renderNotifications}
                                </div>
                                </div>
                        </section>
                        {/* <Footer></Footer> */}
                    </div>
                </div>
            </div>
        );
    }
    componentWillUnmount() {
        this.isComponentMounted = false;
    }
}
const mapStateToProps = (state) => {
    const {account} = state.auth;
    return{
        account: account
    }
}
export default connect(mapStateToProps)(DanhSachThongBao);