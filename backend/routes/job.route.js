import express from "express";
import {
  postJob,
  getAllJobs,
  getJobById,
  getUserJobs,
  updateJob,
  deleteJob
} from "../controllers/job.controller.js";
import  isAuthenticated  from "../middlewares/isAuthenticated.js";

const router = express.Router();

router.post("/create", isAuthenticated, postJob);


router.get("/get", getAllJobs);

router.get("/get/:id", getJobById);


router.get("/user-jobs", isAuthenticated, getUserJobs);


router.patch("/update/:id", isAuthenticated, updateJob);

router.delete("/delete/:id", isAuthenticated, deleteJob);

export default router;

