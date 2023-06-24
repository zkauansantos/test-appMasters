import Loader from "../Loader";
import { FiltersContainer } from "./styles";

interface FiltersProps {
  setSearchTerm: (searchTerm: string) => void;
  setSelectedGenre: (selectedGenre: string) => void;
  isRefetching: boolean;
  genres: string[];
}

export default function Filters({
  isRefetching,
  setSearchTerm,
  setSelectedGenre,
  genres,
}: FiltersProps) {
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
      {isRefetching && <Loader size="2rem" />}

      <select defaultValue=""onChange={(e) => setSelectedGenre(e.target.value)}>
        <option value="" disabled>
          Filtre por gênero
        </option>

        <option value="">Todos</option>
        {renderGenres()}
      </select>
    </FiltersContainer>
  );
}
