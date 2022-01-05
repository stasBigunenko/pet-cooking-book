import React from 'react';
import classes from './MyButton.module.css'

// Created component which can be reused in the whole project
const MyButton = ({children, ...props}) => {
    return (
        <button {...props} className={classes.myBtn}>
            {children}
        </button>
    );
};

export default MyButton;