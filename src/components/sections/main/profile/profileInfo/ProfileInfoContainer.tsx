import {connect} from 'react-redux'
import {ProfileInfo} from './ProfileInfo'
import {getStatus, goToPage, ProfileInfoType, savePhoto, saveProfile, setUserProfile, updateStatus} from '../../../../../redux/reducers/profile-reducer'
import React from 'react'
import {RouteComponentProps, withRouter} from 'react-router-dom'
import {AppRootState} from '../../../../../redux/redux-store'
import {compose} from 'redux'
import {getFailMessage, getId, getIsAuth, getProfileInfo, getStatusFromState} from '../../../../../redux/selectors/profile-selector'

type ProfileInfoAPIComponentPropsType =
    ProfileInfoAPIComponentMapStateToProps &
    ProfileInfoAPIComponentMapDispatchToProps &
    RouteComponentProps<{ userId: string }>

type ProfileInfoAPIComponentMapStateToProps = ReturnType<typeof mapStateToProps>
type ProfileInfoAPIComponentMapDispatchToProps = {
    setUserProfile: (profileInfo: ProfileInfoType) => void
    goToPage: (id: number) => void
    getStatus: (userId: number | null) => void
    updateStatus: (status: string) => void
    savePhoto: (file: File) => void
    saveProfile: (data: ProfileInfoType) => void
}

class ProfileInfoAPIComponent extends React.PureComponent<ProfileInfoAPIComponentPropsType> {


    //  -------- Отправка после редактирования Profile ----------------
    onSubmitProfileDataForm = (data: ProfileInfoType) => {
        this.props.saveProfile(data)
    }


    //  -------- Загрузка страницы пользователя ----------------
    componentDidMount() {
        this.loadUserData()
    }

    //  -------- Обновление страницы пользователя ----------------
    componentDidUpdate(prevProps: Readonly<ProfileInfoAPIComponentPropsType>, prevState: Readonly<{}>) {
        if (this.props.match.params.userId !== prevProps.match.params.userId) {
            this.loadUserData()
        }
    }

    // Общий метод для методов жизненного цикла
    loadUserData() {
        let userlocId: number | null = Number(this.props.match.params.userId)

        // Если userlocId пустой, добавляем того, кто зарегался
        if (!userlocId) {
            userlocId = this.props.userId
        }

        // Переходим на страницу того, чей id в url
        if (userlocId) {
            this.props.goToPage(userlocId)
            this.props.getStatus(userlocId)
        }
    }

    render() {
        return (
            <ProfileInfo profileInfo={this.props.profileInfo}
                         status={this.props.status}
                         updateStatus={this.props.updateStatus}
                         isOwner={!this.props.match.params.userId}
                         savePhoto={this.props.savePhoto}
                         failMessage={this.props.failMessage}
                         onSubmitProfileDataForm={this.onSubmitProfileDataForm}
            />)
    }
}

const mapStateToProps = (state: AppRootState) => {
    return {
        profileInfo: getProfileInfo(state),
        status: getStatusFromState(state),
        userId: getId(state),
        isAuth: getIsAuth(state),
        failMessage: getFailMessage(state)
    }
}

export const ProfileInfoContainer = compose<React.ComponentType>(
    // withAuthRedirect,
    connect(mapStateToProps,
        {
            setUserProfile,
            goToPage,
            getStatus,
            updateStatus,
            savePhoto,
            saveProfile
        }),
    withRouter
)(ProfileInfoAPIComponent)


