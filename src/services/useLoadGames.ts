import { api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

export interface Game {
  id: number;
  title: string;
  thumbnail: string;
  short_description: string;
  game_url: string;
  genre: string;
  rate: null | number;
}

export async function loadGames(page: number) {
  try {
    const { data } = await api.get("/data");

    const gamesPerPage = data.slice((page - 1) * 9, page * 9);
    const genres = gamesPerPage
      .map((game: Game) => game.genre)
      .filter(
        (genre: string, index: number, arrGenres: string[]) =>
          arrGenres.indexOf(genre) === index
      );
    const totalCount = data.length;

    return {
      games: gamesPerPage.map((game: Game) => ({ ...game, rate: null })),
      totalCount,
      genres,
    };
  } catch (error: any) {
    return {
      error,
    };
  }
}

export default function useLoadGames(page: number) {
  return useQuery({
    queryFn: () => loadGames(page),
    queryKey: ["games-data", page],
    retry: false,
    staleTime: 600 * 1000, //10min
  });
}
