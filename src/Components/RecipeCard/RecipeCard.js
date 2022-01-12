import React, {useState} from 'react';
import classes from './RecipeCard.module.css'
import MyModal from "../MyModal/MyModal.js";
import DishesService from "../../API/DischesService.js";
import Gallery from "../Gallery/Carusel.js";
import InputMy from "../Input/InputMy.js";
import MyButton from "../MyButton/MyButton.js";
import LikeButton from "../LikeButton/LikeButton.js";

// Component with the main functions and hooks
const RecipeCard = ({dish, remove, change, changedLikes, dnd, dishes}) => {
    // Hook to control the state of the modal window for the "Полный рецепт"
    const [modalActive, setModalActive] = useState(false)
    // Hook to control the state of the modal window for the "Редактировать рецепт"
    const [modal2Active, setModal2Active] = useState(false)
    // Hook to control the state of the receipt from db
    const [dishById, setDishById] = useState({})
    // Hook to control the state of the photos TODO
    const [photosById, setPhotosById] = useState([])
    // Hook to control the state with changed dish
    const [dishChange, setDishChange] = useState({})
    // Hook to control the state of the changed receipt
    const [updatedDish, setUpdatedDish] = useState({})

    // Function to receive data from db and insert in the inputs
    async function fetchReceiptByID() {
        const dishChange = await DishesService.getReceiptByID(dish.id)
        // Changed the state of the hook
        setDishChange(dishChange)
    }

    // Function to receive data from db from the 2d table
    async function fetchDishById() {
        const dishById = await DishesService.getDishByID(dish.id)
        // Changed the state of the hook
        setDishById(dishById)
    }

    // Function to receive data from db from the 3d table (photos for carousel)
    async function fetchPhotosById() {
        // created new variable to receive the data from the function
        const photosById = await DishesService.getPhotosByID(dish.id)
        // Changed the state of the hook
        setPhotosById(photosById)
    }

    // Function to delete the receipt by id from db
    async function deleteDishById() {
        await DishesService.deleteDishByID(dish.id)
    }

    // Function to change the receipt by id in db-s
    async function changeDishByID (e) {
        // disable reloading of the page
        e.preventDefault()
        // created new variable to receive the data from the function
        const newDish = await DishesService.putDishByID(dishChange)
        // add needed data to the new object
        const newReceipt = {
            id: newDish.id,
            order: newDish.order,
            title: newDish.title,
            cookingTime: newDish.cookingTime,
            calories: newDish.calories,
            description: newDish.description,
            url: newDish.url,
            likes: newDish.likes
        }
        // Changed the state of the hook
        setUpdatedDish(newReceipt)
        // checking if the newReceipt exist
        if (newReceipt) {
            // reload the page
            window.location.reload(false)
        }
    }

    function dragStartHandler (e, dish) {
        e.dataTransfer.setData("dishID", dish.id)
    }

    function dragEndHandler(e) {
        e.target.style.background = 'white'
    }

    function dragOverHandler (e) {
        e.preventDefault()
        e.target.style.background = 'lightgray'
    }

    function dropHandler (e, dish) {
        e.preventDefault()
        e.target.style.background = 'white'
        const dragged = e.dataTransfer.getData("dishID")
        const drag = dishes.findIndex(d => d.id == dragged)
        const dropped = dishes.findIndex(d => d.id === dish.id)
        DishesService.swapReceipts(dishes[drag], dishes[dropped])
        const buff = dishes[drag]
        dishes[drag] = dishes[dropped]
        dishes[dropped] = buff
        dnd(dishes)
    }

    return <div
        onDragStart={(e) => dragStartHandler(e, dish)}
        onDragLeave={(e) => dragEndHandler(e)}
        onDragEnd={(e) => dragEndHandler(e)}
        onDragOver={(e) => dragOverHandler(e)}
        onDrop={(e) => dropHandler(e, dish)}
        draggable={true}
        className={classes.card}
    >
        <img className={classes.card__img} src={require('../../Images/'+dish.url)} alt="" />
        <div
            className={classes.card__content}
        >
            <strong>{dish.title}</strong>
            <li>
                Время приготовления - {dish.cookingTime} мин.
            </li>
            <li>
                Количество каллорий - {dish.calories} ккал.
            </li>
            <strong>Описание</strong>
            <p>
                {dish.description}
            </p>
            <button
                className={classes.card__btn}
                onClick={() => {
                    setModalActive(true)
                    fetchDishById()
                    fetchPhotosById()
                }}
            >Полный рецепт</button>
            <MyModal active={modalActive} setActive={setModalActive} >
                <strong>{dishById.title}</strong>
                <p>{dishById.receipt}</p>
                {photosById.length >0 && <Gallery photos={photosById} id ={dish.id}/>}
            </MyModal>
            <button
                className={classes.card__btn}
                onClick={() => {
                    fetchReceiptByID()
                    setModal2Active(true)
                }}
            >Редактировать</button>
            <MyModal active={modal2Active} setActive={setModal2Active} >
                <form onSubmit={(e) =>{
                    changeDishByID(e)
                    change(updatedDish)
                }}>
                    <InputMy
                        value={dishChange.title}
                        onChange={e => setDishChange({...dishChange, title: e.target.value})}
                        type="text"
                        placeholder={dishChange.title}
                        required
                    />
                    <InputMy
                        value={dishChange.cookingTime}
                        onChange={e => setDishChange({...dishChange, cookingTime: e.target.value})}
                        type="number"
                        min="0"
                        placeholder={dishChange.cookingTime}
                        required
                    />
                    <InputMy
                        value={dishChange.calories}
                        onChange={e => setDishChange({...dishChange, calories: e.target.value})}
                        type="number"
                        min="0"
                        placeholder={dishChange.calories}
                        required
                    />
                    <InputMy
                        value={dishChange.description}
                        onChange={e => setDishChange({...dishChange, description: e.target.value})}
                        type="text"
                        placeholder={dishChange.description}
                        required
                    />
                    <InputMy
                        value={dishChange.receipt}
                        onChange={e => setDishChange({...dishChange, receipt: e.target.value})}
                        type="text"
                        placeholder={dishChange.receipt}
                        required
                    />
                    <MyButton>
                        Отправить отредактированный рецепт в книгу рецептов
                    </MyButton>
                </form>
            </MyModal>
            <button
                className={classes.card__btn2}
                onClick={() => {
                    remove(dish)
                    deleteDishById()
                }}
            >
                Удалить рецепт
            </button>
            <LikeButton dish={dish} changedLikes={changedLikes}/>
        </div>
    </div>;
};

export default RecipeCard
