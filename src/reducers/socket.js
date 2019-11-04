

const socketState = (state = {
    partner: null,
    messages: [],
    request: null
  }, action) => {
    switch (action.type) {
      case 'GET_PARTNER':
          return {...state,partner: action.partner}
      case 'RECEIVE_MESSAGE':
        {
          const mes = state.messages
          mes.push(action.messages)
          return {...state,messages: mes}
        }
      case 'DISCONNECT':
        {
          return {...state,
            partner: null,
            messages: [],
            request: null
          }
        }
      default:
        return state;
    }
  }
  
  export default socketState