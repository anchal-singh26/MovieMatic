import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Card from '../components/Card'

const ExplorePage = () => {
  const params = useParams()
  const [pageNo, setPageNo] = useState(1)
  const [data, setData] = useState([])
  const [totalPageNo, setTotalPageNo] = useState(0)

  console.log("params", params.explore)

  const fetchData = async () => {
    try {
      const response = await axios.get(`https://api.themoviedb.org/3/discover/${params.explore}`, {
        params: {
          api_key: "92fe2232aa1304797c7859181c4d7965", // ✅ Added API key
          page: pageNo
        }
      })

      // ✅ Add media_type so Card works even if API doesn't send it
      const resultsWithType = response.data.results.map(item => ({
        ...item,
        media_type: params.explore
      }))

      setData((prev) => [
        ...prev,
        ...resultsWithType
      ])
      setTotalPageNo(response.data.total_pages)
    } catch (error) {
      console.log('error', error)
    }
  }

  const handleScroll = () => {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
      setPageNo(prev => prev + 1)
    }
  }

  useEffect(() => {
    fetchData()
  }, [pageNo])

  useEffect(() => {
    setPageNo(1)
    setData([])
    fetchData()
  }, [params.explore])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll) // ✅ Cleanup
  }, [])

  return (
    <div className='py-16'>
      <div className='container mx-auto'>
        <h3 className='capitalize text-lg lg:text-xl font-semibold my-3'>
          Popular {params.explore} show
        </h3>

        <div className='grid grid-cols-[repeat(auto-fit,230px)] gap-6 justify-center lg:justify-start'>
          {data.map((exploreData, index) => {
            return (
              <Card
                data={exploreData}
                key={exploreData.id + "exploreSEction"}
                media_type={params.explore}
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default ExplorePage
