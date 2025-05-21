import { Job } from "../models/job.model.js";
import { Application } from "../models/application.model.js";
import mongoose from "mongoose";

export const applyJob = async (req, res) => {
    try {
        const userId = req.id;
        const jobId = req.params.id;

        if (!jobId) {
            return res.status(400).json({
                message: "Job ID is required.",
                success: false,
            });
        }

        const existingApplication = await Application.findOne({ job: jobId, applicant: userId });

        if (existingApplication) {
            return res.status(400).json({
                message: "You have already applied for this job.",
                success: false,
            });
        }

        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({
                message: "Job not found.",
                success: false,
            });
        }

        const newApplication = await Application.create({
            job: jobId,
            applicant: userId,
        });


        if (!Array.isArray(job.applications)) {
            job.applications = [];
        }

        job.applications.push(newApplication._id);
        await job.save();

        return res.status(201).json({
            message: "Job applied successfully.",
            success: true,
        });

    } catch (error) {
        console.error("Apply job error:", error.message);
        return res.status(500).json({
            message: "Something went wrong while applying for the job.",
            success: false,
        });
    }
};


export const getAppliedJobs = async (req, res) => {
    try {
        const userId = req.id;

        const applications = await Application.find({ applicant: userId })
            .sort({ createdAt: -1 })
            .populate({
                path: "job",
                populate: {
                    path: "company",
                },
            });

        if (applications.length === 0) {
            return res.status(404).json({
                message: "No applications found.",
                success: false,
            });
        }

        return res.status(200).json({
            applications,
            success: true,
        });

    } catch (error) {
        console.error("Get applied jobs error:", error.message);
        return res.status(500).json({
            message: "Failed to fetch applied jobs.",
            success: false,
        });
    }
};


export const getApplicants = async (req, res) => {
    try {
        const jobId = req.params.id
        const job = await Job.findById(jobId).populate({
            path: "applications",
            options: { sort: { createdAt: -1 } },
            populate: {
                path: "applicant",
                  select: "fullName email  phoneNumber"
            }
        })

        if (!job) {
            return res.status(404).json({
                message: "Job not found.",
                success: false
            })
        }

        return res.status(200).json({
            job,
            success: true
        })

    } catch (error) {
        console.log(error);
        return res.status(400).json({
            message: "Failed to get job applicants"
        })
    }
}

export const updateStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const applicantionId = req.params.id;

        if (!status) {
            return res.status(400).json({
                message: "Status is required",
                success: false
            });
        }


        const application = await Application.findOne({ _id: applicantionId });
        if (!application) {
            return res.status(404).json({
                message: "Application not found.",
                success: false
            });
        }


        application.status = status.toLowerCase();
        await application.save();

        return res.status(200).json({
            message: "Status updated successfully",
            success: true
        });


    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Failed to update status",
            success: false
        });
    }
}