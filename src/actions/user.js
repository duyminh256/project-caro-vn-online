import axios from 'axios'
import host from '../constains/host'

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
    type: 'LOG_OUT'
}) 

export const updateUser = user =>({
    type: 'UPDATE_USER',
    user  
})
export const updateUserFail = () =>({
    type: 'UPDATE_USER_FAIL',
})
export const editUser = user =>({
    type: 'EDIT_USER',
    user  
})
export const editUserFail = () =>({
    type: 'EDIT_USER_FAIL',
})
export const loginUser = (user) => {
    return (dispatch) => {
        axios.post(`${host}/user/login`, user)
            .then(res => {
                dispatch(login(res.data));
            })
            .catch(() => dispatch(loginFail()));
    };
}
export function RegisterUser(user) {
    console.log(user)
    return (dispatch) => {
        axios.post(`${host}/user/register`, user)
            .then(res => {
                dispatch(register(res.data));
            })
            .catch(() => dispatch(registerFail()));
    };

}
export const responseGoogle = response => {
    const authOptions = {
        method: 'POST',
        url: `${host}/user/auth/google/token`,
        data: response,
        headers: {
            'Authorization': response.accessToken,
            'Content-Type': 'application/json'
        },
        json: true
      };
    return (dispatch)=>{
        axios(authOptions)
        .then(function(res){
            console.log(res.data);
            console.log(res.status);
        })
    }
};
export const responseFacebook = response => {
    const authOptions = {
        method: 'POST',
        url: `${host}/user/auth/facebook/token`,
        data: response,
        headers: {
            'Authorization': response.accessToken,
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        json: true
      };
    return (dispatch)=>{
        axios(authOptions)
            .then(function(res){
                console.log(res.data);
                console.log(res.status);
          })
    }
  };

export const updateProfile = response => {
    const authOptions = {
        method: 'GET',
        url: `${host}/me`,
        data: response,
        headers: {
            'Authorization': `Bearer ${response}`,
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        json: true
      };
    return (dispatch)=>{
        axios(authOptions)
            .then(function(res){
                if(res.data){
                    dispatch(updateUser(res.data))
                }
          })
          .catch(() => dispatch(updateUserFail()));
    }
  };
  export const updateInfo = (response,token) => {
    const authOptions = {
        method: 'POST',
        url: `${host}/user/update`,
        data: JSON.stringify(response),
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        json: true
      };
    return (dispatch)=>{
        axios(authOptions)
            .then(function(res){
                if(res.data){
                    dispatch(editUser(res.data))
                }
          })
          .catch(() => dispatch(editUserFail()));
    }
  };
  
  