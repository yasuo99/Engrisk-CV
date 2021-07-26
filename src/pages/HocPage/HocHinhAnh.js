import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import HeaderClient from '../../components/client/HeaderClient';
import SubMenuClient from '../../components/client/SubMenuClient';
import Footer from '../Footer/Footer';

class HocHinhAnh extends Component {
  render() {
    return (
      <div id="wrapper">
        <SubMenuClient></SubMenuClient>
        <div id="content-wrapper" className="d-flex flex-column">
          <div id="content">
            <HeaderClient></HeaderClient>
            <main id="hoc-hinhanh">
              <div className="container">
                <div className="row kechan mt-5">
                  <div className="col-8 offset-2">
                    <h2 className="mb-5">Đâu là "cà phê" ?</h2>
                    <div className="row">
                      <div className="col-4">
                        <div className="card-hoc"><img src="image/rice.png" className="img-hoc" />
                          <h5 className="text-center mt-2">rice</h5>
                        </div>
                      </div>
                      <div className="col-4">
                        <div className="card-hoc"><img src="image/rice.png" className="img-hoc" />
                          <h5 className="text-center mt-2">rice</h5>
                        </div>
                      </div>
                      <div className="col-4">
                        <div className="card-hoc"><img src="image/rice.png" className="img-hoc" />
                          <h5 className="text-center mt-2">rice</h5>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row mt-5">
                  <div className="col-6"><button className="btn btn-primary">Bỏ qua</button></div>
                  <div className="col-6 text-right"><button className="btn btn-primary">Tiếp theo</button></div>
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
export default HocHinhAnh;