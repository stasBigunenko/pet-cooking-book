import './App.css'
import * as React from "react";
import {BrowserRouter as Router, Route, Switch, Redirect} from "react-router-dom";
import AppRouter from "./Components/AppRouter/AppRouter.js";

function App() {

  return (
      <Router>
        <AppRouter/>
      </Router>
  );
}

export default App;
