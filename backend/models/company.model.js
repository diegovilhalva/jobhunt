import mongoose from "mongoose";

const companySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique:true
    },
    description: {
      type: String,
    },
    website: {
      type: String,
      match: [
        /^(https?:\/\/)?([\w\-])+\.{1}[a-zA-Z]{2,}(\/.*)?$/,
        "Please enter a valid website URL"
      ]
    },
    location: {
      type: String
    },
    logo: {
      type: String,
      match: [
        /^https?:\/\/.*\.(jpeg|jpg|png|svg|webp)$/,
        "Please provide a valid image URL"
      ]
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    }
  },
  { timestamps: true }
);

export const Company = mongoose.model("Company", companySchema);
