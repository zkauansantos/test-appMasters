import { useState } from "react";
import { RatingContainer } from "./styles";

import { BsStar, BsStarFill } from "react-icons/bs";
import { parseCookies } from "nookies";
import { Game } from "@/services/useLoadGames";
import axios from "axios";
import useMutateRatings from "@/services/useMutateRatings";

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
  const stars: number[] = Array.from(Array(5).keys());
  const { "user-id": userId } = parseCookies();
  const [currentRating, setCurrentRating] = useState<number>(lastRating);
  const [hover, setHover] = useState(0);
  const ratingMutate = useMutateRatings();

  async function handleRating(index: number, game: Game) {
    if (!userId) {
      onModalIsVisible();
      return;
    }

    if (currentRating === index) {
      // delete rating
      setCurrentRating(0);
      ratingMutate.mutateAsync({ gameId: game.id, userId, toRemove: true });
      return;
    }

    const ratingsSaveds = await axios.get(`/api/user/rating/${userId}/list`);
    const currentRateDiferentRatingSaved = ratingsSaveds.data.some(
      (rating: { rate: number; gameId: number }) => {
        return rating.rate !== index && rating.gameId === game.id;
      }
    );

    if (currentRateDiferentRatingSaved) {
      // update rating
      ratingMutate.mutateAsync({
        gameId: game.id,
        userId,
        rate: index,
        toUpdate: true,
      });
      return;
    }

    // add rating
    ratingMutate.mutateAsync({ gameId: game.id, userId, rate: index });
  }

  return (
    <RatingContainer>
      {stars.map((index) => (
        <button
          key={`${Math.random()}-${index}`}
          onClick={() => {
            setCurrentRating(index + 1);
            handleRating(index + 1, game);
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
