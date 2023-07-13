import { useState } from "react";
import { RatingContainer } from "./styles";

import { BsStar, BsStarFill } from "react-icons/bs";
import { parseCookies } from "nookies";
import { Game } from "@/services/useLoadGames";
import axios from "axios";

interface RatingProps {
  onModalIsVisible: () => void;
  game: Game;
  lastRating: number;
}

export default function Rating({
  onModalIsVisible,
  game,
  lastRating,
}: RatingProps) {
  const [currentRating, setCurrentRating] = useState<number>(lastRating);
  const [hover, setHover] = useState(0);
  const { "user-id": userId } = parseCookies();

  const stars: number[] = Array.from(Array(5).keys());

  async function handleRating(index: number, game: Game) {
    if (!userId) {
      onModalIsVisible();
      return;
    }

    if (currentRating === index) {
      await axios.delete(`/api/user/rating/${userId}/delete`, {
        headers: {
          "game-id": game.id,
        },
      });

      setCurrentRating(0);
      return;
    }

    const ratingsSaveds = await axios.get(`/api/user/rating/${userId}/list`);
    const currentRateDiferentRatingSaved = ratingsSaveds.data.some(
      (rating: any) => {
        return rating.rate !== index;
      }
    );

    if (currentRateDiferentRatingSaved) {
      return await axios.put(`/api/user/rating/${userId}/update`, {
        gameId: game.id,
        newRate: index,
      });
    }

    return await axios.post(`/api/user/rating/${userId}/rate`, {
      gameId: game.id,
      rate: index,
    });
  }

  return (
    <RatingContainer>
      {stars.map((index) => (
        <button
          key={`${Math.random()}-${index}`}
          onClick={() => {
            handleRating(index + 1, game);
            setCurrentRating(index + 1);
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
