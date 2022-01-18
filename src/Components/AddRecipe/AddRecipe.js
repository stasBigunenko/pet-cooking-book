import React, {useContext, useState} from 'react';
import MyButton from "../MyButton/MyButton.js";
import MyModal from "../MyModal/MyModal.js";
import classes from "./AddRecipe.module.css";
import InputMy from "../Input/InputMy.js";
import DishesService from "../../API/DischesService.js";
import {AuthContext} from "../Context/AuthContext.js";

// Component that create new recipe
const AddRecipe = ({dishes, create}) => {

    const {isAuth} = useContext(AuthContext)

    // Hook useState to set up initial value
    const [dish, setDish] = useState({
        title: '',
        cookingTime: '',
        calories: '',
        description: '',
        recipe: '',
    })

    // Hook to control the state of the modal window
    const [modalAddRecipe, setModalAddRecipe] = useState(false)

    // Function to add a new recipe
    async function addNewRecipe(e) {
        // disable reloading of the page
        e.preventDefault()
        // created new variable to receive the data from the function
        const newDish = await DishesService.createNewDish(dish, dishes)
        // add needed data to the new object
        const newRecipe = {
            id: newDish.id,
            order: newDish.order,
            title: newDish.title,
            cookingTime: newDish.cookingTime,
            calories: newDish.calories,
            description: newDish.description,
            url: newDish.url,
            likes: newDish.likes
        }
        // return created recipe as props to the parent component
        create(newRecipe)
        // changed the state of the hook
        setDish({
            title: '',
            cookingTime: '',
            calories: '',
            description: '',
            recipe: '',
        })
    }

    return (
        <div>
            {isAuth
                ?
                (<button
                        className={classes.addRec__btn}
                        onClick={() => {
                            setModalAddRecipe(true)
                        }}
                    >
                        Добавить рецепт
                    </button>
                ):(
                    <button disabled={true}/>
                )}
            <MyModal active={modalAddRecipe} setActive={setModalAddRecipe} >
                <form onSubmit={(e) => {
                    addNewRecipe(e)
                    setModalAddRecipe(false)
                }}>
                    <InputMy
                        value={dish.title}
                        onChange={e => setDish({...dish, title: e.target.value})}
                        type="text"
                        placeholder="Название блюда"
                        required
                    />
                    <InputMy
                        value={dish.cookingTime}
                        onChange={e => setDish({...dish, cookingTime: e.target.value})}
                        type="number"
                        min="0"
                        placeholder="Время приготовления (мин)"
                        required
                    />
                    <InputMy
                        value={dish.calories}
                        onChange={e => setDish({...dish, calories: e.target.value})}
                        type="number"
                        min="0"
                        placeholder="Кол-во калорий (ккал)"
                        required
                    />
                    <InputMy
                        value={dish.description}
                        onChange={e => setDish({...dish, description: e.target.value})}
                        type="text"
                        placeholder="Описание блюда"
                        required
                    />
                    <InputMy
                        value={dish.recipe}
                        onChange={e => setDish({...dish, recipe: e.target.value})}
                        type="text"
                        placeholder="Рецепт"
                        required
                    />
                    <MyButton>
                        Добавить рецепт в книгу рецептов
                    </MyButton>
                </form>
            </MyModal>
        </div>
    );
};

export default AddRecipe;