import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";
import crypto from "crypto";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      require: true,
      maxlenght: 32,
    },
    email: {
      type: String,
      trim: true,
      require: true,
      unique: 32,
    },
    hashed_Password: {
      type: String,
      require: true,
    },
    about: {
      type: String,
      trim: true,
    },
    salt: String,
    role: {
      type: Number,
      default: 0,
    },
    history: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

userSchema
  .virtual("password")
  .set(function (password) {
    this._password = password;
    this.salt = uuidv4();
    this.hashed_Password = this.encryptPassword(password);
  })
  .get(function () {
    return this._password;
  });

userSchema.methods = {
  Authenticate: function (plainText) {
    return this.encryptPassword(plainText) === this.hashed_Password;
  },

  encryptPassword: function (password) {
    if (!password) return "";
    try {
      return crypto
        .createHmac("sha1", this.salt)
        .update(password)
        .digest("hex");
    } catch (error) {
      return "";
    }
  },
};

export default mongoose.model("User", userSchema);
