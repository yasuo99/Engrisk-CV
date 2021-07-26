import React,{Component} from "react"
import {Link} from "react-router-dom"

class FormAdmin extends Component{
    render(){
        return(
            <li className="nav-item dropdown no-arrow">
            <Link className="nav-link dropdown-toggle" to="#" id="userDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <span className="mr-2 d-none d-lg-inline text-gray-600 small">Valerie Luna</span>
              <img className="img-profile rounded-circle" src="https://source.unsplash.com/QAB-WJcbgJk/60x60" />
            </Link>
            <div className="dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="userDropdown">
              <Link className="dropdown-item" to="#">
                <i className="fa fa-user fa-sm fa-fw mr-2 text-gray-400" />
                Thông Tin Cá Nhân
              </Link>
              <Link className="dropdown-item" to="#">
                <i className="fa fa-cogs fa-sm fa-fw mr-2 text-gray-400" />
                Cài Đặt
              </Link>
              <Link className="dropdown-item" to="#">
                <i className="fa fa-list fa-sm fa-fw mr-2 text-gray-400" />
                Activity Log
              </Link>
              <div className="dropdown-divider" />
              <Link className="dropdown-item" to="#" data-toggle="modal" data-target="#logoutModal">
                <i className="fa fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400" />
                Đăng Xuất
              </Link>
            </div>
          </li>

        )
    }
}
export default FormAdmin;