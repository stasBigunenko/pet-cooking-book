import React from 'react';
import classes from './MyButton.module.css'

//props.children TODO

const MyButton = ({children, ...props}) => {
    return (
        <button {...props} className={classes.myBtn}>
            {children}
        </button>
    );
};

export default MyButton;