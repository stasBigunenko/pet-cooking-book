import React from 'react';
import classes from './MyModal.module.css'

const MyModal = ({active, setActive, children}) => {

    const rootClasses = [classes.modal]
    const rootContClasses = [classes.modal__content]

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
                className={rootContClasses.join(' ')}
                onClick={e => e.stopPropagation()}
                >
                {children}
            </div>
        </div>
    );
};

export default MyModal;