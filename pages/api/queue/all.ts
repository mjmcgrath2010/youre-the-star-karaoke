import { NextApiRequest, NextApiResponse } from "next";
import redis from "../../../lib/redis";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const value = await redis.hget("feedback", "1");

  return res.json(value);
}
