import { MapPinIcon } from "@heroicons/react/24/outline";
import config from '../../../configs/Configs.json'
const { URL_BASE64 } = config

const UserInfo = ({user}) => {
    const date = new Date()
    const yearNow = date.getFullYear()
    const birthDate = new Date(user.BirthDate);
    return (
        <>
            <div className='flex justify-between items-center border-b border-gray-500 mt-5 mx-3 pb-3'>
                <div className='flex'>
                    <div className='mx-2'>
                      <img
                          className=' mx-auto w-[60px] h-[60px] rounded-full object-cover border border-slate-900'
                          src={`${URL_BASE64}${user.avatarLink}`}
                          alt={`avatar ${user.FullName}`}
                        />
                    </div>

                    <div>
                      <span className='font-extrabold'>{user.FullName}</span>

      
                      <p className=''>{user.BirthDate === null ? "" : `${yearNow -birthDate.getFullYear()} tuổi`}</p>
                    </div>

                  </div>
               

              <div>
                <MapPinIcon className='text-[#008748] w-6'/>
                <span>3km</span>
              </div>
              
            </div>
        </>
    )
}

export default UserInfo