import { message} from 'antd';
import 'antd/dist/antd.css';


  const user = (state = {
    username: null,
  }, action) => {
    switch (action.type) {
      case 'LOGIN':
        {
          message.success('Login success');
          return {...state,
            username: action.item.user.username,
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
          }
        }
        case 'REGISTER_FAIL':
          {
            message.error('Register fail',5);
            return state
          }
      case 'LOG OUT':
          {
              return {...state,
                username: null,
              }
          }
      default:
        return state;
    }
  }
  
  export default user