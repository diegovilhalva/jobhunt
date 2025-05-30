import { setAllAppliedJobs } from "../redux/jobSlice"
import { APPLICATIONS_API_ENDPOINT } from "../constants"
import axios from "axios"
import { useEffect } from "react"
import { useDispatch } from "react-redux"


const useGeAllAppliedJobs = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        const fetchAllApplications = async () => {
            try {
                const res = await axios.get(`${APPLICATIONS_API_ENDPOINT}/get`, { withCredentials: true })
                if (res.data.success) {
                    dispatch(setAllAppliedJobs(res.data.applications))
                }
            } catch (error) {
                  console.log(error);
            }
        }
        fetchAllApplications()
    }, [])

}

export default useGeAllAppliedJobs