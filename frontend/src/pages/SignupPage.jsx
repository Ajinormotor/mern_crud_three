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

const SignupPage = () => {
const [username, setUsername] = useState('')
const [email, setEmail] = useState('')
const [password, setPassword] = useState('')
const [confirmPassword, setConfirmPassword] = useState('')

const {signup, isLoading, error, message} = useAuthStore()
const navigate = useNavigate()

const handleSignup = async(e) => {
  e.preventDefault()
  

  try {
    if(password!== confirmPassword){
      toast.error('Password doesnt match')
      return
    }

    await signup(username,email,password)
    navigate("/")
    
  } catch (error) {
    console.log(error)
    toast.error(message || 'Error')
    
  }
}

  return (
    <div className='w-full h-full flex items-center justify-center'>

<div className='w-[80%] rounded-lg min-h-[300px] shadow-lg p-2 md:p-4 mt-10'>
    <form
    onSubmit={handleSignup}
    className='flex flex-col gap-2'>

        <div className='flex items-center justify-center w-full'>
            <p className='font-bold '>Register</p>
        </div>

    <FormControl>
  <FormLabel>Username</FormLabel>
  <Input
   type='text' 
   name="username"
   value={username}
   onChange={(e) => setUsername(e.target.value)}
   />
</FormControl>



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

<FormControl>
  <FormLabel>Confirm Password</FormLabel>
  <Input 
  type='password'
     name="confirm_password"
     value={confirmPassword}
     onChange={(e) => setConfirmPassword(e.target.value)} />
</FormControl>

{ error && <h1 className='text-red-500'>{error}</h1> }

<Button
            mt={4}
            colorScheme='teal'
            type='submit'
            disabled={isLoading}
          >
          {isLoading 
          ? <CircularProgress   isIndeterminate color='green.300'  size={5}/> 
          :   "Sign up"} 
          </Button>

          <div className="w-full items-center justify-center text-center py-2">
            <p className="w-full flex items-center justify-center gap-1 font-bold text-xl">
              Already have an account?
              <Link to="/login">
                <span className="text-blue-400">Login</span>
              </Link>
            </p>
          </div>

         
    </form>

</div>

    </div>
  )
}

export default SignupPage