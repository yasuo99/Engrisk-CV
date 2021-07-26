import React,{Component, component } from 'react'

class QuizHinhAnh extends Component {
  constructor(props) {
    super(props);
    this.state = {
      src : "",
    };
    this.handleChange = this.handleChange.bind(this);
}
  handleChange = (e) => {
    
    this.setState({
        [e.target.id]: e.target.value,
        src : e.target.value
    });
    console.log(e.target.value)
    // console.log(src)
  }
  handleReset = (e) =>{
    this.setState({
      src : '',
    })
  }
    render(){
      var srcc = this.state.src.replace("C:\\fakepath\\", "/image/");
        return (

            <div className="col-md-6 kedoc">
              <div className="question">
                <textarea className="titleQuestion" placeholder="Nhập câu hỏi..." type="text" defaultValue={""} />
                <div className="boxImg">
                  <img src={srcc !== ''  ? srcc : "/image/picture (1).png" } alt="img-question" className="display-ImgQuestion" />
                  <div className="itemImg">
                    <input  type="file" accept="image/png, image/jpeg" className="item-question fa fa-camera " onChange={this.handleChange}/>
                    <img src="/image/delete1.png" className="img-question" onClick={this.handleReset}></img>
                  </div>
                </div>
               
                <p>Chọn file nghe: <input type="file" className="file mt-3" /></p>
                <div className="answer answerHinhAnh">
                  {/* <div class="itemAnswer">
                                      <div class="row">
                                          <div class="col-1">
                                              <p class="textOrder">A.</p>
                                          </div>
                                          <div class="col-10">
                                              <input type="text" placeholder="Nhập đáp án..." class="answerText">
                                          </div>
                                          <div class="col-1">
                                              <input type="radio" class="radioAnswerText">
                                          </div>
                                      </div>
                                  </div> */}
                  {/* <div class="itemAnswer">
                                      <div class="row">
                                          <div class="col-1">
                                              <p class="textOrder">A.</p>
                                          </div>
                                          <div class="col-10">
                                              <input type="file" class="answerFile">
                                          </div>
                                          <div class="col-1">
                                              <input type="radio" class="radioAnswerFile">
                                          </div>
                                      </div>
                                  </div> */}
                  {/* <div class="itemAnswer">
                                      <div class="row">
                                          <div class="col-1 kedoc">
                                              <p class="textOrderTwo">A.</p>
                                          </div>
                                          <div class="col-10 kedoc">
                                              <input type="text" placeholder="Nhập đáp án..." class="answerTextTwo">
                                              <input type="file" class="answerFile">
                                          </div>
                                          <div class="col-1">
                                              <input type="radio" class="radioAnswerTwo">
                                          </div>
                                      </div>
                                  </div> */}
                  <div className="itemAnswer">
                    <div className="row">
                      <div className="col-1 kedoc">
                        <p className="textOrderThree">A.</p>
                      </div>
                      <div className="col-10 kedoc">
                        <div className="row">
                          <div className="col-8">
                            <input type="text" placeholder="Nhập đáp án..." className="answerTextThree" />
                            <input type="file" className="answerFile" />
                          </div>
                          <div className="col-4">
                            <img src="/image/english (1).jpg" className="imgFile" />
                          </div>
                        </div>
                      </div>
                      <div className="col-1">
                        <input type="radio" className="radioAnswerThree" />
                      </div>
                    </div>
                  </div>
                  <button className="btn btn-addAnswer"><img src="/image/plus.png" /> Thêm đáp án</button>
                </div>
               </div>
            </div>
          );
    }
}
export default QuizHinhAnh;