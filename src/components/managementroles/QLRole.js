import React, { Component } from "react";
import { Link } from "react-browser-router"
import Switch from 'react-switch';
import { toast } from "react-toastify";
import accountApi from "../../api/accountApi";
class QLRole extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <tr>
                <td>{this.props.account.username}</td>
                <td><Switch id={this.props.account.id} onChange={(props, event, id) => this.props.addAccountToRole(id, "learner")} checked={this.props.account.roles.includes("learner")} /></td>
                <td><Switch id={this.props.account.id} onChange={(props, event, id) => this.props.addAccountToRole(id, "forumadmin")} checked={this.props.account.roles.includes("forumadmin")} /></td>
                <td><Switch id={this.props.account.id} onChange={(props, event, id) => this.props.addAccountToRole(id, "manager")} checked={this.props.account.roles.includes("manager")} /></td>
                <td><Switch id={this.props.account.id} onChange={(props, event, id) => this.props.addAccountToRole(id, "superadmin")} checked={this.props.account.roles.includes("superadmin")} /></td>
            </tr>
        );
    }
}
export default QLRole;