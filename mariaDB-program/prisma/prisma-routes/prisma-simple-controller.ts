import { request } from "node:http";
import { prisma } from "../prisma-db";
import { Request, Response } from "express";

export const prismaCreateSimple = async(req: Request, res: Response) => {
    try{
        //const query = 

        //res.json(query);
    } catch(e){
        console.log(`Error fetching data, ${e}`);
    } finally{
        prisma.$disconnect;
    }
}

export const prismaReadSimple = async(req: Request, res: Response) => {
    try{
        const query = await prisma.pets.findMany({
            where:{
                owners:{
                    city: 'Madison'
                }
            }
        });

        res.json(query);
    } catch(e){
        console.log(`Error fetching prisma read simple data, ${e}`);
    } finally{
        prisma.$disconnect;
    }
}

export const prismaUpdateSimple = async(req: Request, res: Response) => {
    try{
        //const query = 

        //res.json(query);
    } catch(e){
        console.log(`Error fetching data, ${e}`);
    } finally{
        prisma.$disconnect;
    }
}

export const prismaDeleteSimple = async(req: Request, res: Response) => {
    try{
        //const query = 

        //res.json(query);
    } catch(e){
        console.log(`Error fetching data, ${e}`);
    } finally{
        prisma.$disconnect;
    }
}