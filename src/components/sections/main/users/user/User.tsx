import React from 'react'
import S from './User.module.css'
import {NavLink} from 'react-router-dom'
import min from '../../../../../assets/images/UserDefault.jpg'
import {Button} from '../../../../common/button/Button'
import {follow, unFollow, UsersListType} from '../../../../../redux/reducers/users-reducer'
import {useDispatch, useSelector} from 'react-redux'
import {getIsFollowingInProgressS} from '../../../../../redux/selectors/users-selectors'

type UserPropsType = {
    user: UsersListType
}

export const User = React.memo((props: UserPropsType) => {

    // Используем хук useSelector и получаем данные из state
    const followingInProgress = useSelector(getIsFollowingInProgressS)
    //  Используем хук useDispatch и получаем dispatch
    const dispatch = useDispatch()


    // ----- Функция для подписки и отписки -------
    const onClickHandler = () => {
        props.user.followed
            ? dispatch(unFollow(props.user.id))
            : dispatch(follow(props.user.id))
    }

    // ----- Дополнительный класс кнопки -------
    const addClass = props.user.followed
        ? `${S.users_down_list__btn} ${S.unfollow_red}`
        : `${S.users_down_list__btn}`

    return (
        <div className={S.users_list}>
            <div className={S.users_up_list}>

                <NavLink to={`/profile/ ${props.user.id}`}>
                    <img src={props.user.photos.small ? props.user.photos.small : min}
                         alt={`${props.user.name}-AvatarImg`}
                         className={S.users_up_list__img}/>
                </NavLink>

                <p className={S.users_up_list__status}>
                    {props.user.status}
                </p>
            </div>
            <div className={S.users_down_list}>
                <NavLink to={`/profile/ ${props.user.id}`}>{props.user.name}</NavLink>

                <Button
                    name={props.user.followed ? 'UnFollow' : 'Follow'}
                    onClick={onClickHandler}
                    additionalClass={addClass}
                    disabled={followingInProgress.some(id => id === props.user.id)}
                />
            </div>
        </div>
    )
})

