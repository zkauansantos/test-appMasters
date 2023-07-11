import Image from "next/image";
import { useState } from "react";

import { parseCookies } from "nookies";

import useFilteredGames from "@/hooks/useFilteredGames";
import { Game } from "@/services/useLoadGames";

import Filters from "@/components/Filters";
import Rating from "@/components/Rating";
import Favorite from "@/components/Favorite";
import Button from "@/components/Button";
import EmptySearch from "@/components/EmptySearch";
import Loader from "@/components/Loader";

import { Container, Content, GameCard, GridCards } from "./styles";
import useFavoritedGames from "@/services/useFavoritesGames";

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
    <Container>
      <Content>
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
          <GridCards>
            {filteredFavoritedGames.map((game: Game) => (
              <GameCard key={game.id}>
                <Image
                  src={game.thumbnail}
                  alt="photo-game"
                  width={300}
                  height={170}
                />

                <div className="title">
                  <strong>{game.title}</strong>
                  <span>{game.genre}</span>
                </div>

                <div className="interactions">
                  <Rating onModalIsVisible={() => true} game={game} />

                  <Favorite onModalIsVisible={() => true} game={game} />
                </div>

                <p>{game.short_description}</p>

                <Button openBlank linkTo={game.game_url}>
                  Quero jogar!
                </Button>
              </GameCard>
            ))}

            {filteredFavoritedGames.length < 1 && searchTerm && (
              <EmptySearch searchTerm={searchTerm} />
            )}
          </GridCards>
        )}
      </Content>
    </Container>
  );
}
