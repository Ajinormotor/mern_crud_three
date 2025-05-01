import axios from 'axios'
import { create } from 'zustand'


const API_URL = "http://localhost:5000/api"
axios.defaults.withCredentials = true

export const useAuthStore = create((set) => ({
    user: null,
    message: null,
    error: null,
    isLoading: false,
    fetchingUser: true,

    signup: async(username,email,password) => {
        set({isLoading: true, message:null, error: null})

        try {
        if(!username || !email || !password){
            return { message: "Please fill in all fields"}
        }
               const response = await axios.post(`${API_URL}/auth/register`,{
                username,email,password
               });
               set({
                user: response.data.user, isLoading: false
       })


        } catch (error) {
   set({error: true, message: error.response.data.message || 'Error signing up',
    isLoading: false})

    throw error
        
        }

    },

    login: async(email,password) => {
set({ isLoading: true, message: null, error: null })


try {

    if(!email || !password){
        return {message: "Please fill in all fields"}
    }

    const response = await axios.post(`${API_URL}/auth/login`, {
        email, password
    })
    const { message, user, }  = response.data
    
    set({ user, message, isLoading: false})

    return { message, user }
    
} catch (error) {
    set({ 
        error: error.response.data.message || 'Error logining in',
        isLoading: false
     })

    throw error
    
}


    },

    logout: async() => {
    set({ isLoading: true, message: null, error: null})
try {

    const response = await axios.post(`${API_URL}/auth/logout`)

    const { message} = response.data

    set({ message: message, isLoading: false , user: null, error: null})

    return { message}
    
} catch (error) {
    set({
        isLoading: false,
        error:   error.response.data.message || " Error"
    })

    throw error
    
}

    },

    // fetch user

    fetchUser: async() => {
        set({ fetchingUser: true, error:null})

        try {
            const response = await axios.get(`${API_URL}/auth/fetch-user`)
            set({ user: response.data.user, fetchingUser: false})
            
        } catch (error) {
            set({
                user:null, error: null, fetchingUser: false
            })


            throw error;
            
        }
    },
    
}))