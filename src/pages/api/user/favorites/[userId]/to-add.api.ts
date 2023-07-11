import { database } from "@/firebase/firebase";
import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import { NextApiRequest, NextApiResponse } from "next";

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

  const { game } = req.body;

  if (!userId) {
    return res.status(400).json({
      error: "userId not provided.",
    });
  }

  try {
    const favoritesRef = doc(database, "favorites", String(userId));

    console.log("passou daqui 1");

    const querySnapshot = await getDoc(favoritesRef);

    console.log("passou daqui 2");

    const gamesFavorites = querySnapshot.data()?.favorites || [];

    console.log("passou daqui 3");

    const collectionRef = collection(database, "favorites");

    console.log("passou daqui 4");

    await setDoc(doc(collectionRef, String(userId)), {
      favorites: [...gamesFavorites, game],
    });
  } catch (err) {}

  return res.status(201);
}
