import React, {useContext, useEffect, useState} from 'react';
import classes from './LikeButton.module.css'
import DishesService from "../../API/DischesService.js";
import {AuthContext} from "../Context/AuthContext.js";

// Component with like, dislike button and quantity
const LikeButton = ({dish}) => {
    // Hook that controlling the state of likes
    const [likes, setLikes] = useState(dish)
    // Hook to controll if the likeButton have been clicked already
    const [isliked, setIsLiked] = useState(false)
    // Context hook to check if the user logged
    const {isAuth} = useContext(AuthContext)

    // Increment function - increase likes at every click
    function increment() {
        setLikes({...likes, likes:likes.likes+1})
        setIsLiked(true)
    }
    // Decrement function - decrease likes at every click
    function decrement() {
        setLikes({...likes, likes:likes.likes-1})
        setIsLiked(true)
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
        <div style={{background: "white"}}>
            {isAuth
                ?
                (<button
                className={classes.likeButton}
                onClick={() => {
                    if (!isliked) {
                        increment()
                    }
                }}

            >
                <img src={require('../../Images/Likes/like.png')} alt=''/>
            </button>
                ):(
                    <button disabled={true}/>
                )}
            {isAuth
                ?
                (<button
                className={classes.likeButton}
                onClick={() => {
                    if (!isliked) {
                        decrement()
                    }
                }}
            >
                <img src={require('../../Images/Likes/dislike.png')} alt=''/>
            </button>
                ):(
                    <button disabled={true}/>
                )}
            <p
                style={{color:"dodgerblue", background:"white", fontWeight: "bold"}}
            >Likes: {likes.likes}</p>
        </div>
    );
};

export default LikeButton;