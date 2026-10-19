import { Schema, model } from "mongoose";
import type { SubmissionDoc } from "../types/index";

const submissionSchema = new Schema<SubmissionDoc>({
  studentId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  courseCode: {
    type: String,
    required: [true, "courseCode is required"],
    trim: true,
  },
  repoUrl: {
    type: String,
    required: [true, "repoUrl is required"],
    trim: true,
  },
  submittedAt: {
    type: Date,
    default: Date.now,
  },
});

submissionSchema.set("toJSON", {
  transform(_doc, ret: Record<string, unknown>) {
    ret.id = String(ret._id);
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

export const Submission = model<SubmissionDoc>("Submission", submissionSchema);
