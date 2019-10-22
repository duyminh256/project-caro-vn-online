import React from 'react';
import { Switch, Route } from 'react-router-dom'
import Login from '../containers/Login';
import Register from '../containers/Register';
import Home from '../containers/Home'

function App() {  
    return (
        <Switch>
            <Route exact path='/' component={Login}/>
            <Route path='/register' component={Register}/>
            <Route path='/home' component={Home}/>
        </Switch>
    );
  }
  export default App;