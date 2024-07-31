import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema({
   title: {
     type: String,
     required: true,
   },
   price: {
     type: Number,
     required: true,
   },
   quantity: {
     type: Number,
     required: true,
   }
});

const orderSchema = new mongoose.Schema({
    userId: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    items:[orderItemSchema],
    orderNumber: {
      type: String
    },
    customerInfo: {
      name: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
      address: {
        type: String,
        required: true,
      },
      phone: {
        type: Number,
        required: true,
      },
      payment: {
        type: String,
        required: true,
      },
      city:{
        type: String,
        required: true,
      }
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "confirmed", "shipped", "delivered"],
      default: "pending",
    }
  },
  { timestamps: true, versionKey: false }
);

export default mongoose.model("Order", orderSchema);