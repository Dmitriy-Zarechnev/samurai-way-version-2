import {followUnfollowAPI, ProfileResponseType, usersAPI} from '../../api/api'
import {updateObjectInArray} from '../../utils/object-helpers'
import {ResultCodesEnum, ThunkDispatchType, ThunkType} from '../types/Types'


// Типизация
export type UsersInitialState = {
    items: UsersListType[]
    totalCount: number
    error: string
    pageSize: number
    currentPage: number
    isFetching: boolean
    followingInProgress: number[]
}

export type UsersListType = {
    name: string
    id: number
    photos: UsersPhotos
    status: string
    followed: boolean
    uniqueUrlName: string
}

type UsersPhotos = {
    small: string
    large: string
}

export type UsersAPIComponentActionsType =
    ReturnType<typeof followFriend> |
    ReturnType<typeof unfollowFriend> |
    ReturnType<typeof setUsers> |
    ReturnType<typeof setCurrentPage> |
    ReturnType<typeof setTotalUsersCount> |
    ReturnType<typeof toggleIsFetching> |
    ReturnType<typeof toggleFollowingInProgress>


// *********** Константы названий экшенов ****************
const FOLLOW_FRIEND = '/users/FOLLOW-FRIEND'
const UNFOLLOW_FRIEND = '/users/UNFOLLOW-FRIEND'
const SET_USERS = '/users/SET-USERS'
const SET_CURRENT_PAGE = '/users/SET-CURRENT-PAGE'
const SET_TOTAL_USERS_COUNT = '/users/SET-TOTAL-USERS-COUNT'
const TOGGLE_IS_FETCHING = '/users/TOGGLE-IS-FETCHING'
const TOGGLE_IS_FOLLOWING_IN_PROGRESS = '/users/TOGGLE-IS-FOLLOWING-IN-PROGRESS'


// *********** Первоначальный стэйт для usersReducer ****************
const initialState: UsersInitialState = {
    items: [],
    totalCount: 0,
    error: '',
    pageSize: 7,
    currentPage: 1,
    isFetching: true,
    followingInProgress: []
}


// *********** Reducer - редьюсер, чистая функция для изменения стэйта после получения экшена от диспача ****************
export const usersReducer = (state = initialState, action: UsersAPIComponentActionsType): UsersInitialState => {

    switch (action.type) {
        case FOLLOW_FRIEND:
            return {
                ...state,
                items: updateObjectInArray(state.items, action.payload.userID,
                    'id', {followed: true})
            }

        case UNFOLLOW_FRIEND:
            return {
                ...state,
                items: updateObjectInArray(state.items, action.payload.userID,
                    'id', {followed: false})
            }

        case SET_USERS:
            return {...state, items: action.payload.items}

        case SET_CURRENT_PAGE:
            return {...state, currentPage: action.payload.currentPage}

        case SET_TOTAL_USERS_COUNT:
            return {...state, totalCount: action.payload.totalCount}

        case TOGGLE_IS_FETCHING:
            return {...state, isFetching: action.payload.isFetching}

        case TOGGLE_IS_FOLLOWING_IN_PROGRESS:
            return {
                ...state,
                followingInProgress:
                    action.payload.isFetching
                        ? [...state.followingInProgress, action.payload.userId]
                        : state.followingInProgress.filter(id => id != action.payload.userId)
            }

        default:
            return state
    }
}


// ****** Action creators - экшн криэйторы создают объект action ***********
export const followFriend = (userID: number) => {
    return {type: FOLLOW_FRIEND, payload: {userID}} as const
}
export const unfollowFriend = (userID: number) => {
    return {type: UNFOLLOW_FRIEND, payload: {userID}} as const
}
export const setUsers = (items: UsersListType[]) => {
    return {type: SET_USERS, payload: {items}} as const
}
export const setCurrentPage = (currentPage: number) => {
    return {type: SET_CURRENT_PAGE, payload: {currentPage}} as const
}
export const setTotalUsersCount = (totalCount: number) => {
    return {type: SET_TOTAL_USERS_COUNT, payload: {totalCount}} as const
}
export const toggleIsFetching = (isFetching: boolean) => {
    return {type: TOGGLE_IS_FETCHING, payload: {isFetching}} as const
}
export const toggleFollowingInProgress = (isFetching: boolean, userId: number) => {
    return {type: TOGGLE_IS_FOLLOWING_IN_PROGRESS, payload: {isFetching, userId}} as const
}


// *********** Thunk - санки необходимые для общения с DAL ****************
//  -------- Первая загрузка списка пользователей ----------------
export const getUsers = (currentPage: number, pageSize: number): ThunkType => {
    return async (dispatch: ThunkDispatchType) => {
        // Показали крутилку во время ожидания
        dispatch(toggleIsFetching(true))

        // Ответ от сервера со списком пользователей
        const getUsersData = await usersAPI.getUsers(currentPage, pageSize)

        // Убрали крутилку после ответа
        dispatch(toggleIsFetching(false))

        // Обновили список пользователей на странице
        dispatch(setUsers(getUsersData.items))

        // Обновили послный список пользователей
        dispatch(setTotalUsersCount(getUsersData.totalCount))
    }
}

//  -------- Изменение текущей страницы ----------------
export const newPageGetUsers = (currentPage: number, pageSize: number): ThunkType => {
    return async (dispatch: ThunkDispatchType) => {

        // Выбрали другую текущую страницу
        dispatch(setCurrentPage(currentPage))

        // Показали крутилку во время ожидания
        dispatch(toggleIsFetching(true))

        // Ответ от сервера со списком пользователей
        const getUsersData = await usersAPI.getUsers(currentPage, pageSize)

        // Убрали крутилку после ответа
        dispatch(toggleIsFetching(false))

        // Обновили список пользователей на странице
        dispatch(setUsers(getUsersData.items))
    }
}


//  -------- Вспомогательная функция для дружбы ----------------
const followUnfollow = async (dispatch: ThunkDispatchType,
                              id: number,
                              apiMethod: (id: number) => Promise<ProfileResponseType>,
                              actionCreator: (id: number) => UsersAPIComponentActionsType) => {
    // Используется, чтобы кнопка была disable во время ожидания ответа
    dispatch(toggleFollowingInProgress(true, id))

    // Ответ с сервера
    const response = await apiMethod(id)

    // Успешный ответ от сервера
    response.resultCode === ResultCodesEnum.Success &&
    dispatch(actionCreator(id))

    // Разблокируем кнопку после ответа
    dispatch(toggleFollowingInProgress(false, id))
}

//  -------- Отписка от дружбы ----------------
export const unFollow = (id: number): ThunkType => {
    return async (dispatch: ThunkDispatchType) => {
        // Отправили запрос на сервер
        let apiMethod = followUnfollowAPI.unfollowUser.bind(followUnfollowAPI)

        // Получили ответ и изменили state
        await followUnfollow(dispatch, id, apiMethod, unfollowFriend)

    }
}

//  -------- Подписка для дружбы ----------------
export const follow = (id: number): ThunkType => {
    return async (dispatch: ThunkDispatchType) => {
        // Отправили запрос на сервер
        let apiMethod = followUnfollowAPI.followUser.bind(followUnfollowAPI)

        // Получили ответ и изменили state
        await followUnfollow(dispatch, id, apiMethod, followFriend)
    }
}
