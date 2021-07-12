import {applyMiddleware, combineReducers, createStore} from 'redux'
import thunkMiddleware from 'redux-thunk'
import {appReducer} from './app-reducer';
import {authReducer} from './auth-reducer';

export const reducers = combineReducers({
    appState: appReducer,
    authState: authReducer,
})

export type AppStateType = ReturnType<typeof reducers>
export let store = createStore(reducers, applyMiddleware(thunkMiddleware))

