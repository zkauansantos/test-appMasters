import { useContext, useState } from "react";

import { parseCookies } from "nookies";

import { AuthContext } from "@/contexts/AuthContext";

import useFilteredGames from "@/hooks/useFilteredGames";
import { Game } from "@/services/useLoadGames";
import useFavoritedGames from "@/services/useFavoritesGames";
import sortGamesByRating from "@/utils/sortGamesByRating";

import Filters from "@/components/Filters";
import EmptySearch from "@/components/EmptySearch";
import GameCard from "@/components/GameCard";
import EmptyFavorites from "@/components/EmptyFavorites";
import DontAuthenticated from "@/components/DontAuthenticated";

import * as S from "@/styles/shared/Gridcards";

export default function Favorites() {
  const { "user-id": userId } = parseCookies();
  const { isAuthenticated } = useContext(AuthContext);
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
        {!!isAuthenticated && <h1>Seus games favoritos</h1>}
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

        {!isLoading && !!isAuthenticated && (
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

        {!isAuthenticated && <DontAuthenticated />}
      </S.Content>
    </S.Container>
  );
}
