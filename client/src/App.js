import React, {Fragment} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './App.css';
import Landing from './components/Landing';
import MyCred from './components/MyCred';

const App = () => 
<Router>
<Fragment>
  <Route exact path = '/' component = {Landing}/>
  <Switch>
  <Route exact path = '/mycred' component = {MyCred}/>
  </Switch>
  
</Fragment>
</Router>
export default App;