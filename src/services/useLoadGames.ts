import { api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export interface Game {
  id: number;
  title: string;
  thumbnail: string;
  short_description: string;
  game_url: string;
  genre: string;
  rate: null | number;
  favorite: boolean;
}

interface Rating {
  gameId: number;
  rate: number | null;
}

export async function loadGames(page: number, userId: string) {
  try {
    let userRatings: Rating[] = [];
    let gamesFavorites: Game[] = [];

    if (userId) {
      const [responseRatings, responseFavoritesIds] = await Promise.all([
        await axios.get(`/api/user/rating/${userId}/list`),
        await axios.get(`/api/user/favorites/${userId}/list`),
      ]);

      userRatings = responseRatings.data;
      gamesFavorites = responseFavoritesIds.data;
    }

    const { data } = await api.get("/data");

    const gamesPerPage = data.slice((page - 1) * 9, page * 9);
    const genres = gamesPerPage
      .map((game: Game) => game.genre)
      .filter(
        (genre: string, index: number, arrGenres: string[]) =>
          arrGenres.indexOf(genre) === index
      );
    const totalCount = data.length;

    const gamesWithRatingAndFavorite = gamesPerPage.map((game: Game) => {
      const rating = userRatings.find(
        (rating: Rating) => rating.gameId === game.id
      );
      const isFavorite = gamesFavorites.some(
        (gameFav: Game) => gameFav.id === game.id
      );

      return {
        ...game,
        rate: rating ? rating.rate : null,
        favorite: isFavorite,
      };
    });

    return {
      games: gamesWithRatingAndFavorite,
      totalCount,
      genres,
    };
  } catch (error: any) {
    return {
      error,
    };
  }
}

export default function useLoadGames(page: number, userId: string) {
  return useQuery({
    queryFn: () => loadGames(page, userId),
    queryKey: ["games-data", page],
    retry: false,
    staleTime: 600 * 1000, //10min
  });
}
