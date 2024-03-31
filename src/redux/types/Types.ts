import {AuthReducerActionsType} from '../reducers/auth-reducer'
import {MyMessagesActionsType} from '../reducers/messages-reducer'
import {MyPostsActionsType} from '../reducers/profile-reducer'
import {UsersAPIComponentActionsType} from '../reducers/users-reducer'
import {AppReducerActionsType} from '../reducers/app-reducer'
import {ThunkAction, ThunkDispatch} from 'redux-thunk'
import {AppRootState} from '../redux-store'
import {ChatReducerActionsType} from '../reducers/chat-reducer'
import {useDispatch} from 'react-redux'

// Типизация всех actioncreators для типизации thunk
export type CommonActionsTypeForApp =
    AuthReducerActionsType |
    MyMessagesActionsType |
    MyPostsActionsType |
    UsersAPIComponentActionsType |
    AppReducerActionsType |
    ChatReducerActionsType

// Типизация для thunk, позволяет диспатчить thunk
export type ThunkType = ThunkAction<void, AppRootState, unknown, CommonActionsTypeForApp>
export type ThunkDispatchType = ThunkDispatch<AppRootState, unknown, CommonActionsTypeForApp>

// Собственный useAppDispatch с типами
export const useAppDispatch = () => useDispatch<ThunkDispatchType>()


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

// Крутая автоматическая типизация для Actions
/*
type PropertiesType<T> = T extends { [key: string]: infer U } ? U : never

type InferActionsType<T extends { [key: string]: (...args: any[]) => any }> = ReturnType<PropertiesType<T>>
 */

/* Для работы с этой типизацией необходимо собрать все actions creators в один объект,
где actions creators будут методами. InferActionsType<T> на место T передать этот объект */