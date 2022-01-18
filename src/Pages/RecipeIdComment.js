import React, {useContext, useEffect, useState} from 'react';
import {useHistory, useParams} from 'react-router-dom'
import DishesService from "../API/DischesService.js";
import classes from "../Components/Comments/Comments.module.css";
import Comment from "../Components/Comment/Comment.js";
import {AuthContext} from "../Components/Context/AuthContext.js";

const RecipeIdComment = () => {
    //hooks returns an object of key/value pair
    const params = useParams()
    //hooks that let access the state of the router
    const router = useHistory()
    // Hook for controlling the state of the receipts
    const [comments, setComments] = useState([])
    //Hook for controlling the state of the comment body
    const [commentBody, setCommentBody] = useState('')
    //Hook for controlling the state of the author comment
    const [commentAuthor, setCommentAuthor] = useState('')

    const {author} = useContext(AuthContext)

    // Hook to load all the comments
    useEffect(() => {
        fetchComments()
    },[])

    // Function to receive all comments from the db
    async function fetchComments() {
        const comments = await DishesService.getAllComments(params.id)
        setComments(comments)
    }

    // Function taht add a new comment to the db
    async function createComment(e) {
        e.preventDefault()
        const newComments = await DishesService.createComment(author, commentBody, comments, params.id)
        setComments(newComments)
    }

    return (
        <div style={{justifyContent:'center', alignContent:'center'}}>
            <form
                onSubmit={e => {
                    createComment(e)
                    setCommentBody('')
                    setCommentAuthor('')
                }}>
                {/*<input*/}
                {/*    style={{marginBottom:"12px", justifySelf:"center", margin:"12px"}}*/}
                {/*    placeholder='Ваше имя'*/}
                {/*    value={commentAuthor}*/}
                {/*    onChange={e => setCommentAuthor(e.target.value)}*/}
                {/*    required={true}*/}
                {/*/>*/}
                <textarea
                    style={{width:"670px", height:"100px", justifyContent:'center', alignContent:'center'}}
                    placeholder='Оставьте свой комментарий здесь...'
                    value={commentBody}
                    onChange={e => setCommentBody(e.target.value)}
                    required={true}
                />
                <input
                    className={classes.comments__btn2}
                    type="submit"
                    value="Добавить"
                />
                <button
                    className={classes.comments__btn3}
                    onClick={(e) => {
                        e.preventDefault()
                        router.push(`/recipes`)
                        setCommentBody('')
                    }}
                > Вернуться к списку рецептов </button>
            </form>
            <h3 style={{textAlign:'center', marginTop:'15px'}}>
                Комментарии к рецепту
            </h3>
            {comments.map(comment =>
                <Comment
                    comment={comment}
                    key={params.id + Math.random()}
                />
            )}
        </div>
    );
};

export default RecipeIdComment;