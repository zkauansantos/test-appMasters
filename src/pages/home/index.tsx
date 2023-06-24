import Head from "next/head";
import Image from "next/image";
import { useMemo, useState } from "react";

import useLoadGames, { Game } from "@/services/useLoadGames";

import EmptySearch from "@/components/EmptySearch";
import Pagination from "@/components/Pagination";
import Filters from "@/components/Filters";
import Loader from "@/components/Loader";
import ErrorFeedback from "@/components/ErrorFeedback";
import Button from "@/components/Button";

import { Container, Content, GameCard, GridCards } from "./styles";
import useFilteredGames from "@/hooks/useFilteredGames";

export default function Home() {
  const [currentPage, setCurrentPage] = useState(1);
  const { data, refetch, isLoading, isRefetching } = useLoadGames(currentPage);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState<string>("");

  const filteredGames = useFilteredGames(
    data?.games,
    selectedGenre,
    searchTerm
  );

  function handleRetry() {
    refetch();
  }

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

      <Container>
        <Content>
          <h1>Veja as melhores opções de jogos de 2023</h1>

          {!hasError && !isLoading && (
            <Filters
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
            <GridCards>
              {filteredGames.map((game: Game) => (
                <GameCard key={game.id}>
                  <div className="title">
                    <strong>{game.title}</strong>
                    <span>{game.genre}</span>
                  </div>

                  <Image src={game.thumbnail} alt="" width={300} height={170} />

                  <p>{game.short_description}</p>

                  <Button openBlank linkTo={game.game_url}>
                    Quero jogar!
                  </Button>
                </GameCard>
              ))}
              {isSearchEmpty && <EmptySearch searchTerm={searchTerm} />}
            </GridCards>
          )}
        </Content>
      </Container>
    </>
  );
}
