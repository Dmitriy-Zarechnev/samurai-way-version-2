import axios from 'axios'
import {ProfileInfoType} from '../redux/reducers/profile-reducer'

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
        return instance.get(`auth/me`)
    },
    logIn(email: string, password: string, rememberMe: boolean, captcha: string = '') {
        return instance.post(`auth/login`, {email, password, rememberMe, captcha})
    },
    logOut() {
        return instance.delete(`auth/login`)
    }
}

// -------------- Security Capture -------------------
export const securityAPI = {
    getCaptchaUrl() {
        return instance.get(`security/get-captcha-url`)
    }
}
