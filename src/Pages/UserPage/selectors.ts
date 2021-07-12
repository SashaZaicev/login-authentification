import {AppStateType} from '../../redux/store';

export const selectorUserData= (state: AppStateType) => state.authState.user
export const selectorIsLogged = (state: AppStateType) => state.authState.isLoggedIn
export const selectorRequestStatus= (state: AppStateType) => state.appState.status
export const selectorAppError= (state: AppStateType) => state.appState.error
