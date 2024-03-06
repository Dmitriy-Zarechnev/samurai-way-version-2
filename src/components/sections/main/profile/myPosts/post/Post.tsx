import React from 'react'
import S from './Post.module.css'
import {PostsDataType} from '../../../../../../redux/reducers/profile-reducer'
import {Button} from '../../../../../common/button/Button'

type PostPropsType = {
    postsData: PostsDataType[]
    deletePost: (postId: number) => void
}


export const Post = React.memo((props: PostPropsType) => {

    const deletePostHandler = (postId: number) => {
        props.deletePost(postId)
    }

    return (
        <div className={S.post}>
            {props.postsData.map((el) => {
                return (
                    <div className={S.post__item} key={el.id}>
                        <h4 className={S.post__item_header}>{el.header}</h4>
                        <span className={S.post__item_message}>{el.message}</span>
                        <img className={S.post__item_img} src={el.src} alt="picture"/>
                        <div className={S.post__bottom}>
                            <span className={S.post__bottom_likes}>
                                {el.likesCount} likes
                            </span>
                            <Button name={'🧷'}
                                    additionalClass={S.post__bottom_button}
                                    onClick={() => deletePostHandler(el.id)}/>
                        </div>
                    </div>
                )
            })}
        </div>
    )
})


