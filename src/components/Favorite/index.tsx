import { useState } from "react";
import { Heart } from "./styles";

import { BsHeartFill, BsHeart } from "react-icons/bs";

export default function Favorite() {
  const [isFavorite, setIsFavorite] = useState(false);
  const [hover, setHover] = useState(false);

  return (
    <Heart
      onClick={() => setIsFavorite((prev) => !prev)}
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
