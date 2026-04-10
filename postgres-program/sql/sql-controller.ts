import pool from "./sql-db-postgres";
import { Request, Response } from "express";

export const SimpleSelect = async (req: Request, res: Response) => {
  try {
    const results = await pool.query("SELECT * FROM pets");   // Get every pet
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

    res.json({
      results,
    });
  }
  catch (err) {
    console.log(err);
  }

};

export const SimpleDelete = async (req: Request, res: Response) => {    // Delete the first owner called "Deller"
  try {

    const Deller = await pool.query("SELECT * FROM owners WHERE first_name = 'Deller' LIMIT 1");
    const id = Deller["rows"][0]["id"];

    const result = await pool.query("DELETE FROM owners WHERE id = " + id);

    res.json({
      result,
    });
  }
  catch (err) {
    console.log(err);
  }

};

export const SimpleUpdate = async (req: Request, res: Response) => {    // Update the city of the first owner called "Deller"
  try {

    const Deller = await pool.query("SELECT * FROM owners WHERE first_name = 'Deller' AND city = 'Entier' LIMIT 1");
    const id = Deller["rows"][0]["id"];

    const result = await pool.query("UPDATE owners SET city = 'Exiter' WHERE id = " + id);

    res.json({
      result,
    });
  }
  catch (err) {
    console.log(err);
  }

};

