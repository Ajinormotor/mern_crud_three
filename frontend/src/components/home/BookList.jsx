import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import { useBookStore } from '../../store/bookStore';
import { CircularProgress } from '@chakra-ui/react';

const BookList = () => {

    // const books = [  "", "" , "", "", ""];

    const {fetchBooks, books,  error} = useBookStore()

useEffect(() => {
    fetchBooks()
},[fetchBooks])



  if (error) {
    return <div className='text-red-500 text-center py-10'>{error}</div>;
  }


  return (
    <div className=' min-h-[400px] flex flex-col gap-6 '>
        <h1 className='text-[#252422] py-6 text-xl md:text-2xl font-bold  px-5 w-full'> Favorites Books</h1>


        {books.length === 0 ? 
        <div className='text-center py-10'>No books found</div>
      
:
    <div className='flex gap-3 flex-rwap justify-center items-center  
    lg:gap-8 max-w-6xl mx-auto mt-10'>
        {
            books.map((book, index) => (
                <Link key={index} to={`/bookdetails/${book._id}`}
                className=''>
                    <div className='cursor-pointer flex flex-col gap-2 md:w-[230px]
  shadow-sm hover:shadow-lg rounded-b-md'>

                        <div className=' w-full  rounded-lg ' >
                            <img src={book.image}  alt=''
                             className='w-full  rounded-t-lg' />
                        </div>

                        <div className='flex flex-col gap-3 py-4 px-1 w-full  items-center justify-center  p-2'>
                            <h2 className='font-bold text-xl'>{book.title}</h2>
                            <p className='text-[#9a9a9a] text-[12px]'>{book.author}</p>
                        </div>

                    </div>
                </Link>
            ))
        }
    </div>

}
      


    </div>
  )
}

export default BookList