import React from 'react'
import S from './Music.module.css'
import {MusicData} from './musicData/MusicData'
import {MusicSideBar} from './musicSideBar/MusicSideBar'

export const Music = () => {
    return (
        <section className={S.music}>
            <h2 className={S.music__header}>Music</h2>
            <MusicData/>
            <MusicSideBar/>
        </section>
    )
}
