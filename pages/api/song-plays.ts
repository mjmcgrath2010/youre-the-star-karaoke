import { NextApiRequest, NextApiResponse } from "next";
import redis from "../../lib/redis";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  try {
    const response = await redis.hgetall("top-songs");
    return res.json(response);
  } catch (e) {
    return res.json([]);
  }
}
