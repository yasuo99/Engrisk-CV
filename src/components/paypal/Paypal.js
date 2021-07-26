import React, { Component } from 'react'
import { connect } from 'react-redux'
import { PayPalButton } from 'react-paypal-button-v2'
import { } from '../../api/topupApi'
class Paypal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            amount: 0,
        }
    }
    handleSuccess = (details, data) => {
        console.log(data);
        console.log(details);
    }
    render() {
        return (
            <PayPalButton
                amount={this.props.amount}
                onSuccess={(details, data) => this.handleSuccess(details, data)}
                options={{ clientId: "AXX3t77DhE8dh6mG_teMoNRn-IeSDg74h6bkVQfn8fKeqFZLYmVOEwHHfCY6ckLEJ2KjuLJc5c8YNqgF", currency: "USD" }}
            />
        )
    }
}
const mapStateToProps = (state) => {

}
const mapDispatchToProps = (dispatch) => {
    return {

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Paypal);