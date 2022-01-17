import React from 'react';

const Comment = ({comment}) => {
    return (
        <div style={{borderBottom: "solid black 0.5px", marginTop:'10px', marginLeft:"5px", alignContent:"center", justifyContent:'center'}}>
            <h4 style={{margin:"5px"}}
            >{comment.author}</h4>
            {comment.body}
        </div>
    );
};

export default Comment;