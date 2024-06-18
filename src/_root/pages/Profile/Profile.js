import axios from 'axios'
import React, { useEffect, useState, useRef } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'

import { AiOutlineHome, AiOutlineMail } from 'react-icons/ai'
import { FaRegUser } from 'react-icons/fa6'
import { MdArrowBackIos } from 'react-icons/md'
import {
 MdOutlineDateRange,
 MdOutlineLocalPhone,
 MdOutlineWhereToVote,
} from 'react-icons/md'

import Header1 from '../../../components/header/Header1'
import Footer from '../../../components/Footer/Footer'
import bg from '../../../images/bg3.jpg'
import bgProfile from '../../../images/profiles/bg-profile.png'

import { Auth } from '../../../service/utils/auth'
import FormChangePassword from '../../../_auth/forms/FormChangePassword'
import { handleErrorImg } from '../../../service/utils/utils'

import ArrowUp2 from '../../../images/profiles/ArrowUp2.png'
import Chat from '../../../images/profiles/Chat.png'
import Line6 from '../../../images/profiles/Line6.png'

import configs from '../../../configs/Configs.json'
const { URL_BASE64 } = configs

function Profile() {
 const { userID, userName } = new Auth()
 const [profileData, setProfileData] = useState({})
 const [isModalOpenChangePass, setIsModalOpenChangePass] = useState(false)

 const { username } = useParams()

 const background = {
  backgroundImage: `url(${bg})`,
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
 }

 const navigate = useNavigate()
 useEffect(() => {
  const fetchProfileData = async () => {
   try {
    const response = await axios.get(
     `https://api.iudi.xyz/api/profile/${username}`
    )
    setProfileData(response.data.Users[0])
   } catch (error) {
    console.error('Error fetching profile data:', error)
   }
  }

  fetchProfileData()
 }, [username])

 const {
  avatarLink,
  FullName,
  Bio,
  Email,
  BirthDate,
  CurrentAdd,
  Phone,
  BirthPlace,
  UserID,
 } = profileData

 const dataList = [
  {
   id: 1,
   name: FullName,
   icon: <FaRegUser />,
  },

  {
   id: 2,
   name: Phone,
   icon: <MdOutlineLocalPhone />,
  },

  {
   id: 3,
   name: Email,
   icon: <AiOutlineMail />,
  },

  {
   id: 4,
   name: BirthDate,
   icon: <MdOutlineDateRange />,
  },

  {
   id: 5,
   name: BirthPlace,
   icon: <MdOutlineWhereToVote />,
  },
  {
   id: 6,
   name: CurrentAdd,
   icon: <AiOutlineHome />,
  },
 ]

 const imgAvatarRef = useRef()

 // *___________ new code

 const [imageList, setImageList] = useState([])
 const [toggleText, setToggleText] = useState(false)

 useEffect(() => {
  const getAllViewImage = async () => {
   try {
    const response = await axios.get(
     `https://api.iudi.xyz/api/profile/viewAllImage/${userID}`
    )

    console.log(response)
    setImageList(response.data.Photos)
   } catch (error) {
    console.error('Error fetching profile data: ', error)
   }
  }
  getAllViewImage()
 }, [userID])

 const text =
  "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc."

 return (
  <>
   <div className='hidden' style={background}>
    <Header1 />
    <div className='flex items-center justify-center mt-[100px]'>
     <div className='bg-white rounded-[30px] w-[550px] overflow-hidden border-2  border-[#4EC957]'>
      <div
       style={{
        background: `center/cover no-repeat  url(${bgProfile})`,
        height: '150px',
       }}
       className='w-full'
      ></div>

      <div className='mt-[-80px] z-[1]'>
       <img
        ref={imgAvatarRef}
        onError={() => handleErrorImg(imgAvatarRef)}
        src={`${URL_BASE64}${avatarLink}`}
        alt='profile'
        className='mx-auto rounded-full h-[130px] w-[130px] object-cover  border-2 border-pink-100'
       />
      </div>

      <div className='px-[50px] pb-5'>
       <div className='text-center mt-5'>
        <h4 className='mx-auto font-inter leading-tight font-bold text-[40px] capitalize'>
         {FullName}
        </h4>

        <p
         className='mb-2 text-[25px] italic text-[#8E8E8E]'
         style={{ overflowWrap: 'break-word' }}
        >
         {Bio}
        </p>
       </div>

       <ul className='flex flex-col gap-4 mt-[30px]'>
        {dataList.map(({ id, name, icon }) => {
         if (name) {
          return (
           <li key={id} className='flex gap-5 items-center'>
            <div className='text-2xl'>{icon}</div>
            <p className='text-xl'>{name}</p>
           </li>
          )
         }
        })}
       </ul>

       <div className='flex justify-between gap-5 mb-5 mt-[50px]'>
        <div>
         <button
          className={`py-4 px-5 text-xl font-bold text-white bg-[#50C759] rounded-[20px] hover:bg-green-600 duration-200 ${
           username !== userName ? 'cursor-not-allowed opacity-70' : ''
          }`}
          onClick={() =>
           username === userName && setIsModalOpenChangePass(true)
          }
         >
          Change Password
         </button>
        </div>
        <div>
         <button
          className='py-4 text-xl px-5 font-bold text-white bg-[#50C759] rounded-[20px] hover:bg-green-600 duration-200'
          onClick={() => {
           username === userName
            ? navigate('/personal')
            : UserID &&
              navigate(`/message/${UserID}`, {
               state: {
                userName: FullName,
                isOnline: true,
                userId: userID,
                avatar: avatarLink,
               },
              })
          }}
         >
          {username !== userName ? 'Nhắn tin' : 'Edit'}
         </button>
        </div>
       </div>
      </div>
     </div>
    </div>

    <FormChangePassword
     userId={userID}
     isOpen={isModalOpenChangePass}
     onClose={() => setIsModalOpenChangePass(false)}
    />
    <Footer />
   </div>

   <div className='font-roboto'>
    <div className='relative'>
     <div>
      <img
       src={`${URL_BASE64}${avatarLink}`}
       alt='avatar'
       className='object-cover rounded-b-[32px] h-[40vh]'
      />
     </div>

     <Link to='/' className='absolute top-10 left-5 text-white text-2xl'>
      <MdArrowBackIos />
     </Link>
    </div>

    <div className='px-3'>
     <div className='flex justify-between items-center mt-8 pb-3  border-b border-[#00000012]'>
      <div>
       <h2 className='text-2xl font-bold '>{FullName}</h2>
       <p className='font-bold text-[14px] text-[#00000066]'>{CurrentAdd}</p>
      </div>

      <div>
       <Link to='/message'>
        <img src={Chat} alt='message' />
       </Link>
      </div>
     </div>

     <div>
      <h3 className='text-[15px] font-bold my-3'>Giới thiệu</h3>

      <p className='text-[12px] font-normal text-gray-600'>
       {Bio?.length <= 150 ? (
        Bio
       ) : (
        <>
         {toggleText ? Bio : Bio?.slice(0, 150)}
         <button
          className='font-bold text-[rgba(0,135,72,1)]'
          onClick={() => setToggleText(!toggleText)}
         >
          {toggleText ? 'Ẩn bớt' : '...xem thêm'}
         </button>
        </>
       )}
      </p>
     </div>

     <div>
      <h3 className='mt-4 mb-2 text-[15px] font-bold my-3'>Bộ sưu tập</h3>

      <ul className='flex flex-wrap gap-2'>
       {imageList.length > 0
        ? imageList.map(({ PhotoID, PhotoURL }) => (
           <li key={PhotoID}>
            <img
             src={`${URL_BASE64}${PhotoURL}`}
             alt='profile'
             className='w-[80px] h-[80px] object-cover rounded-lg'
            />
           </li>
          ))
        : ''}
      </ul>
     </div>
    </div>

    <footer>
     <div className='w-[35%] h-[5px] bg-black rounded-sm mx-auto mt-4'></div>
    </footer>
   </div>
  </>
 )
}

export default Profile
