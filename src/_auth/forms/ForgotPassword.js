import axios from 'axios'
import React, { useState } from 'react'
import background from '../../images/background.jpg'
import Footer from '../../components/Footer/Footer'
import Header1 from '../../components/header/Header1'
import Modal from '../../components/shared/Modal'

function ForgotPassword() {
 const [showModal, setShowModal] = useState(false)
 const [message, setMessage] = useState('')
 const [isSuccess, setIsSuccess] = useState(false)

 const [email, setEmail] = useState('')

 const handleSubmit = async (e) => {
  e.preventDefault()
  try {
   const response = await axios.post(
    'https://api.iudi.xyz/api/forgotPassword',
    {
     Email: email,
    }
   )
   setShowModal(true)
   if (response.status === 200) {
    setMessage('Please check your email.')
    setIsSuccess(true)
    setEmail('')
   }
  } catch (error) {
   setShowModal(true)
   setIsSuccess(false)
   setMessage('Something went wrong')
  }
 }

 const closeModal = () => {
  setShowModal(false)
 }

 const handleKeyPress = (e) => {
  if (e.key === 'Enter') {
   handleSubmit(e)
  }
 }

 return (
  <>
   <div
    className='absolute inset-0 flex items-center justify-center'
    style={{ background: 'rgba(255, 255, 255, .2)' }}
   >
    <div className='max-w-md w-full mx-auto border-2 border-green-400 rounded-[20px] bg-gray-900'>
     <form onSubmit={handleSubmit} className='px-8 pt-6 pb-8 mb-4 rounded '>
      <h3
       className='mb-6 text-3xl font-extrabold text-center text-gray-900'
       style={{
        color: 'rgba(44,186,55,0.8127626050420168)',
       }}
      >
       Forgot Your Password ?
      </h3>
      <div className='mb-4'>
       <label
        htmlFor='email-address'
        className='block mb-2 text-sm font-bold text-gray-700'
        style={{
         color: 'rgba(44,186,55,0.8127626050420168)',
        }}
       ></label>
       <input
        id='email-address'
        name='email'
        type='email'
        autoComplete='email'
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        onKeyDown={handleKeyPress}
        className='w-full px-3 py-2 leading-tight text-gray-700 border rounded appearance-none focus:outline-none focus:shadow-outline'
        placeholder='Email address'
       />
      </div>
      <div className='flex justify-center'>
       <button
        style={{
         background: 'rgba(44,186,55,0.8127626050420168)',
        }}
        type='submit'
        className='px-4 py-2 font-bold text-white rounded focus:outline-none focus:shadow-outline'
       >
        Submit
       </button>
      </div>
     </form>
    </div>
   </div>

   {showModal && (
    <Modal
     isSuccess={isSuccess}
     title='Forgot Password'
     message={message}
     onClose={closeModal}
    />
   )}
  </>
 )
}

export default ForgotPassword
