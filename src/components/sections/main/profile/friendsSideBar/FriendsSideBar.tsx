import React from 'react'
import S from './FriendsSideBar.module.css'
import {FriendsList} from '../../../../common/friendsList/FriendsList'
import {UsersListType} from '../../../../../redux/reducers/users-reducer'
import {NavLink} from 'react-router-dom'
import find from '../../../../../assets/images/FindFriends.webp'

export const FriendsSideBar = React.memo((props: { friendsSuperList: Array<UsersListType> }) => {
    return (
        <ul className={S.friends_sidebar}>
            <h3 className={S.friends_sidebar__header}>My Friends</h3>
            {props.friendsSuperList.length
                ? <FriendsList friendsList={props.friendsSuperList} navlink={'profile'}/>
                : <NavLink
                    to={'/users'}
                    className={S.link}>
                    <img src={find}
                         alt={`find - avatar`}
                         className={S.img}/>
                    <span className={S.name}>Find Friends Here</span>
                </NavLink>
            }
        </ul>
    )
})



