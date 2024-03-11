import {UsersListType} from './users-reducer'


// Типизация
export type FriendsListDataType = {
    id: number
    src: string
    name: string
    alt: string
}

// *********** Первоначальный стэйт для friendslistReducer ****************
const initialState: Array<UsersListType> = []


// *********** Reducer - редьюсер, чистая функция для изменения стэйта после получения экшена от диспача ****************
export const friendslistReducer = (state = initialState): Array<UsersListType> => {

    return state
}