import {getUsersS} from './users-selectors'
import {createSelector} from 'reselect'
import {UsersListType} from '../reducers/users-reducer'


export const friendsSuperSelector = createSelector(getUsersS, (items: UsersListType[]) => {
    return items.filter(el => el.followed)
})