import React, { Component } from "react";

class ModalCauHoiNghe extends Component {
    state = {
        // check: "false",
      };
      handleChange = (event) => {
        this.setState({
          [event.target.id]: event.target.value,
        });
      };
    render() {
        return (
            <tr>
                <td className="cauhoi-quiz">File nghe......</td>
                <td>
                    prefer
                </td>
                <td>
                    preferred </td>
                <td>
                    preferred</td>
                <td>
                    preference
                </td>
                <td>D</td>
                <td>
                    <input type="checkbox" name="check" value="true" onChange={this.handleChange} id="check"></input>
                </td>
            </tr>
        );
    }
}
export default ModalCauHoiNghe;