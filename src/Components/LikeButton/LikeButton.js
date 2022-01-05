import React, {useState} from 'react';
import classes from './LikeButton.module.css'

const LikeButton = () => {
    const [likes, setLikes] = useState(0)

    function increment() {
        setLikes(likes + 1)
    }

    function decrement() {
        setLikes(likes - 1)
    }

    return (
        <div>
            <button
                className={classes.likeButton}
                onClick={increment}
            >
                <img src={require('../../Images/Likes/like.png')}/>
            </button>
            <button
                className={classes.likeButton}
                onClick={decrement}
            >
                <img src={require('../../Images/Likes/dislike.png')}/>
            </button>
            <p>{likes}</p>
        </div>
    );
};

export default LikeButton;