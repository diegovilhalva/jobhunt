import { setAllJobs } from "../redux/jobSlice"
import { JOB_API_ENDPOINT } from "../constants"
import axios from "axios"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"



const usegetAllJobs = () => {
    const dispatch = useDispatch()
    const { searchedQuery } = useSelector(store => store.job)
    
    useEffect(() => {
        const fetchAllJobs = async () => {
            try {
                
          
                
                
                const params = new URLSearchParams()
                if (searchedQuery) params.append('keyword', searchedQuery)
                
                const res = await axios.get(`${JOB_API_ENDPOINT}/get?${params.toString()}`)
                
                if (res.data.success) {
                    dispatch(setAllJobs(res.data.jobs))
                }
            } catch (error) {
                console.error("Erro na requisição:", error)
            }
        }
        fetchAllJobs()
        
    }, [])
}

export default usegetAllJobs