import React, { useEffect, useState } from 'react'
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Input,
    Button,
    CircularProgress,
    Textarea,
  } from '@chakra-ui/react'

import toast from 'react-hot-toast'
import { useBookStore } from '../store/bookStore'
import { useNavigate, useParams } from 'react-router-dom'

const UpdateBook = () => {

  const [ title, setTitle] = useState("")
  const [subtitle,setSubtitle] = useState("")
  const [author,setAuthor] = useState("")
  const [link, setLink] = useState("")
  const [review, setReview] = useState("")
  const [image, setImage] = useState("")

  const navigate = useNavigate()
  const params = useParams()

const handleImageChange = (e) => {
  const file = e.target.files[0];
  let reader = new FileReader();

  reader.readAsDataURL(file);
  reader.onloadend = function(){
    setImage(reader.result)
  }
}

const {updateBooks, isLoading, error} = useBookStore()
const {fetchBooks, book} = useBookStore()

useEffect(() => {
  fetchBooks(params.id)
}, [fetchBooks])

useEffect(() => {
    if(book){
        setTitle(book.title),
        setSubtitle(book.subtitle),
        setAuthor(book.author)
        setLink(book.link)
        setReview(book.review)
    }
},[book])

const handleSubmit = async(e) => {
  e.preventDefault()
  
  if( !title || !author || !link || !review){
    toast.error('Please fill in all fields')
    return;
  }


  try {
    const { message } = await updateBooks(
        params.id,
      image,
      title,
      subtitle,
      author,
      link,
      review
)
    
      toast.success(message)
    navigate(`/bookdetails/${book._id}`)
  } catch (error) {
    toast.error(error.message || "Somethhing went wrong")
    
  }

}


console.log(  image, title, subtitle, author, link, review)
  return (
     <div className='w-full h-full flex items-center justify-center'>
 
 <div className='md:w-[80%] w-full rounded-lg min-h-[300px] shadow-lg p-2 md:p-4 mt-10'>
     <form onSubmit={handleSubmit}
     className='flex flex-col gap-2'>
 
         <div className='flex items-center justify-center w-full'>
             <p className='font-bold  text-2xl'>Update Book</p>
         </div>

 
         <FormControl>
   <FormLabel>Book Image</FormLabel>
   <Input
    type='file' 
    name="image"
    accept='image/*' 
    onChange={handleImageChange}
  />
 </FormControl>
 

 
     <FormControl>
   <FormLabel>Title *</FormLabel>
   <Input
    type='text' 
    name="title"
    value={title}
    onChange={(e) => setTitle(e.target.value)}
    />
 </FormControl>
 
 
 
     <FormControl>
   <FormLabel>Subtitle (optional) *</FormLabel>
   <Input type='text'
   
      name="subtitle"
      value={subtitle}
      onChange={(e) => setSubtitle(e.target.value)}
   
   />
 
 </FormControl>
 
 
 
 <FormControl>
   <FormLabel>Author *</FormLabel>
   <Input
      type='text' 
      name="text"
      value={author}
      onChange={(e) => setAuthor(e.target.value)}
   />
 </FormControl>
 
 <FormControl>
   <FormLabel>Link *</FormLabel>
   <Input 
   type='text'
      name="text"
      value={link}
      onChange={(e) => setLink(e.target.value)} 
      />
 </FormControl>
 

 <FormControl>
   <FormLabel>Personal Review *</FormLabel>
   <Textarea
   type='text'
      name="text"
      value={review}
      onChange={(e) => setReview(e.target.value)} 
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
           ? <CircularProgress   isIndeterminate color='green.300'  size={5}/> 
           :   "Update Book"} 
           </Button>
 
  
          
     </form>
 
 </div>
 
     </div>
  )
}

export default UpdateBook