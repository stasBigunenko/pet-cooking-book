import React from 'react';
import {Redirect, Route, Switch} from "react-router-dom";
import Recipes from "../../Pages/Recipes.js";
import RecipeIdComment from "../../Pages/RecipeIdComment.js";

const AppRouter = () => {
    return (
        <Switch>
            <Route exact path="/recipes">
                <Recipes/>
            </Route>
            <Route exact path="/recipes/:id">
                <RecipeIdComment/>
            </Route>
            <Redirect to="/recipes"/>
        </Switch>
    );
};

export default AppRouter;