import React from 'react'
import error from '../../../assets/images/404.webp'
import S from './Error.module.css'

export const Error = React.memo(() => {
    return <img src={error} alt={'Error Picture Not Found'} className={S.img}/>
})
