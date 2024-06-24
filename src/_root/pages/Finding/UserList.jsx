import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Carousel,
  Typography
} from '@material-tailwind/react'
import { FaAd, FaBirthdayCake, FaEnvelope, FaMale } from 'react-icons/fa'

const UserList = ({ users }) => {
  return (
    <>
      <div className="mobile:hidden">
      <Carousel className="">
        {users.map((user, index) => {
          return (
            <div className="w-[500px] h-[700px] mx-auto" key={index}>
              <Card className=" rounded-2xl p-[20px] border-4 bg-black border-green-500">
                <CardHeader
                  floated={false}
                  className="flex items-center justify-center bg-black"
                >
                  <img
                    src={user.avatarLink}
                    alt="profile"
                    className="rounded-full h-[150px] w-[150px] hover:cursor-pointer object-cover  border-4 bg-black border-green-500"
                  />
                </CardHeader>
                <CardBody className="flex flex-col justify-center text-center">
                  <Typography variant="h4" className="mx-auto mb-2 text-white">
                    {user.FullName}
                  </Typography>
                  <Typography
                    variant="p"
                    className="mb-2 text-lg italic text-white"
                  >
                    {user.Bio}
                  </Typography>
                  <Typography
                    color="white"
                    className="flex items-center justify-center mt-2 text-white w-max"
                    textGradient
                  >
                    <FaEnvelope className="mr-3" />
                    {user.Email}
                  </Typography>
                  <Typography
                    color="white"
                    className="flex items-center justify-center mt-2 text-white w-max"
                    textGradient
                  >
                    <FaBirthdayCake className="mr-3" />
                    {user.BirthDate}
                  </Typography>
                  <Typography
                    color="white"
                    className="flex items-center justify-center mt-2 text-white w-max"
                    textGradient
                  >
                    <FaMale className="mr-3" />
                    {user.Gender ? user.Gender : 'null'}
                  </Typography>
                  <Typography
                    color="white"
                    className="flex items-center justify-center mt-2 text-white w-max"
                    textGradient
                  >
                    <FaAd className="mr-3" />
                    {user.CurrentAdd}
                  </Typography>
                </CardBody>

                <CardFooter className="flex justify-center pt-2 gap-7">
                  <button className="px-4 py-2 mt-4 font-bold text-white bg-green-600 rounded hover:bg-white hover:text-black">
                    Change Password
                  </button>
                  <button className="flex px-4 py-2 mt-4 font-bold text-white bg-green-600 rounded hover:bg-white hover:text-black">
                    Edit Profile
                  </button>
                </CardFooter>
              </Card>
            </div>
          )
        })}
      </Carousel>
    </div>
    
    </>
  )
}
export default UserList
