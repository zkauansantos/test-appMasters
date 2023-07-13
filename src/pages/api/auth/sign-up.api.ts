import { NextApiRequest, NextApiResponse } from "next";
import { setCookie } from "nookies";

import { auth, database } from "@/firebase/firebase";
import {
  createUserWithEmailAndPassword,
  fetchSignInMethodsForEmail,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  const { name, email, password } = req.body;

  if (!name) {
    return res.status(400).json({
      error: "Name not provided.",
    });
  }

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

  const userAlreadyExists = await fetchSignInMethodsForEmail(auth, email);

  if (userAlreadyExists.length > 0) {
    return res.status(409).json({
      error: "E-mail already taken.",
    });
  }

  try {
    const userCredentials = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    await setDoc(doc(database, "users", userCredentials.user.uid), {
      name: name,
      avatarUrl: null,
      email,
    });

    setCookie({ res }, "user-id", userCredentials.user.uid, {
      maxAge: 60 * 60 * 24 * 7, // 7days
      path: "/",
    });

    setCookie({ res }, "user-name", name, {
      maxAge: 60 * 60 * 24 * 7, // 7days
      path: "/",
    });

    setCookie({ res }, "user-email", email, {
      maxAge: 60 * 60 * 24 * 7, // 7days
      path: "/",
    });

    const user = {
      id: userCredentials.user.uid,
      name,
      email,
      photoUrl: null,
    };

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).end();
  }
}
