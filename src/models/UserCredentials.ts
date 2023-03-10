import mongoose from "mongoose";

const { Schema } = mongoose;

const UserCredentialsSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      maxlength: 20,
    },
    passwordHash: {
      type: String,
      required: true,
      maxlength: 512,
    },
    salt: {
      type: String,
      required: true,
      maxlength: 512,
    },
    userInfo: { type: Schema.Types.ObjectId, ref: "UserCredentials" },
  },
  { timestamps: true }
);

export default mongoose.models.Order ||
  mongoose.model("Order", UserCredentialsSchema);
