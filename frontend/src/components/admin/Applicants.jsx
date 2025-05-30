import { useParams } from "react-router"
import Navbar from "../shared/Navbar"
import ApplicantsTable from "./ApplicantsTable"
import { useEffect } from "react"
import axios from "axios"
import { APPLICATIONS_API_ENDPOINT } from "../../constants"
import { useDispatch, useSelector } from "react-redux"
import { setAllApplicants } from "../../redux/applicationSlice"


const Applicants = () => {
    const params = useParams()
    const id = params.id
    const dispatch = useDispatch()
    const { applicants } = useSelector(store => store.application)
    useEffect(() => {
        const fetchAllAplicants = async () => {
            try {
                const res = await axios.get(`${APPLICATIONS_API_ENDPOINT}/${id}/applicants`,{withCredentials:true})
                if (res.data.success) {
                    dispatch(setAllApplicants(res.data.job))
                }
            } catch (error) {
                console.log(error)
            }
        }
        fetchAllAplicants()
    }, [])
    
    
    return (
        <div>
            <Navbar />
            <div className='max-w-7xl mx-auto'>
                <h1 className="font-bold text-xl my-5">  Applicants {applicants?.applications?.length}</h1>
                <ApplicantsTable />
            </div>
        </div>
    )
}

export default Applicants