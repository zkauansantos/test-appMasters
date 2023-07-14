import { useMutation } from "@tanstack/react-query";
import { Game } from "./useLoadGames";
import axios from "axios";
import { queryClient } from "@/lib/queryClient";
import { toast } from "react-toastify";

async function addGameAsFavorite(userId: string, game: Game) {
  try {
    await axios.post(`/api/user/favorites/${userId}/to-add`, { game });
    toast.success("Game adicionado aos favoritos!");
  } catch (error) {
    toast.success("Ops! Ocorreu um erro ao adicionar aos favoritos!");
  }
}

async function removeGameOfTheListFavorites(userId: string, game: Game) {
  try {
    await axios.delete(`/api/user/favorites/${userId}/delete`, {
      headers: {
        "game-id": game.id,
      },
    });
    toast.success("Game removido dos favoritos!");
  } catch (err) {
    toast.error("Erro ao remover o game dos favoritos!");
  }
}

export default function useMutateFavoritesGames() {
  return useMutation(
    async (data: { userId: string; game: Game; toAdd?: boolean }) => {
      if (data.toAdd) {
        return addGameAsFavorite(data.userId, data.game);
      }

      return removeGameOfTheListFavorites(data.userId, data.game);
    },
    {
      onSuccess: () => {
        queryClient.refetchQueries();
      },
    }
  );
}
