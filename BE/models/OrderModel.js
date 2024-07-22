import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    userId: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    products: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],
    payments: { type: String, required: true, unique: true },
    status: { type: String, required: true },
    totalPrice: { type: String, requested: true },
  },
  { timestamps: true, versionKey: false }
);
export default mongoose.model("Order", orderSchema);
