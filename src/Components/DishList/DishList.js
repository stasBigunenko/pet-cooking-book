import React from 'react';
import RecipeCard from "../RecipeCard/RecipeCard.js";

const DishList = ({dishes, remove}) => {
    return (
        <div>
            <h1 style={{marginTop: '20px', textAlign: 'center'}}>
                Список рецептов
            </h1>
            {dishes.map(dish =>
                <RecipeCard remove={remove} dish={dish} key={dish.id} />
            )}
        </div>
    );
};

export default DishList;