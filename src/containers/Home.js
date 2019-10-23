import { connect } from 'react-redux'
import React from 'react';
import 'antd/dist/antd.css';
import {  Button } from 'antd';
import { Link,Redirect } from 'react-router-dom'
import { logout } from '../actions/user'

const Home = (props)=>{
    const {_state,_logout} = props;
    if(!_state.username)
      return(<Redirect to = '/'/>)
    return (
      <div className='profile'>
        <h3>Welcome to Caro game: {_state.username}</h3>
        <Button type="danger" onClick = {_logout}>Log Out</Button>
        &emsp;&emsp;
        <Button type="primary"><Link to = '/game'>Play Game</Link></Button>
      </div>
    );
}

const mapStateToProps = (state) => ({
    _state: state.user
  })
const mapDispatchToProps = (dispatch) => ({
  _logout: () => dispatch(logout()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)