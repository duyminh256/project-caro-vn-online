import React from "react";
import { connect } from 'react-redux'
import 'antd/dist/antd.css';
import { Avatar,Button } from 'antd';
import {Redirect,Link} from 'react-router-dom'
import {updateProfile} from '../actions/user'

const Profile = (props) =>{
    const {_stateUser,_updateProfile} = props
    if(_stateUser.error)
    {
        return(<Redirect to = '/'/>)
    }
    if(!_stateUser.allow){
        _updateProfile(_stateUser.token)
    }
   
    return (
        <div className="container">
            <div className="row">
                <div>
                    <div className="card">
                        <div className="card-footer">
                            <Avatar style={{ backgroundColor: "#000000", verticalAlign: 'middle',width:"100px", height: "100px" }} size="large" src={_stateUser.url||""}/>
                            <Button size="small" style={{ marginLeft: 16, verticalAlign: 'middle' }}><Link to="/upload">CHANGE AVATAR</Link></Button>
                            <p>{_stateUser.username?`Username:${_stateUser.username}`:""}</p>
                            <p>{_stateUser.email?`Email:${_stateUser.email}`:""}</p>
                            <p>{_stateUser.age?`Age:${_stateUser.age}`:""}</p>
                            <Button><Link to="/edit">EDIT</Link></Button>
                            <Button><Link to="/home">BACK</Link></Button> 
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
const mapStateToProps = (state) => ({
    _stateUser: state.user
})
const mapDispatchToProps = (dispatch) => ({
    _updateProfile: (token) => dispatch(updateProfile(token)),
})
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(Profile)
  