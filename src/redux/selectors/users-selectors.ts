import {AppRootState} from '../redux-store'
import {UsersFilterType, UsersListType} from '../reducers/users-reducer'

// Селекторы необходимы для получения данных из state
export const getUsersS = (state: AppRootState): UsersListType[] => {
    return state.usersPage.items
}

export const getTotalCountS = (state: AppRootState): number => {
    return state.usersPage.totalCount
}

export const getPageSizeS = (state: AppRootState): number => {
    return state.usersPage.pageSize
}

export const getCurrentPageS = (state: AppRootState): number => {
    return state.usersPage.currentPage
}

export const getIsFetchingS = (state: AppRootState): boolean => {
    return state.usersPage.isFetching
}

export const getIsFollowingInProgressS = (state: AppRootState): number[] => {
    return state.usersPage.followingInProgress
}

export const getUsersFilterS = (state: AppRootState): UsersFilterType => {
    return state.usersPage.filter
}

