import {authMe} from './auth-reducer'
import {ThunkDispatchType} from '../types/Types'

// Типизация Actions
export type AppReducerActionsType =
    ReturnType<typeof initializedSuccess>

// Типизация AppInitialState
export type AppInitialState = typeof initialState

// *********** Константы названий экшенов ****************
const INITIALIZED_SUCCESS = '/app/INITIALIZED-SUCCESS'


// *********** Первоначальный стэйт для appReducer ****************
const initialState = {
    initialized: false
}


// *********** Reducer - редьюсер, чистая функция для изменения стэйта после получения экшена от диспача ****************
export const appReducer = (state = initialState, action: AppReducerActionsType): AppInitialState => {
    switch (action.type) {
        case INITIALIZED_SUCCESS:
            return {...state, initialized: true}

        default:
            return state
    }
}


// *********** Action creators - экшн криэйторы создают объект action ****************
export const initializedSuccess = () => {
    return {type: INITIALIZED_SUCCESS} as const
}


// *********** Thunk - санки необходимые для общения с DAL ****************
//  -------- Инициализация на сайте ----------------
export const initializeApp = () => (dispatch: ThunkDispatchType) => {
    // Диспатчим thunk, которая совершит инициализацию
    const promise = dispatch(authMe())

    // После завершения инициализации, меняем значение в state
    Promise.all([promise]).then(() => {
        dispatch(initializedSuccess())
    })
}
