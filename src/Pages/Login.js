import React, {useContext, useState} from 'react';
import InputMy from "../Components/Input/InputMy.js";
import MyButton from "../Components/MyButton/MyButton.js";
import {AuthContext} from "../Components/Context/AuthContext.js";
import DishesService from "../API/DischesService.js";
import {useHistory} from "react-router-dom";
import classes from "./Login.module.css"

const Login = () => {
    // Context hook to check if the user logged
    const {setIsAuth, setAuthor} = useContext(AuthContext)
    // Hook of react-dom library
    const router = useHistory()
    // Hook taht controll the state of the value
    const [user, setUser] = useState({
        name: '',
        password: '',
    })

    // Login function
    async function login (e) {
        e.preventDefault()
        const usersDB = await DishesService.findUser()

        let obj = usersDB.find(o => o.name === user.name)
        if(obj){
            if(obj.password === user.password){
                setIsAuth(true)
                localStorage.setItem('auth', 'true')
                setAuthor(user.name)
                router.push(`/recipes`)
            } else {
                alert('Wrong password')
            }
        } else {
            alert('User is not found')
        }
    }

    return (
        <div className={classes.log}>
            <h1 style={{textAlign:"center", color:"dodgeblue"}}>Старница для логина</h1>
            <form
                className={classes.log}
                style={{marginTop:"5px"}}
                onSubmit={(e) => {
                login(e)
            }}>
                <InputMy
                    style={{width:"200px", height:"25px"}}
                    value={user.name}
                    onChange={e => setUser({...user, name: e.target.value})}
                    type="text"
                    placeholder="Введите логин"
                />
                <InputMy
                    style={{width:"200px", height:"25px"}}
                    value={user.password}
                    onChange={e => setUser({...user, password: e.target.value})}
                    type="password"
                    placeholder="Введите пароль"
                />
                <MyButton>Войти</MyButton>
                <MyButton onClick={() => {
                    router.push(`/recipes`)
                }}>
                    Вернутся
                </MyButton>
            </form>
            <h2 style={{color:"red"}}>
                Еще не зарегистрированы?
                <MyButton
                    style={{marginLeft:"90px"}}
                    onClick={() => {
                        router.push(`/registration`)
                    }}
                >
                    Регистрация
                </MyButton>
            </h2>

        </div>
    );
};

export default Login;