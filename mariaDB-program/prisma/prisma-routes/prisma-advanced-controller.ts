import { prisma } from "../prisma-db";
import { Request, Response } from "express";

export const prismaCreateAdvanced = async(req: Request, res: Response) => {
    try{
        
    } catch(e){
        
    }
}

export const prismaReadAdvanced = async(req: Request, res: Response) => {
    try{
        const query = await prisma.pets.findMany({
            where:{
                owners:{
                    city: 'Monona'
                }
            },

            select:{
                name: true,

                visits:{
                    select:{
                        description: true
                    }
                },

                owners:{
                    select:{
                        first_name: true
                    }
                }
            }
        });

        res.json(query);
    } catch(e){
        console.log(`Error fetching prisma get advanced data, ${e}`);
    } finally{
        prisma.$disconnect;
    }
}

export const prismaUpdateAdvanced = async(req: Request, res: Response) => {
    try{
        
    } catch(e){
        
    }
}

export const prismaDeleteAdvanced = async(req: Request, res: Response) => {
    try{
        
    } catch(e){
        
    }
}