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
        <h3 className="profile-title">Welcome to Caro game: {_state.username}</h3>
        <br/>
        <div className="profile-button">
          <Button size="large" type="default"><Link to = '/profile'>Profile</Link></Button>
          &emsp;&emsp; 
          <Button size= "large" type="primary"><Link to = '/game'>Play game with Computer</Link></Button>
          &emsp;&emsp;
          <Button size="large" type="primary"><Link to = '/loading'>Play game Online</Link></Button>
          &emsp;&emsp;
          <Button size="large" type="danger" onClick = {_logout}><a href='/'>Log Out</a></Button>
        </div>
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