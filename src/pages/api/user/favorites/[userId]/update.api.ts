import { database } from "@/firebase/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { NextApiRequest, NextApiResponse } from "next";
import { Game } from "./list.api";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "PUT") {
    return res.status(405).end();
  }

  const { userId } = req.query;
  const { gameId } = req.body;

  if (!userId) {
    return res.status(400).json({
      error: "userId not provided.",
    });
  }

  if (!gameId) {
    return res.status(400).json({
      error: "GameId being update not provided.",
    });
  }

  try {
    const favoritesRef = doc(database, "favorites", String(userId));
    const favoritesSnapshot = await getDoc(favoritesRef);

    if (favoritesSnapshot.exists()) {
      const favoritesData = favoritesSnapshot.data();
      const updatedFavorites = favoritesData.favorites.filter(
        (gameFav: Game) => gameFav.id !== gameId
      );

      await updateDoc(doc(database, "favorites", String(userId)), {
        favorites: updatedFavorites,
      });

      return res.status(204).end();
    }
  } catch (err) {
    console.log(err);
  }
}
