import { Button } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useBookStore } from '../store/bookStore'

const SearchResult = () => {

const navigate = useNavigate()

const [ searchTerm, setSearchTerm] = useState('')

const handleSearch = async(e) => {
    e.preventDefault()

    const urlParams = new URLSearchParams(window.location.search)
    urlParams.set('searchTerm', searchTerm)
    
    const searchQuery = urlParams.toString()

    await searchBooks(searchQuery)
    navigate(`/search?${searchQuery}`)
}  

const {searchBooks, books} = useBookStore()

useEffect(() => {
const urlParams = new URLSearchParams(window.location.search)
const searchTermFromUrl = urlParams.get('searchTerm')

if(searchTermFromUrl){
    const searchQuery =  urlParams.toString()
    searchBooks(searchQuery)
    setSearchTerm(searchTermFromUrl)
}

},[searchBooks])

  return (

    <div className='flex flex-col min-h-[400px] gap-10 md:p-5'>

<div onClick={() => navigate("/")}
 className='flex gap-1 justify-start'>
<i className="ri-arrow-left-fill"></i>
<h1>Back</h1>
</div>

<div className='w-full flex items-center justify-center '>
  <form onSubmit={handleSearch}  className='w-full flex items-center 
  h-[43px] rounded-lg border-[1px]'>
    <input type=''  placeholder='e.g. Purple hiniscus'
    name='searchTerm' value={searchTerm}
    onChange={(e) =>setSearchTerm(e.target.value)}
    className='bg-black rounded-lg px-3 py-4 w-full text-white
     max-w-sm mdmax-w-xl lg:max-w-xl text-base md:text-lg h-[43px] border-[1px] '  />


  </form></div>

  <div className='flex flex-col'>

    <h1 className='font-bold text-3xl'>Search results</h1>


     <div className='flex gap-3 flex-rwap justify-center items-center  
     lg:gap-8 max-w-6xl mx-auto mt-10'>

        {
            books.length > 0 ?

            <div className='flex flex-col md:flex-row gap-4'>

                 {
             books.map((book, index) => (
                 <Link key={index} to={"book/123"}
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
            :

            <div className=''>
                <p>No Books Found</p>
            </div>
        }
        
     </div>

  </div>



    </div>
  )
}

export default SearchResult