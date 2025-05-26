import { Link, useNavigate } from "react-router";
import Navbar from "../shared/Navbar";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "../../redux/authSlice";
import axios from "axios";
import { USER_API_ENDPOINT } from "../../constants";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: ""
  });
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { loading } = useSelector(store => store.auth)
  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch(setLoading(true))
      const loginPayload = {
        email: input.email,
        password: input.password
      };
      const res = await axios.post(`${USER_API_ENDPOINT}/login`, loginPayload, {
        headers: {
          "Content-Type": "application/json"
        },
        withCredentials: true
      })

      if (res.data.success) {
        dispatch(setUser(res.data.user))
        navigate("/")
        toast.success(res.data.message)
      }

    } catch (error) {
      toast.error(error.response.data.message)
    } finally {
      dispatch(setLoading(false))
    }

  };

  return (
    <div>
      <Navbar />
      <main className="flex items-center justify-center px-4">
        <form
          className="w-full max-w-md border border-gray-200 rounded-lg p-6 my-10 shadow-sm"
          onSubmit={submitHandler}
        >
          <h1 className="font-bold text-2xl mb-6 text-center">Welcome back</h1>

          <div className="mb-4">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="Your Email"
              value={input.email}
              onChange={changeEventHandler}
            />
          </div>

          <div className="mb-4">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="Your password"
              value={input.password}
              onChange={changeEventHandler}
            />
          </div>


          {
            loading ? (
              <Button className="w-full my-4 bg-[#6A38C2] hover:bg-[#5b30a6]"> <Loader2 className='mr-2 h-4 w-4  animate-spin ' /> Please wait </Button>
            ) : (
              <Button
                type="submit"
                className="w-full bg-[#6A38C2] hover:bg-[#5b30a6]"
              >
                Login
              </Button>
            )
          }


          <p className="text-sm text-center mt-4">
            Don't have an account?{" "}
            <Link to="/signup" className="text-blue-600 hover:underline">
              Sign up
            </Link>
          </p>
        </form>
      </main>
    </div>
  );
};

export default Login;
