import React from 'react';
import classes from './InputMy.module.css'

// Created component which can be reused in the whole project
const InputMy = (props) => {
    return (
        <input className={classes.inputMy} {...props}/>
    );
};

export default InputMy;