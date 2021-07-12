import {AppStateType} from './redux/store';

export const selectorRequestStatus= (state: AppStateType) => state.appState.status
export const selectorAppError= (state: AppStateType) => state.appState.error
