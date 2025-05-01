import React, { useState } from 'react'

import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Input,
    Button,
    CircularProgress,
  } from '@chakra-ui/react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'
import toast from 'react-hot-toast'

const LoginPage = () => {
const [email, setEmail] = useState('')
const  [password, setPassword] = useState('')
const navigate = useNavigate()

const { isLoading, error, login} = useAuthStore()

const handleLogin = async(e) => {
  e.preventDefault()
try {
  
if(!email  || !password){
  toast.error("Please fill all details")
  return ;
}

 const { message } = await login(email,password)

 toast.success(message)
  navigate('/')
  
} catch (error) {
  console.log(error)

  
}
 
}

  return (
    <div className='w-full h-full flex items-center justify-center'>

<div className='w-[80%] rounded-lg min-h-[300px] shadow-lg p-2 md:p-4 mt-10'>
    <form  onSubmit={handleLogin}
    className='flex flex-col gap-2'>

        <div className='flex items-center justify-center w-full'>
            <p className='font-bold '>Login</p>
        </div>



   <FormControl>
  <FormLabel>Email address</FormLabel>
  <Input type='email'
  
     name="email"
     value={email}
     onChange={(e) => setEmail(e.target.value)}
  
  />

</FormControl>



<FormControl>
  <FormLabel>Password</FormLabel>
  <Input
     type='password' 
     name="password"
     value={password}
     onChange={(e) => setPassword(e.target.value)}
  />
</FormControl>


{ error && <h1 className='text-red-500'>{error}</h1> }

<Button
            mt={4}
            colorScheme='teal'
            type='submit'
            disabled={isLoading}
          >
          {isLoading 
          ? <CircularProgress   isIndeterminate color='green'  size={5}/> 
          :   "Login"} 
          </Button>

          <div className="w-full items-center justify-center text-center py-2">
            <p className="w-full flex items-center justify-center gap-1 font-bold text-xl">
              Don't have an account?{' '}
              <Link to="/register">
                <span className="text-blue-400">Sign up</span>
              </Link>
            </p>
          </div>

         
    </form>

</div>

    </div>
  )
}

export default LoginPage