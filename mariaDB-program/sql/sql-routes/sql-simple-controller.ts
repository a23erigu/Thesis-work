import pool from "../sql-db-MariaDB"
import { Request, Response } from "express";

export const sqlCreateSimpleFixed = async(req: Request, res: Response) => {
    let conn;
    try{
        conn = await pool.getConnection();

        const query = await conn.query(`
            INSERT INTO owners (first_name, last_name, address, city, telephone) 
            VALUES ("Deller", 'Menser', 'Notwere st', 'Entier', '0000666000')
            `);

        const id = query.insertId.toString();

        res.json(id);
    } catch(e){
        console.log(`Could not create data, error: ${e}`);
    } finally{
        if(conn){
            conn.release();
        }
    }
}

export const sqlCreateSimpleRand = async(req: Request, res: Response) => {
    let conn;
    try{
        const firstName = req.body.firstName;
        
        conn = await pool.getConnection();

        const query = await conn.query(`
            INSERT INTO owners (first_name, last_name, address, city, telephone) 
            VALUES (?, 'Menser', 'Notwere st', 'Entier', '0000666000')`,
            [firstName]);

        const id = query.insertId.toString();

        res.json(id);
    } catch(e){
        console.log(`Could not create data, error: ${e}`);
    } finally{
        if(conn){
            conn.release();
        }
    }
}

export const sqlReadSimple = async (req: Request, res: Response) => {
    let conn;
    try{
        conn = await pool.getConnection();

        const query = await conn.query(`SELECT * FROM pets`);

        res.json(query);
    } catch(e){
        console.log(`Could not get data, error: ${e}`);
    } finally{
        if(conn){
            conn.release();
        }
    }
}

export const sqlUpdateSimple = async(req: Request, res: Response) => {
    let conn;
    try {
        const city = req.body.city;

        conn = await pool.getConnection();

        const Menser = await pool.query("SELECT * FROM owners WHERE last_name = 'Menser' AND city = 'Entier' LIMIT 1");
        const id = Menser[0].id;

        const query = await pool.query("UPDATE owners SET city = ? WHERE id = " + id, [city]);

        const result = query.insertId.toString();

        res.json(result);
  }
  catch (e) {
    console.log(`Could not update data, error: ${e}`);
  } finally{
        if(conn){
            conn.release();
        }
    }
}

export const sqlDeleteSimple = async(req: Request, res: Response) => {
    let conn;
    try{
        conn = await pool.getConnection();

        const owner = await conn.query(`SELECT id FROM owners
            WHERE last_name = 'Menser' LIMIT 1
            `);

        const target = owner[0].id;

        const query = await conn.query(`DELETE FROM owners
            WHERE id = ?`,
        [target]);

        //console.log("Deleted rows: ", query.affectedRows);
        const id = query.insertId.toString();

        res.json(id);
    } catch(e){
        console.log(`Could not delete data, error: ${e}`);
    } finally{
        if(conn){
            conn.release();
        }
    }
}