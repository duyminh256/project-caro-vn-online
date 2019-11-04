const uploadState = (state = {
    file: null,
  }, action) => {
    switch (action.type) {
      case 'CHANGE_FILE':
         return {...state,file: action.file}
     
      default:
        return state;
    }
  }
  
  export default uploadState