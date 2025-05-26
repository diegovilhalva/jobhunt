import React from 'react'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import Navbar from './shared/Navbar'
import { Briefcase, MapPin, DollarSign, Users } from 'lucide-react'

const JobDescription = () => {
  return (
    <div className="bg-white min-h-screen">
      <Navbar />

      <div className="max-w-5xl mx-auto px-4 py-10">
        {/* Top Info */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h2 className="text-3xl font-semibold text-gray-900">Full-Stack Developer</h2>
            <p className="text-sm text-gray-500 mt-1">Posted on: <span className="text-gray-700">2025-05-20</span></p>

            <div className="flex flex-wrap gap-2 mt-4">
              <Badge className="text-blue-700 font-semibold" variant="ghost">3 Positions</Badge>
              <Badge className="text-[#F83002] font-semibold" variant="ghost">Full-Time</Badge>
              <Badge className="text-[#7209b7] font-semibold" variant="ghost">$40k</Badge>
            </div>
          </div>

          <Button className="mt-4 md:mt-0 hover:bg-[#7209b7] bg-[#5f32ad]">
            Apply Now
          </Button>
        </div>

        {/* Description */}
        <div className="border-t pt-6 space-y-6 text-gray-800">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InfoRow label="Role" value="Full-Stack Developer" icon={<Briefcase size={18} />} />
            <InfoRow label="Location" value="New York" icon={<MapPin size={18} />} />
            <InfoRow label="Company" value="OpenDev Solutions" />
            <InfoRow label="Experience" value="2 yrs" />
            <InfoRow label="Salary" value="$40,000" icon={<DollarSign size={18} />} />
            <InfoRow label="Total Applicants" value="100" icon={<Users size={18} />} />
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Job Description</h3>
            <p className="text-gray-700 leading-relaxed">
              We're looking for a Full-Stack Developer to build modern, responsive web applications and develop new features for existing platforms. You’ll work closely with a passionate team in a collaborative and fast-paced environment.
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
