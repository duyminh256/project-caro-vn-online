import { message} from 'antd';
import 'antd/dist/antd.css';


  const user = (state = {
    username: null,
    token: null,
    url: null,
    age: null,
    email:null,
    allow:null,
    error: null,
    googleId: null,
    facebookId: null,
  }, action) => {
    switch (action.type) {
      case 'LOGIN':
        {
          message.success('Login success');
          return {...state,
            username: action.item.user.username,
            token: action.item.user.token,
            error: null,
            allow: null,
          }
        }
      case 'LOGIN_FAIL':
        {
          message.error('Login fail',5);
          return state
        }
      case 'REGISTER':
        {
          message.success('Register success');
          return {...state,
            username: action.item.username,
            token: action.item.token,
          }
        }
        case 'REGISTER_FAIL':
          {
            message.error('Register fail',5);
            return state
          }
      case 'LOG_OUT':
          {
              return {...state,
                username: null,
                token: null,
                url: null,
                age: null,
                email:null,
                allow:null,
                error: null,
                googleId: null,
                facebookId: null,
              }
          }
      case 'UPDATE_USER':
        {
        return {...state,
                username: action.user.username,
                age: action.user.age,
                url: action.user.url,
                email: action.user.email,
                googleId: action.user.googleId,
                facebookId: action.user.facebookId,
                allow: true
        }
      }
      case 'UPDATE_USER_FAIL':
        return {...state,
                error: true,
        }
      case 'EDIT_USER':
        {
          message.success("Update sucess")
          return {...state,
                  username: action.user.username,
                  age: action.user.age,
                  email: action.user.email,
                  allow: true
          }
       }
        case 'EDIT_USER_FAIL':
        {
          message.error("Update fail")
          return state
        }
        case 'UPLOAD_FILE':
          {
            message.success("Upload success")
            return {...state,url:action.url}
          }
          case 'UPLOAD_FILE_FAIL':
            {
              message.success("Upload fail")
              return state
            }
      default:
        return state;
    }
  }
  
  export default user