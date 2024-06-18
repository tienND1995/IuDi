import React from 'react'

import Moment from 'react-moment'
import { useDispatch } from 'react-redux'

import {
 removeComment,
 likeUnlikeComment,
} from '../../../../service/redux/posts/postsSlice'

import { MdDelete } from 'react-icons/md'
import { handleErrorImg } from '../../../../service/utils/utils'

import config from '../../../../configs/Configs.json'
const { URL_BASE64 } = config

const CommentItem = (props) => {
 const {
  FavoriteCount,
  CommentID,
  FullName,
  Content,
  CommentUpdateTime,
  IsFavorited,
  UserID,
  Avatar,
  imgRef,
 } = props.data

 const dispatch = useDispatch()

 return (
  <li className='flex gap-2 items-start mb-4'>
   <div>
    <img
     className='w-[42px] h-[42px] object-cover rounded-full'
     src={`${URL_BASE64}${Avatar}`}
     alt='avatar'
     ref={imgRef}
     onError={() => handleErrorImg(imgRef)}
    />
   </div>

   <div>
    <div className='flex gap-2 items-center group '>
     <div className='bg-[#423f3f] p-2 rounded-xl mobile:text-black mobile:bg-[#f0f2f5]'>
      <h3 className='text-xs font-semibold capitalize'>{FullName}</h3>
      <p className='text-xs'>{Content}</p>
     </div>

     <div>
      <button
       onClick={() => {
        dispatch(removeComment(CommentID))
       }}
       className='opacity-0 transition-all duration-100 group-hover:opacity-100 p-1 rounded-full hover:bg-gray-700 btn-show-delete'
      >
       <MdDelete />
      </button>
     </div>
    </div>

    <div className='flex gap-3 text-[7px] mt-1'>
     <Moment fromNow ago>{`${CommentUpdateTime}+0700`}</Moment>

     <div className='flex gap-1'>
      <span>{FavoriteCount !== 0 && FavoriteCount}</span>
      <button
       type=''
       onClick={() =>
        dispatch(likeUnlikeComment({ commentID: CommentID, userID: UserID }))
       }
       className={IsFavorited ? 'text-primary' : 'text-white'}
      >
       Thích
      </button>
     </div>
     <div>
      <button type=''>Trả lời</button>
     </div>
    </div>
   </div>
  </li>
 )
}

export default CommentItem
