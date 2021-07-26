import React, { Component } from "react";
import { Dropdown, DropdownButton } from "react-bootstrap";
import { Link, Redirect } from 'react-router-dom';
import HeaderClient from '../../components/client/HeaderClient';
import SubMenuClient from '../../components/client/SubMenuClient';
import Footer from '../Footer/Footer';


class NapTienPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sotien: 0,
            method: 'Paypal'
        };
    }
    async componentDidMount() {

    }
    handleChange = (e) => {
        this.setState({
            [e.target.id]: Number.parseInt(e.target.value),
        });
        
    };
    selectPayment = (e) => {
        switch (e.target.id) {
            case "paypal":
                console.log("paypal");
                this.setState({
                    method: "Paypal"
                });
                break;
            case "stripe":
                console.log(("stripe"));
                this.setState({
                    method: "Stripe"
                });
                break;
            default:
                break;
        }
    }
    render() {
        return (

            <div id="wrapper">
                <SubMenuClient></SubMenuClient>
                <div id="content-wrapper" className="d-flex flex-column">
                    <div id="content">
                        <HeaderClient></HeaderClient>
                        <main id="thanhtoan">
                            <div className="container pt-3">

                                <div className="row mt-5">
                                    <div className="col-8 offset-2 ">
                                        <h5 className="mr-3 mt-2">Số tiền nạp</h5>
                                        <input type="text" placeholder="Tối thiểu 1$ tối đa $100"
                                            id="sotien"
                                            onChange={this.handleChange}
                                        />
                                        {/* <div className="dropdown">
                                            <a className="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                Hình thức thanh toán
                                            </a>
                                            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                <a className="dropdown-item" id="paypal" onClick={this.selectPayment}>Paypal</a>
                                                <a className="dropdown-item" id="stripe" onClick={this.selectPayment}>Stripe</a>
                                            </div>
                                        </div> */}
                                        <DropdownButton id="dropdown-basic-button" title={this.state.method || "Phương thức thanh toán"}>
                                            <Dropdown.Item id="paypal" onClick={this.selectPayment}>Paypal</Dropdown.Item>
                                            <Dropdown.Item id="stripe" onClick={this.selectPayment} >Stripe</Dropdown.Item>
                                        </DropdownButton>
                                    </div>
                                </div>
                                {/* <div className="nd mt-5">
                                    {this.state.method === "Stripe" && <Stripe amount={this.state.sotien} />}
                                    {this.state.method === "Paypal" && <Paypal amount={this.state.sotien} />}
                                </div> */}
                            </div>
                        </main>

                        <Footer></Footer>
                    </div>
                </div>

            </div>
        )
    }
}
export default NapTienPage;