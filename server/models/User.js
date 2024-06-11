import mongoose from "mongoose";

export const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please Provide Username"],
    unique: [true, "Username Already Exists"],
  },
  password: {
    type: String,
    required: [true, "Please Provide password"],
  },
  email: {
    type: String,
    required: [true, "Please Provide Email"],
    unique: [true, "Email Already Exists"],
  },
  firstName: { type: String },
  lastName: { type: String },
  mobile: { type: Number },
  address: { type: String },
  profile: { type: String },
});

export default mongoose.model("User", UserSchema);
