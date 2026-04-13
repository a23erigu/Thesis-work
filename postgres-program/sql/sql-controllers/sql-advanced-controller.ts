import pool from "../sql-db-postgres";
import { Request, Response } from "express";

export const AdvancedSelect = async (req: Request, res: Response) => {      // Select all users that have a hamster who have hade a visit
  let conn;
  try {
    conn = await pool.connect()

    const results = await conn.query("SELECT owners.id, owners.first_name, owners.last_name, owners.address, owners.city, owners.telephone FROM owners JOIN pets ON owners.id = pets.owner_id JOIN visits ON pets.id = visits.pet_id JOIN types ON pets.type_id = types.id WHERE types.name = 'hamster'"); 
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

export const AdvancedCreate = async (req: Request, res: Response) => { 
  let conn;
  try {
    conn = await pool.connect()

    const results1 = await conn.query("INSERT INTO owners (first_name, last_name, address, city, telephone) VALUES ('Entre', 'Dublo', 'le trest avenue 5', 'Paris', '0908234680') RETURNING id");

    const results2 = await conn.query("INSERT INTO pets (name, birth_date, type_id, owner_id) VALUES ('Blue','2007-02-23',2," + results1["rows"][0]["id"] + ") RETURNING id");

    const results3 = await conn.query("INSERT INTO visits (pet_id, visit_date, description) VALUES (" + results2["rows"][0]["id"] + ",'2009-08-15','rabis check')")

    res.json({
      results1,
      results2,
      results3
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

export const AdvancedDelete = async (req: Request, res: Response) => {   
  let conn;
  try {
    conn = await pool.connect()

    const Deller = await conn.query("");
    const id = Deller["rows"][0]["id"];

    const result = await conn.query();

    res.json({
      result,
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

export const AdvancedUpdate = async (req: Request, res: Response) => { 
  let conn
  try {
    conn = await pool.connect()

    const oldDeller = await conn.query("");
    const id = oldDeller["rows"][0]["id"];

    const result = await conn.query();

    res.json({
      result,
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