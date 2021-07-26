import React, { Component } from "react"
import "datatables.net-dt/js/dataTables.dataTables.js"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import $ from 'jquery';
import Switch from "react-switch";
class ModalListExample extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount(){
        $(function() {
            $("#dataTable1").DataTable();
            $("#dataTable").DataTable();
        });
    }
    // addExample(id){
    //     this.props.addExample(this.props.examples.id, id);
    // }
    render() {
        // const renderExamples = this.props.examples.map((example) =>
        //     <tr key={example.id}>
        //         <td>
        //             {example.eng}
        //         </td>
        //         <td>
        //             {example.vie} </td>
        //         <td>
        //             <Switch></Switch>
        //         </td>
        //     </tr>
        // );
        return (
            <table className="table table-bordered" id="dataTable" width="100%" cellSpacing={0}>
                <thead>
                    <tr >
                        <th className="eng">Ví dụ tiếng anh</th>
                        <th className="vie">Ví dụ tiếng việt</th>
                        <th />
                    </tr>
                </thead>
                <tbody>
                    <td>
                        I love you
                </td>
                    <td>
                        Tôi thích bạn </td>
                    <td>
                        <Switch></Switch>
                    </td>
                </tbody>
                <tbody>
                    <td>
                        I love you
                </td>
                    <td>
                        Tôi thích bạn </td>
                    <td>
                        <Switch></Switch>
                    </td>
                </tbody>
            </table >

        )
    }
}
export default ModalListExample;