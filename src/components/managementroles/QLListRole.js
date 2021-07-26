import React, { Component } from "react"
import { appendScript } from "../../config/appendScript";
import QLRole from "./QLRole";
import "datatables.net-dt/js/dataTables.dataTables.js"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import $ from 'jquery'
import accountApi from "../../api/accountApi";
import { toast } from "react-toastify";

class QLListRole extends Component {
    constructor(props) {
        super(props);
        this.state = {
            accounts: []
        }
        this.isComponentMounted = false;
    }
    async componentDidMount() {
        this.isComponentMounted = true;
        const accounts = await this.fetchAccounts();
        if (this.isComponentMounted) {
            this.setState({
                accounts: accounts
            })
            $(function () {
                $("#dataTable").DataTable();
            })
        }
    }
    addAccountToRole = async (id, role) => {
        try {
            const result = await accountApi.addAccountToRole(id, role);
            if (result.status === 200) {
                toast("Thành công");
                const accounts = await this.fetchAccounts();
                if (this.isComponentMounted) {
                    this.setState({
                        accounts: accounts
                    })
                }
            }
            else {
                toast("Thất bại")
            }
        } catch (error) {
            console.log(error);
        }

    }
    fetchAccounts = async () => {
        return await accountApi.getAll();
    }
    render() {
        const renderRoles = this.state.accounts.map((account) =>
            <QLRole key={account.id} account={account} addAccountToRole={this.addAccountToRole}></QLRole>
        );
        return (
            <div>

                {this.isComponentMounted && <table className="table table-bordered mt-2" id="dataTable" width="100%" cellSpacing={0}>
                    <thead>
                        <tr>
                            <th >Tài khoản</th>
                            <th className="chucnang-role">Người dùng</th>
                            <th className="chucnang-role">Forum Admin</th>
                            <th className="chucnang-role">Manager</th>
                            <th className="chucnang-role">Quản trị</th>
                        </tr>
                    </thead>
                    <tbody>
                        {renderRoles}
                    </tbody>
                </table>}
            </div>
        )
    }
}
export default QLListRole;