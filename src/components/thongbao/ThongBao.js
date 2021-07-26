import React, { Component } from "react";
import { Link } from "react-browser-router"
import Moment from 'moment';
import { Badge } from "react-bootstrap";
class ThongBao extends Component {
    constructor(props) {
        super(props);
    }
    displayNotificationType = (type) => {
        switch (type) {
            case 0:
                return "info"
            case 1:
                return "success"
            case 2:
                return "danger"
            default:
                break;
        }
    }
    render() {
        return (
            // <div className="boxInfor">
            //     <img src="/image/banner1.jpg" className="img-100 img-fluid img-infor" />
            //     <p className="dateInfor">sâs</p>
            //     <div className="content">
            //         <p>{this.props.notify.content}</p>
            //         {this.props.notify.url && <a href={this.props.notify.url} className="btn btn-primary mt-2">Xem ngay</a>}
            //     </div>
            // </div>
            <div className="boxInfor">
                <a href={`${this.props.notify.url || "#"}`}>
                    <div className="row">
                        <div className="header">
                            <div className="col-md-1">
                                <div className={"icon-circle" + " bg-" + this.displayNotificationType(this.props.notify.type) + " fa-5x"} style={{width: "4.5rem", height: "4.5rem" }}>
                                    <i className="fa fa-donate text-white" />
                                </div>
                            </div>
                            <div className="col-md-11">
                                <div className="content">
                                    <p className="dateInfor">{Moment(this.props.notify.createdDate).format("DD/MM/YYYY")}</p>
                                    <p>{this.props.notify.content}</p>
                                    <Badge variant="info">{this.props.notify.status}</Badge>
                                </div>
                            </div>
                        </div>
                    </div>
                </a>

            </div>
        );
    }
}
export default ThongBao;
