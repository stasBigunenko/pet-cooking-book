import React from 'react';
import RecipeCard from "../RecipeCard/RecipeCard.js";

const DishList = ({dishes, remove, change}) => {
    return (
        <div>
            <h1 style={{marginTop: '20px', textAlign: 'center'}}>
                Список рецептов
            </h1>
            {dishes.map(dish =>
                <RecipeCard change={change} remove={remove} dish={dish} key={dish.id} />
            )}
        </div>
    );
};

export default DishList;