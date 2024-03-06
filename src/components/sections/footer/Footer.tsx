import React from 'react'
import S from './Footer.module.css'
import {Icon} from '../../common/icon/Icon'

export const Footer = React.memo(() => {
    return (
        <footer className={S.app_footer}>
            <Icon iconId={'logo'} height={'30px'} width={'30px'} viewBox={'0 0 32 32'}/>
        </footer>
    )
})

