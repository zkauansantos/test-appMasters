import { database } from "@/firebase/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "DELETE") {
    return res.status(405).end();
  }

  const { userId } = req.query;
  const { "game-id": gameId } = req.headers;

  if (!userId) {
    return res.status(400).json({
      error: "userId not provided.",
    });
  }

  if (!gameId) {
    return res.status(400).json({
      error: "GameId being update not provided in header.",
    });
  }

  try {
    const ratingsRef = doc(database, "ratings", String(userId));
    const ratingsSnapshot = await getDoc(ratingsRef);

    if (ratingsSnapshot.exists()) {
      const ratingsData = ratingsSnapshot.data();
      const updatedRatings = ratingsData.ratings.filter(
        (gameFav: any) => gameFav.gameId !== Number(gameId)
      );
      await updateDoc(doc(database, "ratings", String(userId)), {
        ratings: updatedRatings,
      });

      return res.status(204).end();
    }
  } catch (err) {
    return res.status(500).end();
  }
}
