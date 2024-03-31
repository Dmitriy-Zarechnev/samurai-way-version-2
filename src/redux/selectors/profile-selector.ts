import {AppRootState} from '../redux-store'
import {PostsDataType, ProfileInfoType} from '../reducers/profile-reducer'

export const getProfileInfoS = (state: AppRootState): ProfileInfoType => {
    return state.profilePage.profileInfo
}

export const getStatusFromStateS = (state: AppRootState): string => {
    return state.profilePage.status
}

export const getIdS = (state: AppRootState): number | null => {
    return state.auth.id
}

export const getIsAuthS = (state: AppRootState): boolean => {
    return state.auth.isAuth
}

export const getPostsDataFromStateS = (state: AppRootState): PostsDataType[] => {
    return state.profilePage.postsData
}

export const getFailMessageS = (state: AppRootState): string => {
    return state.profilePage.failMessage
}