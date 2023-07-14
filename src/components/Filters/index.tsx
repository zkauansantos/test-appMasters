import { useContext } from "react";
import { AuthContext } from "@/contexts/AuthContext";

import { BsArrowDown, BsArrowUp } from "react-icons/bs";

import Button from "../Button";
import Loader from "../Loader";

import { FiltersContainer } from "./styles";

interface FiltersProps {
  setSearchTerm: (searchTerm: string) => void;
  setSelectedGenre: (selectedGenre: string) => void;
  onOrderByRating: () => void;
  isRefetching: boolean;
  genres: string[];
  order: "asc" | "desc";
}

export default function Filters({
  isRefetching,
  genres,
  order,
  setSearchTerm,
  setSelectedGenre,
  onOrderByRating,
}: FiltersProps) {
  const { isAuthenticated } = useContext(AuthContext);

  function renderGenres() {
    return genres.map((genre, i) => (
      <option key={`${genre} - ${i}`} value={genre}>
        {genre}
      </option>
    ));
  }

  return (
    <FiltersContainer>
      <input
        maxLength={50}
        type="text"
        placeholder="Busque pelo jogo que procura"
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {!!isAuthenticated && (
        <div className="order-fetching">
          {isRefetching && <Loader size="2rem" />}
          <Button onClick={onOrderByRating}>
            {order === "asc" && <BsArrowUp />}
            {order === "desc" && <BsArrowDown />}
          </Button>
        </div>
      )}

      <select
        defaultValue=""
        onChange={(e) => setSelectedGenre(e.target.value)}
      >
        <option value="" disabled>
          Filtre por gênero
        </option>

        <option value="">Todos</option>
        {renderGenres()}
      </select>
    </FiltersContainer>
  );
}
