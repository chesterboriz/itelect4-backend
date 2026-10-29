import "dotenv/config";
import mongoose from "mongoose";
import { connectDB } from "./config/db";
import { User } from "./models/User";
import { Item } from "./models/Item";
import { Submission } from "./models/Submission";

// npm run seed:demo [email]
// Fills ONE existing account with 5 sample items and 5 sample
// submissions, so the dashboard has something to show. Items and
// submissions are private, so they must belong to a real user:
// register on the site first, then run this. With no email it uses
// the oldest account. Running it twice does not create duplicates.
const ITEMS = [
  { title: "Black Leather Wallet", category: "Personal Item", locationFound: "Library 2nd Floor", description: "Contains a student ID and some cash.", estimatedValue: 1500 },
  { title: "Silver Wireless Earbuds", category: "Electronics", locationFound: "Gymnasium Bleachers", description: "White charging case with a small scratch.", estimatedValue: 4000 },
  { title: "Green Umbrella", category: "Accessory", locationFound: "Main Building Lobby", description: "Foldable umbrella with a wooden handle.", estimatedValue: 300 },
  { title: "Scientific Calculator", category: "Electronics", locationFound: "Room 305", description: "Casio fx-991 with initials on the back.", estimatedValue: 1200 },
  { title: "Registration Form Folder", category: "Document", locationFound: "Registrar's Office", description: "Blue folder with enrollment papers.", estimatedValue: 0 },
] as const;

const SUBMISSIONS = [
  { courseCode: "ITELECT1", repoUrl: "https://github.com/chesterboriz/itelect1-project" },
  { courseCode: "ITELECT2", repoUrl: "https://github.com/chesterboriz/itelect2-project" },
  { courseCode: "ITELECT3", repoUrl: "https://github.com/chesterboriz/itelect3-project" },
  { courseCode: "ITELECT4", repoUrl: "https://github.com/chesterboriz/itelect4-project" },
  { courseCode: "ITELECT4", repoUrl: "https://github.com/chesterboriz/itelect4-backend" },
] as const;

async function seedDemo() {
  await connectDB();

  const email = process.argv[2]?.toLowerCase();
  const user = email
    ? await User.findOne({ email })
    : await User.findOne().sort({ _id: 1 });

  if (!user) {
    throw new Error("No user found. Register on the site first, then run this again.");
  }

  for (const item of ITEMS) {
    await Item.updateOne(
      { userId: user._id, title: item.title },
      { ...item, userId: user._id },
      { upsert: true },
    );
  }

  for (const sub of SUBMISSIONS) {
    await Submission.updateOne(
      { studentId: user._id, repoUrl: sub.repoUrl },
      { ...sub, studentId: user._id },
      { upsert: true },
    );
  }

  console.log(`Seeded ${ITEMS.length} items and ${SUBMISSIONS.length} submissions for ${user.email}`);
  await mongoose.disconnect();
}

seedDemo().catch((err: unknown) => {
  console.error("Demo seed failed:", err);
  process.exit(1);
});
