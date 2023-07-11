import { useEffect, useState } from "react";
import { Heart } from "./styles";

import { BsHeartFill, BsHeart } from "react-icons/bs";
import { Game } from "@/services/useLoadGames";

import {
  arrayRemove,
  arrayUnion,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";

import { database } from "@/firebase/firebase";
import { parseCookies } from "nookies";

interface FavoriteProps {
  game: Game;
  onModalIsVisible: () => void;
}

export default function Favorite({ game, onModalIsVisible }: FavoriteProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [hover, setHover] = useState(false);
  const { "user-id": userId } = parseCookies();

  useEffect(() => {
    async function loadDatabaseData() {
      if (userId) {
        const collectionRef = doc(database, "users", userId);
        const collectionSnapshot = await getDoc(collectionRef);
        const lastFavorites = collectionSnapshot.data();

        if (lastFavorites) {
          lastFavorites.favorites.forEach((gameFavorited: Game) => {
            if (gameFavorited.id === game.id) {
              setIsFavorite(true);
            }
          });
        }
      }
    }

    loadDatabaseData();
  }, [userId, game.id]);

  async function handleToggleGameAsFavorite(game: Game) {
    if (!userId) {
      onModalIsVisible();
      return;
    }

    if (isFavorite) {
      setIsFavorite(false);

      const collectionRef = doc(database, "users", userId);

      await updateDoc(collectionRef, {
        favorites: arrayRemove(game),
      });

      return;
    }

    setIsFavorite(true);
    const collectionRef = doc(database, "users", userId);

    await updateDoc(collectionRef, {
      favorites: arrayUnion(game),
    });
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
