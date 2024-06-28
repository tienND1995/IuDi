import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

import Slider from 'react-slick'

import {
 ChevronLeftIcon,
 MagnifyingGlassIcon,
} from '@heroicons/react/24/outline'

import { useDispatch, useSelector } from 'react-redux'
import {
 fetchHistoryMessages,
 messagesSelector,
} from '../../../../service/redux/messages/messagesSlice'
import { usersSelector } from '../../../../service/redux/users/usersSlice'

import io from 'socket.io-client'
import { handleErrorImg } from '../../../../service/utils/utils'

import { Auth } from '../../../../service/utils/auth'
import MessageHistoryItem from './MessageHistoryItem'
import UserOtherItem from './UserOtherItem'

import NavMobile from '../../../../components/NavMobile/NavMobile'
import config from '../../../../configs/Configs.json'

import {selectOnlineStatus} from '../../../../service/redux/messages/messagesSlice'

const { URL_BASE64 } = config

const socket = io('https://api.iudi.xyz')

const Message = () => {
 var settings = {
  arrows: false,
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  initialSlide: 0,
  responsive: [
   {
    breakpoint: 1024,
    settings: {
     slidesToShow: 3,
     slidesToScroll: 1,
     infinite: false,
     arrows: false,
     dots: false,
    },
   },
   {
    breakpoint: 600,
    settings: {
     slidesToShow: 1,
     slidesToScroll: 1,
     initialSlide: 2,
     arrows: false,
     dots: false,
    },
   },
   {
    breakpoint: 480,
    settings: {
     slidesToShow: 1,
     slidesToScroll: 1,
     arrows: false,
     dots: false,
    },
   },
  ],
 }

 const { id } = useParams()
 const { userID, userName } = new Auth()

 const [userIdOtherList, setUserIdOtherList] = useState([])
 const [userOtherList, setUserOtherList] = useState([])

//  const [isOnline, setIsOnline] = useState(true)
 const isOnline = useSelector(selectOnlineStatus)

 const { historyMessages, postToggle, isSeenMessage } =
  useSelector(messagesSelector)
 const dispatch = useDispatch()
 const userState = useSelector(usersSelector)

 useEffect(() => {
  // client connect to server
  if (isOnline) {
    socket.emit('userId', { userId: userID })
   } else {
     socket.emit('offline', { userId: userID })
   }

  socket.on('check_message', (message) => {
   console.log('check_message', message)
  })

  socket.on('online', (data) => {
   setUserIdOtherList(data.user)
  })
 }, [isOnline, userID])

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

 return (
  <>
   <div className='hidden mb-4 mobile:block '>
    <div className='flex items-center justify-between p-4 border-b-[#817C7C] border-b border-solid'>
     <Link to='/'>
      <button className='w-6 h-6 '>
       <ChevronLeftIcon />
      </button>
     </Link>
     <span className='text-2xl font-bold'>Chat</span>
     <button className='w-6 h-6'>
      <MagnifyingGlassIcon />
     </button>
    </div>
   </div>
   <Slider {...settings}>
    <div className='text-center'>
     <Link to={`/profile/${userName}`}>
      <img
       className='mx-auto w-[73px] h-[73px] tablet:w-[60px] tablet:h-[60px] mobile:w-[50px] mobile:h-[50px] rounded-full object-cover'
       src={`${URL_BASE64}${userState.user.avatarLink}`}
       alt='avatar'
       onError={(e) => handleErrorImg(e.target)}
      />
      <h5 className='font-medium capitalize'>{userName}</h5>
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

   <div className='mobile:px-3'>
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
        IsSeen,
        SenderID,
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
           SenderID,
           IsSeen,
           isSeenMessage,
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

   {/* Mobile menu */}
   <NavMobile />
  </>
 )
}

export default Message
