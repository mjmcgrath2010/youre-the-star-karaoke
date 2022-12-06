// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../lib/mongoose";

type Data = {
  name: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  clientPromise.then(async (client) => {
    const songs = await client.connection.db
      .collection("songs")
      .find({})
      .toArray();
    res.status(200).json(songs);
  });
}
