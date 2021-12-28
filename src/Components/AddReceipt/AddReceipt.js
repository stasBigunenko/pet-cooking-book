import React, {useState} from 'react';
import MyButton from "../MyButton/MyButton.js";
import MyModal from "../MyModal/MyModal.js";
import classes from "./AddReceipt.module.css";
import InputMy from "../Input/InputMy.js";
import DishesService from "../../API/DischesService.js";
import UploadForm from "../UploadForm/UploadForm.js";


const AddReceipt = ({dishes, setDishes}) => {

    const [modalAddReceipt, setModalAddReceipt] = useState(false)

    const [dish, setDish] = useState({
        title: '',
        cookingTime: '',
        callories: '',
        description: '',
        receipt: ''
    })

    function addNewReceipt(dish, dishes) {
        DishesService.createNewDish(dish, dishes)
    }

    const addReceipt = () => {
        addNewReceipt(dish, dishes)
        setDish({
            title: '',
            cookingTime: '',
            callories: '',
            description: '',
            receipt: ''
        })
    }

    return (
        <div>
            <MyButton
                className={classes.addRec__btn}
                onClick={() => {
                    setModalAddReceipt(true)
                }}>
                Добавить рецепт
            </MyButton>
            <MyModal active={modalAddReceipt} setActive={setModalAddReceipt} >
                <form>
                    <InputMy
                        value={dish.title}
                        onChange={e => setDish({...dish, title: e.target.value})}
                        type="text"
                        placeholder="Название блюда"
                    />
                    <InputMy
                        value={dish.cookingTime}
                        onChange={e => setDish({...dish, cookingTime: e.target.value})}
                        type="text"
                        placeholder="Время приготовления (мин)"
                    />
                    <InputMy
                        value={dish.callories}
                        onChange={e => setDish({...dish, callories: e.target.value})}
                        type="text"
                        placeholder="Кол-во калорий (ккал)"
                    />
                    <InputMy
                        value={dish.description}
                        onChange={e => setDish({...dish, description: e.target.value})}
                        type="text"
                        placeholder="Описание блюда"
                    />
                    <InputMy
                        value={dish.receipt}
                        onChange={e => setDish({...dish, receipt: e.target.value})}
                        type="text"
                        placeholder="Рецепт"
                    />
                    <UploadForm/>
                    <MyButton
                        onClick={addReceipt}
                    >
                        Добавить рецепт в книгу рецептов
                    </MyButton>
                </form>
            </MyModal>
        </div>
    );
};

export default AddReceipt;