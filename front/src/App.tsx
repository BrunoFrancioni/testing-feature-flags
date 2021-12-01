import React from 'react';
import './App.css';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import Posts from './components/main/Posts/Posts';
import Photos from './components/main/Photos/Photos';

function App() {
  return (
    <Router>
      <div className="main-container">
        <Switch>
          <Route path='/photos'>
            <Photos />
          </Route>

          <Route path='/'>
            <Posts />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
