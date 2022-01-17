import './App.css'
import Title from "./Components/Title/Title.js";
import * as React from "react";
import MyButton from "./Components/MyButton/MyButton.js";
import MainText from "./Components/MainText/MainText.js";
import {useEffect, useMemo, useState} from "react";
import DishList from "./Components/DishList/DishList.js";
import InputMy from "./Components/Input/InputMy.js";
import DishesService from "./API/DischesService.js";
import AddRecipe from "./Components/AddRecipe/AddRecipe.js";

function App() {

    // Hook for controlling the state of the receipts
    const [dishes, setDishes] = useState([])

    //hook for controlling the state of the searched receipts
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
    const removeRecipe = (dish) => {
        setDishes(dishes.filter(d => d.id !== dish.id))
    }

    // Function to change the receipt in the list
    const changeRecipe = (newReceipt) => {
        const foundIndex = dishes.findIndex(d => d.id === newReceipt.id);
        dishes[foundIndex] = newReceipt;
        const changedArray = dishes.map(dish => {
            return dish
        })
        setDishes(changedArray)
    }

    // Call back function creating new receipt and added to list of the receipts
    const createRecipe = (newDish) => {
        setDishes(dishes => [...dishes, newDish])
    }

    // Sort function for the swapped receipts
    const sortRecipes = (a, b) => {
        if (a.order > b.order) {
            return 1
        } else {
            return -1
        }
    }

    // Callback function for drag and drop functionality
    const dnd = (indexDragged, indexDropped) => {
        // swapping object's order
        let buff = dishes[indexDragged].order
        dishes[indexDragged].order = dishes[indexDropped].order
        dishes[indexDropped].order = buff
        // creating a new array with the changed orders
        const swappedArray = dishes.sort(sortRecipes).map(dish => {
            return dish
        })
        setDishes(swappedArray)
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
          <AddRecipe
              dishes={dishes}
              create={createRecipe}
          />
        <DishList
            change={changeRecipe}
            remove={removeRecipe}
            dishes={searchedDishes}
            dnd={dnd}
        />
      </div>
  );
}

export default App;
