import {AppRootState} from '../redux-store'

// Селекторы необходимы для получения данных из state
export const getUsersS = (state: AppRootState) => {
    return state.usersPage.items
}

export const getTotalCountS = (state: AppRootState) => {
    return state.usersPage.totalCount
}

export const getPageSizeS = (state: AppRootState) => {
    return state.usersPage.pageSize
}

export const getCurrentPageS = (state: AppRootState) => {
    return state.usersPage.currentPage
}

export const getIsFetchingS = (state: AppRootState) => {
    return state.usersPage.isFetching
}

export const getIsFollowingInProgressS = (state: AppRootState) => {
    return state.usersPage.followingInProgress
}

export const getUsersFilterS = (state: AppRootState) => {
    return state.usersPage.filter
}

