import { selectUserId } from "./../features/user/userSlice";
import { useAppSelector } from "./useRedux";
import useSWR from "swr";
import { selectEntities } from "../features/songs/songsSlice";

const useRecentSongs = () => {
  const userId = useAppSelector(selectUserId);
  const songsById = useAppSelector(selectEntities);
  const { data, error } = useSWR(userId ? "/api/recent-songs" : null, () =>
    fetch(`/api/recent/${userId}`).then((res) => res.json())
  );
  const recentSongs =
    data && Object.keys(data).map((id: string) => songsById && songsById[id]);

  return {
    recentSongs,
    isLoading: !error && !data,
    error,
  };
};

export default useRecentSongs;
