import { useEffect, useState } from "react";
import { Heart } from "./styles";

import { BsHeartFill, BsHeart } from "react-icons/bs";
import { Game } from "@/services/useLoadGames";

import {
  arrayRemove,
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";

import { database } from "@/firebase/firebase";
import { parseCookies } from "nookies";
import axios from "axios";
import useMutateFavoritesGames from "@/services/useMutateFavoritesGames";

interface FavoriteProps {
  game: Game;
  onModalIsVisible: () => void;
}

export default function Favorite({ game, onModalIsVisible }: FavoriteProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [hover, setHover] = useState(false);
  const { "user-id": userId } = parseCookies();
  const addGameMutate = useMutateFavoritesGames(userId);

  async function handleToggleGameAsFavorite(game: Game) {
    if (!userId) {
      onModalIsVisible();
      return;
    }

    if (isFavorite) {
      setIsFavorite(false);
      await deleteDoc(doc(database, "favorites", userId));

      return;
    }

    setIsFavorite(true);
    addGameMutate.mutateAsync({ userId, game });
  }

  return (
    <Heart
      onClick={() => handleToggleGameAsFavorite(game)}
      onMouseEnter={() => {
        setHover(true);
      }}
      onMouseLeave={() => {
        setHover(false);
      }}
    >
      {isFavorite || hover ? (
        <BsHeartFill color="red" size={20} />
      ) : (
        <BsHeart color="red" size={20} />
      )}
    </Heart>
  );
}
