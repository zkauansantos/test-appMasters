import { useState } from "react";
import { RatingContainer } from "./styles";

import { BsStar, BsStarFill } from "react-icons/bs";
import { parseCookies } from "nookies";
import { Game } from "@/services/useLoadGames";

interface RatingProps {
  onModalIsVisible: () => void;
  game: Game;
}

export default function Rating({ onModalIsVisible, game }: RatingProps) {
  const [currentRating, setCurrentRating] = useState<number>(-1);
  const [hover, setHover] = useState(-1);
  const { "user-id": userId } = parseCookies();

  const stars: number[] = Array.from(Array(5).keys());

  async function handleToggleGameAsFavorite(index: number, game: Game) {
    if (!userId) {
      onModalIsVisible();
      return;
    }

    setCurrentRating((prev) => (prev === index ? -1 : index));
  }

  return (
    <RatingContainer>
      {stars.map((index) => (
        <button
          key={`${Math.random()}-${index}`}
          onClick={() => handleToggleGameAsFavorite(index, game)}
          onMouseEnter={() => {
            setHover(index);
          }}
          onMouseLeave={() => {
            setHover(-1);
          }}
        >
          {index <= currentRating || index <= hover ? (
            <BsStarFill color="orange" size={18} />
          ) : (
            <BsStar color="orange" size={18} />
          )}
        </button>
      ))}
    </RatingContainer>
  );
}
