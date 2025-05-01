import React, { useEffect } from 'react'
import { useAuthStore } from '../store/authStore'
import { useNavigate } from 'react-router-dom'

const RedirectUnAuthennticatedusers = ({children}) => {

    const {user} = useAuthStore()
const navigate = useNavigate()

useEffect(() => {
    if(!user){
        navigate('/login')
    }

},[user, navigate])

if(!user){
    return null
}

  return (
    <div>{children}</div>
  )
}

export default RedirectUnAuthennticatedusers