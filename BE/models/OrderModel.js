import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    auto: true,
  },
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
  items: [orderItemSchema],
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
      type: String, // Đảm bảo phone là String nếu có số bắt đầu bằng 0
      required: true,
    },
    payment: {
      type: String,
      required: true,
    },
    city: {
      type: String,
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
{ timestamps: true, versionKey: false });

orderSchema.pre("save", function (next) {
  if (!this.orderNumber) {
    this.orderNumber = generateOrderNumber();
  }
  next();
});

function generateOrderNumber() {
  return `ORD-${Date.now()}`;
}

export default mongoose.model("Order", orderSchema);
