import React from 'react';
import classes from "./Comments.module.css"
import {useHistory} from "react-router-dom";


const Comments = ({dishID}) => {
    // Hook of react-dom library
    const router = useHistory()

    return (
        <button
            className={classes.comments__btn}
            onClick={() => {
                router.push(`/recipes/${dishID}`)
        }} >
            Комментарии
        </button>
    );
};

export default Comments;