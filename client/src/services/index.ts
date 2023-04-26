import { axiosInstance } from "@utils/fetcher";

type CreateSession = {
    username: string;
    password: string;
}

export function createSession({username, password}: CreateSession) {
  return axiosInstance.post("/session", {
    username: username,
    password: password,
  });
}