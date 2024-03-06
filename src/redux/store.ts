
 /*
export type StoreType = {
    _state: RootStateDataType,
    _callSubscriber: (state: RootStateDataType) => void,

    getState: () => RootStateDataType,
    subscribe: (observer: ObserverType) => void,

    dispatch: (action: ActionType) => void,
}

  */

// Типизация для observer

export type ObserverType = (state: any) => void




// Типизация для State
/*
export type RootStateDataType = {
    profilePage: ProfilePagePropsType,
    messagesPage: MessagesPagePropsType
}

 */

// Типизация для action
/*
export type ActionType = {
    type: 'ADD-POST' | 'UPDATE-NEW-POST-TEXT' | 'SEND-NEW-MESSAGE' | 'UPDATE-NEW-SEND-MESSAGE',
    newHeaderText?: string,
    newText?: string,
    message?: string,
}

 */

// Типизация для observer
/*
type ObserverType = (state: RootStateDataType) => void

 */
// Типизация для ProfilePage
/*
export type ProfilePagePropsType = {
    postsData: Array<PostsDataType>,
    newPost: Array<string>,
    friendsList: Array<FriendsListDataType>
}

export type PostsDataType = {
    id: number,
    header: string,
    src: string,
    message: string,
    likesCount: number
}

export type FriendsListDataType = {
    id: number,
    src: string,
    name: string,
    alt: string
}


 */
// Типизация для страницы постов
/*
export type MyPostsPropsType = {
    posts: Array<PostsDataType>,
    newPost: Array<string>,
    updateNewPostTextArea: (postValue: string) => void
    updateNewPostInput: (headerValue: string) => void
    addPost: () => void
}

 */

// Типизация для MessagePage
/*
export type MessagesPagePropsType = {
    dialogsData: Array<DialogsDataType>,
    messagesData: Array<MessagesDataType>,
    newMessg: string
}

export type MessagesDataType = {
    id: number,
    message: string
}

export type DialogsDataType = {
    id: number,
    src: string,
    name: string,
    alt: string
}

 */


// Store содержит все данные и методы
/*
let store: StoreType = {
    _state: {
        //  Данные для ProfilePage
        profilePage: {
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
            newPost: ['', ''],
            friendsList: [
                {
                    id: 1,
                    src: cammyFriend,
                    name: 'Cammy',
                    alt: 'Cammy Avatar'
                },
                {
                    id: 2,
                    src: kratosFriend,
                    name: 'Kratos',
                    alt: 'Kratos Avatar'
                },
                {
                    id: 3,
                    src: groguFriend,
                    name: 'Grogu',
                    alt: 'Grogu Avatar'
                },
                {
                    id: 4,
                    src: trissFriend,
                    name: 'Triss',
                    alt: 'Triss Avatar'
                },
                {
                    id: 5,
                    src: itachiFriend,
                    name: 'itachi',
                    alt: 'itachi Avatar'
                },
                {
                    id: 6,
                    src: nineS,
                    name: '9S',
                    alt: '9S Avatar'
                }
            ]
        },

        // Данные для MessagePage
        messagesPage: {
            dialogsData: [
                {
                    id: 1,
                    src: cammyFriend,
                    name: 'Cammy',
                    alt: 'Cammy Avatar'
                },
                {
                    id: 2,
                    src: kratosFriend,
                    name: 'Kratos',
                    alt: 'Kratos Avatar'
                },
                {
                    id: 3,
                    src: groguFriend,
                    name: 'Grogu',
                    alt: 'Grogu Avatar'
                },
                {
                    id: 4,
                    src: trissFriend,
                    name: 'Triss',
                    alt: 'Triss Avatar'
                },
                {
                    id: 5,
                    src: itachiFriend,
                    name: 'itachi',
                    alt: 'itachi Avatar'
                },
                {
                    id: 6,
                    src: nineS,
                    name: '9S',
                    alt: '9S Avatar'
                }
            ],
            messagesData:
                [
                    {id: 1, message: 'hello there'},
                    {id: 2, message: 'hi are you?'},
                    {id: 3, message: 'We far from the shallow, now'},
                    {id: 4, message: 'Are you happy in this world?'},
                    {id: 5, message: 'Tell me something , boy'},
                    {id: 6, message: 'I would rather not say'}
                ],
            newMessg: ''
        }
    },

    _callSubscriber() {
        console.log('State was changed')
    },

    getState() {
        return this._state
    },
    subscribe(observer: ObserverType) {
        this._callSubscriber = observer
    },

    dispatch(action: ActionType) {
        this._state.profilePage = profileReducer(this._state.profilePage, action)
        this._state.messagesPage = messagesReducer(this._state.messagesPage, action)

        this._callSubscriber(this._state)
    }
}



 export default store

!!!!!!!!!!!!!!!!!!!!! Как работает mapDispatchToProps !!!!!!!!!!!!!!!!!!!!!!
// let mapDispatchToProps = (dispatch: Dispatch<UsersAPIComponentActionsType>) => {
//     return {
//         followFriend: (userID: number) => {
//             dispatch(followAC(userID))
//         },
//         unfollowFriend: (userID: number) => {
//             dispatch(unfollowAC(userID))
//         },
//         setUsers: (items: UsersListType[]) => {
//             dispatch(setUsersAC(items))
//         },
//         setCurrentPage: (currentPage: number) => {
//             dispatch(setCurrentPageAC(currentPage))
//         },
//         setTotalUsersCount: (totalCount: number) => {
//             dispatch(setTotalUsersCountAC(totalCount))
//         },
//         toggleIsFetching: (isFetching: boolean) => {
//             dispatch(toggleIsFetchingAC(isFetching))
//         }
//     }
// }


 */
