import { Edit2, Eye, MoreHorizontal, Trash } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../ui/popover";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { JOB_API_ENDPOINT } from "../../constants";
import { setAllAdminJobs } from "../../redux/jobSlice";

const AdminJobsTable = () => {
  const { allAdminJobs, searchJobByText } = useSelector((store) => store.job);
  const [filterJobs, setFilterJobs] = useState(allAdminJobs);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const filteredJobs = allAdminJobs?.filter((job) => {
      if (!searchJobByText) return true;
      return (
        job?.title?.toLowerCase().includes(searchJobByText.toLowerCase()) ||
        job?.company?.name.toLowerCase().includes(searchJobByText.toLowerCase())
      );
    });
    setFilterJobs(filteredJobs);
  }, [allAdminJobs, searchJobByText]);

  const deleteJob = async (jobId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this job?");
    if (!confirmDelete) return;

    try {
      const res = await axios.delete(`${JOB_API_ENDPOINT}/delete/${jobId}`, {
        withCredentials: true,
      });

      if (res.data.success) {
        toast.success("Job deleted successfully");
        const updatedJobs = allAdminJobs.filter((job) => job._id !== jobId);
        dispatch(setAllAdminJobs(updatedJobs));
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete job");
    }
  };

  return (
    <div className="mt-5 overflow-x-auto">
      <Table>
        <TableCaption>A list of your recently posted jobs</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Company Name</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filterJobs?.map((job, index) => (
            <TableRow key={index}>
              <TableCell>{job?.company?.name}</TableCell>
              <TableCell>{job?.title}</TableCell>
              <TableCell>
                {new Date(job.createdAt).toLocaleDateString()}
              </TableCell>
              <TableCell className="text-right cursor-pointer">
                <Popover>
                  <PopoverTrigger>
                    <MoreHorizontal />
                  </PopoverTrigger>
                  <PopoverContent className="w-40">
                    <div
                      className="flex items-center gap-2 w-fit cursor-pointer"
                      onClick={() => navigate(`/admin/jobs/update/${job._id}`)}
                    >
                      <Edit2 className="w-4" />
                      <span>Edit</span>
                    </div>
                    <div
                      className="flex items-center w-fit gap-2 cursor-pointer mt-2"
                      onClick={() => navigate(`/admin/companies/${job._id}`)}
                    >
                      <Eye className="w-4" />
                      <span>Applicants</span>
                    </div>
                    <div
                      className="flex items-center w-fit gap-2 cursor-pointer mt-2 text-red-500"
                      onClick={() => deleteJob(job._id)}
                    >
                      <Trash className="w-4" />
                      <span>Delete</span>
                    </div>
                  </PopoverContent>
                </Popover>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AdminJobsTable;
