import React, {useEffect, useState} from 'react';
import MyModal from "../MyModal/MyModal.js";
import DishesService from "../../API/DischesService.js";
import Comment from "../Comment/Comment.js";
import classes from "./Comments.module.css"

const Comments = ({dishID}) => {

    // Hook for controlling the state of the receipts
    const [comments, setComments] = useState([])
    //Hook for controlling the state of the comment body
    const [commentBody, setCommentBody] = useState('')
    //Hook for controlling the state of the author comment
    const [commentAuthor, setCommentAuthor] = useState('')

    // Function to receive all comments from the db
    async function fetchComments() {
        const comments = await DishesService.getAllComments(dishID)
        setComments(comments)
    }

    async function createComment(e) {
        e.preventDefault()
        const newComments = await DishesService.createComment(commentAuthor, commentBody, comments, dishID)
        setComments(newComments)
    }

    const [modalActive, setModalActive] = useState(false)
    return (
        <div>
        <button
            className={classes.comments__btn}
            onClick={() => {
            fetchComments()
            setModalActive(true)
        }} >
            Комментарии
        </button>
        <MyModal active={modalActive} setActive={setModalActive}>
            <form onSubmit={e => {
                createComment(e)
                setModalActive(false)
                setCommentBody('')
                setCommentAuthor('')
            }}>
                <input
                    style={{marginBottom:"12px"}}
                    placeholder='Ваше имя'
                    value={commentAuthor}
                    onChange={e => setCommentAuthor(e.target.value)}
                    required={true}
                />
                <textarea
                    style={{width:"650px", height:"100px"}}
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
                            setModalActive(false)
                            setCommentBody('')
                        }}
                    > Отменить </button>
            </form>
            <h3 style={{textAlign:'center', marginTop:'15px'}}>
                Комментарии к рецепту
            </h3>
            {comments.map(comment =>
            <Comment
                comment={comment}
                key={dishID + Math.random()}
            />
            )}
        </MyModal>
        </div>
    );
};

export default Comments;