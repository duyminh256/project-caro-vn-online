import { connect } from 'react-redux'
import React from 'react';
import 'antd/dist/antd.css';
import {  Button } from 'antd';
import { Link,Redirect } from 'react-router-dom'
import { logout } from '../actions/user'

const Home = (props)=>{
    const {_state,_logout} = props;
    if(!_state.token)
      return(<Redirect to = '/'/>)
    return (
      <div className='profile'>
        <h3>Welcome to Caro game: {_state.username}</h3>
        <Button type="primary"><Link to = '/profile'>Profile</Link></Button>
        &emsp;&emsp; 
        <Button type="primary"><Link to = '/game'>Play game with Computer</Link></Button>
        &emsp;&emsp;
        <Button type="primary"><Link to = '/loading'>Play game Online</Link></Button>
        &emsp;&emsp;
        <Button type="danger" onClick = {_logout}>Log Out</Button>
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