import React, {useContext, useState} from 'react';
import InputMy from "../Components/Input/InputMy.js";
import MyButton from "../Components/MyButton/MyButton.js";
import {AuthContext} from "../Components/Context/AuthContext.js";
import DishesService from "../API/DischesService.js";
import Registration from "./Registration.js";
import {useHistory} from "react-router-dom";

const Login = () => {
    const {isAuth, setIsAuth} = useContext(AuthContext)

    const router = useHistory()

    const [user, setUser] = useState({
        name: '',
        password: '',
    })

    async function login (e) {
        e.preventDefault()
        const usersDB = await DishesService.findUser()

        let obj = usersDB.find(o => o.name === user.name)
        if(obj){
            if(obj.password === user.password){
                setIsAuth(true)
                localStorage.setItem('auth', 'true')
                router.push(`/recipes`)
            } else {
                alert('Wrong password')
            }
        } else {
            alert('User is not found')
        }
    }

    return (
        <div>

            <h1>Старница для логина</h1>
            <form onSubmit={(e) => {
                login(e)
            }}>
                <InputMy
                    value={user.name}
                    onChange={e => setUser({...user, name: e.target.value})}
                    type="text"
                    placeholder="Введите логин"
                />
                <InputMy
                    value={user.password}
                    onChange={e => setUser({...user, password: e.target.value})}
                    type="password"
                    placeholder="Введите пароль"
                />
                <MyButton>Войти</MyButton>
            </form>
            <h2>
                Еще не зарегистрирован?
            </h2>
            <MyButton
                style={{width: '100%'}}
                onClick={() => {
                    router.push(`/registration`)
                }}
            >
                Регистрация
            </MyButton>
        </div>
    );
};

export default Login;