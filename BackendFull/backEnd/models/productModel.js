import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      require: true,
      maxlenght: 32,
    },
    description: {
      type: String,
      require: true,
      maxlenght: 32,
    },
    price: {
      type: Number,
      trim: true,
      require: true,
      maxlenght: 32,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      require: true,
    },
    quantity: {
      type: Number,
    },
    sold: {
      type: Number,
      default: 0,
    },
    photo: {
      data: Buffer,
      contentType: String,
    },
    shipping: {
      require: false,
      type: Boolean,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);
