import pool from "./sql-db-postgres";
import { Request, Response } from "express";

export const SimpleSelect = async (req: Request, res: Response) => {
  try {
    const results = await pool.query("SELECT * FROM pets");
    const rows = results["rows"];

    res.json({
      rows,
    });
  }
  catch (err) {
    console.log(err);
  }

};

export const SimpleCreate = async (req: Request, res: Response) => {    // Create owner "Deller"
  try {

    const results = await pool.query("INSERT INTO owners (first_name, last_name, address, city, telephone) VALUES ('Deller', 'Menser', 'notwere st', 'Entier', '0000666000')");
    const rows = results["rows"];

    res.json({
      rows,
    });
  }
  catch (err) {
    console.log(err);
  }

};

