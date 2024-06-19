import axios from 'axios'
import { useEffect, useState } from 'react'
import bg from '../../../images/bg3.jpg'
import Footer from '../../../components/Footer/Footer'
import Header1 from '../../../components/header/Header1'
import UserList from './UserList'
import config from '../../../configs/Configs.json'
import { Auth } from '../../../service/utils/auth'

const { FINDING_DEFAULT } = config

function Finding() {
 const { userID } = new Auth()

 const [users, setUsers] = useState([])

 const setting = JSON.parse(localStorage.getItem('findingSetting'))

 useEffect(() => {
  const fetchUsers = async (setting) => {
   try {
    const res = await axios.get(
     `https://api.iudi.xyz/api/location/${userID}/${
        setting?.radius * 1000 || FINDING_DEFAULT
    //   FINDING_DEFAULT
     }`
    )

    console.log(res)

    const data = res.data.Distances
    const resultData = data.filter((user) => user.Gender !== setting?.gender)

    return setUsers(resultData)
   } catch (error) {
    console.log(error)
   }
  }

  fetchUsers(setting)
 }, [])

 const background = {
  backgroundImage: `url(${bg})`,
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  minHeight: '100vh',
 }

 return (
  <>
    <div style={background} className='mobile:hidden'>
        <Header1 />
        <div className='relative'>
            <div className='fixed top-0 left-0 w-[500px] border-r-2 border-white min-h-[100vh]'></div>
            <div className='border-t-2 border-white '>
            <div className=''>
            <UserList users={users} />
            </div>
            </div>
        </div>
        <Footer />
    </div>

    <div className='hidden mobile:block'>
    <UserList users={users} />
    </div>
  </>
 )
}

export default Finding