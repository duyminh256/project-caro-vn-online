import axios from 'axios'

export const login = item => ({
    type: 'LOGIN',
    item,
  })
export const loginFail = () => ({
    type: 'LOGIN_FAIL',
})
  
export const register = item => ({
      type: 'REGISTER',
      item
  })
export const registerFail = item => ({
    type: 'REGISTER_FAIL',
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
            .catch(() => dispatch(loginFail()));
    };
}
export function RegisterUser(user) {
    return (dispatch) => {
        axios.post(`https://server-caro-1612384.herokuapp.com/user/register`, user)
            .then(res => {
                dispatch(register(res.data));
            })
            .catch(() => dispatch(registerFail()));
    };

}
export const responseGoogle = response => {
    console.log(response)
    return ()=> login(true)
};
export const responseFacebook = response => {
    console.log(response)
    return ()=>login(true)
  };
  