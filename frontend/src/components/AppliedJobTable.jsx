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
          {/* Exemplo de linha */}
          <TableRow>
            <TableCell>2025-05-20</TableCell>
            <TableCell>Frontend Developer</TableCell>
            <TableCell>OpenAI</TableCell>
            <TableCell className="text-right">
              <Badge variant="outline" className="text-green-700 border-green-700">
                Approved
              </Badge>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default AppliedJobTable;
