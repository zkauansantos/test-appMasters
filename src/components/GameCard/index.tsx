import Image from "next/image";

import { Game } from "@/services/useLoadGames";

import Rating from "../Rating";
import Favorite from "../Favorite";
import Button from "../Button";

import { GameCardContainer } from "./styles";
import { useEffect, useState } from "react";
import Modal from "../Modal";
import useFavoritedGames from "@/services/useFavoritesGames";
import { parseCookies } from "nookies";

interface GameCardProps {
  game: Game;
}

export default function GameCard({ game }: GameCardProps) {
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const { "user-id": userId } = parseCookies();
  const { data } = useFavoritedGames(userId);
  const [gameFavorited, setGameFavorited] = useState(false);

  useEffect(() => {
    if (
      userId &&
      data?.favoritedGames.some((gameFav: any) => gameFav.id === game.id)
    ) {
      setGameFavorited(true);
      return;
    }

    setGameFavorited(false);
  }, [userId, data?.favoritedGames, game.id]);

  return (
    <>
      <GameCardContainer>
        <Image src={game.thumbnail} alt="photo-game" width={300} height={170} />

        <div className="title">
          <strong>{game.title}</strong>
          <span>{game.genre}</span>
        </div>

        <div className="interactions">
          <Rating
            onModalIsVisible={() => setModalIsVisible(true)}
            game={game}
          />

          <Favorite
            onRemoveGameFavorite={() => setGameFavorited(false)}
            onModalIsVisible={() => setModalIsVisible(true)}
            game={game}
            isGameFavorite={gameFavorited}
          />
        </div>

        <p>{game.short_description}</p>

        <Button openBlank linkTo={game.game_url}>
          Quero jogar!
        </Button>
      </GameCardContainer>
      <Modal onToggleVisible={setModalIsVisible} isVisible={modalIsVisible} />
    </>
  );
}
