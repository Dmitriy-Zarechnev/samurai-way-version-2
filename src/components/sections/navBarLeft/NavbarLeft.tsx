import React from 'react'
import S from './NavbarLeft.module.css'
import {NavLink} from 'react-router-dom'

export const NavbarLeft = React.memo(() => {
    return (
        <nav className={S.navbar_Left}>
            <ul>
                <li className={S.navbar_Left__item}><NavLink to={'/profile'} activeClassName={S.active}>Profile</NavLink></li>
                <li className={S.navbar_Left__item}><NavLink to={'/messages'} activeClassName={S.active}>Messages</NavLink></li>
                <li className={S.navbar_Left__item}><NavLink to={'/news'} activeClassName={S.active}>News</NavLink></li>
                <li className={S.navbar_Left__item}><NavLink to={'/music'} activeClassName={S.active}>Music</NavLink></li>
                <li className={S.navbar_Left__item}><NavLink to={'/users'} activeClassName={S.active}>Users</NavLink></li>

                <li className={S.navbar_Left__item}><NavLink to={'/settings'} activeClassName={S.active}>Settings</NavLink></li>
            </ul>
        </nav>
    )
})


