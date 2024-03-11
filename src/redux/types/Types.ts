import {AuthReducerActionsType} from '../reducers/auth-reducer'
import {MyMessagesActionsType} from '../reducers/messages-reducer'
import {MyPostsActionsType} from '../reducers/profile-reducer'
import {UsersAPIComponentActionsType} from '../reducers/users-reducer'
import {AppReducerActionsType} from '../reducers/app-reducer'
import {ThunkAction, ThunkDispatch} from 'redux-thunk'
import {AppRootState} from '../redux-store'

// Типизация всех actioncreators для типизации thunk
export type CommonActionsTypeForApp =
    AuthReducerActionsType |
    MyMessagesActionsType |
    MyPostsActionsType |
    UsersAPIComponentActionsType |
    AppReducerActionsType

export type ThunkType = ThunkAction<void, AppRootState, unknown, CommonActionsTypeForApp>
export type ThunkDispatchType = ThunkDispatch<AppRootState, unknown, CommonActionsTypeForApp>