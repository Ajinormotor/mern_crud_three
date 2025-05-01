import React, { useState } from 'react'
import bgVideo from "../../assets/bg_video.mp4"
import { Button } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'

const Hero = () => {

const [searchTerm, setSearchTerm] = useState('')
const navigate = useNavigate()

const handleSearch = (e) => {
  e.preventDefault()

  const urlParams = new URLSearchParams(window.location.search)
  urlParams.set('searchTerm', searchTerm)


  const searchQuery = urlParams.toString()
  navigate(`/search?${searchQuery}`)

}

  return (
    <div className='h-screen w-full flex items-center justify-center relative md:px-12'>


<div className='absolute inset-0 z-[-1]'>
  <video autoPlay loop muted className='w-full max-h-screen object-cover object-center'>
    <source src={bgVideo} type='video/mp4' />
  </video>
</div>

<div className='bg-[#252422] w-full min-h-screen absolute top-0 left-0 opacity-80 z-10'></div>

<div className='w-full h-full flex flex-col items-center justify-center z-20 gap-4'>
  <h1 className='uppercase fraunces text-white text-lg text-center px-4'>
    Your Ultimate Page to Search Screen
  </h1>

  <form onSubmit={handleSearch} className='w-full flex items-center bg-white h-[43px] rounded-lg'>
    <input type=''  placeholder='e.g. Purple hiniscus'
    name='searchTerm' value={searchTerm}
    onChange={(e) =>setSearchTerm(e.target.value)}
    className='bg-white rounded-lg px-3 py-4 w-full
     max-w-sm mdmax-w-xl lg:max-w-xl text-base md:text-lg h-[43px]'  />

     <Button colorScheme='black' >
    Search
     </Button>

  </form>

</div>


    </div>
  )
}

export default Hero