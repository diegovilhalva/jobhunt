import { Edit2, MoreHorizontal } from "lucide-react";
import { Avatar, AvatarImage } from "../ui/avatar";
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
import { useNavigate } from "react-router";

const CompaniesTable = () => {
  const companies = [
    {
      id: 1,
      name: "OpenDev",
      logo: "/company-fallback.svg",
      createdAt: "2025-05-20",
    },
    // ...outras empresas
  ];

  const navigate = useNavigate()

  return (
    <div className="mt-10">
      <Table>
        <TableCaption>A list of your registered companies</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Logo</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {companies.map((company) => (
            <TableRow key={company.id}>
              <TableCell>
                <Avatar>
                  <AvatarImage src={company.logo} alt={company.name} />
                </Avatar>
              </TableCell>
              <TableCell>{company.name}</TableCell>
              <TableCell>
                {new Date(company.createdAt).toLocaleDateString("pt-BR")}
              </TableCell>
              <TableCell className="text-right">
                <Popover>
                  <PopoverTrigger asChild>
                    <button
                      className="p-1 hover:bg-muted rounded"
                      aria-label="Open actions"
                    >
                      <MoreHorizontal />
                    </button>
                  </PopoverTrigger>
                  <PopoverContent className="w-32">
                    <button className="flex items-center gap-2 hover:text-primary">
                      <Edit2 className="w-4" />
                      <span>Edit</span>
                    </button>
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

export default CompaniesTable;
