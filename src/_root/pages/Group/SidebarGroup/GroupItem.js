import React from 'react'
import { Link } from 'react-router-dom'
import { slugString, handleErrorImg } from '../../../../service/utils/utils'

import config from '../../../../configs/Configs.json'
const {URL_BASE64} = config

const GroupItem = (props) => {
 const { GroupID, avatarLink, GroupName, idParams, refImg } = props.data
 return (
  <li
   key={GroupID}
   className='mb-3 mx-3 sm:mx-0'
   style={GroupID === parseInt(idParams) ? { background: 'rgba(0,0,0,.2)' } : {}}
  >
   <Link
    to={`/group/${slugString(GroupName)}/${GroupID}`}
    className='flex flex-wrap gap-2 items-center'
   >
    <div>
     <img
      alt={GroupName}
      onError={() => handleErrorImg(refImg)}
      ref={refImg}
      src={`${URL_BASE64}${avatarLink}`}
      className='w-[60px] h-[60px] lg:w-[80px] lg:h-[80px] md:w-[60px] md:h-[60px] sm:w-[50px] sm:h-[50px] rounded-full border-2 border-solid border-[#fdfdfd]'
     />
    </div>

    <h5>{GroupName}</h5>
   </Link>
  </li>
 )
}

export default GroupItem
