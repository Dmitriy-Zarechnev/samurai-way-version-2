import {follow, followFriend, getUsers, setCurrentPage, setFilter, setTotalUsersCount, setUsers, toggleFollowingInProgress, toggleIsFetching, unFollow, unfollowFriend} from '../reducers/users-reducer'
import {followUnfollowAPI, ProfileResponseType, UserResponseType, usersAPI} from '../../api/api'
import {ResultCodesEnum} from '../types/Types'

jest.mock('../../api/api')
const followUnfollowAPIMock = followUnfollowAPI as jest.Mocked<typeof followUnfollowAPI>
const usersAPIMock = usersAPI as jest.Mocked<typeof usersAPI>


// Свой dispatch
const dispatchMock = jest.fn()
// Свой state
const getStateMock = jest.fn()

beforeEach(() => {
    dispatchMock.mockClear()
    getStateMock.mockClear()
    followUnfollowAPIMock.unfollowUser.mockClear()
    followUnfollowAPIMock.followUser.mockClear()
    usersAPIMock.getUsers.mockClear()
})

// Протипизировали ожидаемый result для followUnfollowAPIMock
const result: ProfileResponseType = {
    resultCode: ResultCodesEnum.Success,
    messages: [],
    fieldsErrors: [],
    data: {}
}

// Протипизировали ожидаемый result для usersAPIMock
const result2: UserResponseType = {
    totalCount: 5000,
    error: 'string',
    items: [
        {
            name: 'Bill',
            id: 5,
            photos: {
                small: 'string',
                large: 'string'
            },
            status: 'Hello',
            followed: false,
            uniqueUrlName: 'Master'
        }
    ]
}

test('unfollow thunk has to work', async () => {

    // Мокируем метод unfollowUser для возврата успешного результата
    followUnfollowAPIMock.unfollowUser.mockResolvedValue(result)

    // Запускаем thunk
    await unFollow(1)(dispatchMock, getStateMock, {})

    expect(dispatchMock).toBeCalledTimes(3)
    // Проверяем, что dispatch вызывается с нужными аргументами и в правильной последовательности
    expect(dispatchMock).toHaveBeenNthCalledWith(1, toggleFollowingInProgress(true, 1))
    expect(dispatchMock).toHaveBeenNthCalledWith(2, unfollowFriend(1))
    expect(dispatchMock).toHaveBeenNthCalledWith(3, toggleFollowingInProgress(false, 1))
})


test('follow thunk has to work', async () => {

    // Мокируем метод followUser для возврата успешного результата
    followUnfollowAPIMock.followUser.mockResolvedValue(result)

    // Запускаем thunk
    await follow(2)(dispatchMock, getStateMock, {})

    expect(dispatchMock).toBeCalledTimes(3)
    // Проверяем, что dispatch вызывается с нужными аргументами и в правильной последовательности
    expect(dispatchMock).toHaveBeenNthCalledWith(1, toggleFollowingInProgress(true, 2))
    expect(dispatchMock).toHaveBeenNthCalledWith(2, followFriend(2))
    expect(dispatchMock).toHaveBeenNthCalledWith(3, toggleFollowingInProgress(false, 2))
})


test('getUsers thunk has to work', async () => {

    // Мокируем метод getUsers для возврата успешного результата
    usersAPIMock.getUsers.mockResolvedValue(result2)

    // Запускаем thunk
    await getUsers(1, 10, {term: '', friends: null})(dispatchMock, getStateMock, {})

    expect(dispatchMock).toBeCalledTimes(6)
    // Проверяем, что dispatch вызывается с нужными аргументами и в правильной последовательности
    expect(dispatchMock).toHaveBeenNthCalledWith(1, setCurrentPage(1))
    expect(dispatchMock).toHaveBeenNthCalledWith(2, setFilter({term: '', friends: null}))
    expect(dispatchMock).toHaveBeenNthCalledWith(3, toggleIsFetching(true))
    expect(dispatchMock).toHaveBeenNthCalledWith(4, toggleIsFetching(false))
    expect(dispatchMock).toHaveBeenNthCalledWith(5, setUsers([
        {
            name: 'Bill',
            id: 5,
            photos: {
                small: 'string',
                large: 'string'
            },
            status: 'Hello',
            followed: false,
            uniqueUrlName: 'Master'
        }
    ]))
    expect(dispatchMock).toHaveBeenNthCalledWith(6, setTotalUsersCount(5000))
})