import React, {useContext, useState} from 'react';
import InputMy from "../Components/Input/InputMy.js";
import MyButton from "../Components/MyButton/MyButton.js";
import {AuthContext} from "../Components/Context/AuthContext.js";
import DishesService from "../API/DischesService.js";
import {useHistory} from "react-router-dom";
import classes from "./Registration.module.css"

const Registration = () => {
    // Context hook to check if the user logged
    const {isAuth, setIsAuth} = useContext(AuthContext)
    // Hook of the react-dom library
    const router = useHistory()
    // Hook that control the state of the value
    const [user, setUser] = useState({
        name: '',
        email:'',
        password: '',
        confPassword:''
    })

    // Registration function
    async function register (e) {
        e.preventDefault()
        if (user.password !== user.confPassword){
            return alert('Пароли не совпадают')
        }

        await DishesService.createUser(user)
        alert('Вы успешно зарегистрировались')
    }

    return (
        <div className={classes.reg}>
            <h1>Старница для регистрации</h1>
            <form
                className={classes.reg}
                // style={{backgroundColor:"red", flexDirection:"column"}}
                onSubmit={(e) => {
                register(e)
            }}>
                <InputMy
                    style={{width:"200px", height:"25px", flexDirection:"column"}}
                    value={user.name}
                    onChange={e => setUser({...user, name: e.target.value})}
                    type="text"
                    placeholder="Введите логин"
                    required
                />
                <InputMy
                    style={{width:"200px", height:"25px"}}
                    value={user.email}
                    onChange={e => setUser({...user, email: e.target.value})}
                    type="email"
                    placeholder="Введите электронную почту"
                    required
                />
                <InputMy
                    style={{width:"200px", height:"25px"}}
                    value={user.password}
                    onChange={e => setUser({...user, password: e.target.value})}
                    type="password"
                    placeholder="Введите пароль"
                    required
                />
                <InputMy
                    style={{width:"200px", height:"25px"}}
                    value={user.confPassword}
                    onChange={e => setUser({...user, confPassword: e.target.value})}
                    type="password"
                    placeholder="Подтвердите пароль"
                    required
                />
                <MyButton
                    // style={{alignItems:"center"}}
                >Зарегистрироваться</MyButton>
            </form>
            <MyButton
                onClick={() =>{
                router.push(`/recipes`)
            }}>
                Отменить
            </MyButton>
        </div>
    );
};

export default Registration;