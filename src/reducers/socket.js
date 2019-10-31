

const socketState = (state = {
    partner: null,
    messages: []
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
      default:
        return state;
    }
  }
  
  export default socketState