import { sequelize } from '../sequelize-db';
import { Owner, Type, Pet, Visit, Vet, Specialty, Vet_Specialty, PetWowner, VisitWpet } from '../sequelize-schema';
import { Request, Response } from "express";

// "SELECT Pets.id, Pets.name, Pets.birth_date, Pets.type_id, Pets.owner_id, Owners.city FROM Pets JOIN Owners ON pets.owner_id = Owners.id WHERE Owners.city = 'Madison'"

export const sequelizeCreateSimple = async (req: Request, res: Response) => {    // Create owner "Deller"
  try {
    const simpleCreate = await Owner.create({ 
      first_name: "Deller",
      last_name: "Menser",
      address: "notwere st",
      city: "Entier",
      telephone: "0000666000",
    });
    
    res.json({
      simpleCreate,
    });
  }
  catch (err) {
    console.log(err);
  }
  
};

export const sequelizeReadSimple = async (req: Request, res: Response) => {    // Get every pet
  try {
    const simpleSelect = await Pet.findAll();
    
    res.json({
      simpleSelect,
    });
  }
  catch (err) {
    console.log(err);
  }

};

export const sequelizeUpdateSimple = async (req: Request, res: Response) => {    // Update the city of the first owner called "Deller"
  try {
    const Deller = await Owner.findOne({ 
      where: {
        first_name: "Deller",
        city: "Entier",
      }
    });
    
    const simpleUpdate = await Owner.update( 
      {
        city: "Exiter"
      },
      {
        where: {
          id: Deller?.get("id")
        }
      }
    );
    
    res.json({
      simpleUpdate
    })
  }
  catch (err) {
    console.log(err);
  }
  
};

export const sequelizeDeleteSimple = async (req: Request, res: Response) => {    // Delete the first owner called "Deller"
  try {
    const Deller = await Owner.findOne({ 
      where: {
        first_name: "Deller"
      }
    });

    const simpleDelete = await Owner.destroy({  
      where: {
        id: Deller?.get("id"),
      }
    });

    res.json({
      simpleDelete
    })
  }
  catch (err) {
    console.log(err);
  }

};