import React, { Component } from "react"
import HeaderClient from '../../components/client/HeaderClient';
import SubMenuClient from '../../components/client/SubMenuClient';
import Footer from '../Footer/Footer';
import { appendScript } from '../../config/appendScript'
class DapAnSai extends Component {
    componentDidMount() {
        appendScript("https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js");
    };
    render() {
        return (
             <div id="wrapper">
             <SubMenuClient></SubMenuClient>
             <div id="content-wrapper" className="d-flex flex-column">
                 <div id="content">
                     <HeaderClient></HeaderClient>
                     <main id="hoc2">
                    <div className="container">
                        <div className="row kechan mt-5 kechan">
                            <div className="col-8 offset-2">
                                <h2>reputation</h2>
                                <p className="mb-5">Có nghĩa là?</p>
                                <div className="row">
                                    <div className="col-6">
                                        <div className="dapan active">
                                            <p>lỗi thời</p>
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div className="dapan">
                                            <p>lỗi thời</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-6">
                                        <div className="dapan">
                                            <p>lỗi thời</p>
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div className="dapan">
                                            <p>lỗi thời</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row mt-3 thongbao-ketqua mb-3">
                        <lottie-player src="https://assets2.lottiefiles.com/packages/lf20_REOnx3.json"  background="transparent"  speed="1" hover loop  autoplay>            
                        </lottie-player>
                            <div className="col-6"><img src="/image/checked.png" className="float-left mr-2" /> <h4 className="mt-3">Tuyệt vời</h4></div>
                            <div className="col-6 text-right"><button className="btn btn-primary mt-3">Tiếp theo</button></div>
                        </div>
                    </div>
                </main>
         
                     <Footer></Footer>
                 </div>
             </div>          
             
            </div>
        )
    }
}
export default DapAnSai;