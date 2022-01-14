import React from 'react';
import RecipeCard from "../RecipeCard/RecipeCard.js";

// Component that control the list of receipts and forwarded to the next component only 1 dish from the list with some props
const DishList = ({dishes, remove, change, dnd}) => {

    return (
        <div>
            <h1 style={{marginTop: '20px', textAlign: 'center'}}>
                Список рецептов
            </h1>
            {dishes.map(dish =>
                <RecipeCard
                    change={change}
                    remove={remove}
                    dish={dish}
                    key={dish.id}
                    dnd={dnd}
                    dishes={dishes}
                />
            )}
        </div>
    );
};

export default DishList;