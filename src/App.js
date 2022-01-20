import './App.css';
import {BrowserRouter as Router} from "react-router-dom";
import AppRouter from "./Components/AppRouter/AppRouter.js";
import {AuthContext} from "./Components/Context/AuthContext.js";
import React, {useEffect, useState} from "react";

function App() {
    // Hook that controlling state of the value
    const [isAuth, setIsAuth] = useState(false)
    // Hook that controlling state of the value
    const [isEntered, setIsEntered] = useState(true)

    const[author, setAuthor] = useState('')
    // Checking if user is already authorized
    useEffect(() => {
        if(localStorage.getItem('auth')) {
            setIsAuth(true)
        }
        setIsEntered(false)
    },[])

  return (
          <AuthContext.Provider
              value={{
                isAuth,
                setIsAuth,
                isEntered,
                author,
                setAuthor
          }}>
              <Router>
                  <AppRouter/>
              </Router>
          </AuthContext.Provider>
  );
}

export default App;
