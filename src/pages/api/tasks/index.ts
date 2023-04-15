import { conn } from "@/utils/database";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, body } = req;
  switch (method) {
    case "GET":
      try {
        const sql = "SELECT * FROM tasks";
        const result = await conn.query(sql);
        return res.status(200).json(result.rows);
      } catch (e: any) {
        return res.status(500).json({ error: e.message });
      }

    case "POST":
      try {
        const { title, description } = body;
        const sql =
          "INSERT INTO tasks(title, description) VALUES ($1, $2) RETURNING *";
        const values = [title, description];
        const result = await conn.query(sql, values);
        return res.status(200).json(result.rows[0]);
      } catch (e: any) {
        return res.status(500).json({ error: e.message });
      }

    default:
      return res.status(400).json("Invalid method");
  }
};
