import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

import Slider from 'react-slick'
import 'slick-carousel/slick/slick-theme.css'
import 'slick-carousel/slick/slick.css'

import { useDispatch, useSelector } from 'react-redux'
import {
 fetchHistoryMessages,
 messagesSelector,
} from '../../../../service/redux/messages/messagesSlice'
import { usersSelector } from '../../../../service/redux/users/usersSlice'

import io from 'socket.io-client'
import { handleErrorImg } from '../../../../service/utils/utils'

import { Auth } from '../../../../service/utils/auth'
import UserOtherItem from './UserOtherItem'
import MessageHistoryItem from './MessageHistoryItem'

import config from '../../../../configs/Configs.json'
const { URL_BASE64 } = config
const socket = io('https://api.iudi.xyz')

const Message = () => {
 var settings = {
  arrows: false,
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 5,
  slidesToScroll: 1,
 }

 const { id } = useParams()
 const { userID, userName } = new Auth()

 const [userIdOtherList, setUserIdOtherList] = useState([])
 const [userOtherList, setUserOtherList] = useState([])

 const { historyMessages, postToggle } = useSelector(messagesSelector)
 const dispatch = useDispatch()
 const userState = useSelector(usersSelector)

 useEffect(() => {
  // client connect to server
  socket.emit('userId', { userId: userID })

  socket.on('online', (data) => {
   setUserIdOtherList(data.user)
  })
 }, [socket, userID])

 useEffect(() => {
  dispatch(fetchHistoryMessages(userID))
 }, [postToggle])

 const getProfileChat = async (id) => {
  if (id && id !== parseInt(userID)) {
   const { data } = await axios.get(`https://api.iudi.xyz/api/chat/${id}`)
   const user = {
    id: data.data[0].UserID,
    username: data.data[0].Username,
    avatar: data.data[0].Avatar,
   }

   const isMatch = userOtherList.some((user) => user.id === data.data[0].UserID)

   if (data.data.length > 0 && isMatch === false) {
    setUserOtherList([...userOtherList, user])
   }
  }
 }

 useEffect(() => {
  userIdOtherList.forEach((id) => {
   getProfileChat(id)
  })
 }, [userIdOtherList])

 const imgAvatarUserRef = React.createRef()

 //   console.log('data:', userOtherList)

 return (
  <>
   <Slider {...settings}>
    <div className='text-center'>
     <Link to={`/profile/${userName}`}>
      <img
       className='mx-auto w-[73px] h-[73px] rounded-full object-cover'
       src={`${URL_BASE64}${userState.user.avatarLink}`}
       alt='avatar'
       ref={imgAvatarUserRef}
       onError={() => handleErrorImg(imgAvatarUserRef)}
      />
      <h5 className='capitalize'>{userName}</h5>
     </Link>
    </div>

    {userOtherList.length > 0
     ? userOtherList.map(({ id, username, avatar }) => {
        const imgAvatarRef = React.createRef()

        return (
         <UserOtherItem
          key={id}
          data={{
           id,
           username,
           avatar,
           ref: imgAvatarRef,
          }}
         />
        )
       })
     : ''}
   </Slider>

   <div className=' pr-[30px]'>
    <ul>
     {historyMessages.length > 0 ? (
      historyMessages.map(
       ({
        MessageID,
        Content,
        OtherUsername,
        OtherAvatar,
        MessageTime,
        OtherUserID,
       }) => {
        let isOnline = false
        userIdOtherList.some((userId) => (isOnline = userId === OtherUserID))

        const imgAvatarRef = React.createRef()

        return (
         <MessageHistoryItem
          key={MessageID}
          data={{
           MessageID,
           Content,
           OtherUsername,
           OtherAvatar,
           MessageTime,
           OtherUserID,
           refImg: imgAvatarRef,
           isOnline,
           idParams: id,
          }}
         />
        )
       }
      )
     ) : (
      <li></li>
     )}
    </ul>
   </div>
  </>
 )
}

export default Message
