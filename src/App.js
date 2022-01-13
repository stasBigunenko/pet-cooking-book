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

    // Hook for controling the state of the receipts
    const [dishes, setDishes] = useState([])

    //hook for controling the state of the searched receipts
    const [searchQuery, setSearchQuery] = useState('')

    // Hook for searching receipts
    const searchedDishes = useMemo(() => {
        return dishes.filter(dish => dish.title.toLowerCase().includes(searchQuery.toLowerCase()))
    }, [searchQuery, dishes])

    // Hook for uploading posts on startup of the page
    useEffect( () => {
        fetchDishes()
    },[])

    // Function to receive all receipts from the db
    async function fetchDishes() {
        const dishes = await DishesService.getAll()
        setDishes(dishes)
    }

    // Function to remove the receipt from the list
    const removeReceipt = (dish) => {
        setDishes(dishes.filter(d => d.id !== dish.id))
    }

    // Function to change the receipt in the list
    const changeReceipt = (newReceipt) => {
        const foundIndex = dishes.findIndex(d => d.id === newReceipt.id);
        dishes[foundIndex] = newReceipt;
        setDishes(dishes)
    }

    // Function creating new receipt and added to list of the receipts
    const createReceipt = (newDish) => {

        setDishes(dishes => [...dishes, newDish])
        console.log(dishes)
    }

    const dnd = (swapDishes) => {
        setDishes(swapDishes)
        // console.log(swapDishes)
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
          <AddReceipt
              dishes={dishes}
              create={createReceipt}
          />
        <DishList
            change={changeReceipt}
            remove={removeReceipt}
            dishes={searchedDishes}
            dnd={dnd}
        />
      </div>
  );
}

export default App;
