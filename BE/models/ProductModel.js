import mongoose from "mongoose";
const Schema = mongoose.Schema;

const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true},
    price: { type: Number, requested: true},
    image: { type: String, required: true},
    // size: { type: String, required: true},
    // color: { type: String, required: true},
    
    categoryId:{ type: mongoose.Schema.Types.ObjectId, ref:"Category" ,required: true},
    // sizeId:{ type: mongoose.Schema.Types.ObjectId, ref:"Size" ,required: true},
  },
  { timestamps: true, versionKey: false }
);
export default mongoose.model("Product", productSchema);