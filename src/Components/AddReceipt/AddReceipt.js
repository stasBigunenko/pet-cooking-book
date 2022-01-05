import React, {useState} from 'react';
import MyButton from "../MyButton/MyButton.js";
import MyModal from "../MyModal/MyModal.js";
import classes from "./AddReceipt.module.css";
import InputMy from "../Input/InputMy.js";
import DishesService from "../../API/DischesService.js";

// Component that create new receipt
const AddReceipt = ({dishes, create}) => {

    // Hook to control the state of the modal window
    const [modalAddReceipt, setModalAddReceipt] = useState(false)

    // Hook to control the state of the new receipt
    const [newReceipt, setNewReceipt] = useState({})

    // Hook to control the state of the data in the modal window
    const [dish, setDish] = useState({
        title: '',
        cookingTime: '',
        calories: '',
        description: '',
        receipt: '',
    })

    // Function to add a new receipt
    async function addNewReceipt(e) {
        // disable reloading of the page
        e.preventDefault()
        // created new variable to receive the data from the function
        const newDish = await DishesService.createNewDish(dish, dishes)
        // add needed data to the new object
        const newReceipt = {
            id: newDish.id,
            title: newDish.title,
            cookingTime: newDish.cookingTime,
            calories: newDish.calories,
            description: newDish.description,
            url: newDish.url
        }

        // changed the state of the hook
        setNewReceipt(newReceipt)

        // changed the state of the hook
        setDish({
            title: '',
            cookingTime: '',
            calories: '',
            description: '',
            receipt: '',
        })
        // checking if the newReceipt exist
        if (newReceipt) {
            // reload the page
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
                        value={dish.calories}
                        onChange={e => setDish({...dish, calories: e.target.value})}
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