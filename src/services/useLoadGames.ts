import axios from "axios";
import { useQuery } from "react-query";

export default function useLoadGames() {
  async function loadPosts(): Promise<any> {
    const response = await axios.get(
      "https://games-test-api-81e9fb0d564a.herokuapp.com/api/data",
      {
        headers: {
          "dev-email-address": process.env.DEV_EMAIL,
        },
      }
    );

    console.log(response.status);
    console.log(response);

    return response.data;
  }

  return useQuery({
    queryFn: () => loadPosts(),
    queryKey: ["games-data"],
    retry: false,
  });
}
