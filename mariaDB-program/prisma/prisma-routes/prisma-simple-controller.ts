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
        const deller = await prisma.owners.findFirst({
            where:{
                first_name: "Deller",
                city: "Entier"
            }
        });

        if(!deller){
            return res.json({message: "No Deller found"});
        }

        const query = await prisma.owners.update({
            where:{
                id: deller.id,
                first_name: "Deller",
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
        const deller = await prisma.owners.findFirst({
            where:{
                first_name: "Deller"
            }
        })

        if(!deller){
            return res.json({message: "No Deller found"});
        }

        const query = await prisma.owners.delete({
            where:{
                id: deller.id
            }
        });

        res.json(query);
    } catch(e){
        console.log(`Error fetching data, ${e}`);
    }
}