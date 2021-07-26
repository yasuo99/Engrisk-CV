import React,{Component, component } from 'react'

class QuizSapXep extends Component {
    render(){
        return (
            <div className="col-md-6 kedoc">
              <div className="question">
                <textarea className="titleQuestion" placeholder="Nhập câu hỏi..." type="text" defaultValue={""} />
                <p>Chọn file nghe: <input type="file" className="file mt-3" /></p>
                <div className="boxWord">
                  <p className="word">Tôi</p>
                  <p className="word">Bạn</p>
                  <p className="word">tên</p>
                  <p className="word">đi</p>
                  <p className="word">chơi</p>
                  <p className="word">Tôi</p>
                  <p className="word">Bạn</p>
                  <p className="word">tên</p>
                  <p className="word">đi</p>
                  <p className="word">chơi</p>
                  <p className="word">Bạn</p>
                  <p className="word">tên</p>
                  <p className="word">đi</p>
                  <p className="word">chơi</p>                
                  <input type="text" placeholder="Nhập từ vựng..." className="word" />
                </div>
                <div className="answerSort">
                  <h5>ĐÁP ÁN:</h5>
                  <textarea type="text" placeholder="Nhập đáp án..." className="textareaSort" defaultValue={""} />
                </div>
                {/* <button class="btn btn-addAnswer"><img src="/image/plus (3).png"> Thêm đáp án</button> */}
              </div>
            </div>
          );
    }
}
export default QuizSapXep;