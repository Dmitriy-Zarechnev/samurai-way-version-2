import axios from 'axios'
import {ProfileInfoType} from '../redux/reducers/profile-reducer'

// Типизация data которая придет в response

//
type MeResponseType = {
    data: {
        id: number,
        email: string,
        login: string
    },
    resultCode: ResultCodesEnum,
    messages: Array<string>
}

//
type LogInResponseType = {
    data: {
        userId: number
    },
    resultCode: ResultCodesEnum | ResultCodesForCaptcha,
    messages: Array<string>
}

//
type LogOutResponseType = {
    data: {},
    resultCode: ResultCodesEnum,
    messages: Array<string>
}

// Типизация для captcha запроса
type CaptchaResponseType = {
    url: string,
}

/* Типизировали resultCode используя enum
    позволяет сравнивать не просто с числами,
        а с ключами объекта */
export enum ResultCodesEnum {
    Success = 0,
    Error = 1
}

// Расширили для captcha
export enum ResultCodesForCaptcha {
    CaptchaIsRequired = 10
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
    getUsers(currentPage: number, pageSize: number) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
    }
}

// -------------- Follow and Unfollow -------------------
export const followUnfollowAPI = {
    followUser(id: number) {
        return instance.post(`follow/${id}`, {})
    },
    unfollowUser(id: number) {
        return instance.delete(`follow/${id}`)
    }
}

// -------------- profileAPI -------------------
export const profileAPI = {
    userProfile(userId: number) {
        return instance.get(`profile/${userId}`)
    },
    getStatus(userId: number) {
        return instance.get(`profile/status/${userId}`)
    },
    updateStatus(status: string) {
        return instance.put(`profile/status`, {status})
    },
    savePhoto(file: File) {
        const formData = new FormData()
        formData.append('image', file)
        return instance.put(`profile/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    },
    saveProfile(data: ProfileInfoType) {
        return instance.put('profile', data)
    }
}

// -------------- Auth -------------------
export const authAPI = {
    authHeader() {
        return instance.get<MeResponseType>(`auth/me`)
            .then(res => res.data) // meData
    },
    logIn(email: string, password: string, rememberMe: boolean, captcha: string = '') {
        return instance.post<LogInResponseType>(`auth/login`, {email, password, rememberMe, captcha})
            .then(res => res.data) // logInData
    },
    logOut() {
        return instance.delete<LogOutResponseType>(`auth/login`)
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
