const mongoose = require("mongoose");
//destructure mongoose
const { Schema, model } = mongoose;
const UserSchema = new Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, min: 8 },
    profilePic: {
      type: String,
      default:
        "https://plus.unsplash.com/premium_photo-1738980401922-70995a1b6ade?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZGVmYXVsdCUyMHByb2ZpbGUlMjBwaWN0dXJlfGVufDB8fDB8fHww",
    },
  },
  { timestamps: true },
);

const UserModel = model("User", UserSchema);
module.exports = UserModel;
