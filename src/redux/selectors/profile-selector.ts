import {AppRootState} from '../redux-store'

export const getProfileInfo = (state: AppRootState) => {
    return state.profilePage.profileInfo
}

export const getStatusFromState = (state: AppRootState) => {
    return state.profilePage.status
}

export const getId = (state: AppRootState) => {
    return state.auth.id
}

export const getIsAuth = (state: AppRootState) => {
    return state.auth.isAuth
}


export const getPostsDataFromState = (state: AppRootState) => {
    return state.profilePage.postsData
}

export const getFailMessage = (state: AppRootState) => {
    return state.profilePage.failMessage
}