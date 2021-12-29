import './App.css'
import Title from "./Components/Title/Title.js";
import * as React from "react";
import MyButton from "./Components/MyButton/MyButton.js";
import MainText from "./Components/MainText/MainText.js";
import {useEffect, useMemo, useState} from "react";
import DishList from "./Components/DishList/DishList.js";
import InputMy from "./Components/Input/InputMy.js";
import DishesService from "./API/DischesService.js";
import AddReceipt from "./Components/AddReceipt/AddReceipt.js";

function App() {

    const [dishes, setDishes] = useState([])
    const [searchQuery, setSearchQuery] = useState('')

    const searchedDishes = useMemo(() => {
        return dishes.filter(dish => dish.title.toLowerCase().includes(searchQuery.toLowerCase()))
    }, [searchQuery, dishes])

    useEffect( () => {
        fetchDishes()
    },[])

    async function fetchDishes() {
        const dishes = await DishesService.getAll()
        setDishes(dishes)
    }

    const removeDish = (dish) => {
        setDishes(dishes.filter(d => d.id !== dish.id))
    }

  return (
      <div>
        <Title/>
        <MyButton style={{width: '100%'} }>
            Login
        </MyButton>
        <MainText/>
          <InputMy
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Поиск..."
          />
        <AddReceipt dishes={dishes} setDishes={setDishes}/>
        <DishList remove={removeDish} dishes={searchedDishes} />
      </div>
  );
}

export default App;
