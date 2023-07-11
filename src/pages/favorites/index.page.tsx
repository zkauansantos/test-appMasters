import Image from "next/image";
import React, { useEffect, useState } from "react";

import { parseCookies } from "nookies";

import { doc, getDoc } from "firebase/firestore";
import { database } from "@/firebase/firebase";

import useFilteredGames from "@/hooks/useFilteredGames";
import { Game } from "@/services/useLoadGames";

import Filters from "@/components/Filters";
import Rating from "@/components/Rating";
import Favorite from "@/components/Favorite";
import Button from "@/components/Button";
import EmptySearch from "@/components/EmptySearch";
import Loader from "@/components/Loader";

import { Container, Content, GameCard, GridCards } from "./styles";

export default function Favorites() {
  const { "user-id": userId } = parseCookies();
  const [favoritesGames, setFavoriteGames] = useState<Game[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [gamesFavoritesGenres, setGamesFavoritesGenres] = useState<
    Game["genre"][]
  >([]);
  const [isLoading, setIsLoading] = useState(false);

  const filteredFavoritedGames = useFilteredGames(
    favoritesGames,
    selectedGenre,
    searchTerm
  );

  useEffect(() => {
    async function loadDatabaseData() {
      setIsLoading(true);
      if (userId) {
        const collectionRef = doc(database, "users", userId);
        const collectionSnapshot = await getDoc(collectionRef);
        const gamesFavoriteds = collectionSnapshot.data()?.favorites || [];
        const gamesFavoritedsGenres = gamesFavoriteds
          ? gamesFavoriteds.map((game: Game) => game.genre)
          : [];

        setFavoriteGames([...gamesFavoriteds]);
        setGamesFavoritesGenres([...gamesFavoritedsGenres]);
      }
      setIsLoading(false);
    }

    loadDatabaseData();
  }, [userId]);

  return (
    <Container>
      <Content>
        <h1>Seus games favoritos</h1>
        {!isLoading && (
          <Filters
            genres={gamesFavoritesGenres}
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
                  <Rating />

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
