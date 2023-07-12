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

export default function Favorites() {
  const { "user-id": userId } = parseCookies();

  const { data, isLoading } = useFavoritedGames(userId);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const filteredFavoritedGames = useFilteredGames(
    data?.favoritedGames,
    selectedGenre,
    searchTerm
  );

  return (
    <S.Container>
      <S.Content>
        <h1>Seus games favoritos</h1>
        {!isLoading && (
          <Filters
            genres={data?.genresFavoritedGames || []}
            setSelectedGenre={setSelectedGenre}
            isRefetching={false}
            setSearchTerm={setSearchTerm}
          />
        )}

        {isLoading && <Loader size="12rem" />}

        {!isLoading && (
          <S.GridCards>
            {filteredFavoritedGames.map((game: Game) => (
              <GameCard key={game.id} game={game} />
            ))}

            {filteredFavoritedGames.length < 1 && searchTerm && (
              <EmptySearch searchTerm={searchTerm} />
            )}
          </S.GridCards>
        )}
      </S.Content>
    </S.Container>
  );
}
