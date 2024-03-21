import axios from 'axios'
import {PhotosType, ProfileInfoType} from '../redux/reducers/profile-reducer'
import {ResultCodesEnum, ResultCodesForCaptcha} from '../redux/types/Types'
import {UsersListType} from '../redux/reducers/users-reducer'

// Типизация response в users-запросах
type UserResponseType = {
    totalCount: number,
    error: string,
    items: Array<UsersListType>
}

// Типизация response в profile-запросах
export type ProfileResponseType<D = {}> = {
    resultCode: ResultCodesEnum,
    messages: Array<string>,
    fieldsErrors: Array<string>,
    data: D
}

// Типизация response в Auth-запросах
type AuthResponseType<D = {}, A = null> = {
    resultCode: ResultCodesEnum | A,
    messages: Array<string>,
    data: D
}

/*
D - это generic для data
A - это generic для ResultCodesForCaptcha
*/

// Типизация data для authHeader
type MeResponseDataType = {
    id: number,
    email: string,
    login: string
}

// Типизация для captcha запроса
type CaptchaResponseType = {
    url: string,
}


// ---------- Instance - хранит объект с общими настройками запроса ----------------
const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        'API-KEY': 'd9bbcdc0-0dbd-4e98-ab2c-6652c2ba0fb0'
    }
})

// -------------- Получение списка users -------------------
export const usersAPI = {
    getUsers(currentPage: number, pageSize: number, term: string = '', friends: null | boolean = null) {
        return instance.get<UserResponseType>(`users?page=${currentPage}&count=${pageSize}&term=${term}
        ${friends === null ? '' : `&friend=${friends}`}`)
            .then(res => res.data) // getUsersData
    }
}

// -------------- Follow and Unfollow -------------------
export const followUnfollowAPI = {
    followUser(id: number) {
        return instance.post<ProfileResponseType>(`follow/${id}`, {})
            .then((res => res.data))
    },
    unfollowUser(id: number) {
        return instance.delete<ProfileResponseType>(`follow/${id}`)
            .then((res => res.data))
    }
}

// -------------- profileAPI -------------------
export const profileAPI = {
    userProfile(userId: number) {
        return instance.get<ProfileInfoType>(`profile/${userId}`)
            .then(res => res.data) // useProfileData
    },
    getStatus(userId: number) {
        return instance.get<string>(`profile/status/${userId}`)
            .then(res => res.data) // getStatusData
    },
    updateStatus(status: string) {
        return instance.put<ProfileResponseType>(`profile/status`, {status})
    },
    savePhoto(file: File) {
        const formData = new FormData()
        formData.append('image', file)
        return instance.put<ProfileResponseType<{ photos: PhotosType }>>(`profile/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then(res => res.data) // savePhotoData
    },
    saveProfile(data: ProfileInfoType) {
        return instance.put<ProfileResponseType>('profile', data)
            .then(res => res.data) // saveProfileData
    }
}

// -------------- Auth -------------------
export const authAPI = {
    authHeader() {
        return instance.get<AuthResponseType<MeResponseDataType>>(`auth/me`)
            .then(res => res.data) // meData
    },
    logIn(email: string, password: string, rememberMe: boolean, captcha: string = '') {
        return instance.post<AuthResponseType<{ userId: number }, ResultCodesForCaptcha>>
        (`auth/login`, {email, password, rememberMe, captcha})
            .then(res => res.data) // logInData
    },
    logOut() {
        return instance.delete<AuthResponseType>(`auth/login`)
            .then(res => res.data) // logOutData
    }
}

// -------------- Security Capture -------------------
export const securityAPI = {
    getCaptchaUrl() {
        return instance.get<CaptchaResponseType>(`security/get-captcha-url`)
            .then(res => res.data) // captchaData
    }
}
