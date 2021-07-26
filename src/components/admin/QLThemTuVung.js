import React, { Component } from "react"

class QLThemTuVung extends Component {
    render() {
        return (
            <div>
            <h3 className="text-primary text-center">THÊM TỪ VỰNG</h3>
            <div className="thembaiviet">
            <form>
              <div className="card-input mt-4">
                <span>English</span><input type="text" />
              </div>
              <div className="card-input mt-4">
                <span>Việt Nam</span><input type="text" />
              </div>
              <div className="card-input mt-4">
                <span>Loại từ</span><input type="text" />
              </div>
              <div className="card-input mt-4">
                <span>Ví dụ tiếng anh</span><input type="text" />
              </div>
              <div className="card-input mt-4">
                <span>Ví dụ tiếng việt</span><input type="text" />
              </div>
              <div className="card-input mt-4">
                <span>Hình ảnh minh họa</span><input type="file" accept="image/png, image/jpeg" />
              </div>
              <div className="card-button">
                <button type="button" className="btn btn-primary mr-3">Trở lại</button>
                <button type="submit" className="btn btn-primary">Thêm từ vựng</button>
              </div>
            </form>
            </div>
          </div>
        )
    }
}
export default QLThemTuVung;