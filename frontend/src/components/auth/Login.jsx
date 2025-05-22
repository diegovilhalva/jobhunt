import { Link } from "react-router";
import Navbar from "../shared/Navbar";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useState } from "react";

const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: ""
  });

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    
    const loginPayload = {
      email: input.email,
      password: input.password
    };

   
    console.log("Login payload:", loginPayload);
    
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

          <Button
            type="submit"
            className="w-full bg-[#6A38C2] hover:bg-[#5b30a6]"
          >
            Login
          </Button>

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
