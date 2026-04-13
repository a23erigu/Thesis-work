import pool from "../sql-db-MariaDB"
import { Request, Response } from "express";

export const sqlCreateAdvanced = async(req: Request, res: Response) => {
    try{

    } catch(e){

    }
}

export const sqlReadAdvanced = async (req: Request, res: Response) => {
    let conn;
    try{
        conn = await pool.getConnection();

        const query = await conn.query(`SELECT pets.name, visits.description, owners.first_name FROM pets 
            LEFT JOIN visits ON pets.id = visits.pet_id 
            INNER JOIN owners ON pets.owner_id = owners.id WHERE city = 'Monona'`);

        res.json(query);
    } catch(e){
        console.log(`Could not get advanced SQL data, error: ${e}`);
    } finally{
        if(conn){
            conn.release();
        }
    }
}

export const sqlUpdateAdvanced = async(req: Request, res: Response) => {
    try{

    } catch(e){
        
    }
}

export const sqlDeleteAdvanced = async(req: Request, res: Response) => {
    try{

    } catch(e){
        
    }
}