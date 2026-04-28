import { request } from "node:http";
import { prisma } from "../prisma-db";
import { Request, Response } from "express";

export const prismaCreateSimple = async(req: Request, res: Response) => {
    try{

        const query = await prisma.owners.create({
            data:{
                first_name: "Deller",
                last_name: "Menser",
                address: "Notwere st",
                city: "Entier",
                telephone: "0000666000"
            }
        }); 

        res.json(query);
    } catch(e){
        console.log(`Error fetching data, ${e}`);
    }
}

export const prismaReadSimple = async(req: Request, res: Response) => {
    try{
        const query = await prisma.pets.findMany();

        res.json(query);
    } catch(e){
        console.log(`Error fetching data, ${e}`);
    }
}

export const prismaUpdateSimple = async(req: Request, res: Response) => {
    try{

        const menser = await prisma.owners.findFirst({
            where:{
                last_name: "Menser",
                city: "Entier"
            }
        });

        if(!menser){
            return res.json({message: "No Menser found"});
        }

        const query = await prisma.owners.update({
            where:{
                id: menser.id,
                last_name: "Menser",
                city: "Entier"
            },
            data:{
                city: "Exiter"
            }
        });

        res.json(query);
    } catch(e){
        console.log(`Error fetching data, ${e}`);
    }
}

export const prismaDeleteSimple = async(req: Request, res: Response) => {
    try{
        const menser = await prisma.owners.findFirst({
            where:{
                last_name: "Menser"
            }
        })

        if(!menser){
            return res.json({message: "No Menser found"});
        }

        const query = await prisma.owners.delete({
            where:{
                id: menser.id
            }
        });

        res.json(query);
    } catch(e){
        console.log(`Error fetching data, ${e}`);
    }
}