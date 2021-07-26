import React, { Component } from 'react'
import { connect } from 'react-redux';
import FacebookLogin from 'react-facebook-login';
import { facebookSignIn } from '../../actions/authActions';
class Facebook extends Component {
    state = {
        isLoggedIn: false,
        userID: '',
        name: '',
        email: '',
        picture: '',
        token: ''
    }
    responseFacebook = async (response) => {
        if (response.status !== "unknown") {
            this.setState({
                isLoggedIn: true,
                userID: response.userID,
                name: response.name,
                email: response.email,
                picture: response.picture.data.url,
                token: response.accessToken
            });
            const token = {
                token: this.state.token
            };
            await this.props.facebookSignIn(token);
            console.log(response);
        }
    }
    render() {
        return (
            <FacebookLogin
                appId="2760969430891401"
                autoLoad={false}
                fields="name,email,picture"
                callback={this.responseFacebook}
                icon="fa-facebook"
            />
        )
    }
}
const mapStateToProps = (state) => {
    return({})
};

const mapDispatchToProps = (dispatch) => {
    return {
        facebookSignIn: (cred) => dispatch(facebookSignIn(cred))
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Facebook);