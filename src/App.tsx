import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Redirect } from 'react-router'
import Generate from "./components/Generate";
import Survey from "./components/Survey";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  return (
    <div className="app">
      <Router>
        <Switch>
          <Route exact path='/'>
            <Redirect to='/generate' />  
          </Route>
          <Route exact path="/generate" component={Generate} />
          <Route exact path="/?RID=:userId" component={Survey} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
