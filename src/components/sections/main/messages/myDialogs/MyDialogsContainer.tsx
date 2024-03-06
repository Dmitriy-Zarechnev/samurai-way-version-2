import {MyDialogs} from './MyDialogs'
import {connect} from 'react-redux'
import {AppRootState} from '../../../../../redux/redux-store'
import {friendsSuperSelector} from '../../../../../redux/selectors/friendlist-selector'


const mapStateToProps = (state: AppRootState) => {
    return {
        friendsSuperList: friendsSuperSelector(state)
    }
}


export const MyDialogsContainer = connect(mapStateToProps, {})(MyDialogs)
