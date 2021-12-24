import React, {useState} from 'react';
import classes from './RecipeCard.module.css'
import MyModal from "../MyModal/MyModal.js";
import MyButton from "../MyButton/MyButton.js";
import DishesService from "../../API/DischesService.js";
import Gallery from "../Gallery/Carusel.js";

const RecipeCard = ({dish}) => {

    const [modalActive, setModalActive] = useState(false)
    const [dishById, setDishById] = useState({})
    const [isHover, setIsHover] = useState(false)
    const [photosById, setPhotosById] = useState([])

    async function fetchDishById() {
        const dishById = await DishesService.getDishByID(dish.id)
        setDishById(dishById)
    }

    async function fetchPhotosById() {
        const photosById = await DishesService.getPhotosById(dish.id)
        setPhotosById(photosById)
    }

    return (
        <div className={classes.card}>

            <button
                onClick={() => {
                    setIsHover(true)
                    fetchPhotosById()
                }}>
                    <img className={classes.card__img} src={require("../../Images/"+dish.url)} alt="" />
            </button>
            <MyModal active={isHover} setActive={setIsHover} >
                <Gallery photos={photosById} id ={dish.id}/>
            </MyModal>

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
                <MyButton
                    className={classes.card__btn}
                    onClick={() => {
                        setModalActive(true)
                        fetchDishById()
                    }}
                >Полный рецепт</MyButton>
                <MyModal active={modalActive} setActive={setModalActive} >
                    <strong>{dishById.title}</strong>
                    <p>{dishById.receipt}</p>
                </MyModal>
            </div>
        </div>
    );
};

export default RecipeCard;
