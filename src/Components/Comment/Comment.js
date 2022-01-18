import React from 'react';

const Comment = ({comment}) => {
    // Show comments
    return (
        <div key={comment.id} style={{borderBottom: "solid black 0.5px", marginTop:'10px', marginLeft:"5px", alignContent:"center", justifyContent:'center'}}>
            <h4 style={{margin:"5px"}}
            >Автор: {comment.author}</h4>
            {comment.body}
        </div>
    );
};

export default Comment;