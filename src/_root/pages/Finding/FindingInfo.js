import { MapPinIcon } from "@heroicons/react/24/outline"
import { Link } from "react-router-dom"
import config from '../../../configs/Configs.json'
import { useEffect, useState } from "react"
import axios from "axios"
import { Auth } from "../../../service/utils/auth"
const { URL_BASE64 } = config

const listSex2 = ["Giới tính thứ ba", "Đồng tính nam", "Đồng tính nữ"]

const FindingInfo = ({ users }) => {
    const date = new Date()
    const yearNow = date.getFullYear()

    const { userName } = new Auth()
    const [profileData, setProfileData] = useState({})
    const [citys, setCitys] = useState([]);
    const [selectCity, setSelectCity] = useState('Hà Nội');
    const [distance, setDistance] = useState('0')
    const [age, setAge] = useState('0')
    const [sex2, setSex2] = useState("Giới tính thứ ba")

    useEffect(() => {
        const fetchProfileData = async () => {
         try {
          const response = await axios.get(
           `https://api.iudi.xyz/api/profile/${userName}`
          )
          setProfileData(response.data.Users[0])
         } catch (error) {
          console.error('Error fetching profile data:', error)
         }
        }
      
        fetchProfileData()
       }, [userName])
      
       const {
        avatarLink,
        FullName,
        BirthDate,
       } = profileData

    const birthDate = new Date(BirthDate);

    useEffect(() => {
        axios.get('https://esgoo.net/api-tinhthanh/1/0.htm')
            .then(res => setCitys(res.data.data))
            .catch(error => console.log(error))
    }, [])

    const handleChangeCity = (event) => {
        setSelectCity(event.target.value);
    };

    const onHandleChangeDistance = (e) => {
        setDistance(e.target.value)
       }

       const onHandleChangeAge = (e) => {
        setAge(e.target.value)
       }

       const handleChangeSex2 = (event) => {
        setSex2(event.target.value);
    };

    const handleSelectMale = () => {
        setSex2("Nam")
    };

    const handleSelectFemale = () => {
        setSex2("Nữ")
    };

    const listFilter = users.filter(user => {
        const userAge = yearNow - new Date(user.BirthDate).getFullYear();
        const isAgeMatch = userAge <= age && userAge >=0
        const isCityMatch = user.CurrentAdd === selectCity;
        const isSexMatch = user.Gender === sex2;
        return isAgeMatch && isCityMatch && isSexMatch;
    });

    console.log(listFilter)


    return (
        <>
            {/* Mobile */}
            <div className="hidden mobile:block">
                <div className='flex justify-between items-center border-b border-gray-500 mt-12 mx-5 pb-3'>
                    <Link to={`/profile/${userName}`}>
                        <div className='flex'>
                            <div className='mx-2'>
                                <img
                                    className=' mx-auto w-[60px] h-[60px] rounded-full object-cover border border-slate-900'
                                    src={`${URL_BASE64}${avatarLink}`}
                                    alt={`avatar ${FullName}`}
                                />
                            </div>

                            <div>
                                <span className='font-extrabold'>{FullName}</span>
                                {/* <p className=''>{user.BirthDate}</p> */}
                                <p className=''>{BirthDate === null ? "" : `${yearNow -birthDate.getFullYear()} tuổi`}</p>
                            </div>

                        </div>
                    </Link>

                    <div>
                        <MapPinIcon className='text-[#008748] w-6' />
                        <span>3km</span>
                    </div>

                </div>


                <div className="mx-5 mt-5">
                    <hr className="w-8 h-[1px] mx-auto border-0 bg-current mb-3"/>
                    <span className="text-[20px] font-bold">Filter</span>

                    <hr className="w-full h-[1px] mx-auto border-0 bg-gray-500 my-4"/>

                    <div className="flex flex-col p-3 border border-[#008748] rounded-xl">
                        <label className='text-[#008748]' htmlFor="city">Quê quán</label>
                        <select
                            id="city"
                            value={selectCity}
                            onChange={handleChangeCity}
                            className=" outline-none font-bold"
                           >
                            {citys.map((city, index) => (
                                <option className="text-[12px] w-10" key={index} value={city.name}>
                                    {city.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="mt-8">
                        <span className='text-black font-bold'>Khoảng cách</span>
                        
                        <input
                        type='range'
                        min={0}
                        max={100}
                        onChange={onHandleChangeDistance}
                        className='my-4 range range-success range-xs range-infor'
                        />
                        <div className="flex justify-between">
                            <span className='text-black font-bold text-[20px]'>O km</span>
                            <span className='font-bold text-black text-[20px]'> {distance} km</span>
                        </div>
                    </div>
                    
                    <div className="mt-8">
                        <span className='text-black font-bold'>Độ tuổi</span>
                        
                        <input
                        type='range'
                        min={0}
                        max={50}
                        onChange={onHandleChangeAge}
                        className='my-4 range range-success range-xs range-infor'
                        />
                        <div className="flex justify-between">
                            <span className='text-black font-bold text-[20px]'>0</span>
                            <span className='font-bold text-black text-[20px]'>{age}</span>
                        </div>
                    </div>
                    
                    <div className="mt-12">
                        <span className='text-black font-bold'>Giới tính</span>

                        <div className="mt-4 flex justify-between">
                            <button onClick={() => handleSelectMale()} className="border border-[#008748] font-bold py-2 px-10 rounded-lg hover:bg-[#008748] hover:text-white" >Nam</button>
                            <button onClick={() => handleSelectFemale()} className="border border-[#008748] font-bold py-2 px-8 rounded-lg hover:bg-[#008748] hover:text-white">Nữ</button>
                            <select
                                id="sex"
                                value={sex2}
                                onChange={handleChangeSex2}
                                className="px-2 outline-none font-bold border border-current rounded-lg"
                            >
                                {listSex2.map((sex, index) => (
                                    <option className="text-[12px] w-10" key={index} value={sex}>
                                        {sex}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="mt-8 flex justify-between">
                        <Link to='/'>
                            <button className="border border-[#008748] font-bold py-4 px-12 rounded-lg text-[20px]">Quay lại</button>
                        </Link>
                        <Link 
                            to='/listFinding'
                            state={{users: listFilter}}
                        >
                            <button className="bg-[#008748] text-white font-bold py-4 px-12 rounded-lg text-[20px]">Áp dụng</button>
                        </Link>
                            
                        
                    </div>

                </div>
            </div>
        </>
    )
}

export default FindingInfo
