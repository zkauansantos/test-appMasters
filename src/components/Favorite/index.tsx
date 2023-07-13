import { useEffect, useState } from "react";
import { parseCookies } from "nookies";

import { BsHeartFill, BsHeart } from "react-icons/bs";

import { Game } from "@/services/useLoadGames";
import useMutateFavoritesGames from "@/services/useMutateFavoritesGames";

import { Heart } from "./styles";
import axios from "axios";

interface FavoriteProps {
  game: Game;
  isGameFavorite: boolean;
  onModalIsVisible: () => void;
}

export default function Favorite({
  game,
  isGameFavorite,
  onModalIsVisible,
}: FavoriteProps) {
  const [isFavorite, setIsFavorite] = useState(isGameFavorite);
  const [hover, setHover] = useState(false);
  const { "user-id": userId } = parseCookies();
  const gameMutate = useMutateFavoritesGames();

  useEffect(() => {
    setIsFavorite(isGameFavorite);
  }, [isGameFavorite]);

  async function handleToggleGameAsFavorite(game: Game) {
    if (!userId) {
      onModalIsVisible();
      return;
    }

    if (isFavorite) {
      //remove
      await gameMutate.mutateAsync({ game, userId });

      setHover(false);
      setIsFavorite(false);
      return;
    }

    //add

    gameMutate.mutateAsync({
      userId,
      game: { ...game, favorite: true },
      toAdd: true,
    });
    setIsFavorite(true);
  }

  useEffect(() => {
    setIsFavorite(isFavorite);
  }, [isFavorite]);

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
      {isFavorite || hover || isGameFavorite ? (
        <BsHeartFill color="red" size={20} />
      ) : (
        <BsHeart color="red" size={20} />
      )}
    </Heart>
  );
}
