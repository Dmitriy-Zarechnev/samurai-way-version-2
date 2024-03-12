import {UsersListType} from './users-reducer'


// Типизация


// *********** Первоначальный стэйт для friendslistReducer ****************
const initialState: Array<UsersListType> = []


// *********** Reducer - редьюсер, чистая функция для изменения стэйта после получения экшена от диспача ****************
export const friendslistReducer = (state = initialState): Array<UsersListType> => {

    return state
}