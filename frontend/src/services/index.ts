import { api, CancelToken } from "./api";

export function createSession() {
  const source = CancelToken.source();

  function apiCall({ email, password }: { email: string; password: string }) {
    return api.post(
      "/sessions",
      {
        email,
        password,
      },
      {
        cancelToken: source.token,
      }
    );
  }

  return { source, apiCall };
}

export function getUser() {
  const source = CancelToken.source();

  function apiCall() {
    return api.get("/me", {
      cancelToken: source.token,
    });
  }

  return { source, apiCall };
}
