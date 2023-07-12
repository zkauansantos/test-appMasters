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
  const [gameWasFavorited, setGameWasFavorited] = useState(false);
  const [lastRateSaved, setLastRateSaved] = useState(-1);

  useEffect(() => {
    const gameFavoriteIsSaveOnDabase = data?.favoritedGames.some(
      (gameFav: Game) => gameFav.id === game.id
    );

    if (userId && gameFavoriteIsSaveOnDabase) {
      setGameWasFavorited(true);
      return;
    }

    setGameWasFavorited(false);
  }, [userId, data?.favoritedGames, game.id]);

  useEffect(() => {
    
  }, []);

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
            onRemoveGameFavorite={() => setGameWasFavorited(false)}
            onModalIsVisible={() => setModalIsVisible(true)}
            game={game}
            isGameFavorite={gameWasFavorited}
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
