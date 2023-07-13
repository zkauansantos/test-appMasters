import { database } from "@/firebase/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "PUT") {
    return res.status(405).end();
  }

  const { userId } = req.query;
  const { gameId, newRate } = req.body;

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

  if (!newRate) {
    return res.status(400).json({
      error: "New rate being update not provided.",
    });
  }

  try {
    const ratingsRef = doc(database, "ratings", String(userId));
    const ratingsSnapshot = await getDoc(ratingsRef);

    if (ratingsSnapshot.exists()) {
      const ratingsData = ratingsSnapshot.data().ratings;

      const ratingExists = ratingsData.some(
        (rating: any) => rating.gameId === gameId
      );

      if (ratingExists) {
        const lastRates = ratingsData.filter(
          (rating: any) => rating.gameId !== gameId
        );

        await updateDoc(doc(database, "ratings", String(userId)), {
          ratings: [...lastRates, { gameId, rate: newRate }],
        });

        return res.status(204).end();
      }
    }
  } catch (err) {
    console.log(err);
  }
}
