import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import HeaderClient from '../../components/client/HeaderClient';
import SubMenuClient from '../../components/client/SubMenuClient';
import Search from '../../components/xemthem/Search';
import Footer from '../Footer/Footer';

class TuDienPage extends Component {
    render() {
        return (
            <div id="wrapper">
                <SubMenuClient></SubMenuClient>
                <div id="content-wrapper" className="d-flex flex-column">
                    <div id="content">
                        <HeaderClient></HeaderClient>
                        <div id="tudien">
                            <div className="container">
                                <div className="row">
                                    <div className="col-8 offset-2">
                                        <div className="nd-tudien text-center">
                                            <h4>Dịch Tiếng Anh-Tiếng Việt</h4>
                                            <p>Xem giải nghĩa từ, ví dụ câu và nhiều điều khác.</p>
                                        </div>
                                        <Search></Search>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}
export default TuDienPage;