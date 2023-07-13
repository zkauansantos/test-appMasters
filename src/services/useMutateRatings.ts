import { useMutation } from "@tanstack/react-query";
import { Game } from "./useLoadGames";
import axios from "axios";
import { queryClient } from "@/lib/queryClient";
import { toast } from "react-toastify";

async function addRating(userId: string, gameId: Game["id"], rate: number) {
  try {
    await axios.post(`/api/user/rating/${userId}/rate`, { gameId, rate });
    toast.success("Game avaliado com suceso!");
  } catch (error) {
    toast.error("Ops! Ocorreu um erro ao avaliar seu game!");
  }
}

async function updateRating(
  userId: string,
  gameId: Game["id"],
  newRate: number
) {
  try {
    await axios.put(`/api/user/rating/${userId}/update`, {
      gameId,
      newRate,
    });
    toast.success("Avaliação alterada com sucesso!");
  } catch {
    toast.error("Ops! Ocorreu um erro ao editar sua avaliação!");
  }
}

async function removeRating(userId: string, gameId: Game["id"]) {
  try {
    await axios.delete(`/api/user/rating/${userId}/delete`, {
      headers: {
        "game-id": gameId,
      },
    });
    toast.success("Avaliação removida com sucesso!");
  } catch (err) {
    toast.error("Ops ocorreu um erro ao remover sua avaliação!");
  }
}

export default function useMutateRatings() {
  return useMutation(
    async (data: {
      userId: string;
      gameId: Game["id"];
      rate?: number;
      toRemove?: boolean;
      toUpdate?: boolean;
    }) => {
      if (data.toRemove) {
        return removeRating(data.userId, data.gameId);
      }

      if (data.toUpdate) {
        return updateRating(data.userId, data.gameId, data.rate!);
      }

      return addRating(data.userId, data.gameId, data.rate!);
    },
    {
      onSuccess: () => {
        queryClient.refetchQueries(["games-data"]);
      },
    }
  );
}
