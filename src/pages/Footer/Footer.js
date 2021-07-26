import React, { useEffect, useState } from "react"
import Chatbox from "../../components/chatbot/Chatbox"

const Footer = () => {
    const [isBusy,setIsBusy] = useState(true)
    useEffect(() => {
        setIsBusy(false);
        return () => setIsBusy(true)
    },[setIsBusy])
    return (
        <footer>
            <div className="container">
                <div className="row kechan mt-4">
                    <div className="col-3 mt-2 text-center">
                        <h5>THANHLAP</h5>
                        <div className="mt-2">
                            <i className="fa fa-facebook icon-facebook"></i>
                            <i className="fa fa-twitter icon-twitter"></i>
                            <i className="fa fa-google icon-google"></i>
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="row mt-2">
                            <div className="col-4 text-center">
                                <h6><a href="#">GIỚI THIỆU</a></h6>
                            </div>
                            <div className="col-4 text-center">
                                <h6><a href="#">TRỢ GIÚP</a></h6>
                            </div>
                            <div className="col-4 text-center">
                                <h6><a href="#">ĐIỀU KHOẢN</a></h6>
                            </div>
                        </div>
                        <div className="row mt-1">
                            <div className="col-4 text-center">
                                <h6><a href="#">HỌC ĐƯỜNG</a></h6>
                            </div>
                            <div className="col-4 text-center">
                                <h6><a href="#">ỨNG DỤNG</a></h6>
                            </div>
                            <div className="col-4 text-center">
                                <h6><a href="#">QUYỀN RIÊNG TƯ</a></h6>
                            </div>
                        </div>           
                    </div>
                    <div className="col-3 mt-1 text-right">
                        <h5>Download App</h5>
                        <div><img src="/image/download.png" className="img-download"></img></div>
                    </div>
                </div>
            </div>
            {!isBusy && <Chatbox></Chatbox>}
        </footer>
     )
}
export default Footer;