

  const user = (state = {
    username: null,
  }, action) => {
    switch (action.type) {
      case 'LOGIN':
        {
          return {...state,
            username: action.item.user.username,
          }
        }
      case 'REGISTER':
        {
          return {...state,
            username: action.item.user.username,
          }
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