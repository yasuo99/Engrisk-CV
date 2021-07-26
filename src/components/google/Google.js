import React, { Component } from 'react'
import { connect } from "react-redux";
import GoogleLogin from 'react-google-login'
import { googleSignIn } from '../../actions/authActions';
import { Redirect } from 'react-router-dom';
class Google extends Component {
    state = {
        isLoggedIn: false,
        googleId: '',
        name: '',
        email: '',
        imageUrl: '',
        token: ''
    }
    responseGoogle = async (response) => {
        this.setState({
            isLoggedIn: true,
            googleId: response.profileObj.googleId,
            name: response.profileObj.name,
            email: response.profileObj.email,
            imageUrl: response.profileObj.imageUrl,
            token: response.tokenId
        });
        const token = {
            token: this.state.token
        }
        await this.props.googleSignIn(token);
        console.log(response);
    }
    failureGoogle = (failure) => console.log(failure);
    render() {
        return (<GoogleLogin
            clientId="704575261938-i3iiefjaminroc2114rbd02qpjbcgho9.apps.googleusercontent.com"
            buttonText="LOGIN WITH GOOGLE"
            onSuccess={this.responseGoogle}
            onFailure={this.failureGoogle}
            cookiePolicy={'single_host_origin'}   
            />)
    }


}
const mapStateToProps = (state) => {
    return ({})
};

const mapDispatchToProps = (dispatch) => {
    return {
        googleSignIn: (cred) => dispatch(googleSignIn(cred)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Google);