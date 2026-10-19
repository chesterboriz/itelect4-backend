import { Router, type Request, type Response } from "express";
import { Submission } from "../models/Submission";
import { requireAuth } from "../middleware/auth";
import type { NewSubmissionBody } from "../types/index";

export const submissionRouter = Router();

// Protect every route in this router with requireAuth middleware
submissionRouter.use(requireAuth);

interface IdParam {
  id: string;
}

// GET /api/submissions -- Returns all submissions belonging to authenticated student
submissionRouter.get("/", async (req: Request, res: Response) => {
  const submissions = await Submission.find({
    studentId: req.userId,
  }).sort({ submittedAt: -1 });
  res.json(submissions);
});

// GET /api/submissions/:id -- Returns one submission if owned by this student
submissionRouter.get("/:id", async (req: Request<IdParam>, res: Response) => {
  const submission = await Submission.findOne({
    _id: req.params.id,
    studentId: req.userId,
  });

  if (!submission) {
    res.status(404).json({ message: "No submission with that id" });
    return;
  }

  res.json(submission);
});

// POST /api/submissions -- Creates a new submission, extracting studentId from token
submissionRouter.post(
  "/",
  async (
    req: Request<unknown, unknown, NewSubmissionBody>,
    res: Response,
  ) => {
    const submission = await Submission.create({
      ...req.body,
      studentId: req.userId,
    });

    res.status(201).json(submission);
  },
);

// PATCH /api/submissions/:id -- Updates a submission owned by student
submissionRouter.patch(
  "/:id",
  async (
    req: Request<IdParam, unknown, Partial<NewSubmissionBody>>,
    res: Response,
  ) => {
    const submission = await Submission.findOneAndUpdate(
      { _id: req.params.id, studentId: req.userId },
      req.body,
      { new: true, runValidators: true },
    );

    if (!submission) {
      res.status(404).json({ message: "No submission with that id" });
      return;
    }

    res.json(submission);
  },
);

// DELETE /api/submissions/:id -- Deletes a submission owned by student
submissionRouter.delete(
  "/:id",
  async (req: Request<IdParam>, res: Response) => {
    const submission = await Submission.findOneAndDelete({
      _id: req.params.id,
      studentId: req.userId,
    });

    if (!submission) {
      res.status(404).json({ message: "No submission with that id" });
      return;
    }

    res.status(204).send();
  },
);
