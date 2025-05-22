import { Link } from "react-router";
import Navbar from "../shared/Navbar";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";

const SignUp = () => {
  const userRoles = ["recruiter", "job-seeker", "student"];

  return (
    <div>
      <Navbar />
      <main className="flex items-center justify-center px-4">
        <form className="w-full max-w-md border border-gray-200 rounded-lg p-6 my-10 shadow-sm">
          <h1 className="font-bold text-2xl mb-6 text-center">Create your account</h1>

          <div className="mb-4">
            <Label htmlFor="name">Full Name</Label>
            <Input id="name" name="name" type="text" placeholder="Your Name" />
          </div>

          <div className="mb-4">
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" placeholder="Your Email" />
          </div>

          <div className="mb-4">
            <Label htmlFor="phone">Phone Number</Label>
            <Input id="phone" name="phoneNumber" placeholder="Your phone number" />
          </div>

          <div className="mb-4">
            <Label htmlFor="password">Password</Label>
            <Input id="password" name="password" type="password" placeholder="Provide a strong password" />
          </div>

          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-5">
            <div>
              <Label>User Role</Label>
              <RadioGroup className="flex flex-wrap gap-3 mt-2">
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
              <Input id="profile" name="profile" type="file" accept="image/*" />
            </div>
          </div>

          <Button
            type="submit"
            className="w-full bg-[#6A38C2] hover:bg-[#5b30a6]"
          >
            Signup
          </Button>

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
