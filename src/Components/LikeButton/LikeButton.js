import React, {useEffect, useState} from 'react';
import classes from './LikeButton.module.css'
import DishesService from "../../API/DischesService.js";

const LikeButton = ({dish, changedLikes}) => {
    const [likes, setLikes] = useState(dish)

    function increment() {
        setLikes({...likes, likes:likes.likes+1})
        // likesById(likes)
    }

    function decrement() {
        setLikes({...likes, likes:likes.likes-1})
        // likesById(likes)
    }

    useEffect( () => {
        likesById(likes)
    },[likes])

    async function likesById(likes) {
        await DishesService.likesByID(likes)
    }

    return (
        <div>
            <button
                className={classes.likeButton}
                onClick={() => {
                    increment()
                    changedLikes(likes)
                }}
            >
                <img src={require('../../Images/Likes/like.png')} alt=''/>
            </button>
            <button
                className={classes.likeButton}
                onClick={() => {
                    decrement()
                    changedLikes(likes)
                }}
            >
                <img src={require('../../Images/Likes/dislike.png')} alt=''/>
            </button>
            <p>{likes.likes}</p>
        </div>
    );
};

export default LikeButton;