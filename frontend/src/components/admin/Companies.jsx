import { useNavigate } from "react-router";
import Navbar from "../shared/Navbar";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useEffect, useState } from "react";
import CompaniesTable from "./CompaniesTable";
import useGetAllCompanies from "../../hooks/useGetAllCompanies";
import { useDispatch } from "react-redux";
import { setSearchCompanyByText } from "../../redux/companySlice";

const Companies = () => {
    useGetAllCompanies()
    const [search, setSearch] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(setSearchCompanyByText(search));
    },[search]);

    return (
        <div>
            <Navbar />
            <section aria-label="Companies List" className="max-w-6xl mx-auto my-10 px-4">
                <h1 className="text-2xl font-semibold mb-6">Companies</h1>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <Input
                        className="w-full max-w-sm"
                        placeholder="Filter by name"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <Button
                        onClick={() => navigate("/admin/companies/create")}
                        className="bg-[#6A38C2] hover:bg-[#5b30a6]"
                    >
                        New Company
                    </Button>
                </div>

                {/* Placeholder para a tabela */}
                <CompaniesTable />
            </section>
        </div>
    );
};

export default Companies;
