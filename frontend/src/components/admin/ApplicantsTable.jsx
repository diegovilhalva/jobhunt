import { MoreHorizontal } from "lucide-react";
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
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { APPLICATIONS_API_ENDPOINT } from "../../constants";
import { toast } from "sonner";
import { setAllApplicants } from "../../redux/applicationSlice";

const shortListingStatus = ["accepted", "rejected"];

const ApplicantsTable = () => {
    const { applicants } = useSelector(store => store.application)
    const dispatch = useDispatch()
    const statusHandler = async (status, id) => {
        try {
            axios.defaults.withCredentials = true
            const res = await axios.patch(`${APPLICATIONS_API_ENDPOINT}/status/${id}/update`, { status })
            if (res.data.success) {
                toast.success(res.data.message)
                
            }
        } catch (error) {
            toast.error(error.response.data.message)

        }
    };



    return (
        <div className="mt-5">
            <Table>
                <TableCaption>A list of your recent applied users</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Full Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Contact</TableHead>
                        <TableHead>Resume</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {applicants.applications?.map((applicant, index) => (
                        <TableRow key={index}>
                            <TableCell>{applicant.applicant.fullName}</TableCell>
                            <TableCell>{applicant.applicant.email}</TableCell>
                            <TableCell>{applicant?.applicant.phoneNumber}</TableCell>
                            <TableCell>
                                {applicant.applicant.profile.resume ? (<a
                                    href={applicant.applicant.profile.resume}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 underline"
                                >
                                    {applicant.applicant?.profile.resumeOriginalName}
                                </a>) : (<span>N/A</span>)}

                            </TableCell>
                            <TableCell>
                                {new Date(applicant.createdAt).toLocaleDateString()}
                            </TableCell>
                            <TableCell className={`capitalize ${applicant.status === 'accepted' ? 'text-green-500' : applicant.status === 'rejected' ? 'text-red-500' : 'text-yellow-500'}`}>
                                {applicant.status || 'pending'}
                            </TableCell>
                            <TableCell className="text-right">
                                <Popover>
                                    <PopoverTrigger>
                                        <MoreHorizontal />
                                    </PopoverTrigger>
                                    <PopoverContent className="w-32">
                                        {shortListingStatus.map((status, i) => (
                                            <div
                                                key={i}
                                                onClick={() => statusHandler(status, applicant._id)}
                                                className={`flex w-fit items-center my-2 cursor-pointer capitalize ${status === 'accepted' ? 'text-green-500' : 'text-red-500'}`}
                                            >
                                                {status}
                                            </div>
                                        ))}
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

export default ApplicantsTable;
