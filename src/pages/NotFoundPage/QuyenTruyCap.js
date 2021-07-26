import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import HeaderClient from '../../components/client/HeaderClient';
import SubMenuClient from '../../components/client/SubMenuClient';
import Footer from '../Footer/Footer';

class QuyenTruyCap extends Component {
    constructor(props) {
        super(props);
        console.log(this.props);
        if (this.props.location.location.state !== undefined) {
            this.state = {
                url: this.props.location.location.state.url
            };
        }else{
            this.state = {
                url: "/"
            };
        }
        
    }
    render() {
        return (
            <div id="wrapper">
                <div id="content-wrapper" className="d-flex flex-column">
                    <div id="content">
                        <HeaderClient></HeaderClient>
                        <main id="trangloitruycap">
                            <div className="container">
                                <div className="row">
                                    <div className="col-6 pl-5">
                                        <h1 className="title-loitruycap">Bạn cần phải có quyền truy cập</h1>
                                        <p className="text-loitruycap mb-5 mt-2">Hãy yêu cầu quyền truy cập hoặc chuyển qua tài khoản khác có quyền truy cập</p>
                                        <Link className="btn btn-primary mt-5" to={this.state.url || ""}>Trở lại</Link>
                                        <Link className="btn btn-primary ml-4 mt-5" to="/home">Trang chủ</Link>
                                    </div>
                                    <div className="col-6 text-center">
                                        <img src="/image/lock.png" />
                                    </div>
                                </div>
                            </div>
                        </main>
                    </div>
                </div>

            </div>
        );
    }
}
export default QuyenTruyCap;