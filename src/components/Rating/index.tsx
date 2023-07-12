import { useState } from "react";
import { RatingContainer } from "./styles";

import { BsStar, BsStarFill } from "react-icons/bs";
import { parseCookies } from "nookies";
import { Game } from "@/services/useLoadGames";
import axios from "axios";

interface RatingProps {
  onModalIsVisible: () => void;
  game: Game;
}

export default function Rating({ onModalIsVisible, game }: RatingProps) {
  const [currentRating, setCurrentRating] = useState<number>(0);
  const [hover, setHover] = useState(0);
  const { "user-id": userId } = parseCookies();

  const stars: number[] = Array.from(Array(5).keys());

  async function handleToggleGameAsFavorite(index: number, game: Game) {
    if (!userId) {
      onModalIsVisible();
      return;
    }

    if (currentRating === index) {
      setCurrentRating(0);

      //remove rating
      return;
    }

    // rate
  }

  return (
    <RatingContainer>
      {stars.map((index) => (
        <button
          key={`${Math.random()}-${index}`}
          onClick={() => {
            setCurrentRating(index + 1);
            handleToggleGameAsFavorite(index + 1, game);
          }}
          onMouseEnter={() => {
            setHover(index + 1);
          }}
          onMouseLeave={() => {
            setHover(0);
          }}
        >
          {index + 1 <= currentRating || index + 1 <= hover ? (
            <BsStarFill color="orange" size={18} />
          ) : (
            <BsStar color="orange" size={18} />
          )}
        </button>
      ))}
    </RatingContainer>
  );
}
