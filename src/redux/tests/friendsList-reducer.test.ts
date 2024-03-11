import {friendslistReducer} from '../reducers/friendslist-reducer'
import {UsersListType} from '../reducers/users-reducer'


test('friendList reducer should return Data', () => {

    let state: Array<UsersListType> = []

    const newState = friendslistReducer(state)

    expect(newState.length).toBe(0)
})