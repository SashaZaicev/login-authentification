import React, {useEffect} from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import {LoginPage} from './Pages/LoginPage/LoginPage';
import {UserPage} from './Pages/UserPage/UserPage';
import {useDispatch} from 'react-redux';
import {getAuthUserData} from './redux/auth-reducer';

import s from './App.module.scss'

export const PATH = {
    LOGIN: '/login',
    USER: '/user',
}

export const App: React.FC = () => {

    const dispatch = useDispatch()
    useEffect(() => {
        if (localStorage.getItem('accessToken')) {
            dispatch(getAuthUserData())
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className={s.app}>
            <div className={s.content}>
                <Switch>
                    <Route path="/" exact render={() => <Redirect to={PATH.USER}/>}/>
                    <Route path={PATH.LOGIN} exact render={() => <LoginPage/>}/>
                    <Route path={PATH.USER} exact render={() => <UserPage/>}/>
                </Switch>
            </div>
        </div>
    );
};
