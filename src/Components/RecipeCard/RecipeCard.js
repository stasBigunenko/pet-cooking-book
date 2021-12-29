import React, {useState} from 'react';
import classes from './RecipeCard.module.css'
import MyModal from "../MyModal/MyModal.js";
import DishesService from "../../API/DischesService.js";
import Gallery from "../Gallery/Carusel.js";
import InputMy from "../Input/InputMy.js";
import UploadForm from "../UploadForm/UploadForm.js";
import MyButton from "../MyButton/MyButton.js";

const RecipeCard = ({dish, remove, change}) => {

    const [modalActive, setModalActive] = useState(false)
    const [modal2Active, setModal2Active] = useState(false)
    const [dishById, setDishById] = useState({})
    const [photosById, setPhotosById] = useState([])
    const [dishChange, setDishChange] = useState({})
    const [updatedDish, setUpdatedDish] = useState({})

    async function fetchReceiptByID() {
        const dishChange = await DishesService.getReceiptByID(dish.id)
        setDishChange(dishChange)
    }

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

    // sleep time expects milliseconds
    function sleep (time) {
        return new Promise((resolve) => setTimeout(resolve, time));
    }

    const changeDishByID = (e) => {
        const newDish = DishesService.putDishByID(dishChange)
        e.preventDefault()

        sleep(1500).then(() => {
            const newReceipt = {
                id: newDish.id,
                title: newDish.title,
                cookingTime: newDish.cookingTime,
                callories: newDish.callories,
                description: newDish.description
            }
            setUpdatedDish(newReceipt)
            window.location.reload(false);
        })
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
                    <UploadForm/>
                    <MyButton
                        onClick={(e) =>{
                            changeDishByID(e)
                            change(updatedDish)
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

export default RecipeCard;
