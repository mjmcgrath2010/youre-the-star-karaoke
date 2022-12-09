import {
  selectSocket,
  selectSocketLoaded,
  setSocket,
} from "./../features/socket/socketSlice";
import { useAppDispatch, useAppSelector } from "./useRedux";
import { useCallback, useEffect } from "react";
import io from "socket.io-client";
import useSWR from "swr";

const useSocket = () => {
  const dispatch = useAppDispatch();
  const socket = useAppSelector(selectSocket);
  const loaded = useAppSelector(selectSocketLoaded);

  const socketInitializer = useCallback(async () => {
    await fetch("/api/socket");
    const socket = io(window.location.origin, {
      path: "/socket.io/",
    });

    socket.on("connect", () => {
      console.log("connected");
    });

    socket.on("disconnect", () => {
      dispatch(setSocket(null));
    });

    dispatch(setSocket(socket));
  }, [dispatch]);

  useSWR(loaded ? null : "GK_WS", socketInitializer);

  useEffect(() => {
    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, [socket, loaded, dispatch]);

  return socket;
};

export default useSocket;
