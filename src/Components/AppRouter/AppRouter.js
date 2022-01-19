import React from 'react';
import {Redirect, Route, Switch} from "react-router-dom";
import {routes} from "../Router/Routes.js";

const AppRouter = () => {
    // switch between all available routes of the project
    return (
        <Switch>
            {routes.map(route =>
                <Route
                    component={route.component}
                    path={route.path}
                    exact={route.exact}
                    key={route.path}
                />
            )}
            <Redirect to='/recipes'/>
        </Switch>
    );
};

export default AppRouter;