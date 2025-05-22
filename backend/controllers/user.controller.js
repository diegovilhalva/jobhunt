import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"

export const register = async (req, res) => {
    try {
        const { fullName, email, phoneNumber, password, role } = req.body;


        if (!fullName || !email || !phoneNumber || !password || !role) {
            return res.status(400).json({
                message: "Please fill in all required fields.",
                success: false,
            });
        }


        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                message: "This email is already registered.",
                success: false,
            });
        }


        const hashedPassword = await bcrypt.hash(password, 10);


        await User.create({
            fullName,
            email,
            phoneNumber,
            password: hashedPassword,
            role,
        });

        return res.status(201).json({
            message: "User registered successfully",
            success: true,
        });

    } catch (error) {
        console.error("Error during registration:", error);
        return res.status(500).json({
            message: "Something went wrong. Please try again.",
            success: false,
        });
    }
};


export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password ) {
            return res.status(400).json({
                message: "Please provide email and password",
                success: false,
            });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({
                message: "Incorrect email or password.",
                success: false,
            });
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(401).json({
                message: "Incorrect email or password.",
                success: false,
            });
        }

        if (role !== user.role) {
            return res.status(403).json({
                message: "Access denied for this user role.",
                success: false,
            });
        }

        const tokenData = {
            userId: user._id,
        };

        const token = jwt.sign(tokenData, process.env.JWT_SECRET, {
            expiresIn: "30d",
        });

        return res
            .status(200)
            .cookie("token", token, {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                httpOnly: true,
                sameSite: "strict",
                secure: process.env.NODE_ENV === "production",
            })
            .json({
                message: "Logged in successfully.",
                user: {
                    id: user._id,
                    fullName: user.fullName,
                    phoneNumber: user.phoneNumber,
                    email: user.email,
                    role: user.role,
                    profile: user.profile,
                },
                success: true,
            });

    } catch (error) {
        console.error("Login error:", error.message);
        return res.status(500).json({
            message: "Login failed. Please try again later.",
            success: false,
        });

    }
}

export const logout = async (req, res) => {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            sameSite: "strict",
            secure: process.env.NODE_ENV === "production",
        });

        return res.status(200).json({
            message: "Logged out successfully.",
            success: true,
        });
    } catch (error) {
        console.error("Logout error:", error.message);
        return res.status(500).json({
            message: "Unable to logout. Please try again later.",
            success: false,
        });
    }
};




export const updateProfile = async (req, res) => {
  try {
    const { fullName, email, phoneNumber, bio, skills } = req.body;
    const userId = req.id;

    if (!fullName || !email || !phoneNumber || !bio || !skills) {
      return res.status(400).json({
        message: "All fields are required.",
        success: false,
      });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found.",
        success: false,
      });
    }

    user.fullName = fullName.trim();
    user.email = email.trim().toLowerCase();
    user.phoneNumber = phoneNumber;
    user.profile.bio = bio.trim();
    user.profile.skills = skills
      .split(",")
      .map((skill) => skill.trim())
      .filter((skill) => skill.length > 0);

    await user.save();

    return res.status(200).json({
      message: "Profile updated successfully.",
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        phoneNumber: user.phoneNumber,
        role: user.role,
        profile: user.profile,
      },
      success: true,
    });
  } catch (error) {
    console.error("Profile update error:", error.message);
    return res.status(500).json({
      message: "Failed to update profile. Please try again later.",
      success: false,
    });
  }
};
