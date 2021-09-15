import React, { FC } from 'react';
import { Route, Redirect } from "react-router-dom";


// 8b2579f4332f466805d30651b9d6a927 
const GuardedRoute = ({ component: Component, auth, ...rest }: any) => (
    <Route {...rest} render={(props) => (
        auth === true || localStorage.getItem('myKey') === '8b2579f4332f466805d30651b9d6a927'
            ? <Component {...props} />
            : <Redirect to='/' />
    )} />
)

export default GuardedRoute;