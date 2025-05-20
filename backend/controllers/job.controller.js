import { Job } from "../models/job.model.js";

export const postJob = async (req, res) => {
    try {
        const {
            title,
            description,
            requirements,
            salary,
            location,
            jobType,
            experience,
            position,
            companyId
        } = req.body;

        const userId = req.id;

        if (
            !title ||
            !description ||
            !requirements ||
            !salary ||
            !location ||
            !jobType ||
            !experience ||
            !position ||
            !companyId
        ) {
            return res.status(400).json({
                message: "Please fill in all required fields.",
                success: false,
            });
        }

        const job = await Job.create({
            title,
            description,
            experienceLevel: experience,
            salary: Number(salary),
            requirements: Array.isArray(requirements)
                ? requirements
                : requirements.split(",").map((item) => item.trim()),
            location,
            jobType,
            numberOfOpenings: Number(position),
            company: companyId,
            created_by: userId,
        });

        return res.status(201).json({
            message: "New job created successfully.",
            job,
            success: true,
        });

    } catch (error) {
        console.error("Job creation error:", error.message);
        return res.status(500).json({
            message: "Failed to create job.",
            success: false,
        });
    }
};




export const getAllJobs = async (req, res) => {
    try {
        const keyword = req.query.keyword || "";

        const query = {
            $or: [
                { title: { $regex: keyword, $options: "i" } },
                { description: { $regex: keyword, $options: "i" } },
            ],
        };

        const jobs = await Job.find(query)
            .populate("company", "name location website")
            .sort({ createdAt: -1 });

        if (jobs.length === 0) {
            return res.status(404).json({
                message: "No jobs found.",
                success: false,
            });
        }

        return res.status(200).json({
            jobs,
            total: jobs.length,
            success: true,
        });
    } catch (error) {
        console.error("Fetch all jobs error:", error.message);
        return res.status(500).json({
            message: "Failed to fetch jobs.",
            success: false,
        });
    }
};




export const getJobById = async (req, res) => {
    try {
        const { id } = req.params;

        const job = await Job.findById(id).populate("company", "name location website description");

        if (!job) {
            return res.status(404).json({
                message: "Job not found.",
                success: false,
            });
        }

        return res.status(200).json({
            job,
            success: true,
        });
    } catch (error) {
        console.error("Get job by ID error:", error.message);
        return res.status(500).json({
            message: "Failed to fetch job.",
            success: false,
        });
    }
}

export const getUserJobs = async (req, res) => {
    try {
        const userId = req.id;

        const jobs = await Job.find({ created_by: userId });

        if (!jobs || jobs.length === 0) {
            return res.status(404).json({
                message: "No jobs found for this user.",
                success: false,
            });
        }

        return res.status(200).json({
            jobs,
            total: jobs.length,
            success: true,
        });

    } catch (error) {
        console.error("Get user jobs error:", error.message);
        return res.status(500).json({
            message: "Failed to fetch jobs.",
            success: false,
        });
    }
};



export const updateJob = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.id;
        const {
            title,
            description,
            requirements,
            salary,
            location,
            jobType,
            experience,
            position,
        } = req.body;

        
        const job = await Job.findById(id);

        if (!job) {
            return res.status(404).json({
                message: "Job not found.",
                success: false,
            });
        }

        if (job.created_by.toString() !== userId) {
            return res.status(403).json({
                message: "You are not authorized to update this job.",
                success: false,
            });
        }

        
        if (title) job.title = title;
        if (description) job.description = description;
        if (requirements) job.requirements = requirements.split(",");
        if (salary) job.salary = Number(salary);
        if (location) job.location = location;
        if (jobType) job.jobType = jobType;
        if (experience) job.experienceLevel = experience;
        if (position) job.numberOfOpenings = position;

        
        await job.save();

        return res.status(200).json({
            message: "Job updated successfully.",
            job,
            success: true,
        });

    } catch (error) {
        console.error("Update job error:", error.message);
        return res.status(500).json({
            message: "Failed to update job.",
            success: false,
        });
    }
};



export const deleteJob = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.id;

        const job = await Job.findById(id);

        if (!job) {
            return res.status(404).json({
                message: "Job not found.",
                success: false,
            });
        }

        
        if (job.created_by.toString() !== userId) {
            return res.status(403).json({
                message: "You are not authorized to delete this job.",
                success: false,
            });
        }

        await job.deleteOne();

        return res.status(200).json({
            message: "Job deleted successfully.",
            success: true,
        });

    } catch (error) {
        console.error("Delete job error:", error.message);
        return res.status(500).json({
            message: "Failed to delete job.",
            success: false,
        });
    }
};
