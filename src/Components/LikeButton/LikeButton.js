import React, {useEffect, useState} from 'react';
import classes from './LikeButton.module.css'
import DishesService from "../../API/DischesService.js";

// Component with like, dislike button and quantity
const LikeButton = ({dish, changedLikes}) => {
    // Hook that controlling the state of likes
    const [likes, setLikes] = useState(dish)
    // Increment function - increase likes at every click
    function increment() {
        setLikes({...likes, likes:likes.likes+1})
    }
    // Decrement function - decrease likes at every click
    function decrement() {
        setLikes({...likes, likes:likes.likes-1})
    }

    // Hook controlling the async function and changes of the likes state
    useEffect( () => {
        likesById()
    },[likes])

    // Function that change the likes in db
    async function likesById() {
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