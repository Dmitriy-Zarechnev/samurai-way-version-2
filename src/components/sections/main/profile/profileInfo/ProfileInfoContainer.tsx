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

    //  -------- Загрузка страницы пользователя ----------------
    componentDidMount() {
        // this.refreshProfile()
        let userId = Number(this.props.match.params.userId)
        if (!userId) {
            userId = 30743
        }

        this.props.goToPage(userId)
        this.props.getStatus(userId)
    }

    // //  -------- Отправка после редактирования Profile ----------------
    onSubmitProfileDataForm = (data: ProfileInfoType) => {
        this.props.saveProfile(data)
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


