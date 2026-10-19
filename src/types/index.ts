import type { Types } from "mongoose";

// FROM SESSION 1 & itelect4-project:
// Copied from itelect4-project's src/types/index.ts to serve as the single source of truth.

export type Role = "student" | "security-admin" | "admin";
export const Role = {
  Student: "student" as const,
  SecurityAdmin: "security-admin" as const,
  Admin: "admin" as const,
};

export enum ClaimStatus {
  Pending = "pending",
  Verified = "verified",
  Rejected = "rejected",
}

export interface User {
  id: number;
  name: string;
  email: string;
  role: Role;
  isActive: boolean;
  score: number;
}

export interface Item {
  id: string;
  userId: number;
  title: string;
  category: string;
  locationFound: string;
  description?: string;
  status: "reported" | "claimed" | "resolved";
  isClaimed: boolean;
  estimatedValue?: number;
}

export interface Claim {
  id: string;
  userId: number;
  itemId: string;
  claimReason: string;
  claimedAt: string;
  status: ClaimStatus;
}

// ---------------------------------------------------------------------
// DERIVED TYPES FOR MONGODB & BACKEND:
// ---------------------------------------------------------------------

// UserDoc: Omit client id, add password field stored in MongoDB
export type UserDoc = Omit<User, "id"> & {
  password: string;
};

// ItemDoc: What MongoDB actually stores.
// userId is an ObjectId pointing to the User collection.
export type ItemDoc = Omit<Item, "id" | "userId"> & {
  userId: Types.ObjectId;
};

// The request body client sends to create an Item.
// No id or userId -- server extracts userId from the verified JWT.
export type NewItemBody = Pick<Item, "title" | "category" | "locationFound"> & {
  description?: string;
  status?: "reported" | "claimed" | "resolved";
  isClaimed?: boolean;
  estimatedValue?: number;
};

// ---------------------------------------------------------------------
// COURSE & REFERENCE RESOURCE (GT4 Part 2):
// ---------------------------------------------------------------------

export interface Course {
  id?: string;
  code: string;
  title: string;
  units: number;
  semester: string;
  instructor?: string;
  isOpen?: boolean;
}

// CourseDoc has to be a Pick, because Mongoose will not take an interface
export type CourseDoc = Pick<
  Course,
  "code" | "title" | "units" | "semester"
>;

// Campus Lost & Found Reference Category
export interface Category {
  code: string;
  name: string;
  description?: string;
}

export type CategoryDoc = Pick<
  Category,
  "code" | "name" | "description"
>;

// ---------------------------------------------------------------------
// SUBMISSION RESOURCE (FOR FULL SLIDE COMPATIBILITY):
// ---------------------------------------------------------------------

export interface Submission {
  id: string;
  studentId: string;
  courseCode: string;
  repoUrl: string;
  submittedAt: string;
}

export type SubmissionDoc = Omit<Submission, "id" | "studentId" | "submittedAt"> & {
  studentId: Types.ObjectId;
  submittedAt: Date;
};

export type NewSubmissionBody = Pick<Submission, "courseCode" | "repoUrl">;

