import { create } from "zustand"
import axios from "axios"

const APi_URL = "http://localhost:5000/api/books"
axios.defaults.withCredentials = true



export const useBookStore =  create((set) => ({
books: [],

isLoading: false,
error: null,
message: null,

addBook: async({ image,title,subtitle,author, link,review}) => {
    set({isLoading: true, error:null, message:null})

    try {

        const response = await axios.post(`${APi_URL}/add-book`,{
            image,
            title,subtitle
            ,author,
             link,
             review
        })

        const {message, book} = response.data
        set({ book, message,isLoading: false})

        return {book,message}
        
    } catch (error) {
        set({
            isLoading: false,
            error: error.response.data.message || "Error adding book"
        })
        throw error
        
    }

},

fetchBooks: async() => {
    set({error:null, isLoading: true, })

    try {

        const response = await axios.get(`${APi_URL}/fetch-book`,{
            withCredentials: true
        })
        
        set({books: response.data.books, isLoading:false})

       
        
    } catch (error) {
        set({
            isLoading: true,
            error: error.response.data.message || 'Error fetching books'
        })

        throw error
        
    }
},

fetchSingleBook: async(id) => {

    set({ isLoading: true, error: null})

    try {

        const response = await axios.get(`${APi_URL}/fetch-book/${id}`)

        set({ book: response.data.book, isLoading: false})

    
        
    } catch (error) {
        set({ 
            isLoading: false,
            error: error.response.data.message
        })

        throw error
        
    }

},

updateBooks: async( id,image,title,subtitle,author, link,review ) => {

    set({ isLoading: true, error: null})

    try {

        const response = await axios.put(`${APi_URL}/update-book/${id}`,{
            image,title,subtitle,author, link,review
        })

        const {message,book} = response.data

        set({ book,  isLoading: false, message})

        return { message, book}

        
    } catch (error) {
        set({ 
            isLoading: false,
            error: error.response.data.message || 'Error updating book'
        })

        throw error
        
    }

},

deleteBook: async(id) => {

    set({ isLoading: true, error: null})

    try {

        const response = await axios.delete(`${APi_URL}/delete-book/${id}`)
        const {message} = response.data

        set({message: message, isLoading: false})

        return {message}

    
        
    } catch (error) {
        set({ 
            isLoading: false,
            error: error.response.data.message || "Error deleting book"
        })

        throw error
        
    }

},

searchBooks: async(searchTerm) => {
    set({isLoading: true, error:null})

    try {

        const response = await axios.get(`${APi_URL}/search?${searchTerm}`)

        set({books: response.data.books, isLoading:false})

        
    } catch (error) {
        set({
            isLoading:false,
            message: error.response.data.message
        })

        throw error
        
    }
    
}

}))