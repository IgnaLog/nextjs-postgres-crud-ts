import { conn } from "@/utils/database";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, query, body } = req;

  switch (method) {
    case "GET":
      try {
        const sql = "SELECT * FROM tasks WHERE id = $1";
        const values = [query.id];
        const result = await conn.query(sql, values);
        if (result.rows.length === 0)
          return res.status(404).json({ message: "Task not found" });

        return res.status(200).json(result.rows[0]);
      } catch (e: any) {
        return res.status(500).json({ error: e.message });
      }

    case "PUT":
      try {
        const sql =
          "UPDATE tasks SET title = $1, description = $2 WHERE id = $3 RETURNING *";
        const { title, description } = body;
        const values = [title, description, query.id];
        const result = await conn.query(sql, values);
        if (result.rows.length === 0)
          return res.status(404).json({ message: "Task not found" });

        return res.status(200).json(result.rows[0]);
      } catch (e: any) {
        return res.status(500).json({ error: e.message });
      }

    case "DELETE":
      try {
        const sql = "DELETE FROM tasks WHERE id = $1 RETURNING *";
        const values = [query.id];
        const result = await conn.query(sql, values);

        if (result.rowCount === 0)
          return res.status(404).json({ message: "Task not found" });

        return res.status(200).json(result.rows[0]);
      } catch (e: any) {
        return res.status(500).json({ error: e.message });
      }

    default:
      return res.status(400).json("Invalid method");
  }
};
