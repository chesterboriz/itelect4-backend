import { Schema, model } from "mongoose";
import type { ItemDoc } from "../types/index";

const itemSchema = new Schema<ItemDoc>({
  // Belongs to the user who reported / created it (from req.userId)
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  // Rule 1: Required & trimmed string
  title: {
    type: String,
    required: [true, "title is required"],
    trim: true,
  },

  // Rule 2: Enum check for allowed categories
  category: {
    type: String,
    required: [true, "category is required"],
    trim: true,
    enum: {
      values: ["Personal Item", "Accessory", "Electronics", "Document", "Other"],
      message: "category must be Personal Item, Accessory, Electronics, Document, or Other",
    },
  },

  locationFound: {
    type: String,
    required: [true, "locationFound is required"],
    trim: true,
  },

  description: {
    type: String,
    trim: true,
  },

  // Rule 2 (additional): Enum check for status
  status: {
    type: String,
    enum: {
      values: ["reported", "claimed", "resolved"],
      message: "status must be reported, claimed, or resolved",
    },
    default: "reported",
  },

  isClaimed: {
    type: Boolean,
    default: false,
  },

  // Rule 3: Number with min and max bounds
  estimatedValue: {
    type: Number,
    min: [0, "estimatedValue must be at least 0"],
    max: [100000, "estimatedValue cannot exceed 100000"],
    default: 0,
  },
});

// toJSON transform: converts _id to id and strips __v
itemSchema.set("toJSON", {
  transform(_doc, ret: Record<string, unknown>) {
    ret.id = String(ret._id);
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

export const Item = model<ItemDoc>("Item", itemSchema);
