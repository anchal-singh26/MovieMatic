import axios from "axios"
import { useEffect, useState } from "react"

const useFetch = (endpoint) => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)

    const fetchData = async () => {
        try {
            setLoading(true)
            const response = await axios.get(
                `${endpoint}?api_key=92fe2232aa1304797c7859181c4d7965`
            ) // ✅ added API key
            setLoading(false)
            setData(response.data.results)
        } catch (error) {
            console.log('error', error)
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchData()
    }, [endpoint])

    return { data, loading }
}

export default useFetch
