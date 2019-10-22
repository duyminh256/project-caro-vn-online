import { connect } from 'react-redux'
import React from 'react';
import 'antd/dist/antd.css';
import {  Button } from 'antd';
import { logout } from '../actions/user'

const Home = (props)=>{
    const {_state,_logout} = props;
    return (
        <div>
        <h3>Username: {_state.username}</h3>
        <Button type="button" onClick = {_logout}>Log Out</Button>
      </div>
    );
}

const mapStateToProps = (state) => ({
    _state: state.user
  })
const mapDispatchToProps = (dispatch) => ({
  login: () => dispatch(logout()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)