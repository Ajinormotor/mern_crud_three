import React, { useEffect } from 'react'
import { useBookStore } from '../store/bookStore'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'
import toast from 'react-hot-toast'

const BookDetails = () => {
const navigate = useNavigate()
    const { fetchSingleBook, book, deleteBook } = useBookStore()
    const params = useParams()
const {user} = useAuthStore()

    useEffect(() => {
        fetchSingleBook(params.id)
    },[fetchSingleBook, params])

  

// console.log("Book details:", book)

const handleDelete = async() => {
    const {message} = await deleteBook(params.id)
    toast.success(message)
    navigate('/')

}

  return (
    <div className='flex flex-col md:flex-row items-start justify-center p-3 pt-5  gap-5 md:p-5'>

<div className='flex flex-col gap-2'>

  <div className=' w-full   rounded-lg ' >
                            <img src={book?.image}  alt='' width={40} height={40}
                             className='w-full   rounded-t-lg' />
                        </div>

                        <div className='flex items-center justify-center bg-gray-400 py-5'>
                            <h1>Read more</h1>
                        </div>
</div>
               

       <div className='flex gap-3 py-4 px-1 w-full  
                        items-start justify-between  p-2'>


<div className='flex flex-col gap-1'>
    <h1>Uploaded by: <span className='text-red-100'>@{book?.user.username}</span></h1>

                <h2 className='font-bold text-x3l'>{book?.title}</h2>
               <p className='text-[#9a9a9a] text-[12px]'>{book?.author}</p>
               <h1 className='text-[40px] font-bold'>{book?.review}</h1>
                        </div>


{ user._id === book?.user._id  &&
<div className='felx gap-4 items-center '>
    <Link to={`/update-book/${book?._id}`}>
    
<i className="ri-edit-2-fill text-blue-500 cursor-pointer"></i>
</Link>

<div 
 className='flex'>
    
<i onClick={handleDelete} class="ri-delete-bin-2-line text-red-500 cursor-pointer"></i>

</div>

    
</div>
}
                        </div>

             

<div    className=''>
            
                </div>

    </div>
  )
}

export default BookDetails