import {addPost, deletePost} from '../../../../../redux/reducers/profile-reducer'
import {MyPosts} from './MyPosts'
import {connect} from 'react-redux'
import {AppRootState} from '../../../../../redux/redux-store'
import {getPostsDataFromStateS} from '../../../../../redux/selectors/profile-selector'


const mapStateToProps = (state: AppRootState) => {
    return {
        posts: getPostsDataFromStateS(state)
    }
}

export const MyPostsContainer = connect(mapStateToProps, {addPost, deletePost})(MyPosts)

