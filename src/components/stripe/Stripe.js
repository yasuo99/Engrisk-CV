import { Elements, ElementsConsumer } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React, { Component } from 'react'
import { connect } from 'react-redux'
import {InjectedCheckoutForm} from './CheckoutForm';
class Stripe extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const stripePromise = loadStripe('pk_test_51Hqf6HCghieN4XgV9sb0s298rFkOnmhl5IQ08HLHHxpEikeQvxv00dmuAfS3XskbTSCP2FBUGBBVCCstz4KtTNra003qZWdvaq');
        return (
            <Elements stripe={stripePromise}>
            <InjectedCheckoutForm />
          </Elements>
        )
    }
}
const mapStateToProps = (state) => {

}
const mapDispatchToProps = (dispatch) => {
    return {
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Stripe)
