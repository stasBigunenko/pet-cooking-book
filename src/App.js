import './App.css'
import * as React from "react";
import {BrowserRouter as Router, Route, Switch, Redirect} from "react-router-dom";
import AppRouter from "./Components/AppRouter/AppRouter.js";
import {AuthContext} from "./Components/Context/AuthContext.js";
import {useEffect, useState} from "react";

function App() {
    const [isAuth, setIsAuth] = useState(false)

    const [isEntered, setIsEntered] = useState(true)

    useEffect(() => {
        if(localStorage.getItem('auth')) {
            setIsAuth(true)
        }
        setIsEntered(false)
    },[])

  return (
      <AuthContext.Provider value={{
          isAuth,
          setIsAuth,
          isEntered
      }}>
          <Router>
              <AppRouter/>
          </Router>
      </AuthContext.Provider>
  );
}

export default App;
