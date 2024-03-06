import React from 'react'
import start from '../../../assets/images/homePage.webp'
import S from './StartPage.module.css'

export const StartPage = React.memo(() => {
    return <img className={S.page} src={start} alt={'Home Page Picture'}/>
})

