import React, {useContext} from 'react';
import {Redirect, Route, Switch} from "react-router-dom";
import {routes} from "../Router/Routes.js";

const AppRouter = () => {

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