import { setAllJobs } from "../redux/jobSlice"
import { JOB_API_ENDPOINT } from "../constants"
import axios from "axios"
import { useEffect } from "react"
import { useDispatch } from "react-redux"


const usegetAllJobs = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        const fetchAllJobs = async () => {
            try {
                const res = await axios.get(`${JOB_API_ENDPOINT}/get`)
                if (res.data.success) {
                    dispatch(setAllJobs(res.data.jobs))
                }

            } catch (error) {
                console.log(error)
            }
        }
        fetchAllJobs()
    }, [])
}

export default usegetAllJobs