import axios, { AxiosError } from "axios";

export const api = axios.create({
  baseURL: "https://games-test-api-81e9fb0d564a.herokuapp.com/api",
  headers: {
    "dev-email-address": process.env.DEV_EMAIL,
  },
  timeout: 5000,
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const status = error.response ? error.response.status : null;

    if (error.code === "ECONNABORTED") {
      throw new AxiosError(
        "O servidor demorou para responder, tente mais tarde.",
        status
      );
    }

    if ([500, 502, 503, 504, 507, 508, 509].includes(status)) {
      throw new AxiosError(
        "O servidor falhou em responder, tente recarregar a página.",
        "serverError"
      );
    }

    throw new AxiosError(
      "O servidor não conseguirá responder por agora, tente voltar novamente mais tarde.",
      status
    );
  }
);
