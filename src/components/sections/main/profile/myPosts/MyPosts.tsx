import React from 'react'
import {Post} from './post/Post'
import S from './MyPosts.module.css'
import { PostsDataType} from '../../../../../redux/reducers/profile-reducer'
import {SubmitHandler, useForm} from 'react-hook-form'
import {InputForm} from '../../../../common/inputForm/InputForm'
import {TextAreaForm} from '../../../../common/textareaForm/TextAreaForm'
import {Button} from '../../../../common/button/Button'


type MyPostsPropsType = {
    posts: Array<PostsDataType>
    addPost: (header: string, post: string) => void
    deletePost: (postId: number) => void
}

type InputsDataType = {
    header: string
    post: string
}


export const MyPosts = React.memo((props: MyPostsPropsType) => {

    const {
        register,
        handleSubmit,
        reset,
        formState: {errors}
    } = useForm<InputsDataType>()

    const onSubmit: SubmitHandler<InputsDataType> = (data) => {
        props.addPost(data.header, data.post)
        reset()
    }

    return (
        <div className={S.my_posts}>
            <h3 className={S.my_posts__header}>My posts</h3>
            <form onSubmit={handleSubmit(onSubmit)} className={S.formWrapper}>
                <InputForm value={'header'} type={'text'} register={register} errors={errors.header}/>
                <TextAreaForm value={'post'} register={register} errors={errors.post}/>
                <Button name={'Add New Post'}/>
            </form>
            <Post postsData={props.posts} deletePost={props.deletePost}/>
        </div>
    )
})
