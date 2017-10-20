import React, { Component } from 'react';
import { Switch, Route } from 'react-router';
import Home from './Home/Home.jsx';
import Contact from './Contact/Contact.jsx';
import Test from './Test/Test.jsx';
import Start from './Start';
import Roulette from './Roulette';

export default class Main extends Component {
  render() {
    return (
      <main className="Content">
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/contact' component={Contact} />
          <Route path='/test' component={Test} />
          <Route path='/start' component={Start} />
          <Route path='/roulette' component={Roulette} />
        </Switch>
      </main>
    );
  }
}