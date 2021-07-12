import React, {useCallback, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {selectorAppError, selectorIsLogged, selectorRequestStatus, selectorUserData} from './selectors';
import {Button} from '../../Components/Button/Button';
import {Preloader} from '../../Components/Preloader/Preloader';
import {Error} from '../../Components/Error/Error';
import {getAuthUserData, logout} from '../../redux/auth-reducer';
import style from './UserPage.module.scss'
import {Redirect} from 'react-router-dom';
import {PATH} from '../../App';

export const UserPage: React.FC = React.memo(() => {

    const {email, name} = useSelector(selectorUserData)
    const status = useSelector(selectorRequestStatus)
    const error = useSelector(selectorAppError)
    const isLoggedIn = useSelector(selectorIsLogged)

    const logoutHandler = useCallback(() => {
        dispatch(logout())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAuthUserData())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (!isLoggedIn) {
        return <Redirect to={PATH.LOGIN}/>
    }

    return (
        <div className={style.wrapper}>
            {status === 'loading'
                ? <Preloader/>
                : <div className={style.userBlock}>
                    <div className={style.userInfo}>
                        <div className={style.info}>{email}</div>
                        <div className={style.info}>{name}</div>
                    </div>
                    {
                        isLoggedIn && (
                            <div className={style.logoutBtnWrapper}>
                                <Button onClick={logoutHandler}
                                        className={style.logoutBtn}>
                                    LOGOUT
                                </Button>
                            </div>)
                    }
                    {error && <Error error={error}/>}
                </div>
            }
        </div>
    );
});

