import img2 from '../../assets/images/NewPostDefault.jpg'
import img1 from '../../assets/images/PostDefault.jpg'
import {profileAPI} from '../../api/api'
import {ThunkDispatchType, ThunkType} from '../types/Types'


// Типизация
export type ProfilePagePropsType = {
    profileInfo: ProfileInfoType
    postsData: PostsDataType[]
    status: string
    failMessage: string
}

export type  ProfileInfoType = {
    aboutMe: string
    contacts: Contacts
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    userId: number | null
    photos: PhotosType
}

export type Contacts = {
    facebook: string
    website: string
    vk: string
    twitter: string
    instagram: string
    youtube: string
    github: string
    mainLink: string
}

export type PhotosType = {
    small: string
    large: string
}

export type PostsDataType = {
    id: number
    header: string
    src: string
    message: string
    likesCount: number
}

export type MyPostsActionsType =
    ReturnType<typeof addPost> |
    ReturnType<typeof setUserProfile> |
    ReturnType<typeof getUserStatus> |
    ReturnType<typeof updateUserStatus> |
    ReturnType<typeof deletePost> |
    ReturnType<typeof updateYourPhoto> |
    ReturnType<typeof failUpdate>


// *********** Константы названий экшенов ****************
const ADD_POST = '/profile/ADD-POST'
const SET_USER_PROFILE = '/profile/SET-USER-PROFILE'
const GET_USER_STATUS = '/profile/GET-USER-STATUS'
const UPDATE_USER_STATUS = '/profile/UPDATE-USER-STATUS'
const DELETE_POST = '/profile/DELETE-POST'
const UPDATE_YOUR_PHOTO = '/profile/UPDATE-YOUR-PHOTO'
const FAIL_UPDATE = '/profile/FAIL-UPDATE'


// *********** Первоначальный стэйт для profileReducer ****************
const initialState: ProfilePagePropsType = {
    profileInfo: {
        aboutMe: '',
        contacts: {
            facebook: '',
            website: '',
            vk: '',
            twitter: '',
            instagram: '',
            youtube: '',
            github: '',
            mainLink: ''
        },
        lookingForAJob: false,
        lookingForAJobDescription: '',
        fullName: '',
        userId: null,
        photos: {
            small: '',
            large: ''
        }
    },
    postsData: [
        {
            id: 1,
            header: 'Begin',
            src: img1,
            message: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias aliquid consequuntur corporis cupiditate debitis dignissimos earum eius error ex iusto maxime minima nihil nostrum numquam odio possimus quae quidem quos, rerum saepe sint soluta tempore tenetur veniam voluptates! Enim inventore sequi totam. Corporis ea ipsum iure officiis quo, ut velit?',
            likesCount: 25
        },
        {id: 2, header: 'Process', src: img1, message: 'It is my second post', likesCount: 40},
        {id: 3, header: 'End', src: img1, message: 'It is my third post', likesCount: 52}
    ],
    status: '',
    failMessage: ''
}


// *********** Reducer - редьюсер, чистая функция для изменения стэйта после получения экшена от диспача ****************
export const profileReducer = (state = initialState, action: MyPostsActionsType): ProfilePagePropsType => {

    switch (action.type) {

        case ADD_POST:
            const newPost: PostsDataType = {
                id: state.postsData.length + 1,
                header: action.payload.header,
                src: img2,
                message: action.payload.post,
                likesCount: 0
            }
            return {
                ...state,
                postsData: [newPost, ...state.postsData]
            }

        case SET_USER_PROFILE:
            return {
                ...state, profileInfo: action.payload.profileInfo
            }

        case GET_USER_STATUS:
            return {
                ...state, status: action.payload.status
            }

        case UPDATE_USER_STATUS:
            return {
                ...state, status: action.payload.status
            }

        case DELETE_POST:
            return {
                ...state,
                postsData: state.postsData.filter(el => el.id !== action.payload.postId)
            }

        case UPDATE_YOUR_PHOTO:
            return {
                ...state,
                profileInfo: {
                    ...state.profileInfo,
                    photos: action.payload.photos
                }
            }

        case FAIL_UPDATE:
            return {
                ...state,
                failMessage: action.payload.failMessage
            }

        default:
            return state
    }
}


// *********** Action creators - экшн криэйторы создают объект action ****************
export const addPost = (header: string, post: string) => {
    return {type: ADD_POST, payload: {header, post}} as const
}
export const setUserProfile = (profileInfo: ProfileInfoType) => {
    return {type: SET_USER_PROFILE, payload: {profileInfo}} as const
}
export const getUserStatus = (status: string) => {
    return {type: GET_USER_STATUS, payload: {status}} as const
}
export const updateUserStatus = (status: string) => {
    return {type: UPDATE_USER_STATUS, payload: {status}} as const
}
export const deletePost = (postId: number) => {
    return {type: DELETE_POST, payload: {postId}} as const
}
export const updateYourPhoto = (photos: PhotosType) => {
    return {type: UPDATE_YOUR_PHOTO, payload: {photos}} as const
}
export const failUpdate = (failMessage: string) => {
    return {type: FAIL_UPDATE, payload: {failMessage}} as const
}


// *********** Thunk - санки необходимые для общения с DAL ****************
//  -------- Загрузка страницы пользователя ----------------
export const goToPage = (id: number): ThunkType => async (dispatch: ThunkDispatchType) => {
    // Получили данные profile с сервера при пустом url
    const response = await profileAPI.userProfile(id)

    // Получили данные profile с сервера
    dispatch(setUserProfile(response.data))

    /* Сообщение с ошибкой загрузки аватара занули,
     при загрузке нового пользователя */
    dispatch(failUpdate(''))
}


//  -------- Получение статуса пользователя ----------------
export const getStatus = (id: number): ThunkType => async (dispatch: ThunkDispatchType) => {

    const response = await profileAPI.getStatus(id)

    // Получили status с сервера
    dispatch(getUserStatus(response.data))

}


//  -------- Изменение статуса пользователя ----------------
export const updateStatus = (status: string): ThunkType => async (dispatch: ThunkDispatchType) => {

    try {
        const response = await profileAPI.updateStatus(status)

        // Заменили status после ответа с сервера
        response.data.resultCode === 0 && dispatch(updateUserStatus(status))

    } catch (error) {
        // Диспатчить ошибки можно
    }
}


//  -------- Загрузка фото пользователя ----------------
export const savePhoto = (file: File): ThunkType => async (dispatch: ThunkDispatchType) => {

    const response = await profileAPI.savePhoto(file)

    // Заменили фото profile после ответа от сервера
    response.data.resultCode === 0 && dispatch(updateYourPhoto(response.data.data.photos))

    // Вывели сообщение об ошибке с сервера
    response.data.resultCode === 1 && dispatch(failUpdate(response.data.messages[0]))
}


//  -------- Загрузка исправленных данных пользователя ----------------
export const saveProfile = (data: ProfileInfoType): ThunkType => async (dispatch: ThunkDispatchType, getState) => {
    // Узнали свой id
    const userId = getState().auth.id

    if (userId !== null) {
        const response = await profileAPI.saveProfile(data)

        // Получили новые данные profile с сервера
        response.data.resultCode === 0 && dispatch(goToPage(userId))

        // Вывели сообщение об ошибке с сервера
        response.data.resultCode === 1 && dispatch(failUpdate(response.data.messages[0]))
    }
}