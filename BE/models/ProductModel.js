import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },

    price: { type: Number, required: true },
    image: { type: String, required: true },
    quantity: { type: Number, required: true },
    sizeId: { type: mongoose.Schema.Types.ObjectId, ref: "Size", required: true },
    colorId: { type: mongoose.Schema.Types.ObjectId, ref: "Color", required: true },
    categoryId: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },
  },
  { timestamps: true, versionKey: false }
);

export default mongoose.model("Product", productSchema);
