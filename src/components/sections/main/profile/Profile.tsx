import React from 'react'
import S from './Profile.module.css'
import {MyPostsContainer} from './myPosts/MyPostsContainer'
import {FriendsSideBarContainer} from './friendsSideBar/FriendsSideBarContainer'
import {ProfileInfoContainer} from './profileInfo/ProfileInfoContainer'


export const Profile = React.memo(() => {
    return (
        <section className={S.app_profile}>
            <ProfileInfoContainer/>
            <MyPostsContainer/>
            <FriendsSideBarContainer/>
        </section>
    )
})


