import { Container, Content, GameCard, GridCards } from "./styles";

import Image from "next/image";
import useLoadGames from "@/services/useLoadGames";
import Loader from "@/components/Loader";
import { useState } from "react";

export default function Home() {
  const {
    data: games,
    isLoading,
    isLoadingError,
    error,
    isError,
  } = useLoadGames();

  const gamesDim = games?.slice(0, 9);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredGames = gamesDim?.filter((game: any) =>
    game.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  console.log(isLoadingError);

  return (
    <Container>
      <Content>
        <h1>Veja as melhores opções de jogos de 2023</h1>

        <div className="box-search">
          <input
            type="text"
            placeholder="Busque pelo jogo que procura"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <GridCards>
          {isLoading && <Loader />}

          {!isLoading &&
            filteredGames?.map((game: any) => (
              <GameCard key={game.id}>
                <strong>{game.title}</strong>

                <Image src={game.thumbnail} alt="" width={300} height={170} />

                <p>{game.short_description}</p>

                <p>{game.url}</p>

                <button type="button">Quero jogar!</button>
              </GameCard>
            ))}
        </GridCards>
      </Content>
    </Container>
  );
}
