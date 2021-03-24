import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
// internal
import {
  Home,
  Product,
  Admin,
  Demonstration,
} from 'pages';
// import style from './style.module.css';


/**
 * App root component
 * @component
 * @return {React.Component}
 */
export default function App() {
  return <Router>
    <Switch>
      <Route path="/product">
        <Product />
      </Route>
      <Route path="/admin">
        <Admin />
      </Route>
      <Route path="/demonstration">
        <Demonstration />
      </Route>
      <Route path="/">
        <Home />
      </Route>
    </Switch>
  </Router>;
}
