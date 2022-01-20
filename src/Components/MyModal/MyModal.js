import React from 'react';
import classes from './MyModal.module.css'

// Created component which can be reused in the whole project
const MyModal = ({active, setActive, children}) => {

    const rootClasses = [classes.myModal]
    const rootContClasses = [classes.myModalContent]

    if (active) {
        rootClasses.push(classes.active)
        rootContClasses.push(classes.active)
    }

    return (
        <div
            className={rootClasses.join(' ')}
            onClick={() => setActive(false)}
        >
            <div
                // className={classes.myModalContent}
                className={rootContClasses.join(' ')}
                onClick={e => e.stopPropagation()}
                >
                {children}
            </div>
        </div>
    );
};

export default MyModal;