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

export const AdvancedCreate = async (req: Request, res: Response) => {  // Creates the owner "Entre", there dog "Blue" and a visit for Blue
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

export const AdvancedDelete = async (req: Request, res: Response) => {   // Delete the owner "Entre", there dog "Blue" and the visit for Blue
  let conn;
  try {
    conn = await pool.connect()

    const Entre = await conn.query("SELECT owners.id FROM owners WHERE first_name = 'Entre' LIMIT 1");

    const Blue = await conn.query("SELECT pets.id FROM pets WHERE owner_id = " + Entre["rows"][0]["id"]);

    const visit = await conn.query("SELECT visits.id FROM visits WHERE pet_id = " + Blue["rows"][0]["id"]);

    const results1 = await conn.query("DELETE FROM visits WHERE id = " + visit["rows"][0]["id"]);

    const results2 = await conn.query("DELETE FROM pets WHERE id = " + Blue["rows"][0]["id"]);

    const results3 = await conn.query("DELETE FROM owners WHERE id = " + Entre["rows"][0]["id"]);

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

export const AdvancedUpdate = async (req: Request, res: Response) => {  // Update the owner "Entre" and the visit for there dog Blue
  let conn
  try {
    conn = await pool.connect()

    const oldVisit= await conn.query("SELECT visits.id FROM visits JOIN pets ON visits.pet_id = pets.id JOIN owners ON pets.owner_id = owners.id WHERE owners.last_name = 'Dublo' AND owners.address = 'le trest avenue 5' LIMIT 1");
    const idVisit = oldVisit["rows"][0]["id"];

    const oldOwner = await conn.query("SELECT owners.id FROM owners JOIN pets ON owners.id = pets.owner_id JOIN visits ON pets.id = visits.pet_id WHERE visits.id = '" + idVisit + "' LIMIT 1");
    const idOwner = oldOwner["rows"][0]["id"];

    const result1 = await conn.query("UPDATE visits SET visit_date = '2011-06-24', description = 'rabies shot boost' WHERE id = " + idVisit);

    const result2 = await conn.query("UPDATE owners SET address = '8 Rue de Nesle' WHERE id = " + idOwner);

    res.json({
      result1,
      result2
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