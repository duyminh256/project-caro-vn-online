import axios from 'axios'

export const login = item => ({
    type: 'LOGIN',
    item,
  })
  
export const register = item => ({
      type: 'REGISTER',
      item
  })
export const logout = () => ({
    type: 'LOG OUT'
})  
export const loginUser = (user) => {
    return (dispatch) => {
        axios.post(`https://server-caro-1612384.herokuapp.com/user/login`, user)
            .then(res => {
                dispatch(login(res.data));
            })
            // .catch(() => dispatch(itemsHasErrored(true)));
    };
}
export function RegisterUser(user) {
    return (dispatch) => {
        axios.post(`https://server-caro-1612384.herokuapp.com/user/register`, user)
            .then(res => {
                console.log(res);
                console.log(res.data);
                dispatch(login(true));
            })
    };

}