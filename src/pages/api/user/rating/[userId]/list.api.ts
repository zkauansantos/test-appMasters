import { NextApiRequest, NextApiResponse } from "next";
import { database } from "@/firebase/firebase";
import { doc, getDoc } from "firebase/firestore";

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
    const collectionRef = doc(database, "ratings", String(userId));
    const querySnapshot = await getDoc(collectionRef);

    if (querySnapshot.exists()) {
      const ratings = querySnapshot.data().ratings || [];

      return res.status(200).json(ratings);
    }

    return res.status(200).json([]);
  } catch {
    return res.status(500).end();
  }
}
