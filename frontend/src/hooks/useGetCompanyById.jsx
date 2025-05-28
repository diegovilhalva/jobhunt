import axios from "axios"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { COMPANY_API_ENDPOINT } from "../constants"
import { setSingleCompany } from "../redux/companySlice"

const useGetCompanyById = (companyId) => {
    const dispatch = useDispatch()
    useEffect(() => {
        try {
            const fetchSingleCompany = async () => {
                const res = await axios.get(`${COMPANY_API_ENDPOINT}/get/${companyId}`, { withCredentials: true })
                if (res.data.success) {
                    dispatch(setSingleCompany(res.data.company))
                }
            }
            fetchSingleCompany()
        } catch (error) {
            console.error(error)
        }
    }, [companyId,dispatch])
}

export default useGetCompanyById