import React from 'react';
import {Route, Switch} from "react-router-dom";
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
        </Switch>
    );
};

export default AppRouter;