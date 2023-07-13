import Head from "next/head";
import { useEffect, useState } from "react";

import { parseCookies } from "nookies";
import { queryClient } from "@/lib/queryClient";

import useLoadGames, { Game } from "@/services/useLoadGames";

import EmptySearch from "@/components/EmptySearch";
import Pagination from "@/components/Pagination";
import Filters from "@/components/Filters";
import Loader from "@/components/Loader";
import ErrorFeedback from "@/components/ErrorFeedback";
import GameCard from "@/components/GameCard";

import useFilteredGames from "@/hooks/useFilteredGames";
import sortGamesByRating from "@/utils/sortGamesByRating";

import * as S from "@/styles/shared/Gridcards";

export default function Home() {
  const [currentPage, setCurrentPage] = useState(1);
  const { "user-id": userId } = parseCookies();
  const { data, refetch, isLoading, isRefetching } = useLoadGames(
    currentPage,
    userId
  );

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState<string>("");
  const [sortOrderByRating, setSortOrderByRating] = useState<"asc" | "desc">(
    "desc"
  );

  const filteredGames = useFilteredGames(
    data?.games,
    selectedGenre,
    searchTerm
  );

  const sortedGames = sortGamesByRating(sortOrderByRating, filteredGames);

  function handleRetry() {
    refetch();
  }

  useEffect(() => {
    queryClient.invalidateQueries(["games-data"]);
  }, [sortOrderByRating]);

  const hasGames = !!data?.games;
  const hasError = !!data?.error;

  const showPagination =
    !hasError && !isLoading && !searchTerm && !selectedGenre;

  const isSearchEmpty =
    !hasError && hasGames && !isLoading && filteredGames.length < 1;

  return (
    <>
      <Head>
        <title>App Masters | Teste </title>
      </Head>

      <S.Container>
        <S.Content>
          <h1>Games</h1>

          {!hasError && !isLoading && (
            <Filters
              order={sortOrderByRating}
              onOrderByRating={() =>
                setSortOrderByRating((prev) =>
                  prev === "asc" ? "desc" : "asc"
                )
              }
              genres={data?.genres}
              setSelectedGenre={setSelectedGenre}
              isRefetching={isRefetching}
              setSearchTerm={setSearchTerm}
            />
          )}

          {showPagination && (
            <Pagination
              currentPage={currentPage}
              totalCountOfRegisters={data?.totalCount}
              onPageChange={setCurrentPage}
            />
          )}

          {isLoading && <Loader size="12rem" />}

          {!isLoading && hasError && (
            <ErrorFeedback
              onRetry={handleRetry}
              isRefetching={isRefetching}
              error={data?.error}
            />
          )}

          {!isLoading && !hasError && (
            <S.GridCards>
              {sortedGames.map((game: Game) => (
                <GameCard key={game.id} game={game} />
              ))}

              {isSearchEmpty && <EmptySearch searchTerm={searchTerm} />}
            </S.GridCards>
          )}
        </S.Content>
      </S.Container>
    </>
  );
}
