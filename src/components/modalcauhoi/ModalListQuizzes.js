import React, { Component } from "react"
import ModalCauHoiDoc from "./ModalCauHoiDoc";
import Switch from "react-switch";
import quizApi from "../../api/quizApi";
import { toast } from "react-toastify";
import sectionApi from "../../api/sectionApi";
import "datatables.net-dt/js/dataTables.dataTables.js"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import $ from 'jquery'
class ModalListQuizzes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            quizzes: []
        }
        this.isComponentMounted = false;
    }
    async componentDidMount() {
        this.isComponentMounted = true;
        const result = await this.fetchQuizzes(this.props.id);
        console.log(result);
        if (this.isComponentMounted) {
            this.setState({
                quizzes: result
            })
            $(function(){
                $("#dataTable").DataTable();
            });
        }
    }
    deleteQuiz = async (id) => {
        try {
            const result = await quizApi.delete(id);
            if (result.status === 200) {
                toast("Xóa thành công");
                const result = await this.fetchQuizzes(this.props.id);
                if (this.isComponentMounted) {
                    this.setState({
                        quizzes: result
                    })
                }
            } else {
                toast("Xóa thất bại");
            }
        } catch (error) {
            console.log(error);
            toast("xóa thất bại");
        }
    }
    fetchQuizzes = async (id) => {
        return sectionApi.getAllQuizzes(id);
    }
    render() {
        const renderQuizzes = this.state.quizzes.map((quiz) =>
            <tr key={quiz.id}>
                <td style={{ width: "300px" }}>{quiz.quizName}</td>
                <td style={{ width: "100px" }}>{quiz.difficultLevel}</td>
                <td style={{ width: "100px" }}>{quiz.totalQuestion}</td>
                <td>
                    <Switch id={quiz.id} onChange={(props, event, id) => this.deleteQuiz(id)} checked={true}></Switch>
                </td>
            </tr>
        );
        return (
            <div>
                {
                    this.isComponentMounted && <table className="table table-bordered list-cauhoidoc question-table" id="dataTable" width="100%" cellSpacing={0}>
                        <thead>
                            <tr >
                                <th className="cauHoi">Tên</th>
                                <th className="cautraA">Độ khó</th>
                                <th className="cautraB">Số câu hỏi</th>
                                <th className="dapan">Chức năng</th>
                            </tr>
                        </thead>
                        <tbody>
                            {renderQuizzes}
                        </tbody>
                    </table>
                }
            </div>
        )
    }
    componentWillUnmount() {
        this.isComponentMounted = false;
    }
}
export default ModalListQuizzes;