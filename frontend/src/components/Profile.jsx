import { useSelector } from 'react-redux';
import Navbar from './shared/Navbar';
import { Avatar, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { Contact, Mail, Pen } from 'lucide-react';
import { Label } from './ui/label';
import { Badge } from './ui/badge'; 
import AppliedJobTable from './AppliedJobTable';
import { useState } from 'react';
import UpdateProfileDialog from './UpdateProfileDialog';
import useGeAllAppliedJobs from '../hooks/useGeAllAppliedJobs';
const isResume = true;

const Profile = () => {
  useGeAllAppliedJobs()
  const { user } = useSelector((store) => store.auth);
      const [open, setOpen] = useState(false)
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Seção de informações do usuário */}
      <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-6 p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-4 flex-wrap">
            <Avatar className="h-24 w-24">
              <AvatarImage
                src={
                  user.profile.profilePhoto ||
                  `https://ui-avatars.com/api/?name=${user.fullName}&background=random`
                }
                className="object-cover"
                alt="profile"
              />
            </Avatar>
            <div className="text-start">
              <h1 className="font-semibold text-xl text-gray-800">{user?.fullName}</h1>
              <p className="text-gray-600 text-sm break-words max-w-xs">{user?.profile?.bio}</p>
            </div>
          </div>
          <Button className="self-end sm:self-auto"  onClick={() => setOpen((prev) => !prev)} variant="outline">
            <Pen className="w-4 h-4 mr-1" /> Edit
          </Button>
        </div>

        {/* Contatos */}
        <div className="my-6 space-y-3 text-gray-700">
          <div className="flex items-center gap-3">
            <Mail className="w-5 h-5 text-gray-500" />
            <span className="break-all">{user?.email}</span>
          </div>
          <div className="flex items-center gap-3">
            <Contact className="w-5 h-5 text-gray-500" />
            <span>{user?.phoneNumber || 'N/A'}</span>
          </div>
        </div>

        {/* Skills */}
        <div className="my-6">
          <h2 className="text-md font-semibold mb-2">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {user?.profile?.skills.length > 0 ? (
              user.profile.skills.map((skill, idx) => <Badge key={idx}>{skill}</Badge>)
            ) : (
              <span className="text-gray-500">N/A</span>
            )}
          </div>
        </div>

        {/* Currículo */}
        <div className="my-6">
          <Label className="text-md font-bold">Resume</Label>
          <div className="mt-1">
            {isResume && user?.profile?.resume ? (
              <a
                href={user.profile.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline break-all"
              >
                {user.profile.resumeOriginalName}
              </a>
            ) : (
              <span className="text-gray-500">N/A</span>
            )}
          </div>
        </div>
      </div>

      {/* Applied Jobs */}
      <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-6 p-6 sm:p-8 shadow-sm">
        <h2 className="font-bold text-lg mb-4 text-gray-800">Applied Jobs</h2>
         <AppliedJobTable /> 
      </div>

      <UpdateProfileDialog open={open} setOpen={setOpen} /> 
    </div>
  );
};

export default Profile;
