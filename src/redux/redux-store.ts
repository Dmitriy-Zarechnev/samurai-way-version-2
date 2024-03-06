import {applyMiddleware, combineReducers, createStore} from 'redux'
import {MyPostsActionsType, profileReducer} from './reducers/profile-reducer'
import {messagesReducer, MyMessagesActionsType} from './reducers/messages-reducer'
import {friendslistReducer} from './reducers/friendslist-reducer'
import {UsersAPIComponentActionsType, usersReducer} from './reducers/users-reducer'
import {authReducer, AuthReducerActionsType} from './reducers/auth-reducer'
import thunkMiddleware, {ThunkAction, ThunkDispatch} from 'redux-thunk'
import {appReducer, AppReducerActionsType} from './reducers/app-reducer'


const rootReducer = combineReducers({
    profilePage: profileReducer,
    messagesPage: messagesReducer,
    friendsListData: friendslistReducer,
    usersPage: usersReducer,
    auth: authReducer,
    app:appReducer
})

// Типизация всего STATE
export type AppRootState = ReturnType<typeof rootReducer>

// Типизация всех actioncreators для типизации thunk
export type CommonActionsTypeForApp =
    AuthReducerActionsType |
    MyMessagesActionsType |
    MyPostsActionsType |
    UsersAPIComponentActionsType |
    AppReducerActionsType

export type ThunkType = ThunkAction<void, AppRootState, unknown, CommonActionsTypeForApp>
export type ThunkDispatchType = ThunkDispatch<AppRootState, unknown, CommonActionsTypeForApp>

const store = createStore(rootReducer, applyMiddleware(thunkMiddleware))

export default store