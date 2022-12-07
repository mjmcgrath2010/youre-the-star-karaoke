import useSWR from "swr";

const useSongQueue = () => {
  const { data, error } = useSWR(
    "allSongs",
    async () => {
      const res = await fetch("/api/queue/all");
      return await res.json();
    },
    {
      refreshInterval: 1000 * 20 * 30,
    }
  );

  return {
    data,
    error,
  };
};

export default useSongQueue;
