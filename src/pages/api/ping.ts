import { conn } from "@/utils/database";
import { NextApiRequest, NextApiResponse } from "next";

type Data = {
  message: string;
  time: string;
};

export default async function index(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const response = await conn.query("SELECT NOW();");
  console.log(response);
  return res.json({ message: "pong", time: response.rows[0].now });
}
