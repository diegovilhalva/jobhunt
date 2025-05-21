import express from "express"
import isAuthenticated from "../middlewares/isAuthenticated.js"
import { applyJob, getApplicants, getAppliedJobs, updateStatus } from "../controllers/application.controller.js"
const router = express.Router()


router.post("/apply/:id",isAuthenticated,applyJob)
router.get("/get",isAuthenticated,getAppliedJobs)
router.get("/:id/applicants",isAuthenticated,getApplicants)
router.patch("/status/:id/update",isAuthenticated,updateStatus)


export default router