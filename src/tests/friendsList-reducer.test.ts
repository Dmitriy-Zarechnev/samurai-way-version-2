import {friendslistReducer} from '../redux/reducers/friendslist-reducer'
import {UsersListType} from '../redux/reducers/users-reducer'


test('friendList reducer should return Data', () => {

    let state: Array<UsersListType> = []

    const newState = friendslistReducer(state)

    expect(newState.length).toBe(0)
})