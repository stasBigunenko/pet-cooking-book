import React from 'react';

const Comment = ({comment}) => {
    return (
        <div style={{borderBottom: "solid black 0.5px", marginTop:'10px'}}>
            <h4>{comment.name}</h4>
            {comment.body}
        </div>
    );
};

export default Comment;