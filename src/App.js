import './App.css'
import Title from "./Components/Title/Title.js";
import * as React from "react";
import MyButton from "./Components/MyButton/MyButton.js";
import MainText from "./Components/MainText/MainText.js";
import {useEffect, useState} from "react";
import DishList from "./Components/DishList/DishList.js";
import InputMy from "./Components/Input/InputMy.js";
import DishesService from "./API/DischesService.js";

function App() {

    const [dishes, setDishes] = useState([])

    useEffect( () => {
        fetchDishes()
    },[])

    async function fetchDishes() {
        const dishes = await DishesService.getAll()
        setDishes(dishes)
    }

  return (
      <div>
        <Title/>
        <MyButton style={{width: '100%'} }>
            Login
        </MyButton>
        <MainText/>
          <InputMy
              placeholder="Поиск..."
          />
        <DishList dishes={dishes} />
      </div>
  );
}

export default App;
