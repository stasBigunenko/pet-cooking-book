import React from 'react';
import RecipeCard from "../RecipeCard/RecipeCard.js";
import classes from "./DishList.module.css"

// Component that control the list of receipts and forwarded to the next component only 1 dish from the list with some props
const DishList = ({dishes, remove, change, dnd}) => {

    return (
        <div style={{
            display:"flex",
            flexWrap:"wrap",
            justifyContent:"space-around"
        }}>
            {dishes.map(dish =>
                <RecipeCard
                    className={classes.dishlist}
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