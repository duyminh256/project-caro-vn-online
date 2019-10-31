import React from 'react';
import { Switch, Route } from 'react-router-dom'
import Login from '../containers/Login';
import Register from '../containers/Register';
import Home from '../containers/Home'
import Game from '../containers/Game'
import GameOnline from '../containers/GameOnline'
import Loading from '../containers/Loading'


function App() {  
    return (
        <Switch>
            <Route exact path='/' component={Login}/>
            <Route path='/register' component={Register}/>
            <Route path='/home' component={Home}/>
            <Route path='/game' component={Game}/>
            <Route path='/gameonline' component={GameOnline}/>
            <Route path='/loading' component={Loading}/>
        </Switch>
    );
  }
  export default App;