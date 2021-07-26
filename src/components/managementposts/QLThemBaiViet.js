import React, { Component } from "react";
import CKEditor from "react-ckeditor-component";
import { Link } from "react-router-dom";

class QLThemBaiViet extends Component {
  constructor(props) {
    super(props);
    this.updateContent = this.updateContent.bind(this);
    this.state = {
      content: '',
      id: ""
    }
  }

  updateContent() {
    var content = localStorage.getItem('content');
    this.setState({
      content: content
    })
    console.log(this.state.content);
    localStorage.removeItem('content');
  }

  onChange(evt) {
    console.log("onChange fired with event info: ", evt);
    var newContent = evt.editor.getData();
    console.log(newContent);
    localStorage.setItem('content', newContent);
  }

  onBlur(evt) {
    console.log("onBlur event called with event info: ", evt);
  }

  afterPaste(evt) {
    console.log("afterPaste event called with event info: ", evt);
  }
  render() {
    var { id } = this.state;
    return (
      <div>
        <h3 className="text-primary text-center">{id !== '' ? 'Cập nhật' : 'Thêm'} bài viết</h3>
        <div className="thembaiviet">
          <form>
            <div className="card-input mt-4">
              <span>Tiêu đề</span><input type="text" />
            </div>
            <div className="card-input mt-4">
              <span>Nội dung bài viết</span>
              <CKEditor
                activeClass="p10"
                content={this.state.content}
                events={{
                  "blur": this.onBlur,
                  "afterPaste": this.afterPaste,
                  "change": this.onChange
                }}
              />
            </div>

            <div className="card-input mt-4">
              <span>Hình ảnh bài viết</span><input type="file" accept="image/png, image/jpeg" />
            </div>
            <div className="card-button">
              <Link type="button" className="btn btn-primary mr-3" to="/quanly-tuvung">Trở lại</Link>
              <Link type="submit" className="btn btn-primary" to="/quanly-tuvung">Lưu lại</Link>
            </div>
          </form>
        </div>
      </div>
    )
  }
}
export default QLThemBaiViet;