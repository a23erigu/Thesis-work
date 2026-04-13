import pool from "../sql-db-postgres";
import { Request, Response } from "express";

export const SimpleSelect = async (req: Request, res: Response) => {
  let conn;
  try {
    conn = await pool.connect()

    const results = await conn.query("SELECT * FROM pets");   // Get every pet
    const rows = results["rows"];

    res.json({
      rows,
    });
  }
  catch (err) {
    console.log(err);
  } finally{
    if(conn){
        conn.release();
    }
  }

};

export const SimpleCreate = async (req: Request, res: Response) => {    // Create owner "Deller"
  let conn;
  try {
    conn = await pool.connect()

    const results = await conn.query("INSERT INTO owners (first_name, last_name, address, city, telephone) VALUES ('Deller', 'Menser', 'notwere st', 'Entier', '0000666000')");

    res.json({
      results,
    });
  }
  catch (err) {
    console.log(err);
  } finally{
    if(conn){
        conn.release();
    }
  }

};

export const SimpleDelete = async (req: Request, res: Response) => {    // Delete the first owner called "Deller"
  let conn;
  try {
    conn = await pool.connect()

    const Deller = await conn.query("SELECT * FROM owners WHERE first_name = 'Deller' LIMIT 1");

    const results = await conn.query("DELETE FROM owners WHERE id = " + Deller["rows"][0]["id"]);

    res.json({
      results,
    });
  }
  catch (err) {
    console.log(err);
  } finally{
    if(conn){
        conn.release();
    }
  }

};

export const SimpleUpdate = async (req: Request, res: Response) => {    // Update the city of the first owner called "Deller"
  let conn
  try {
    conn = await pool.connect()

    const oldDeller = await conn.query("SELECT * FROM owners WHERE first_name = 'Deller' AND city = 'Entier' LIMIT 1");
    const id = oldDeller["rows"][0]["id"];

    const results = await conn.query("UPDATE owners SET city = 'Exiter' WHERE id = " + id);

    res.json({
      results,
    });
  }
  catch (err) {
    console.log(err);
  } finally{
    if(conn){
        conn.release();
    }
  }

};

