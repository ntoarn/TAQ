import mongoose from "mongoose";

const colorSchema = new mongoose.Schema(
  {
    color: {
      type: String,
      required: true,
      unique: true,
      defaultValue: "UnCategorized",
    },
    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
  },
  { versionKey: false, timestamps: true }
);
export default mongoose.model("Color", colorSchema);
