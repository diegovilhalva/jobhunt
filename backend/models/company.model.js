import mongoose from "mongoose"

const companySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true
    },
    description: {
      type: String,
    },
    website: {
      type: String,
      match: [
        /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/,
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
