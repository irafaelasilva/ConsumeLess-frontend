import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import './index.css';
// import App from './components/App';
import Login from './components/Login';
import Register from './components/Register';
import Profile from './components/Profile';
import Items from './components/Items';
import Item from './components/Item';
import NewItem from './components/NewItem';
import ComingSoon from './constants/ComingSoon';
import NotFound from './constants/NotFound'

import Map from './components/Map';

import BrowseByCategory from './components/BrowseByCategory';

import * as serviceWorker from './serviceWorker';

const routing = (
  <Router>
      <Switch>
        <Route exact path='/' component = {Login} />
        <Route exact path='/login' component = {Login} />
        <Route exact path='/register' component = {Register} />
        <Route exact path='/profile' component = {Profile} />
        <Route exact path='/items/new' component = {NewItem} />
        <Route exact path='/items' component = {Items} />
        <Route exact path='/item/:id' component = {Item} />
        <Route exact path='/map' component = {Map} />
        <Route exact path='/categories' component = {BrowseByCategory} />
        <Route path='/item/update' component = {ComingSoon} />
        <Route component={NotFound} />
      </Switch>
  </Router>
)

ReactDOM.render(routing, document.getElementById('root'));
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
