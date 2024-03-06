import React from 'react'
import {ProfileInfoType} from '../../../../../../redux/reducers/profile-reducer'
import {SubmitHandler, useForm} from 'react-hook-form'
import {Button} from '../../../../../common/button/Button'
import S from './ProfileDataForm.module.css'
import {ProfileInputForm} from '../../../../../common/profileInputForm/ProfileInputForm'
import {CheckInputForm} from '../../../../../common/checkInputForm/CheckInputForm'


type ProfileDataFormPropsType = {
    profileInfo: ProfileInfoType,
    onSubmitProfileDataForm: (data: ProfileInfoType) => void,
    closeEditMode: () => void,
    failMessage: string,
}

export const ProfileDataForm = React.memo((props: ProfileDataFormPropsType) => {

    const {
        register,
        handleSubmit,
        reset
    } = useForm<ProfileInfoType>()

    const onSubmit: SubmitHandler<ProfileInfoType> = (data) => {
        props.onSubmitProfileDataForm(data)
        props.closeEditMode()
        reset()
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={S.wrapper}>
            <div className={S.info_wrapper}>
                <ProfileInputForm
                    register={register}
                    value={'aboutMe'}
                    id={'aboutMe'}
                    defValue={props.profileInfo.aboutMe}
                    name={'About Me'}/>

                <ProfileInputForm
                    register={register}
                    value={'fullName'}
                    id={'fullName'}
                    defValue={props.profileInfo.fullName}
                    name={'Full Name'}/>

                <ProfileInputForm
                    register={register}
                    value={'lookingForAJobDescription'}
                    id={'lookingForAJobDescription'}
                    defValue={props.profileInfo.lookingForAJobDescription}
                    name={'Skills Description'}/>

                <CheckInputForm
                    id={'lookingForAJob'}
                    name={'Looking Job'}
                    value={'lookingForAJob'}
                    register={register}
                    devChecked={props.profileInfo.lookingForAJob}
                    addBoxClass={S.checkClass}/>
            </div>

            <div>
                <h3 className={S.contacts_header}>Contacts</h3>
                <div className={S.info_wrapper}>
                    {Object.entries(props.profileInfo.contacts).map(([key, value]) => (
                        <ProfileInputForm
                            key={key}
                            register={register}
                            value={`contacts.${key}`}
                            id={key}
                            defValue={value}
                            name={key.charAt(0).toUpperCase() + key.slice(1)}
                        />
                    ))}
                </div>
            </div>
            <Button name={'Save'}/>
            <span className={S.failMessage}>{props.failMessage||''}</span>
        </form>
    )
})

