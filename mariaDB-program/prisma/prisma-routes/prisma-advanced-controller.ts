import { create } from "node:domain";
import { prisma } from "../prisma-db";
import { Request, Response } from "express";
import { Owner } from "../../../postgres-program/sequelize/sequelize-schema";
import { connect } from "node:http2";

export const prismaCreateAdvanced = async(req: Request, res: Response) => {
    try{
        const firstName = req.body.firstName;

        const query = await prisma.visits.create({
            data:{
                visit_date: new Date('2009-08-15'),
                description: 'rabies shot',
                pets:{
                    create:{
                        name: 'Blue',
                        birth_date: new Date('2007-02-23'),

                        types:{
                            connect: {id:2}
                        },

                        owners:{
                            create:{
                                first_name: firstName,
                                last_name: 'Dublo',
                                address: 'Le trest avenue 5',
                                city: 'Paris',
                                telephone: '0908234680'
                            }
                        },
                    }
                }
            },
            include:{
                pets:{
                    include:{
                        owners: true
                    }
                }
            }
        });

        res.json(query);
    } catch(e){
        console.log(`Error fetching data, ${e}`);
    }
}

export const prismaReadAdvanced = async(req: Request, res: Response) => {
    try{
        const query = await prisma.owners.findMany({
            where:{
                pets:{
                    some:{
                        types:{
                            name: 'hamster'
                        },
                        visits:{
                            some: {}
                        }
                    }
                }
            },
            include:{
                pets:{
                    where:{
                        types:{
                            name: 'hamster'
                        },
                        visits:{
                            some: {}
                        }
                    },
                    include:{
                        visits: true,
                        types: true
                    }
                }
            }
        });

        res.json(query);
    } catch(e){
        console.log(`Error fetching data, ${e}`);
    }
}

export const prismaUpdateAdvanced = async(req: Request, res: Response) => {
    try{
        const visit = await prisma.visits.findFirst({
            where:{
                pets:{
                    owners:{
                        last_name: 'Dublo'
                    }
                }
            },
            select:{
                id: true
            }
        });

        if(!visit){
            console.log("No owner with that last name");
            return;
        }

        const query = await prisma.visits.update({
            where:{
                id: visit.id
            },
            data:{
                visit_date: new Date('2011-06-24'),
                description: 'rabies shot boost',

                pets:{
                    update:{
                        owners:{
                            update:{
                                address: '8 Rue de Nesle'
                            }
                        }
                    }
                }
            }
        });

        res.json(query);
    } catch(e){
        console.log(`Error fetching data, ${e}`);
    }
}

export const prismaDeleteAdvanced = async(req: Request, res: Response) => {
    try{
        const owner = await prisma.owners.findFirst({
            where:{
                last_name: 'Dublo'
            }
        });

        if(!owner){
            console.log("No owner with that name");
            return;
        }

        const pet = await prisma.pets.findFirst({
            where:{
                owner_id: owner.id
            }
        });

        if(!pet){
            console.log("No pet with that ID");
            return;
        }

        const deleteVisit = await prisma.visits.deleteMany({
            where:{
                pet_id: pet.id
            }
        });

        const deletePet = await prisma.pets.delete({
            where:{
                id: pet.id
            }
        });

        const deleteOwner = await prisma.owners.delete({
            where:{
                id: owner.id
            }
        })

        res.json({
            deleteVisit,
            deletePet,
            deleteOwner
        })
    } catch(e){
        console.log(`Error fetching data, ${e}`);
    }
}