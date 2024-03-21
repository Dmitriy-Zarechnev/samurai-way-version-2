import {follow, followFriend, toggleFollowingInProgress, unFollow, unfollowFriend} from '../reducers/users-reducer'
import {followUnfollowAPI, ProfileResponseType} from '../../api/api'
import {ResultCodesEnum} from '../types/Types'

jest.mock('../../api/api')
const followUnfollowAPIMock = followUnfollowAPI as jest.Mocked<typeof followUnfollowAPI>


// Свой dispatch
const dispatchMock = jest.fn()
// Свой state
const getStateMock = jest.fn()

beforeEach(() => {
    dispatchMock.mockClear()
    getStateMock.mockClear()
    followUnfollowAPIMock.unfollowUser.mockClear()
    followUnfollowAPIMock.followUser.mockClear()
})

// Протипизировали ожидаемый result
const result: ProfileResponseType = {
    resultCode: ResultCodesEnum.Success,
    messages: [],
    fieldsErrors: [],
    data: {}
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