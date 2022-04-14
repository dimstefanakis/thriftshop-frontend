import { useQuery } from "react-query";

// COPILOT

function useGetTwitterTokens() {
  const { status, data, error, refetch } = useQuery(
    "getTwitterTokens",
    () => {
      return fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/get_twitter_tokens/`)
        .then((res) => res.json())
        .then((res) => res);
    },
    {
      enabled: false,
      refetchOnWindowFocus: false,
    }
  );

  return {
    status,
    data,
    error,
    refetch,
  };
}

export default useGetTwitterTokens;
