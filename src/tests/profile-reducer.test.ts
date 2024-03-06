import {addPost, deletePost, failUpdate, getUserStatus, PhotosType, ProfilePagePropsType, profileReducer, setUserProfile, updateUserStatus, updateYourPhoto} from '../redux/reducers/profile-reducer'
import img1 from '../assets/images/PostDefault.jpg'
import testImg from '../assets/images/testImg.jpg'

let startState: ProfilePagePropsType

beforeEach(() => {
    startState = {
        profileInfo: {
            aboutMe: '',
            contacts: {
                facebook: '',
                website: '',
                vk: '',
                twitter: '',
                instagram: '',
                youtube: '',
                github: '',
                mainLink: ''
            },
            lookingForAJob: false,
            lookingForAJobDescription: '',
            fullName: '',
            userId: null,
            photos: {
                small: '',
                large: ''
            }
        },
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
        status: '',
        failMessage: ''
    }
})


test('profile reducer should increase the postsData length by one', () => {

    const newHeader = 'Header'
    const newPost = 'Post'
    const newState = profileReducer(startState, addPost(newHeader, newPost))

    expect(newState.postsData.length).toBe(startState.postsData.length + 1)
    expect(newState.postsData[0].header).toBe('Header')
    expect(newState.postsData[0].message).toBe('Post')
})


test('profile reducer should update profileInfo', () => {

    const info = {
        aboutMe: 'i am not alcoholic',
        contacts: {
            facebook: '',
            website: '',
            vk: 'http://hello',
            twitter: '',
            instagram: '',
            youtube: '',
            github: '',
            mainLink: ''
        },
        lookingForAJob: true,
        lookingForAJobDescription: '',
        fullName: 'Hulk',
        userId: null,
        photos: {
            small: '',
            large: ''
        }
    }

    const newState = profileReducer(startState, setUserProfile(info))

    expect(newState.profileInfo.aboutMe).toBe('i am not alcoholic')
    expect(newState.profileInfo.fullName).toBe('Hulk')
    expect(newState.profileInfo.contacts.vk).toBe('http://hello')
})


test('status should be changed', () => {

    const newStatus = 'Hello'

    const newState = profileReducer(startState, getUserStatus(newStatus))

    expect(newState.status).toBe(newStatus)
})


test('status should be updated', () => {

    const newStatus = 'Welcome'

    const newState = profileReducer(startState, updateUserStatus(newStatus))

    expect(newState.status).toBe(newStatus)
})


test('profile reducer should reduce the postsData length by one', () => {

    const postId = 2
    const newState = profileReducer(startState, deletePost(postId))

    expect(newState.postsData.length).toBe(startState.postsData.length - 1)
    expect(newState.postsData[1].id).toBe(3)
})


test('profile photo should be changed', () => {

    const newPhoto: PhotosType = {
        large: testImg,
        small: testImg
    }
    const newState = profileReducer(startState, updateYourPhoto(newPhoto))

    expect(newState.profileInfo.photos.large).toBe(testImg)
})


test('failMessage should be changed', () => {

    const newFailMessage = 'Hello'
    const newState = profileReducer(startState, failUpdate(newFailMessage))

    expect(newState.failMessage).toBe('Hello')
})