import React, { Component } from 'react';
import {Link} from "react-browser-router";
import HeaderClient from '../../components/client/HeaderClient';
import SubMenuClient from '../../components/client/SubMenuClient';
import Footer from '../Footer/Footer';
class NotFoundPage extends Component {
    render() {
        return (
            <div id="wrapper">
                <div id="content-wrapper" className="d-flex flex-column">
                    <div id="content">
                        <div className="container mb-5 pb-5">
                            <div className="text-center">
                                <div className="error mx-auto" data-text={404}>404</div>
                                <p className="lead text-gray-800 mb-5">Trang không tìm thấy</p>
                                <p className="text-gray-500">Có gì đó không ổn</p>
                                <Link to="/home">← Trở về trang chủ</Link>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        );
    }
}

export default NotFoundPage;
