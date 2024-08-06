import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    // confirmPass: { type: String, required: true },  
    address: { type: String, requested: true },
    phone: { type: String, required: true,  },
    avatar: {
      type: String,
      default:
        "https://static.vecteezy.com/system/resources/thumbnails/002/318/271/small/user-profile-icon-free-vector.jpg",
    },
    role: {
        type: String,
        default: "member"
    },
  },
  { timestamps: true, versionKey: false }
);
export default mongoose.model("User", userSchema);
