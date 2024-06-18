import React from 'react'
import { useSelector } from 'react-redux'
import { postsSelector } from '../../../../service/redux/posts/postsSlice'

import config from '../../../../configs/Configs.json'
const { URL_BASE64 } = config


const GroupImages = () => {

 const postsState = useSelector(postsSelector)

 const imageList2 = postsState.posts.map((post, index) => ({
    id: index + 1,
    thumb: post.Photo,
  }))

 return (
  <div>
   <div className='p-3 bg-black rounded-md mx-auto'>
    <div className='bg-gray-700 rounded p-2'>
     <div className='flex justify-between'>
      <h5>Ảnh</h5>

      <div>
       <button type=''>Xem tất cả ảnh</button>
      </div>
     </div>
     <div className=''>
      <ul className='grid grid-cols-3 xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1'>
       {imageList2.map(({ id, thumb }) => (
        <li key={id} className='p-1'>
         <img
          className='h-[150px] w-[150px] object-cover rounded'
          src={`${URL_BASE64}${thumb}`}
          alt={thumb}
         />
        </li>
       ))}
      </ul>
     </div>
    </div>
   </div>
  </div>
 )
}

export default GroupImages
