import { Link, useNavigate } from "react-router";
import Navbar from "../shared/Navbar";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../redux/authSlice";
import axios from "axios";
import { USER_API_ENDPOINT } from "../../constants";
import { toast } from "sonner";
import { Card } from "../ui/card";
import { LoaderCircle } from "lucide-react";

const SignUp = () => {
    const userRoles = ["recruiter", "job-seeker", "student"];
    const [input, setInput] = useState({
        fullName: "",
        email: "",
        phoneNumber: "",
        password: "",
        role: "",
        file: ""
    })

    const { loading, user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }

    const changeFileHandler = (e) => {
        setInput({ ...input, file: e.target.files?.[0] });
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("fullName", input.fullName);
        formData.append("email", input.email);
        formData.append("phoneNumber", input.phoneNumber);
        formData.append("password", input.password);
        formData.append("role", input.role);
        if (input.file) {
            formData.append("file", input.file);
        }
        try {
            dispatch(setLoading)
            const res = await axios.post(`${USER_API_ENDPOINT}/register`,formData,{
                headers:{
                    "Content-Type":"multipart/form-data",   
                },
                withCredentials: true,

            })
            if (res.data.success) {
                navigate("/login");
                toast.success(res.data.message)
            }
        } catch (error) {
             toast.error(error.response.data.message)
        }finally{
            dispatch(setLoading(false))
        }


    }
     useEffect(() => {
        if(user){
          navigate("/")
        }
      },[])
       if (user) {
          return (
            <div className="flex justify-center items-center h-screen">
              <Card className="p-6 flex flex-col items-center space-y-4">
                <LoaderCircle className="animate-spin h-8 w-8 text-[#6A38C2]" />
                <p className="text-sm text-muted-foreground">Loading...</p>
              </Card>
            </div>
          )
        }
    return (
        <div>
            <Navbar />
            <main className="flex items-center justify-center px-4">
                <form onSubmit={submitHandler} className="w-full max-w-md border border-gray-200 rounded-lg p-6 my-10 shadow-sm">
                    <h1 className="font-bold text-2xl mb-6 text-center">Create your account</h1>

                    <div className="mb-4">
                        <Label htmlFor="name">Full Name</Label>
                        <Input id="name" name="fullName" value={input.fullName} onChange={changeEventHandler} type="text" placeholder="Your Name" />
                    </div>

                    <div className="mb-4">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" name="email" value={input.email} onChange={changeEventHandler} type="email" placeholder="Your Email" />
                    </div>

                    <div className="mb-4">
                        <Label htmlFor="phone" >Phone Number</Label>
                        <Input id="phoneNumber" name="phoneNumber" value={input.phoneNumber} onChange={changeEventHandler} placeholder="Your phone number" />
                    </div>

                    <div className="mb-4">
                        <Label htmlFor="password">Password</Label>
                        <Input id="password" name="password" value={input.password} onChange={changeEventHandler} type="password" placeholder="Provide a strong password" />
                    </div>

                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-5">
                        <div>
                            <Label>User Role</Label>
                            <RadioGroup
                                value={input.role}
                                onValueChange={(value) => setInput({ ...input, role: value })}
                                className="flex flex-wrap gap-3 mt-2"
                            >
                                {userRoles.map((role) => (
                                    <div key={role} className="flex items-center space-x-2">
                                        <RadioGroupItem value={role} id={role} />
                                        <Label htmlFor={role} className="capitalize">{role}</Label>
                                    </div>
                                ))}
                            </RadioGroup>

                        </div>

                        <div className="mt-2 md:mt-0">
                            <Label htmlFor="profile">Profile</Label>
                            <Input id="profile" name="profile" onChange={changeFileHandler} type="file" accept="image/*" />
                        </div>
                    </div>
                    { loading  ? (
                     <Button className="w-full  bg-[#6A38C2] hover:bg-[#5b30a6] my-4"> <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait </Button>    
                    ):(
                         <Button
                        type="submit"
                        className="w-full bg-[#6A38C2] hover:bg-[#5b30a6]"
                    >
                        Signup
                    </Button>
                    )}
                   

                    <p className="text-sm text-center mt-4">
                        Already have an account?{" "}
                        <Link to="/login" className="text-blue-600 hover:underline">
                            Login
                        </Link>
                    </p>
                </form>
            </main>
        </div>
    );
};

export default SignUp;
