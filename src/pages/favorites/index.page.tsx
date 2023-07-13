import { useState } from "react";

import { parseCookies } from "nookies";

import useFilteredGames from "@/hooks/useFilteredGames";
import { Game } from "@/services/useLoadGames";
import useFavoritedGames from "@/services/useFavoritesGames";

import Filters from "@/components/Filters";
import EmptySearch from "@/components/EmptySearch";
import Loader from "@/components/Loader";
import GameCard from "@/components/GameCard";

import * as S from "@/styles/shared/Gridcards";
import EmptyFavorites from "@/components/EmptyFavorites";
import sortGamesByRating from "@/utils/sortGamesByRating";

export default function Favorites() {
  const { "user-id": userId } = parseCookies();

  const { data, isLoading } = useFavoritedGames(userId);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [sortOrderByRating, setSortOrderByRating] = useState<"asc" | "desc">(
    "desc"
  );

  const filteredFavoritedGames = useFilteredGames(
    data?.favoritedGames,
    selectedGenre,
    searchTerm
  );

  const sortedGames = sortGamesByRating(
    sortOrderByRating,
    filteredFavoritedGames
  );

  const hasFavorites = data?.favoritedGames.length > 0;

  return (
    <S.Container>
      <S.Content>
        <h1>Seus games favoritos</h1>
        {!isLoading && !!hasFavorites && (
          <Filters
            order={sortOrderByRating}
            onOrderByRating={() =>
              setSortOrderByRating((prev) => (prev === "desc" ? "asc" : "desc"))
            }
            genres={data?.genresFavoritedGames || []}
            setSelectedGenre={setSelectedGenre}
            isRefetching={false}
            setSearchTerm={setSearchTerm}
          />
        )}

        {!isLoading && (
          <S.GridCards>
            {sortedGames.map((game: Game) => (
              <GameCard key={game.id} game={game} />
            ))}

            {sortedGames.length < 1 && searchTerm && (
              <EmptySearch searchTerm={searchTerm} />
            )}

            {!hasFavorites && <EmptyFavorites />}
          </S.GridCards>
        )}
      </S.Content>
    </S.Container>
  );
}
