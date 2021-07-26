import React,{Component} from "react"
import TinNhanAdmin from "./TinNhanAdmin";

class ListTinNhan extends Component{
    render(){
        return(
            <li className="nav-item dropdown no-arrow mx-1">
            <div className="nav-link dropdown-toggle" id="messagesDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <i className="fa fa-envelope fa-fw" />
              <span className="badge badge-danger badge-counter">7</span>
            </div>
            <div className="dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="messagesDropdown">
              <h6 className="dropdown-header">
                Message Center
              </h6>
             <TinNhanAdmin></TinNhanAdmin>
             <p className="dropdown-item text-center small text-gray-500">Read More Messages</p>
            </div>
          </li>
        )
    }
}
export default ListTinNhan;