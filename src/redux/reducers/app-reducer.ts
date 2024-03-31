import {authMe} from './auth-reducer'
import {ThunkDispatchType} from '../types/Types'

// Типизация Actions
export type AppReducerActionsType =
    ReturnType<typeof initializedSuccess>

// Типизация AppInitialState
export type AppInitialState = typeof initialState

// *********** Константы названий actions ****************
const INITIALIZED_SUCCESS = '/app/INITIALIZED-SUCCESS'


// *********** Первоначальный state для appReducer ****************
const initialState = {
    initialized: false
}


// *********** Reducer - чистая функция для изменения state после получения action от dispatch ****************
export const appReducer = (state = initialState, action: AppReducerActionsType): AppInitialState => {
    switch (action.type) {
        case INITIALIZED_SUCCESS:
            return {...state, initialized: true}

        default:
            return state
    }
}


// *********** Action creators - создают объект action ****************
export const initializedSuccess = () => {
    return {type: INITIALIZED_SUCCESS} as const
}


// *********** Thunk - необходимые для общения с DAL ****************
//  -------- Инициализация на сайте ----------------
export const initializeApp = () => (dispatch: ThunkDispatchType) => {
    // Dispatch thunk, которая совершит инициализацию
    const promise = dispatch(authMe())

    // После завершения инициализации, меняем значение в state
    Promise.all([promise]).then(() => {
        dispatch(initializedSuccess())
    })
}
