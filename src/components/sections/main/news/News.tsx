import React from 'react'
import S from './News.module.css'
import {NewsData} from './newsData/NewsData'
import {NewsSideBar} from './newsSideBar/NewsSideBar'

export const News = () => {
    return (
        <section className={S.news}>
            <h2 className={S.news__header}>News</h2>
            <NewsData/>
            <NewsSideBar/>
        </section>
    )
}



