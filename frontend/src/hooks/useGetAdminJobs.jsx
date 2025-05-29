import axios from "axios"
import { JOB_API_ENDPOINT } from "../constants"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { setAllAdminJobs } from "../redux/jobSlice"




const useGetAdminJobs = () => {
    const dispatch = useDispatch()
    
    useEffect(() => {
        const fetchAdminJobs = async () => {
            try {
                const res = await axios.get(`${JOB_API_ENDPOINT}/user-jobs`, { withCredentials: true })
                if (res.data.success) {
                    dispatch(setAllAdminJobs(res.data.jobs))
                }
            } catch (error) {
                console.log(error)
            }
        }
        fetchAdminJobs()

    }, [])
}

export default useGetAdminJobs