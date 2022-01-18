import Recipes from "../../Pages/Recipes.js";
import React from "react";
import RecipeIdComment from "../../Pages/RecipeIdComment.js";
import Login from "../../Pages/Login.js";
import Registration from "../../Pages/Registration.js";

export const routes = [
    {path: '/recipes', component: Recipes, exact: true},
    {path: '/recipes/:id', component: RecipeIdComment, exact: true},
    {path: '/login', component: Login, exact: true},
    {path: '/registration', component: Registration, exact: true}
]