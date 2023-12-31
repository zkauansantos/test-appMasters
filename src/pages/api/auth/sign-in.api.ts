import { NextApiRequest, NextApiResponse } from "next";
import { setCookie } from "nookies";

import { auth, database } from "@/firebase/firebase";
import { FirebaseError } from "firebase/app";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  const { email, password } = req.body;

  if (!email) {
    return res.status(400).json({
      error: "E-mail not provided.",
    });
  }

  if (!password) {
    return res.status(400).json({
      error: "Passowrd not provided.",
    });
  }

  try {
    const userCredentials = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const { uid, email: emailDatabase } = userCredentials.user;

    const userProfile = await getDoc(doc(database, "users", uid));

    const userLogged = {
      id: uid,
      name: userProfile.data()?.name,
      photoUrl: userProfile.data()?.photoUrl,
      email: emailDatabase,
    };

    return res.status(200).json(userLogged);
  } catch (error) {
    if (error instanceof FirebaseError) {
      if (error.code === "auth/wrong-password") {
        return res.status(401).json({
          error: "E-mail or passowrd wrong.",
        });
      }

      if (error.code === "auth/user-not-found") {
        return res.status(404).json({
          error: "User not found.",
        });
      }
    }

    return res.status(500).end();
  }
}
