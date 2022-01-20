import React from 'react';
import classes from './Title.module.css'

// Simple component to divide unnecessary information from the main component
const Title = () => {
    return (
            <div className={classes.Title}>
                <h1>Книга рецептов</h1>
            </div>
    );
};

export default Title;