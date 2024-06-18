import axios from 'axios'
import React, { useEffect, useState, useRef } from 'react'

import { ToastContainer } from 'react-toastify'

import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import {
 fetchPosts,
 postComment,
 postsSelector,
} from '../../../../service/redux/posts/postsSlice'
import { usersSelector } from '../../../../service/redux/users/usersSlice'

import uploadFile from '../../../../images/icons/uploadFile.png'

import config from '../../../../configs/Configs.json'
import { Auth } from '../../../../service/utils/auth'
import FormPost from './FormPost'
import PostItem from './PostItem'

import { handleErrorImg } from '../../../../service/utils/utils'
import MenuMobile from '../../../../components/MobileMenu'

const { API__SERVER, URL_BASE64 } = config

const GroupDetail = () => {
 const { userID } = new Auth()
 const { groupId } = useParams()
 const [postList, setPostList] = useState([])

 const { posts, changeTogglePosts } = useSelector(postsSelector)
 const userState = useSelector(usersSelector)

 const dispatch = useDispatch()

 useEffect(() => {
  dispatch(fetchPosts({ groupId, userID }))
 }, [changeTogglePosts, groupId])

 useEffect(() => {
  const newPosts = []
  posts.length > 0
   ? posts.forEach(async (post, index) => {
      const comments = await getComments(post.PostID)
      const newPost = { ...post, comments }
      newPosts.push(newPost)

      if (index === posts.length - 1) setPostList(newPosts)
     })
   : setPostList(newPosts)
 }, [posts])

 const [modal, setModal] = useState({
  showModal: false,
  method: 'post',
  post: {},
 })

 const handleShowModal = (name, post) => {
  setModal({
   showModal: true,
   post: post,
   method: name === 'post' ? 'post' : 'patch',
  })
 }
 const handleHiddenModal = () => setModal({ ...modal, showModal: false })

 const getComments = async (postID) => {
  const { data } = await axios.get(
   `${API__SERVER}/forum/comment/${postID}/${userID}`
  )
  return data.Comments
 }

 const avatarUserRef = useRef()

 return (
  <div>
   <div className='relative p-5 rounded-lg bg-[#222222] border border-solid border-[#4EC957] mobile:bg-white mobile:border-[#ccc]'>
    <div className='flex gap-2 items-center'>
     <img
      className='w-[73px] h-[73px] rounded-full object-cover'
      src={`${URL_BASE64}${userState.user.avatarLink}`}
      alt='avatar user'
      onError={() => handleErrorImg(avatarUserRef)}
      ref={avatarUserRef}
     />
     <button
      type='button'
      className='h-max'
      onClick={() => handleShowModal('post', {})}
     >
      Hãy viết nên suy nghĩ của mình !
     </button>
    </div>

    <div className='mt-3 flex justify-between mobile:hidden'>
     <button
      onClick={() => handleShowModal('post', {})}
      type='button'
      className='relative bg-[#303030] py-2 px-5 rounded-[20px] flex gap-1 mobile:bg-[#f0f2f5]'
     >
      <img src={uploadFile} alt='upload file'/>
      <spa>Ảnh/Video</spa>
     </button>

     {/* <button type='submit' className='bg-[#4EC957] rounded-[20px]  py-2 px-5'>
      Đăng
     </button> */}
    </div>
   </div>

   <div className='mobile:bg-[#ececec] max-h-[70vh]  overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 md:max-h-full md:overflow-y-visible'>
    <ul>
     {postList.length > 0 ? (
      postList.map(
       ({
        Content,
        PostID,
        UserFullName,
        Avatar,
        FavoriteCount,
        FirstComment,
        Title,
        UpdatePostAt,
        Photo,
        IsFavorited,
        comments,
        Username,
        UserID,
       }) => {
        const btnRef = React.createRef()
        const commentRef = React.createRef()
        const inputCommentRef = React.createRef()

        const handleSubmitComment = (e) => {
         e.preventDefault()
         const value = inputCommentRef.current.value
         if (value.trim() === '') return

         const data = { Content: value }
         dispatch(postComment({ PostID, data, userID }))
         inputCommentRef.current.value = ''
        }

        const handleShowComments = () => {
         commentRef.current.classList.remove('hidden')
         inputCommentRef.current.focus()
        }

        const imgAvatarRef = React.createRef()
        const imgPhotoRef = React.createRef()

        return (
         <PostItem
          key={PostID}
          data={{
           Content,
           PostID,
           UserFullName,
           Avatar,
           FavoriteCount,
           FirstComment,
           Title,
           UpdatePostAt,
           Photo,
           IsFavorited,
           comments,
           Username,
           UserID,
          }}
          handle={{
           imgAvatarRef,
           imgPhotoRef,
           btnRef,
           handleShowModal,
           handleShowComments,
           handleSubmitComment,
           inputCommentRef,
           commentRef,
          }}
         />
        )
       }
      )
     ) : (
      <li className='mt-5'>
       <h2>KHÔNG CÓ BÀI VIẾT NÀO</h2>
      </li>
     )}
    </ul>
   </div>

   <FormPost modal={modal} hiddenModal={handleHiddenModal} />

   <ToastContainer position='bottom-right' autoClose={5000} />

     {/* Mobile menu */}
     <div className='fixed bottom-10 left-0 right-0 mx-3 hidden mobile:block rounded-t-lg'>
      <MenuMobile/>
      </div>
  </div>
 )
}

export default GroupDetail
