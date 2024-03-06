import React from 'react'
import S from './Settings.module.css'
import {SettingsData} from './settingsData/SettingsData'
import {SettingsSideBar} from './settingsSideBar/SettingsSideBar'

export const Settings = () => {
    return (
        <section className={S.settings}>
            <h2 className={S.settings__header}>
                Settings
            </h2>
            <SettingsData/>
            <SettingsSideBar/>
        </section>
    )
}


