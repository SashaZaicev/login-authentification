type ActionsType = ReturnType<typeof setAppStatus>
    | ReturnType<typeof setAppError>
    | ReturnType<typeof setAppStatus>

export type StatusType = 'idle' | 'loading' | 'success' | 'unsuccessful'
let initializeState = {
    status: 'idle',
    error: null,
} as InitialStateType
const SET_STATUS = 'LAO/APP/SET_STATUS';
const SET_ERROR = 'LAO/APP/SET_ERROR'
export type InitialStateType = {
    status: StatusType
    error: string | null
}

export const appReducer = (state: InitialStateType = initializeState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case SET_STATUS:
            return {...state, status: action.status}
        case SET_ERROR:
            debugger
            return {...state, error: action.error}
        default:
            return state;
    }
};

export const setAppStatus = (status: StatusType) => ({type: SET_STATUS, status} as const)
export const setAppError = (error: string | null) => ({type: SET_ERROR, error} as const)
