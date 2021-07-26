import { React } from 'react'
import { Link } from 'react-browser-router'
import { useSelector } from 'react-redux'
const TinNhanClient = ({ }) => {
    const { unseenMessages } = useSelector(state => state.auth)
    const {online} = useSelector(state => state.auth)
    return (
        <li className="nav-item dropdown no-arrow mx-1">
            <a className="nav-link dropdown-toggle" href="#" id="messagesDropdown" role="button"
                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <i className="fa fa-envelope fa-fw"></i>
                <span className="badge badge-danger badge-counter">{unseenMessages.length}</span>
            </a>
            <div className="dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in"
                aria-labelledby="messagesDropdown">
                <h6 className="dropdown-header">
                    Trung tâm tin nhắn
                </h6>
                {unseenMessages.slice(0,5).map((message, index) =>
                    <a key={index} className="dropdown-item d-flex align-items-center" href="#">
                        <div className="dropdown-list-image mr-3">
                            <img className="rounded-circle" src={message.sender.avatar}
                                alt="..." />
                            {online.some(username => message.sender.name == username) ? <div className="status-indicator bg-success"></div> : <div className="status-indicator bg-danger"></div>}
                        </div>
                        <div className="font-weight-bold">
                            <div className="text-truncate">{message.text}</div>
                            <div className="small text-gray-500">{message.sender.username}</div>
                        </div>
                    </a>
                )}
                <Link className="dropdown-item text-center small text-gray-500" to="/chat">Read More Messages</Link>
            </div>
        </li>
    )
}
export default TinNhanClient