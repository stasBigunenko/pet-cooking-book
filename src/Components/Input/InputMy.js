import React from 'react';
import classes from './InputMy.module.css'

const InputMy = React.forwardRef((props, ref) => {
    return (
        <input ref={ref} className={classes.inputMy} {...props}/>
    );
});

export default InputMy;