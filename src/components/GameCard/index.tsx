import Image from "next/image";
import { useState } from "react";

import { Game } from "@/services/useLoadGames";

import Rating from "../Rating";
import Favorite from "../Favorite";
import Button from "../Button";
import Modal from "../Modal";

import { GameCardContainer } from "./styles";

interface GameCardProps {
  game: Game;
}

export default function GameCard({ game }: GameCardProps) {
  const [modalIsVisible, setModalIsVisible] = useState(false);

  return (
    <>
      <GameCardContainer>
        <Image
          src={game.thumbnail}
          alt="photo-game"
          width={300}
          height={170}
          priority
        />

        <div className="title">
          <strong>{game.title}</strong>
          <span>{game.genre}</span>
        </div>

        <div className="interactions">
          <Rating
            lastRating={!!game.rate ? game.rate : 0}
            onModalIsVisible={() => setModalIsVisible(true)}
            game={game}
          />

          <Favorite
            onModalIsVisible={() => setModalIsVisible(true)}
            game={game}
            isGameFavorite={game.favorite}
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
