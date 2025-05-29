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
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";



const AdminJobsTable = () => {

    const { allAdminJobs,searchJobByText } = useSelector(store => store.job)
    const [filterJobs, setFilterJobs] = useState(allAdminJobs);
    const navigate = useNavigate();
    useEffect(()=>{ 
      
        const filteredJobs = allAdminJobs?.filter((job)=>{
            if(!searchJobByText){
                return true;
            };
            return job?.title?.toLowerCase().includes(searchJobByText.toLowerCase()) || job?.company?.name.toLowerCase().includes(searchJobByText.toLowerCase());

        });
        setFilterJobs(filteredJobs);
    },[allAdminJobs,searchJobByText])
    
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
                            <TableCell>{new Date(job.createdAt).toLocaleDateString()}</TableCell>
                            <TableCell className="text-right cursor-pointer">
                                <Popover>
                                    <PopoverTrigger>
                                        <MoreHorizontal />
                                    </PopoverTrigger>
                                    <PopoverContent className="w-40">
                                        <div className="flex items-center gap-2 w-fit cursor-pointer"  onClick={()=> navigate(`/admin/companies/${job._id}`)} >
                                            <Edit2 className="w-4" />
                                            <span>Edit</span>
                                        </div>
                                        <div className="flex items-center w-fit gap-2 cursor-pointer mt-2"  onClick={()=> navigate(`/admin/companies/${job._id}`)} >
                                            <Eye className="w-4" />
                                            <span>Applicants</span>
                                        </div>
                                        <div className="flex items-center w-fit gap-2 cursor-pointer mt-2">
                                            <Trash className="w-4 text-red-500" />
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
