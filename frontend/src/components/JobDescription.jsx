import { useEffect, useState } from 'react'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import Navbar from './shared/Navbar'
import { Briefcase, MapPin, DollarSign, Users } from 'lucide-react'
import { useParams } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { setSingleJob } from '../redux/jobSlice'
import axios from 'axios'
import { APPLICATIONS_API_ENDPOINT, JOB_API_ENDPOINT } from '../constants'
import { toast } from 'sonner'

const JobDescription = () => {
  const params = useParams()
  const jobId = params.id
  const { singleJob } = useSelector(store => store.job)
  const { user } = useSelector(store => store.auth)

  const isIntiallyApplied = singleJob?.applications?.some(application => application.applicant === user?.id) || false;

  const [isApplied, setIsApplied] = useState(isIntiallyApplied)
  const dispatch = useDispatch()
   const applyJobHandler = async () => {
        try {
            const res = await axios.post
            (`${APPLICATIONS_API_ENDPOINT}/apply/${jobId}`,{},{withCredentials:true});
            
            if(res.data.success){
                setIsApplied(true); 
                const updatedSingleJob = {...singleJob, applications:[...singleJob.applications,{applicant:user?.id}]}
                dispatch(setSingleJob(updatedSingleJob)); 
                toast.success(res.data.message);

            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    }

  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const res = await axios.get(`${JOB_API_ENDPOINT}/get/${jobId}`)
        if (res.data.success) {
          dispatch(setSingleJob(res.data.job))
        }

      } catch (error) {
        console.log(error)
      }
    }
    fetchSingleJob()
  }, [jobId, dispatch])
  const formattedSalary = new Intl.NumberFormat('en-US', {
    style: "currency",
    currency: "USD"
  }).format(singleJob?.salary)
  

  return (
    <div className="bg-white min-h-screen">
      <Navbar />

      <div className="max-w-5xl mx-auto px-4 py-10">
        {/* Top Info */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h2 className="text-3xl font-semibold text-gray-900">{singleJob?.title}</h2>
            <p className="text-sm text-gray-500 mt-1">Posted on: <span className="text-gray-700">{new Date(singleJob?.createdAt).toLocaleDateString()}</span></p>

            <div className="flex flex-wrap gap-2 mt-4">
              <Badge className="text-blue-700 font-semibold" variant="ghost">{singleJob?.numberOfOpenings} Positions</Badge>
              <Badge className="text-[#F83002] font-semibold capitalize" variant="ghost">{singleJob?.jobType}</Badge>
              <Badge className="text-[#7209b7] font-semibold" variant="ghost">{formattedSalary}</Badge>
            </div>
          </div>

          <Button className={`mt-4 md:mt-0 ${isApplied  && user ? 'bg-gray-600 cursor-not-allowed' : 'hover:bg-[#7209b7] bg-[#5f32ad]'}`} onClick={applyJobHandler} disabled={isApplied}>
            {isApplied ? 'Already Applied' : 'Apply Now'}
          </Button>
        </div>

        {/* Description */}
        <div className="border-t pt-6 space-y-6 text-gray-800">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InfoRow label="Role" value={singleJob?.title} icon={<Briefcase size={18} />} />
            <InfoRow label="Location" value={singleJob?.company.location} icon={<MapPin size={18} />} />
            <InfoRow label="Company" value={singleJob?.company.name} />
            <InfoRow label="Experience" value={singleJob?.
              experienceLevel} />
            <InfoRow label="Salary" value={formattedSalary} icon={<DollarSign size={18} />} />
            <InfoRow label="Total Applicants" value={singleJob?.applications.length} icon={<Users size={18} />} />
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Job Description</h3>
            <p className="text-gray-700 leading-relaxed">
              {singleJob?.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

// Subcomponente para exibir os pares de info
const InfoRow = ({ label, value, icon }) => {
  return (
    <div className="flex items-start gap-2">
      {icon && <span className="text-[#7209b7]">{icon}</span>}
      <p><span className="font-semibold text-gray-900">{label}:</span> <span className="text-gray-700">{value}</span></p>
    </div>
  )
}

export default JobDescription
