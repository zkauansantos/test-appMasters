import { Game } from "@/services/useLoadGames";
import { useMemo } from "react";

const useFilteredGames = (
  games: Game[] | undefined,
  selectedGenre: string | null,
  searchTerm: string
): Game[] => {
  const filteredGames = useMemo(() => {
    if (selectedGenre && searchTerm) {
      return games?.filter(
        (game: Game) =>
          game.genre.toLowerCase().includes(selectedGenre.toLowerCase()) &&
          game.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedGenre) {
      return games?.filter((game: Game) =>
        game.genre.toLowerCase().includes(selectedGenre.toLowerCase())
      );
    }

    return games?.filter((game: Game) =>
      game.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [games, searchTerm, selectedGenre]);

  return filteredGames || [];
};

export default useFilteredGames;
