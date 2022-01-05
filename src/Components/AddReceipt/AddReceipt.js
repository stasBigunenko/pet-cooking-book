import React, {useState} from 'react';
import MyButton from "../MyButton/MyButton.js";
import MyModal from "../MyModal/MyModal.js";
import classes from "./AddReceipt.module.css";
import InputMy from "../Input/InputMy.js";
import DishesService from "../../API/DischesService.js";

const AddReceipt = ({dishes, create}) => {

    const [modalAddReceipt, setModalAddReceipt] = useState(false)
    const [newReceipt, setNewReceipt] = useState({})
    const [dish, setDish] = useState({
        title: '',
        cookingTime: '',
        callories: '',
        description: '',
        receipt: '',
    })

    async function addNewReceipt(e) {
        e.preventDefault()
        const newDish = await DishesService.createNewDish(dish, dishes)
        const newReceipt = {
            id: newDish.id,
            title: newDish.title,
            cookingTime: newDish.cookingTime,
            callories: newDish.callories,
            description: newDish.description,
            url: newDish.url
        }
        setNewReceipt(newReceipt)

        setDish({
            title: '',
            cookingTime: '',
            callories: '',
            description: '',
            receipt: '',
        })
        if (newReceipt) {
            window.location.reload(false)
        }
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
                    <MyButton
                        onClick={(e) => {
                            addNewReceipt(e)
                            create(newReceipt)
                        }}
                    >
                        Добавить рецепт в книгу рецептов
                    </MyButton>
                </form>
            </MyModal>
        </div>
    );
};

export default AddReceipt;