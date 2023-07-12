import { NextApiRequest, NextApiResponse } from "next";

import { database } from "@/firebase/firebase";
import { collection, doc, getDoc, setDoc } from "firebase/firestore";

export interface Game {
  id: number;
  title: string;
  thumbnail: string;
  short_description: string;
  game_url: string;
  genre: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.status(405).end();
  }

  const { userId } = req.query;

  const { gameId, rate } = req.body;

  if (!userId) {
    return res.status(400).json({
      error: "userId not provided.",
    });
  }

  if (!gameId) {
    return res.status(400).json({
      error: "userId not provided.",
    });
  }

  try {
    const ratingsRef = doc(database, "ratings", String(userId));

    const querySnapshot = await getDoc(ratingsRef);

    const ratings = querySnapshot.data()?.ratings || [];

    const collectionRef = collection(database, "ratings");

    await setDoc(doc(collectionRef, String(userId)), {
      ratings: [...ratings, { gameId, rate }],
    });
  } catch (err) {}

  return res.status(201);
}
