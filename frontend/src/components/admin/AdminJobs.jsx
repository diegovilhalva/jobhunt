import { useNavigate } from "react-router"
import useGetAdminJobs from "../../hooks/useGetAdminJobs"
import Navbar from "../shared/Navbar"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import AdminJobsTable from "./AdminJobsTable"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { setSearchJobByText } from "../../redux/jobSlice"


const AdminJobs = () => {
    useGetAdminJobs()
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const [input, setInput] = useState("")
    useEffect(() => {
        dispatch(setSearchJobByText(input));
    }, [input]);
  
    return (
        <div>
            <Navbar />
            <section aria-label="jobs List" className="max-w-6xl mx-auto my-10 px-4">
                <h1 className="text-2xl font-semibold mb-6">Jobs openings</h1>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">

                    <Input className="w-fit"
                        placeholder="Filter by name, role"   onChange={(e) => setInput(e.target.value)} />
                    <Button className="bg-[#6A38C2] hover:bg-[#5b30a6]" onClick={() => navigate("/admin/jobs/create")}>New Jobs</Button>

                </div>
                <AdminJobsTable />
            </section>
        </div>
    )
}

export default AdminJobs