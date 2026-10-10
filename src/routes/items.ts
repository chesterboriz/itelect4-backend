import { Router, type Request, type Response } from "express";
import { Item } from "../models/Item";
import { requireAuth } from "../middleware/auth";
import type { NewItemBody } from "../types/index";

export const itemRouter = Router();

// Protect every route in this router with requireAuth middleware
itemRouter.use(requireAuth);

interface IdParam {
  id: string;
}

// GET /api/items -- Returns all items belonging to the authenticated user
itemRouter.get("/", async (req: Request, res: Response) => {
  const items = await Item.find({
    userId: req.userId,
  }).sort({ _id: -1 });
  res.json(items);
});

// GET /api/items/:id -- Returns one item if owned by this user, else 404
itemRouter.get("/:id", async (req: Request<IdParam>, res: Response) => {
  const item = await Item.findOne({
    _id: req.params.id,
    userId: req.userId,
  });

  if (!item) {
    res.status(404).json({ message: "No item with that id" });
    return;
  }

  res.json(item);
});

// POST /api/items -- Creates a new item, forcing userId to match verified token
itemRouter.post(
  "/",
  async (
    req: Request<unknown, unknown, NewItemBody>,
    res: Response,
  ) => {
    const item = await Item.create({
      ...req.body,
      userId: req.userId,
    });

    res.status(201).json(item);
  },
);

// PATCH /api/items/:id -- Updates an item owned by user, runs schema validators
itemRouter.patch(
  "/:id",
  async (
    req: Request<IdParam, unknown, Partial<NewItemBody>>,
    res: Response,
  ) => {
    const item = await Item.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      req.body,
      { new: true, runValidators: true },
    );

    if (!item) {
      res.status(404).json({ message: "No item with that id" });
      return;
    }

    res.json(item);
  },
);

// DELETE /api/items/:id -- Deletes an item owned by user, answers 204 with no body
itemRouter.delete(
  "/:id",
  async (req: Request<IdParam>, res: Response) => {
    const item = await Item.findOneAndDelete({
      _id: req.params.id,
      userId: req.userId,
    });

    if (!item) {
      res.status(404).json({ message: "No item with that id" });
      return;
    }

    res.status(204).send();
  },
);
