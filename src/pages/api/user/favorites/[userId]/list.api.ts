import { NextApiRequest, NextApiResponse } from "next";
import { database } from "@/firebase/firebase";
import { doc, getDoc } from "firebase/firestore";
import axios from "axios";

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

  const favoritesRef = doc(database, "favorites", String(userId));
  const querySnapshotFavorites = await getDoc(favoritesRef);
  const favorites: Game[] = querySnapshotFavorites.data()?.favorites || [];

  const ratingsRef = doc(database, "ratings", String(userId));
  const querySnapshot = await getDoc(ratingsRef);
  const ratings = querySnapshot.data()?.ratings || [];

  const gamesFavorites = favorites.map((gameFav: Game) => {
    const rating = ratings.find((rating: any) => rating.gameId === gameFav.id);
    return {
      ...gameFav,
      favorite: true,
      rate: rating ? rating.rate : null,
    };
  });

  return res.status(200).json(gamesFavorites);
}
