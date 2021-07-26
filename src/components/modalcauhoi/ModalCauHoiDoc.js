import React, { Component } from "react";

class ModalCauHoiDoc extends Component {
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
                <td className="cauhoi-quiz">If you could please get back to me with your_______before the end of the day today, I will make sure that your order is processed in time for delivery by the end of the week.</td>
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
                <td>Sau tính từ sở hữu YOUR ta cần một danh từ, nên ta chọn ngay D</td>
                <td>
                    <input type="checkbox" name="check" value="true" onChange={this.handleChange} id="check"></input>
                </td>
            </tr>
        );
    }
}
export default ModalCauHoiDoc;