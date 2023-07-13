import { Game } from "@/services/useLoadGames";

export default function sortGamesByRating(
  sortOrder: "asc" | "desc",
  games: Game[]
): Game[] {
  const compareByRating = (a: Game, b: Game) => {
    if (a.rate === null && b.rate === null) {
      return 0;
    }
    if (a.rate === null) {
      return sortOrder === "desc" ? 1 : -1;
    }
    if (b.rate === null) {
      return sortOrder === "desc" ? -1 : 1;
    }
    return sortOrder === "desc" ? b.rate - a.rate : a.rate - b.rate;
  };

  return [...games].sort(compareByRating);
}
