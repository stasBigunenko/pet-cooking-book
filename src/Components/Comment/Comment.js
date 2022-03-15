import React from 'react';

const Comment = ({comment}) => {
    // Show comments
    return (
        <div key={comment.id} style={{background:"white", borderBottom: "solid black 0.5px", marginTop:'10px', marginLeft:"5px", alignContent:"center", justifyContent:'center'}}>
            <h4 style={{margin:"5px", background:"white"}}
            >Автор: {comment.author}</h4>
            {comment.comment}
        </div>
    );
};

export default Comment;