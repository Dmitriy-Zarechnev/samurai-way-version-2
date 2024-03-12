import {followFriend, setCurrentPage, setTotalUsersCount, setUsers, toggleFollowingInProgress, toggleIsFetching, unfollowFriend, UsersInitialState, usersReducer} from '../reducers/users-reducer'


let startState: UsersInitialState

beforeEach(() => {
    startState = {
        items: [
            {
                id: 1,
                name: 'bob',
                followed: true,
                photos: {
                    small: '',
                    large: ''
                },
                status: 'life',
                uniqueUrlName: ''
            },
            {
                id: 3,
                name: 'bob',
                followed: false,
                photos: {
                    small: '',
                    large: ''
                },
                status: 'life',
                uniqueUrlName: ''
            },
            {
                id: 6,
                name: 'bob',
                followed: false,
                photos: {
                    small: '',
                    large: ''
                },
                status: 'life',
                uniqueUrlName: ''
            }
        ],
        totalCount: 0,
        error: '',
        pageSize: 7,
        currentPage: 1,
        isFetching: true,
        followingInProgress: []
    }
})


test('users reducer should change followed false into true', () => {

    const userID = 3

    const newState = usersReducer(startState, followFriend(userID))

    expect(newState.items[1].followed).toBe(true)
    expect(newState.items[2].followed).toBe(false)
})


test('users reducer should change followed true into false', () => {

    const userID = 6

    const newState = usersReducer(startState, unfollowFriend(userID))

    expect(newState.items[2].followed).toBe(false)
    expect(newState.items[0].followed).toBe(true)
})


test('users reducer should increase items length', () => {

    const newUsers = [
        {
            id: 9,
            name: 'sam',
            followed: true,
            photos: {
                small: '',
                large: ''
            },
            status: 'dead',
            uniqueUrlName:''
        },
        {
            id: 5,
            name: 'nil',
            followed: false,
            photos: {
                small: '',
                large: ''
            },
            status: 'goal',
            uniqueUrlName:''
        }
    ]

    const newState = usersReducer(startState, setUsers(newUsers))


    expect(newState.items.length).not.toBe(startState.items.length)
    expect(newState.items.length).toBe(2)
    expect(newState.items[0].name).toBe('sam')
    expect(newState.items[1].status).toBe('goal')
})


test('users reducer should change current page', () => {

    const currentPage = 3

    const newState = usersReducer(startState, setCurrentPage(currentPage))

    expect(newState.currentPage).toBe(3)
})


test('users reducer should change total users count', () => {

    const newTotalCount = 5000

    const newState = usersReducer(startState, setTotalUsersCount(newTotalCount))

    expect(newState.totalCount).toBe(5000)
})


test('users reducer should change isFetching into false', () => {

    const newFetching = false

    const newState = usersReducer(startState, toggleIsFetching(newFetching))

    expect(newState.isFetching).toBe(false)

    expect(newState.items.length).toBe(startState.items.length)
})


test('users reducer should increase followingInProgress length by one', () => {

    const newFetching = true
    const id = 3

    const newState = usersReducer(startState, toggleFollowingInProgress(newFetching, id))

    expect(newState.followingInProgress.length).toBe(1)
    expect(newState.followingInProgress[0]).toBe(3)
    expect(newState.followingInProgress.length).not.toBe(startState.followingInProgress.length)
    expect(newState.isFetching).toBe(true)
})


test('users reducer should reduce followingInProgress length by one', () => {

    startState.followingInProgress = [5, 3, 4]

    const newFetching = false
    const id = 3

    const newState = usersReducer(startState, toggleFollowingInProgress(newFetching, id))

    expect(newState.followingInProgress.length).toBe(2)
    expect(newState.followingInProgress[1]).toBe(4)
    expect(newState.followingInProgress.length).not.toBe(startState.followingInProgress.length)
})