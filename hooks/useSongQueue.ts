import useSWR from "swr";

const useSongQueue = () => {
  const { data, error } = useSWR(
    "allSongs",
    async () => {
      const res = await fetch("/api/queue/all");
      return await res.json();
    },
    {
      refreshInterval: 2000,
    }
  );

  return {
    data,
    error,
  };
};

export default useSongQueue;
