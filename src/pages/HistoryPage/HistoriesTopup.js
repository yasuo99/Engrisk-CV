import React, { Component } from "react";
import HeaderClient from '../../components/client/HeaderClient';
import SubMenuClient from '../../components/client/SubMenuClient';
import ListHistoryTopup from "../../components/histories/ListHistoryTopup";
import Footer from '../Footer/Footer';
class HistoriesTopup extends Component {
    render() {
        return (
            <div id="wrapper">
                <SubMenuClient></SubMenuClient>
                <div id="content-wrapper" className="d-flex flex-column">
                    <div id="content">
                        <HeaderClient></HeaderClient>
                        <section id="lichsuexam">
                            <div className="container">
                                <h2>Lịch sử nạp tiền</h2>
                                <p>Đây là những lần nạp tiền vào hệ thống</p>
                                <ListHistoryTopup></ListHistoryTopup>
                            </div>
                        </section>
                        <Footer></Footer>
                    </div>
                </div>

            </div>
        )
    }
}
export default HistoriesTopup;