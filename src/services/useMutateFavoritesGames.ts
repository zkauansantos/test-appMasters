import { useMutation } from "@tanstack/react-query";
import { Game } from "./useLoadGames";
import axios from "axios";
import { queryClient } from "@/lib/queryClient";

async function addGameAsFavorite(userId: string, game: Game) {
  try {
    await axios.post(`/api/user/favorites/${userId}/to-add`, { game });
  } catch (error) {
    console.log(error);
  }
}

async function removeGameOfTheListFavorites(userId: string, game: Game) {
  try {
    await axios.put(`/api/user/favorites/${userId}/update`, { game });
  } catch (err) {
    console.log(err);
  }
}

export default function useMutateFavoritesGames() {
  return useMutation(
    async (data: { userId: string; game: Game; toAdd?: boolean }) => {
      if (data.toAdd) {
        addGameAsFavorite(data.userId, data.game);
        return;
      }

      removeGameOfTheListFavorites(data.userId, data.game);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["favorited-games"]);
      },
    }
  );
}
