import React, {useContext, useEffect, useState} from 'react';
import classes from './RecipeCard.module.css'
import MyModal from "../MyModal/MyModal.js";
import DishesService from "../../API/DischesService.js";
import Gallery from "../Gallery/Carusel.js";
import InputMy from "../Input/InputMy.js";
import MyButton from "../MyButton/MyButton.js";
import LikeButton from "../LikeButton/LikeButton.js";
import Comments from "../Comments/Comments.js";
import {AuthContext} from "../Context/AuthContext.js";

// Component with the main functions and hooks
const RecipeCard = ({dish, remove, change, dnd, dishes}) => {

    // Hook to control the state of the modal window for the "Полный рецепт"
    const [modalActive, setModalActive] = useState(false)
    // Hook to control the state of the modal window for the "Редактировать рецепт"
    const [modal2Active, setModal2Active] = useState(false)
    // Hook to control the state of the recipe from db
    const [dishById, setDishById] = useState({})
    // Hook to control the state of the photos TODO
    const [photosById, setPhotosById] = useState([])
    // Hook to control the state with changed dish
    const [dishChange, setDishChange] = useState({})
    // Context hook to check if the user logged
    const {isAuth} = useContext(AuthContext)

    let oldRecipe

    // Function to receive data from db and insert in the inputs
    async function fetchRecipeByID() {
        oldRecipe = await DishesService.getRecipeByID(dish.id)
        // Changed the state of the hook
        setDishChange(oldRecipe)
    }

    // Function to receive data from db from the 2d table
    async function fetchDishById() {
        const dishById = await DishesService.getDishByID(dish.id)
        // Changed the state of the hook
        setDishById(dishById)

        // Comment if you work with J-SON server, uncomment if you work with golang server
        setPhotosById(dishById.photos)
    }

    // Uncomment if you work with J-SON server, comment if you work with golang server
    // Function to receive data from db from the 3d table (photos for carousel)
    // async function fetchPhotosById() {
    //     // created new variable to receive the data from the function
    //     const photosById = await DishesService.getPhotosByID(dish.id)
    //     // Changed the state of the hook
    //     setPhotosById(photosById)
    // }

    // Function to delete the recipe by id from db
    async function deleteDishById() {
        await DishesService.deleteDishByID(dish.id)
    }

    // Function to change the recipe by id in db-s
    async function changeDishByID (e) {
        // disable reloading of the page
        e.preventDefault()
        // created new variable to receive the data from the function
        const newDish = await DishesService.putDishByID(dishChange)
        // add needed data to the new object
        const newRecipe= {
            id: newDish.id,
            order: newDish.order,
            title: newDish.title,
            cookingTime: newDish.cookingTime,
            calories: newDish.calories,
            description: newDish.description,
            url: newDish.url,
            likes: newDish.likes
        }
        // return to the callback function changed recipe
        change(newRecipe)
    }

    // drag handler to control the item which is dragged
    function dragStartHandler (e, dish) {
        // transfer needed data from dragged object to the dropped function
        e.dataTransfer.setData("dishID", dish.id)
    }

    // drag end handler to control the object over which dragged
    function dragEndHandler(e) {
        e.target.style.border = 'solid lightblue'
    }

    // dragover handler to control over which item is dragged handler
    function dragOverHandler (e) {
        // disable reloading of the page
        e.preventDefault()
        e.target.style.border = 'solid 2px indianred'
    }

    // drop handler to control on which object is dropped dragged object
    async function dropHandler (e, dish) {
        // disable reloading of the page
        e.preventDefault()
        e.target.style.border = 'solid lightblue'
        // receiving the data from dragged object
        const drag = e.dataTransfer.getData("dishID")
        // finding needed objects to send to the db
        const dragged = dishes.find(d => d.id === Number(drag))
        const dropped = dishes.find(d => d.id === dish.id)
        // changing orders of the object in db
        await DishesService.swapRecipes(dragged, dropped)
        // finding needed indexes
        let indexDragged = dishes.findIndex(d => d.id === Number(drag))
        let indexDropped = dishes.findIndex(d => d.id === dish.id);
        // returning to the parent component data
        dnd(indexDragged, indexDropped)
    }

    return <div
        onDragStart={(e) => dragStartHandler(e, dish)}
        onDragLeave={(e) => dragEndHandler(e)}
        onDragEnd={(e) => dragEndHandler(e)}
        onDragOver={(e) => dragOverHandler(e)}
        onDrop={(e) => dropHandler(e, dish)}
        draggable={true}
        className={classes.card}
        key={dish.id}
    >
        <img className={classes.card__img} src={require('../../Images/'+dish.url)} alt="" />
        <div
            className={classes.card__content}
        >
            <strong style={{background: "white"}}>{dish.title}</strong>
            <li style={{background: "white"}}>
                Время приготовления - {dish.cookingTime} мин.
            </li>
            <li style={{background: "white"}}>
                Количество каллорий - {dish.calories} ккал.
            </li>
            <strong style={{background: "white"}}>Описание</strong>
            <p style={{background: "white"}}>
                {dish.description}
            </p>
            <button
                className={classes.card__btn}
                onClick={() => {
                    setModalActive(true)
                    fetchDishById()
                    // Uncomment if you work with J-SON server, comment if you work with golang server
                    // fetchPhotosById()
                }}
            >Полный рецепт</button>
            <MyModal
                active={modalActive}
                setActive={setModalActive}
                style={{background: "white"}}
            >
                <strong style={{background: "white"}}>{dishById.title}</strong>
                <p
                    style={{background: "white"}}
                >
                    {dishById.recipe}
                </p>
                    {photosById.length >0 && <Gallery
                        photos={photosById}
                        id ={dish.id}
                        style={{background: "white"}}
                    />}
            </MyModal>
            {isAuth
                ?
                (<button
                className={classes.card__btn}
                onClick={() => {
                    fetchRecipeByID()
                    setModal2Active(true)
                }}
            >Редактировать</button>
                ):(
                    <button disabled={true}/>
                )}
            <MyModal active={modal2Active} setActive={setModal2Active} >
                <form style={{flexDirection:"column", background:"white", display:"flex", minWidth:"400px"}} onSubmit={(e) =>{
                    changeDishByID(e)
                    setModal2Active(false)
                }}>
                    <label style={{background: "white"}}>
                        Название блюда:
                    </label>
                    <InputMy
                        value={dishChange.title}
                        onChange={e => setDishChange({...dishChange, title: e.target.value})}
                        type="text"
                        placeholder={dishChange.title}
                        required
                    />
                    <label style={{background: "white"}}>
                        Время приготовления:
                    </label>
                    <InputMy
                        value={dishChange.cookingTime}
                        onChange={e => setDishChange({...dishChange, cookingTime: e.target.value})}
                        type="number"
                        min="0"
                        placeholder={dishChange.cookingTime}
                        required
                    />
                    <label style={{background: "white"}}>
                        Количество каллорий:
                    </label>
                    <InputMy
                        value={dishChange.calories}
                        onChange={e => setDishChange({...dishChange, calories: e.target.value})}
                        type="number"
                        min="0"
                        placeholder={dishChange.calories}
                        required
                    />
                    <label style={{background: "white"}}>
                        Описание блюда:
                    </label>
                    <textarea
                        style={{background: "white", width:"auto", border: "1px solid dodgerblue"}}
                        value={dishChange.description}
                        onChange={e => setDishChange({...dishChange, description: e.target.value})}
                        placeholder={dishChange.description}
                        required
                    />
                    <label style={{background: "white"}}>
                        Полный рецепт:
                    </label>
                    <textarea
                        style={{background: "white", width:"auto", border: "1px solid dodgerblue"}}
                        value={dishChange.recipe}
                        onChange={e => setDishChange({...dishChange, recipe: e.target.value})}
                        placeholder={dishChange.recipe}
                        required
                    />
                    <MyButton >
                        Отправить отредактированный рецепт в книгу рецептов
                    </MyButton>
                </form>
            </MyModal>
            {isAuth
                ?
                (<button
                className={classes.card__btn2}
                onClick={() => {
                    remove(dish)
                    deleteDishById()
                }}
            >
                Удалить рецепт
            </button>
                ):(
                    <button disabled={true}/>
                )}
            <Comments
                dishID={dish.id}
            />
            <LikeButton dish={dish} />
        </div>
    </div>;
};

export default RecipeCard
