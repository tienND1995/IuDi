import { AdjustmentsHorizontalIcon, ChevronLeftIcon, MapPinIcon } from "@heroicons/react/24/outline"
import { Link, useLocation } from "react-router-dom"
import config from '../../../configs/Configs.json'
import { useEffect, useState } from "react"
import axios from "axios"
const { URL_BASE64 } = config

const sexs = ["Giới tính thứ ba", "Đồng tính nam", "Đồng tính nữ"]

const FindingInfo = () => {
    const date = new Date()
    const yearNow = date.getFullYear()

    const location = useLocation()
    const { user } = location.state

    const birthDate = new Date(user.BirthDate);

    const [citys, setCitys] = useState([]);
    const [selectCity, setSelectCity] = useState('Hà Nội');
    const [distance, setDistance] = useState('0')
    const [age, setAge] = useState('16')
    const [sex, setSex] = useState("Giới tính thứ ba")


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

       const handleChangeSex = (event) => {
        setSex(event.target.value);
    };

    return (
        <>
            {/* Mobile */}
            <div className="hidden mobile:block">
                <div className='hidden mobile:flex justify-between p-4 items-center border-b-[#817C7C] border-b border-solid'>
                    <Link to='/finding'>
                        <button className='w-8 h-8 '>
                            <ChevronLeftIcon />
                        </button>
                    </Link>
                    <span className='text-[22px] font-bold'>Tìm quanh đây</span>
                    <div className='rounded-full bg-[#008748] w-10 h-10 p-1'>
                        <AdjustmentsHorizontalIcon className='text-white' />
                    </div>
                </div>

                <div className='flex justify-between items-center border-b border-gray-500 mt-12 mx-5 pb-3'>
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
                            {/* <p className=''>{user.BirthDate}</p> */}
                            <p className=''>{user.BirthDate === null ? "" : `${yearNow -birthDate.getFullYear()} tuổi`}</p>
                        </div>

                    </div>

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
                        min={16}
                        max={50}
                        onChange={onHandleChangeAge}
                        className='my-4 range range-success range-xs range-infor'
                        />
                        <div className="flex justify-between">
                            <span className='text-black font-bold text-[20px]'>16</span>
                            <span className='font-bold text-black text-[20px]'>{age}</span>
                        </div>
                    </div>
                    
                    <div className="mt-12">
                        <span className='text-black font-bold'>Giới tính</span>

                        <div className="mt-4 flex justify-between">
                            <button className="bg-[#008748] text-white font-bold py-2 px-10 rounded-lg">Nam</button>
                            <button className="border border-[#008748] font-bold py-2 px-8 rounded-lg">Nữ</button>
                            <select
                                id="sex"
                                value={sex}
                                onChange={handleChangeSex}
                                className="px-2 outline-none font-bold border border-current rounded-lg"
                            >
                                {sexs.map((sex, index) => (
                                    <option className="text-[12px] w-10" key={index} value={sex}>
                                        {sex}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="mt-8 flex justify-between">
                        <button className="border border-[#008748] font-bold py-4 px-12 rounded-lg text-[20px]">Quay lại</button>
                        <button className="bg-[#008748] text-white font-bold py-4 px-12 rounded-lg text-[20px]">Áp dụng</button>
                    </div>

                </div>
            </div>
        </>
    )
}

export default FindingInfo
