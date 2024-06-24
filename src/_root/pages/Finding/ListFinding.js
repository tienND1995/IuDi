import { Link, useLocation } from "react-router-dom"
import MenuMobile from "../../../components/MobileMenu"
import UserInfo from "./UserInfo"
import { AdjustmentsHorizontalIcon, ChevronLeftIcon } from "@heroicons/react/24/outline"

const ListFinding = () => {

    const location = useLocation();
    const { users } = location.state;
    console.log(users)
    return (
        <>
            <div className='hidden mobile:block h-[50vh] tablet:h-max mobile:h-[75vh] overflow-y-auto'>
                <div className='hidden mobile:flex justify-between p-4 items-center border-b-[#817C7C] border-b border-solid'>
                    <Link to='/finding'>
                    <button className='w-8 h-8 '>
                        <ChevronLeftIcon />
                    </button>
                    </Link>
                    <span className='text-[22px] font-bold'>Tìm quanh đây</span>
                    <div className='rounded-full bg-[#008748] w-10 h-10 p-1'>
                        <AdjustmentsHorizontalIcon className='text-white'/>
                    </div>
                </div>
                <div className='h-[50vh] tablet:h-max mobile:h-[75vh] overflow-y-auto'>
                    {
                        users.map((user, index) => {  
                        return (
                            <UserInfo user = {user} key={index}/>         
                        )
                        })
                    }
                </div>
                <div className='fixed bottom-10 left-0 right-0 mx-3 hidden mobile:block rounded-t-lg'>
                    <MenuMobile/>
                </div>
            </div>
        </>
    )
}

export default ListFinding