import { useSelector } from "react-redux";
import { Badge } from "./ui/badge";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

const AppliedJobTable = () => {
  const { allAppliedJobs } = useSelector((store) => store.job);

  const getStatusBadge = (status) => {
    const baseClass = "capitalize";
    if (status === "accepted") {
      return (
        <Badge variant="outline" className={`${baseClass} text-green-700 border-green-700`}>
          {status}
        </Badge>
      );
    } else if (status === "rejected") {
      return (
        <Badge variant="outline" className={`${baseClass} text-red-700 border-red-700`}>
          {status}
        </Badge>
      );
    } else {
      return (
        <Badge variant="outline" className={`${baseClass} text-yellow-700 border-yellow-700`}>
          {status}
        </Badge>
      );
    }
  };

  return (
    <div className="w-full overflow-x-auto">
      <Table>
        <TableCaption className="text-gray-500 text-sm mt-2">
          A list of your applied jobs
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Job Role</TableHead>
            <TableHead>Company</TableHead>
            <TableHead className="text-right">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {allAppliedJobs.map((applied) => (
            <TableRow key={applied._id}>
              <TableCell>{new Date(applied.createdAt).toLocaleDateString()}</TableCell>
              <TableCell>{applied.job.title}</TableCell>
              <TableCell>{applied.job.company.name}</TableCell>
              <TableCell className="text-right">
                {getStatusBadge(applied.status)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AppliedJobTable;
