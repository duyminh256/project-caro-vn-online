import React from 'react';
import { Switch, Route } from 'react-router-dom'
import Login from '../containers/Login';
import Register from '../containers/Register';
import Home from '../containers/Home'
import Game from '../containers/Game'

function App() {  
    return (
        <Switch>
            <Route exact path='/' component={Login}/>
            <Route path='/register' component={Register}/>
            <Route path='/home' component={Home}/>
            <Route path='/game' component={Game}/>
        </Switch>
    );
  }
  export default App;