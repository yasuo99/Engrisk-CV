import React from 'react'
import { decodeToken, useJwt } from 'react-jwt';
import { useDispatch, useSelector } from 'react-redux'
import { Redirect, Route } from 'react-router-dom';
import routes from '../routes';

const GuardRoute = ({ path, exact, Component, guard, roles }) => {
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const account = JSON.parse(localStorage.getItem('account'));
    if (guard) {
        const token = localStorage.getItem('token');
        const decodedToken = decodeToken(token);
        console.log(decodedToken);
        if (isLoggedIn) {
            if (roles.length > 0) {
                console.log(roles);
                if (Array.isArray(decodedToken.role)) {
                    return decodedToken.role.some(el => roles.includes(el)) ? (
                        <Route path={path} exact={exact} render={props => {
                            const crumbs = routes
                                // Get all routes that contain the current one.
                                .filter(({ path }) => props.match.path.includes(path))
                                // Swap out any dynamic routes with their param values.
                                // E.g. "/pizza/:pizzaId" will become "/pizza/1"
                                .map(({ path, ...rest }) => ({
                                    path: Object.keys(props.match.params).length
                                        ? Object.keys(props.match.params).reduce(
                                            (path, param) => path.replace(
                                                `:${param}`, props.match.params[param]
                                            ), path
                                        )
                                        : path,
                                    ...rest
                                }));
                            return (
                                <Component {...props} crumbs={crumbs}/>
                            );
                        }} />
                    ) : (<Redirect to={{ pathname: "/access-denied", state: { url: window.location.pathname } }}></Redirect>);
                }
                else {
                    return roles.some(el => el === decodedToken.role) ? (<Route path={path} exact={exact} render={props => {
                        const crumbs = routes
                            // Get all routes that contain the current one.
                            .filter(({ path }) => props.match.path.includes(path))
                            // Swap out any dynamic routes with their param values.
                            // E.g. "/pizza/:pizzaId" will become "/pizza/1"
                            .map(({ path, ...rest }) => ({
                                path: Object.keys(props.match.params).length
                                    ? Object.keys(props.match.params).reduce(
                                        (path, param) => path.replace(
                                            `:${param}`, props.match.params[param]
                                        ), path
                                    )
                                    : path,
                                ...rest
                            }));
                        return (
                            <Component {...props} test={crumbs}/>
                        );
                    }} />) : (<Redirect to={{ pathname: "/access-denied", state: { url: window.location.pathname } }}></Redirect>);
                }
            }
            else {
                return (<Route path={path} exact={exact} component={Component} />);
            }
        }
        else {
            return (<Redirect to={{ pathname: "/access-denied", state: { url: window.location.pathname } }}></Redirect>);
        }
    }
    else {
        return (
            <Route path={path} exact={exact}
                render={props => {
                    const crumbs = routes
                        // Get all routes that contain the current one.
                        .filter(({ path }) => props.match.path.includes(path))
                        // Swap out any dynamic routes with their param values.
                        // E.g. "/pizza/:pizzaId" will become "/pizza/1"
                        .map(({ path, ...rest }) => ({
                            path: Object.keys(props.match.params).length
                                ? Object.keys(props.match.params).reduce(
                                    (path, param) => path.replace(
                                        `:${param}`, props.match.params[param]
                                    ), path
                                )
                                : path,
                            ...rest
                        }));
                    return (
                        <Component {...props} />
                    );
                }}
            />)
    }
}
export default GuardRoute