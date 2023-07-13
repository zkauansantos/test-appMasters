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

  try {
    const favoritesRef = doc(database, "favorites", String(userId));
    const querySnapshotFavorites = await getDoc(favoritesRef);

    const ratingsRef = doc(database, "ratings", String(userId));
    const querySnapshotRatings = await getDoc(ratingsRef);

    if (querySnapshotFavorites.exists() && querySnapshotRatings.exists()) {
      const favorites: Game[] = querySnapshotFavorites.data()?.favorites || [];
      const ratings = querySnapshotRatings.data()?.ratings || [];

      const gamesFavorites = favorites.map((gameFav: Game) => {
        const rating = ratings.find(
          (rating: any) => rating.gameId === gameFav.id
        );
        return {
          ...gameFav,
          favorite: true,
          rate: rating ? rating.rate : null,
        };
      });

      return res.status(200).json(gamesFavorites);
    }

    return res.status(200).json([]);
  } catch {
    return res.status(500).end();
  }
}
