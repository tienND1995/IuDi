import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

import Logogroup from '../../../../images/logo-group.png'
import GroupItem from './GroupItem'

import config from '../../../../configs/Configs.json'
import { ChevronLeftIcon } from '@heroicons/react/24/outline'
const { API__SERVER } = config

const SideBarGroup = ({ onLoading, onClick }) => {
 const [groupList, setGroupList] = useState([])
 const { groupId } = useParams()

 useEffect(() => {
  const fetchGroups = async () => {
   try {
    const response = await axios.get(`${API__SERVER}/forum/group/all_group`)
    setGroupList(response.data.data)
    onLoading(true)
   } catch (error) {
    console.error('Error fetching data:', error)
   }
  }
  fetchGroups()
 }, [])

 return (
  <div className='sm:text-white text-black lg:text-[16px] sm:text-[12px] text-[14px] '>
    <div className='hidden mobile:flex justify-between p-4 items-center border-b-[#817C7C] border-b border-solid'>
      <Link to='/'>
        <button className='w-8 h-8 '>
          <ChevronLeftIcon />
        </button>
      </Link>
      <span className='text-[26px] font-semibold'>Nhóm</span>
        <div></div>
    </div>
   <div className='flex items-center gap-2 mobile:hidden'>
    <Link>
     <img src={Logogroup} alt='logo group' />
    </Link>
    <h2 className='uppercase'>Group</h2>
   </div>

   <ul className='mt-5'>
    {groupList.map(({ GroupID, avatarLink, GroupName }) => {
     const imgAvatarRef = React.createRef()

     return (
      <GroupItem
       key={GroupID}
       data={{
        GroupID,
        avatarLink,
        GroupName,
        refImg: imgAvatarRef,
        idParams: groupId,
       }}
       onSelectGroup={onClick}
      />
     )
    })}
   </ul>
  </div>
 )
}

export default SideBarGroup
