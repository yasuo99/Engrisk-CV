import jwtDecode from "jwt-decode"

const authLink = setContext(async () => {
    let token = localStorage.getItem('token')
    const { exp } = jwtDecode(token)
    // Refresh the token a minute early to avoid latency issues
    const expirationTime = (exp * 1000) - 60000
    if (Date.now() >= expirationTime) {
        // token = await refreshToken()
        localStorage.removeItem('token');
        localStorage.removeItem('account');
        // set LocalStorage here based on response;
    }
    return {
        // you can set your headers directly here based on the new token/old token
    //     headers: {
    //         ...
    //   }
    }
})