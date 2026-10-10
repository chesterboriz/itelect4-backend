import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";
import type { UserDoc } from "../types/index";

// The Session 1 User interface, written a second time as a Mongoose schema.
const userSchema = new Schema<UserDoc>(
  {
    name: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    role: {
      type: String,
      enum: ["student", "security-admin", "admin"],
      default: "student",
    },
    isActive: { type: Boolean, default: true },
    score: { type: Number, default: 100 },

    // select: false keeps password out of normal queries unless requested with .select("+password")
    password: { type: String, required: true, minlength: 8, select: false },
  },
  { timestamps: true },
);

// Runs before saving: replaces plain password with bcrypt hash
userSchema.pre("save", async function (this: any) {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 10);
});

// toJSON transform: maps _id to id and strips __v and password for clean API responses
userSchema.set("toJSON", {
  transform(_doc, ret: Record<string, unknown>) {
    ret.id = String(ret._id);
    delete ret._id;
    delete ret.__v;
    delete ret.password;
    return ret;
  },
});

export const User = model<UserDoc>("User", userSchema);
