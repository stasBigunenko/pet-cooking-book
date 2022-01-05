import React, {useState} from 'react';
import classes from './RecipeCard.module.css'
import MyModal from "../MyModal/MyModal.js";
import DishesService from "../../API/DischesService.js";
import Gallery from "../Gallery/Carusel.js";
import InputMy from "../Input/InputMy.js";
import MyButton from "../MyButton/MyButton.js";

// Component with the main functions and hooks
const RecipeCard = ({dish, remove, change}) => {
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

    //
    const changeDishByID = (e) => {
        // disable reloading of the page
        e.preventDefault()
        // created new variable to receive the data from the function
        const newDish = DishesService.putDishByID(dishChange)
        // add needed data to the new object
        const newReceipt = {
            id: newDish.id,
            title: newDish.title,
            cookingTime: newDish.cookingTime,
            callories: newDish.callories,
            description: newDish.description
        }
        // Changed the state of the hook
        setUpdatedDish(newReceipt)
        // checking if the newReceipt exist
        if (newReceipt) {
            // reload the page
            window.location.reload(false)
        }
    }

    return <div className={classes.card}>
        <img className={classes.card__img} src={require('../../Images/'+dish.url)} alt="" />
        <div className={classes.card__content}>
            <strong>{dish.title}</strong>
            <li>
                Время приготовления - {dish.cookingTime} мин.
            </li>
            <li>
                Количество каллорий - {dish.callories} ккал.
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
                <form>
                    <InputMy
                        value={dishChange.title}
                        onChange={e => setDishChange({...dishChange, title: e.target.value})}
                        type="text"
                        placeholder={dishChange.title}
                    />
                    <InputMy
                        value={dishChange.cookingTime}
                        onChange={e => setDishChange({...dishChange, cookingTime: e.target.value})}
                        type="text"
                        placeholder={dishChange.cookingTime}
                    />
                    <InputMy
                        value={dishChange.callories}
                        onChange={e => setDishChange({...dishChange, callories: e.target.value})}
                        type="text"
                        placeholder={dishChange.callories}
                    />
                    <InputMy
                        value={dishChange.description}
                        onChange={e => setDishChange({...dishChange, description: e.target.value})}
                        type="text"
                        placeholder={dishChange.description}
                    />
                    <InputMy
                        value={dishChange.receipt}
                        onChange={e => setDishChange({...dishChange, receipt: e.target.value})}
                        type="text"
                        placeholder={dishChange.receipt}
                    />
                    {/*<UploadForm/>*/}
                    <MyButton
                        onClick={(e) =>{
                            changeDishByID(e)
                            change(updatedDish)
                            setModal2Active(false)
                        }}
                    >
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
        </div>
    </div>;
};

export default RecipeCard
