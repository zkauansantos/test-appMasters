import axios from "axios";
import { useQuery } from "react-query";
import { Game } from "./useLoadGames";

export async function loadFavoritedGames(userId: string) {
  if (!userId) {
    return;
  }

  try {
    const { data: favoritedGames } = await axios.get(
      `/api/user/favorites/${userId}/list`
    );

    return {
      favoritedGames,
      genresFavoritedGames: favoritedGames.map(
        (gameFav: Game) => gameFav.genre
      ),
    };
  } catch (error: any) {
    return {
      error,
    };
  }
}

export default function useFavoritedGames(userId: string) {
  return useQuery({
    queryFn: () => loadFavoritedGames(userId),
    queryKey: ["favorited-games", userId],
    retry: false,
    staleTime: 600 * 1000, //10min
  });
}
