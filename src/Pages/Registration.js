import React, {useContext, useState} from 'react';
import InputMy from "../Components/Input/InputMy.js";
import MyButton from "../Components/MyButton/MyButton.js";
import {AuthContext} from "../Components/Context/AuthContext.js";
import DishesService from "../API/DischesService.js";
import {useHistory} from "react-router-dom";

const Registration = () => {
    const {isAuth, setIsAuth} = useContext(AuthContext)

    const router = useHistory()

    const [user, setUser] = useState({
        name: '',
        email:'',
        password: '',
        confPassword:''
    })

    async function register (e) {
        e.preventDefault()
        if (user.password !== user.confPassword){
            return alert('Пароли не совпадают')
        }

        await DishesService.createUser(user)
        alert('Вы успешно зарегистрировались')
    }

    return (
        <div>
            <h1>Старница для регистрации</h1>
            <form onSubmit={(e) => {
                register(e)
            }}>
                <InputMy
                    value={user.name}
                    onChange={e => setUser({...user, name: e.target.value})}
                    type="text"
                    placeholder="Введите логин"
                    required
                />
                <InputMy
                    value={user.email}
                    onChange={e => setUser({...user, email: e.target.value})}
                    type="email"
                    placeholder="Введите электронную почту"
                    required
                />
                <InputMy
                    value={user.password}
                    onChange={e => setUser({...user, password: e.target.value})}
                    type="password"
                    placeholder="Введите пароль"
                    required
                />
                <InputMy
                    value={user.confPassword}
                    onChange={e => setUser({...user, confPassword: e.target.value})}
                    type="password"
                    placeholder="Подтвердите пароль"
                    required
                />
                <MyButton>Зарегистрироваться</MyButton>
            </form>
            <MyButton onClick={() =>{
                router.push(`/recipes`)
            }}>
                Отменить
            </MyButton>
        </div>
    );
};

export default Registration;