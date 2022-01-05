import React from 'react';
import classes from './MainText.module.css'

// Simple component to divide unnecessary information from the main component
const MainText = () => {
    return (
        <div className={classes.MainText}>
        <p>
            Ниже вы найдете много интересных и вкусных рецептов блюд,
            а самое главное:
        </p>
        <p>
            простых в приготовлении и со стандартными ингридиентами.
        </p>
        <p>
            Приятного аппетита!
        </p>
        </div>

    );
};

export default MainText;