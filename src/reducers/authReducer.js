import { HubConnectionState } from "@microsoft/signalr";
import jwtDecode from "jwt-decode"
import { toast } from "react-toastify"
import { connection } from "../signalR/createSignalRConnection";
const initState = {
  authError_Email: null,
  authError_Pass: null,
  isLoggedIn: false,
  account: {
    id: 0,
    email: '',
    fullname: '',
    username: '',
    photoUrl: '',
    isLocked: false,
    age: 0,
    address: '',
    phoneNumber: '',
    levelName: '',
    exp: '',
    point: '',
    learned: [],
    roles: [],
    followers: [],
    following: [],
  },
  token: '',
  refreshToken: '',
  online: [],
  unseenMessages: []
}
const initialState = () => {
  let token = localStorage.getItem('token')
  if(token){
    const { exp } = jwtDecode(token)
    // Refresh the token a minute early to avoid latency issues
    const expirationTime = (exp * 1000) - 60000
    if (Date.now() <= expirationTime) {
      return {
        ...initState,
        isLoggedIn: localStorage.getItem('account') ? true : false,
        account: localStorage.getItem('account') === null ? initState.account : JSON.parse(localStorage.getItem('account')),
        token: localStorage.getItem('token') === null ? "" : localStorage.getItem('token')
      }
    }
    return {
      ...initState
    }
  }
  return{
    ...initState
  }
}
const authReducer = (state = initialState(), action) => {

  switch (action.type) {
    case "SIGN_IN": {
      toast("Xin chào bạn đã đến với website", { type: 'info' });
      if (connection.state == HubConnectionState.Disconnected) {
        connection.start();
      }
      return {
        ...state,
        isLoggedIn: true,
        account: action.account,
        token: action.token,
      };
    }
    case "SIGN_IN_ERR": {
      toast("Tài khoản hoặc mật khẩu không đúng", { type: 'error' });
      return state;
    }
    case "SIGN_IN_ERR_PASS": {
      toast("Mật khẩu không đúng")
      return state;
    }
    case "SIGN_IN_ERR_EMAIL": {
      toast("Tài khoản không tồn tại", { type: 'error' })
      return state;
    }
    case "SIGN_UP": {
      toast("Đăng ký thành công");
      return {
        ...state,
        isLoggedIn: true,
        account: action.data.account,
        token: action.data.token
      };
    }
    case "SIGN_UP_ERR": {
      toast("Lỗi");
      return state;
    }
    case "SIGN_UP_ERR_EMAIL": {
      return { authError_Email: 'Email đã được đăng ký' }
    }
    case "SIGN_UP_ERR_PASS": {
      return { authError_Pass: 'Mật khẩu xác nhận không đúng' }
    }
    case "SIGN_OUT": {
      localStorage.removeItem('account');
      localStorage.removeItem('token');
      toast("Đăng xuất thành công");
      return ({
        ...state,
        isLoggedIn: false,
        account: initState.account,
        token: '',
        online: []
      });
    }
    case "TOKEN_EXPIRED": {
      localStorage.removeItem('account');
      localStorage.removeItem('token');
      return ({
        ...state,
        isLoggedIn: false,
        account: initState.account,
        token: '',
        online: []
      });
    }
    case "TIME_OUT": {
      localStorage.removeItem('account');
      localStorage.removeItem('token');
      return ({
        ...state,
        isLoggedIn: false,
        account: initState.account,
        token: '',
        online: []
      });
    }
    case "FOLLOW_USER": {
      console.log(action.following);
      if (state.account.following.some(fl => fl.accountId == action.following.id)) {
        var newAccount = {
          ...state.account,
          following: state.account.following.filter(fl => fl.accountId != action.following.id)
        }
        localStorage.setItem('account', JSON.stringify(newAccount));
        return {
          ...state,
          account: newAccount
        }
      }
      else {
        var following = {
          accountId: action.following.id,
          userName: action.following.username,
          photoUrl: action.following.photoUrl
        }
        var newAccount = {
          ...state.account,
          following: [following, ...state.account.following]
        }
        localStorage.setItem('account', JSON.stringify(newAccount));
        return {
          ...state,
          account: newAccount
        }
      }
    }
    case "NEW_FOLLOWER":
      if (state.account.followers.some(fl => fl.accountId == action.follower.id)) {
        var newAccount = {
          ...state.account,
          followers: state.account.followers.filter(fl => fl.accountId != action.follower.id)
        }
        localStorage.setItem('account', JSON.stringify(newAccount));
        return {
          ...state,
          account: newAccount
        }
      }
      else {
        var follower = {
          accountId: action.follower.id,
          userName: action.follower.username,
          photoUrl: action.follower.photoUrl
        }
        var newAccount = {
          ...state.account,
          followers: [follower, ...state.account.followers]
        }
        localStorage.setItem('account', JSON.stringify(newAccount));
        return {
          ...state,
          account: newAccount
        }
      }
    case "NEW_ONLINE":
      return {
        ...state,
        online: [...state.online, action.online]
      }
    case "NEW_OFFLINE":
      return {
        ...state,
        online: [...state.online.filter(onl => onl !== action.online)]
      }
    case "CURRENT_ONLINE":
      return {
        ...state,
        online: [...state.online, ...action.users]
      }
    case "UNSEEN_MESSAGE":
      return {
        ...state,
        unseenMessages: [action.message, ...state.unseenMessages]
      }
    case "SEEN_MESSAGES":
      return {
        ...state,
        unseenMessages: [...state.unseenMessages.filter(mes => mes.boxchatId != action.boxchatId)]
      }
    default:
      return state;
  }
};

export default authReducer;
