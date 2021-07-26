import React, {Component} from "react"

class TinNhanAdmin extends Component{
    render(){
        return(
           
              <a className="dropdown-item d-flex align-items-center" href="#">
                <div className="dropdown-list-image mr-3">
                  <img className="rounded-circle" src="https://source.unsplash.com/fn_BT9fwg_E/60x60" alt="" />
                  <div className="status-indicator bg-success" />
                </div>
                <div className="font-weight-bold">
                  <div className="text-truncate">Hi there! I am wondering if you can help me with a problem I've been having.</div>
                  <div className="small text-gray-500">Emily Fowler · 58m</div>
                </div>
              </a>
           
          
        )
    }
}
export default TinNhanAdmin;