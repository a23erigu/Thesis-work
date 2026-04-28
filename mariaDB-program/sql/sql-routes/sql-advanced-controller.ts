import pool from "../sql-db-MariaDB"
import { Request, Response } from "express";

export const sqlCreateAdvanced = async(req: Request, res: Response) => {
    let conn;
    try{
        conn = await pool.getConnection();

        await conn.beginTransaction();

        const owner = await conn.query(`
            INSERT INTO owners
                (first_name, 
                last_name, 
                address, 
                city, 
                telephone) 
            VALUES 
                ('Entre', 
                'Dublo', 
                'Le trest avenue 5', 
                'Paris', 
                '0908234680')`);

        const ownerId = owner.insertId;

        const pet = await conn.query(`
            INSERT INTO pets
                (name, 
                birth_date, 
                type_id, 
                owner_id)
            VALUES
                ('Blue', 
                '2007-02-23', 
                2, 
                ?)`,
            [ownerId]);

        const petId = pet.insertId;
        
        const visit = await conn.query(`
            INSERT INTO visits
                (pet_id,
                visit_date,
                description)
            VALUES
                (?, 
                '2009,08-15', 
                'Rabies check')`,
            [petId]);

            await conn.commit();

            const resultOwner = owner.insertId.toString();
            const resultPet = pet.insertId.toString();
            const resultVisit = visit.insertId.toString();

        res.json({    
            resultOwner,
            resultPet,
            resultVisit
        });
    } catch(e){
        if(conn){
            await conn.rollback();
        }
        console.log(`Could not get data, error: ${e}`);
    } finally{
        if(conn){
            conn.release();
        }
    }
}

export const sqlReadAdvanced = async (req: Request, res: Response) => {
    let conn;
    try{
        conn = await pool.getConnection();

        const query = await conn.query(`
            SELECT 
                owners.id, 
                owners.first_name, 
                owners.last_name, 
                owners.address, 
                owners.city, 
                owners.telephone 
                FROM owners 
            JOIN pets 
                ON owners.id = pets.owner_id 
            JOIN visits 
                ON pets.id = visits.pet_id 
            JOIN types 
                ON pets.type_id = types.id 
            WHERE types.name = 'hamster'
            `);

        res.json(query);
    } catch(e){
        console.log(`Could not get data, error: ${e}`);
    } finally{
        if(conn){
            conn.release();
        }
    }
}

export const sqlUpdateAdvanced = async(req: Request, res: Response) => {
    let conn;
    try{
        conn = await pool.getConnection();

        await conn.beginTransaction();

        const visit = await conn.query(`
            SELECT visits.id 
                FROM visits 
            INNER JOIN pets 
                ON visits.pet_id = pets.id
            INNER JOIN owners 
                ON pets.owner_id = owners.id
            WHERE owners.last_name = 'Dublo' LIMIT 1
            `)

        const visitId = visit[0].id;

        const visitUpdate = await conn.query(`
            UPDATE visits
            SET 
                visit_date = '2011-06-24',
                description = 'rabies shot boost'
            WHERE id = ?`,
            [visitId]);

        const ownerUpdate = await conn.query(`
            UPDATE owners
            SET
                address = '8 Rue de Nesle'
            WHERE id = (
                SELECT pets.owner_id
                FROM pets
                INNER JOIN visits
                    ON pets.id = visits.pet_id
                WHERE visits.id = ?)`,
            [visitId]);

        conn.commit();

        res.json({
            changedVisit: visitUpdate.affectedRows,
            changedOwner: ownerUpdate.affectedRows
        })
    } catch(e){
        if(conn){
            await conn.rollback();
        }
        console.log(`Could not get data, error: ${e}`);
    } finally{
        if(conn){
            conn.release();
        }
    }
}

export const sqlDeleteAdvanced = async(req: Request, res: Response) => {
    let conn;
    try{
        conn = await pool.getConnection();

        await conn.beginTransaction();

        const owner = await conn.query(`SELECT owners.id FROM owners WHERE last_name = 'Dublo' LIMIT 1`);
        const ownerId = owner[0].id;

        const pet = await conn.query(`SELECT pets.id FROM pets WHERE owner_id = ?`, [ownerId]);
        const petId = pet[0].id;

        const visit = await conn.query(`SELECT visits.id FROM visits WHERE pet_id = ?`, [petId]);
        const visitId = visit[0].id;

        const visitDel = await conn.query(`DELETE FROM visits WHERE id = ?`, [visitId]);

        const petDel = await conn.query(`DELETE FROM pets WHERE id = ?`, [petId]);

        const ownerDel = await conn.query(`DELETE FROM owners WHERE id = ?`, [ownerId]);

        await conn.commit();

        const resultOwner = ownerDel.insertId.toString();
        const resultPet = petDel.insertId.toString();
        const resultVisit = visitDel.insertId.toString();

        res.json({
            resultOwner,
            resultPet,
            resultVisit
        })
    } catch(e){
        if(conn){
            await conn.rollback();
        }
        console.log(`Could not get data, error: ${e}`);
    } finally{
        if(conn){
            conn.release();
        }
    }
}