import React from 'react'
import S from './Header.module.css'
import {NavLink} from 'react-router-dom'
import {Button} from '../../common/button/Button'
import {Icon} from '../../common/icon/Icon'

type HeaderPropsType = {
    id: number | null
    email: string
    login: string
    isAuth: boolean
    logOut: () => void
}

export const Header = React.memo((props: HeaderPropsType) => {

    return (
        <header className={S.app_header}>
            <Icon iconId={'logo'} height={'50px'} width={'50px'} viewBox={'0 0 32 32'}/>

            <div className={S.login_block}>
                {props.isAuth
                    ?
                    <div className={S.button_box}>
                        <span className={S.span}>{props.login}</span>
                        <Button name={'LogOut'} onClick={props.logOut}/>
                    </div>
                    : <NavLink to={'/login'}><Button name={'LogIn'}/></NavLink>}
            </div>
        </header>
    )
})


