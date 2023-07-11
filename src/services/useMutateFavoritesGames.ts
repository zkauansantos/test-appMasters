import { useMutation } from "react-query";
import { Game } from "./useLoadGames";
import axios from "axios";
import { queryClient } from "@/lib/queryClient";

async function addGameAsFavorite(userId: string, game: Game): Promise<any> {
  try {
    await axios.post(`/api/user/favorites/${userId}/to-add`, { game });
  } catch (error) {}
}

export default function useMutateFavoritesGames(userId: string) {
  return useMutation(
    async (data: { userId: string; game: Game }) =>
      addGameAsFavorite(data.userId, data.game),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["favorited-games", userId]);
      },
    }
  );
}
