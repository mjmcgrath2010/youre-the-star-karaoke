import Cookies from "js-cookie";

import { useState, useEffect } from "react";
import { v4 as uuid } from "uuid";

const getKeyName = (name: string) => `GARAGE_KARAOKE_${name.toUpperCase()}`;
const KEY_NAME = getKeyName("USER_ID");

const useIdentity = () => {
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const userId = Cookies.get(KEY_NAME);

    if (userId) {
      setUserId(userId);
    } else {
      const newUserId = uuid();
      Cookies.set(KEY_NAME, newUserId);
      setUserId(newUserId);
    }
  }, [setUserId]);

  return userId;
};

export default useIdentity;
