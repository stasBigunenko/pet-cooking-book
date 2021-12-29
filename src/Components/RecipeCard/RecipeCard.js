import React, {useState} from 'react';
import classes from './RecipeCard.module.css'
import MyModal from "../MyModal/MyModal.js";
import DishesService from "../../API/DischesService.js";
import Gallery from "../Gallery/Carusel.js";

const RecipeCard = ({dish, remove}) => {

    const [modalActive, setModalActive] = useState(false)
    const [dishById, setDishById] = useState({})
    const [photosById, setPhotosById] = useState([])

    async function fetchDishById() {
        const dishById = await DishesService.getDishByID(dish.id)
        setDishById(dishById)
    }

    async function fetchPhotosById() {
        const photosById = await DishesService.getPhotosByID(dish.id)
        setPhotosById(photosById)
    }

    async function deleteDishById() {
        await DishesService.deleteDishByID(dish.id)
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

export default RecipeCard;
