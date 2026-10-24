import "dotenv/config";
import { reviewProject } from "./ai/gemini";

// npm run try-ai. One real request to Gemini from your terminal --
// the same function POST /api/ai calls, with no Express, no token
// and no database. Run it once the key is in .env: if this prints a
// review, the key, the model name and the schema all work.
async function tryAi() {
  const review = await reviewProject(
    "A Campus Lost & Found system in React and TypeScript. Students " +
      "log in, report lost or found items, and track their claims and submissions. " +
      "The API is Express and MongoDB Atlas, deployed on Vercel.",
  );
  console.log(JSON.stringify(review, null, 2));
}

tryAi().catch((err: unknown) => {
  console.error("Gemini call failed:", err);
  process.exit(1);
});
