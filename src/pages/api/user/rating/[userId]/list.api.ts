import { NextApiRequest, NextApiResponse } from "next";
import { database } from "@/firebase/firebase";
import { doc, getDoc } from "firebase/firestore";

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
  if (req.method !== "GET") {
    res.status(405).end();
  }

  const { userId } = req.query;

  if (!userId) {
    return res.status(400).json({
      error: "userId not provided.",
    });
  }

  const collectionRef = doc(database, "favorites", String(userId));
  const querySnapshot = await getDoc(collectionRef);

  const gamesFavorites = querySnapshot.data()?.favorites || [];

  return res.status(200).json(gamesFavorites);
}
