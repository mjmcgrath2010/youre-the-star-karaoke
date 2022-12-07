import { NextApiRequest, NextApiResponse } from "next";
import redis from "../../../lib/redis";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  try {
    const value = await redis.hvals("signup");
    const response = JSON.stringify(value.map((val) => JSON.parse(val)));
    return res.json(JSON.parse(response));
  } catch (e) {
    return res.json([]);
  }
}
