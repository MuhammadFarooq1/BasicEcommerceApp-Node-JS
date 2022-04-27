import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      require: true,
      maxlenght: 32,
      unique: true,
    },
    // time: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.model("Category", categorySchema);
