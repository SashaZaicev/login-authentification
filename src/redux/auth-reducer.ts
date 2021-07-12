import {ThunkDispatch} from 'redux-thunk';
import {setAppError, setAppStatus} from './app-reducer';
import {authAPI} from '../API/auth-api';
import {AppStateType} from './store';

export type UserType = {
    name: string,
    email: string,
}

const SET_IS_LOGIN = 'LAO/AUTH/SET_IS_LOGIN';
const SET_USER_DATA = 'LAO/AUTH/SET_USER_DATA'

type ActionsType = ReturnType<typeof setAppStatus>
    | ReturnType<typeof setIsLoggedIn>
    | ReturnType<typeof setUserData>
    | ReturnType<typeof setAppError>

let initializeState = {
    isLoggedIn: false,
    user: {} as UserType
};

export type InitialStateType = typeof initializeState
export const authReducer = (state: InitialStateType = initializeState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case SET_IS_LOGIN:
            return {...state, isLoggedIn: action.value}
        case SET_USER_DATA:
            return {...state, user: action.user}
        default:
            return state;
    }
};

export const setIsLoggedIn = (value: boolean) => ({type: SET_IS_LOGIN, value} as const)
export const setUserData = (user: UserType) => ({type: SET_USER_DATA, user} as const)

export const getAuthUserData = () => async (dispatch: ThunkDispatch<AppStateType, unknown, ActionsType>) => {
    dispatch(setAppStatus('loading'))
    try {
        const res = await authAPI.getUser()
        dispatch(setUserData(res.data.data));
        dispatch(setIsLoggedIn(true));
        dispatch(setAppStatus('success'));
    } catch (e) {
        dispatch(setAppError(e.message))
        dispatch(setAppStatus('unsuccessful'));
    }
};

export const login = (clientId: number, email: string, password: string) =>
    async (dispatch: ThunkDispatch<AppStateType, unknown, ActionsType>) => {
        dispatch(setAppStatus('loading'))
        try {
            const res = await authAPI.login(clientId, email, password)
            localStorage.setItem('accessToken', res.data.data.accessToken);
            localStorage.setItem('refreshToken', res.data.data.refreshToken);
            dispatch(setIsLoggedIn(true));
            dispatch(setAppError(''));
        } catch (e) {
            dispatch(setAppError(e.message))
            dispatch(setAppStatus('unsuccessful'));
        }
    };

export const logout = () => async (dispatch: ThunkDispatch<AppStateType, unknown, ActionsType>) => {
    dispatch(setAppStatus('loading'))
    try {
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')
        dispatch(setAppStatus('success'));
        dispatch(setIsLoggedIn(false))
        dispatch(setAppError(''))
        await authAPI.logout()
    } catch (e) {
        dispatch(setAppError(e.message))
        dispatch(setAppStatus('unsuccessful'));
    }
}

