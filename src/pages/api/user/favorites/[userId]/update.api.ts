import { database } from "@/firebase/firebase";
import { arrayRemove, doc, updateDoc } from "firebase/firestore";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "PUT") {
    return res.status(405).end();
  }

  const { userId } = req.query;
  const { game } = req.body;

  if (!userId) {
    return res.status(400).json({
      error: "userId not provided.",
    });
  }

  if (!game) {
    return res.status(400).json({
      error: "Game being update not provided.",
    });
  }

  await updateDoc(doc(database, "favorites", String(userId)), {
    favorites: arrayRemove(game),
  });

  return res.status(204).end();
}
