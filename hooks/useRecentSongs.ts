import { selectUserId } from "./../features/user/userSlice";
import { useAppSelector } from "./useRedux";
import useSWR from "swr";

const useRecentSongs = () => {
  const userId = useAppSelector(selectUserId);
  const { data, error } = useSWR(userId ? "/api/recent-songs" : null, () =>
    fetch(`/api/recent/${userId}`).then((res) => res.json())
  );

  return {
    recentSongs: data,
    isLoading: !error && !data,
    error,
  };
};

export default useRecentSongs;
