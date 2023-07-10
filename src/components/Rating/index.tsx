import { useState } from "react";
import { RatingContainer } from "./styles";

import { BsStar, BsStarFill } from "react-icons/bs";

export default function Rating() {
  const [currentRating, setCurrentRating] = useState<number>(-1);
  const [hover, setHover] = useState(-1);

  const stars: number[] = Array.from(Array(5).keys());

  return (
    <RatingContainer>
      {stars.map((index) => (
        <button
          key={`${Math.random()}-${index}`}
          onClick={() =>
            setCurrentRating((prev) => (prev === index ? -1 : index))
          }
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
