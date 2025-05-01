import { Button } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'
import { useAuthStore } from '../../store/authStore'
import toast from 'react-hot-toast'

const Navbar = () => {
const {user, logout} = useAuthStore()

console.log("user", user)

const handleLogout = async() => {
 const { message} =  await logout()

 toast.success(message)
}

  return (
    <div className='w-full shadow-sm h-[76px] flex items-center justify-between px-5'>

<Link to="/" className=''>
    <img src='https://demo2.themelexus.com/bokifa/wp-content/uploads/2024/09/logo.svg' alt=''
    className='' />
</Link>



{ user ?  
<div className='flex gap-2'>
    <Link to='add-books'>
    <h1 className='font-bold text-green-300'>Add Books</h1></Link>
</div>
: 

<div></div>
}


{ user ?  
<div className='flex items-center gap-2'>

  <h1>
    {user.username}
  </h1>

  <Button colorScheme='red' onClick={handleLogout} >
Logout
</Button>

</div>


:  <div className='flex gap-2'>
<Link to='register'>
<Button colorScheme='teal' >
Sign up
</Button>
</Link>

<Link to='login'>
<Button colorScheme='blue' >
Login
</Button>
</Link>
</div>  }


    </div>
  )
}

export default Navbar