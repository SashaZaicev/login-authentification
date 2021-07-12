import React, {useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {selectorAppError, selectorIsLogged, selectorRequestStatus} from '../UserPage/selectors';
import {login} from '../../redux/auth-reducer';
import {FormValues, LoginForm} from '../../Components/LoginForm/LoginForm';
import {Error} from '../../Components/Error/Error';
import {Preloader} from '../../Components/Preloader/Preloader';
import {Redirect} from 'react-router-dom';
import {PATH} from '../../App';

import style from './LoginPage.module.scss'

export const LoginPage: React.FC = React.memo(() => {

    const status = useSelector(selectorRequestStatus)
    const error = useSelector(selectorAppError)
    const isLogIn = useSelector(selectorIsLogged)

    const dispatch = useDispatch()

    const sentLoginData = useCallback((value: FormValues) => {
        const {clientId, email, password} = value
        dispatch(login(clientId, email, password))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    if (isLogIn) {
        return <Redirect to={PATH.USER}/>
    }
    return (
        <div className={style.wrapper}>
            {status === 'loading'
                ? <Preloader/>
                : <>
                    <LoginForm callback={sentLoginData}/>
                    {error && <Error error={error}/>}
                </>
            }
        </div>
    );
})




