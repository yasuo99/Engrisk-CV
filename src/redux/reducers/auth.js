import { AuthorizationActionTypes } from "../actions/auth";
import { toastError, toastSuccess } from '../../utils/toastHelper';
import signalr from 'react-native-signalr';
import { Base } from './../../constants/api';
const INITIAL_STATE = {
  account: {},
  token: '',
  loading: true,
  loggedIn: false,
};

const auth = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AuthorizationActionTypes.REGISTER:
      return {...state};
    case AuthorizationActionTypes.REGISTER_SUCCESS:
      toastSuccess('Đăng ký thành công');
      return {...state};
    case AuthorizationActionTypes.REGISTER_ERROR:
      var { message } = action.payload;
      toastError(message);
      return {...state};
    case AuthorizationActionTypes.ACTIVATE_ACCOUNT:
      return {...state};
    case AuthorizationActionTypes.ACTIVATE_ACCOUNT_SUCCESS:
      toastSuccess('Xác nhận thành công! Chọn "Đăng nhập" để tiếp tục!');
      return {...state};
    case AuthorizationActionTypes.ACTIVATE_ACCOUNT_ERROR:
      var { message } = action.payload;
      return {...state};
    case AuthorizationActionTypes.LOGIN:
      return {
        ...state,
        token: action.token,
        loggedIn: true,
        account: action.account
      };
    case AuthorizationActionTypes.LOGIN_SUCCESS:
      return {  
        ...state,
        loggedIn: true,
        detail: action.payload,
      };
    case AuthorizationActionTypes.LOGIN_ERROR:
      return {
        ...state,
        loggedIn: false,
      };
    case AuthorizationActionTypes.LOGIN_FACEBOOK:
      return {
        ...state,
        loggedIn: false,
      };
    case AuthorizationActionTypes.LOGIN_FACEBOOK_SUCCESS:
      return {  
        ...state,
        loggedIn: true,
      };
    case AuthorizationActionTypes.LOGIN_FACEBOOK_ERROR:
      return {
        ...state,
        loggedIn: false,
      };
    case AuthorizationActionTypes.LOGIN_GOOGLE:
      console.log('on success');
      return {
        ...state,
        loggedIn: false,
      };
    case AuthorizationActionTypes.LOGIN_GOOGLE_SUCCESS:
      console.log('login success');
      return {  
        ...state,
        loggedIn: true,
      };
    case AuthorizationActionTypes.LOGIN_GOOGLE_ERROR:
      return {
        ...state,
        loggedIn: false,
      };
    case AuthorizationActionTypes.LOGOUT:
      return {
        ...state,
        token: '',
        loggedIn: false,
        account: {},
      };
    case AuthorizationActionTypes.GET_PROFILE:
      return {
        ...state,
        loggedIn: false,
        detail: null,
      };
    case AuthorizationActionTypes.GET_PROFILE_SUCCESS:
      return {
        ...state,
        loggedIn: true,
        detail: action.payload,
      };
    case AuthorizationActionTypes.GET_PROFILE_ERROR:
      return {
        ...state,
        detail: null,
        loggedIn: false,
      };
    default:
      return state;
  }
}
export default auth