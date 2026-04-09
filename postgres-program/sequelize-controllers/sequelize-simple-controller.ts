import { sequelize } from '../sequelize-db';
import { Owner, Type, Pet, Visit, Vet, Specialty, Vet_Specialty, PetWowner, VisitWpet } from '../sequelize-schema';
import { Request, Response } from "express";

// "SELECT Pets.id, Pets.name, Pets.birth_date, Pets.type_id, Pets.owner_id, Owners.city FROM Pets JOIN Owners ON pets.owner_id = Owners.id WHERE Owners.city = 'Madison'"

export const SimpleSelect = async (req: Request, res: Response) => {    // Get every pet
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

export const SimpleSelectPure = async (req: Request, res: Response) => {
  try {
    const [results, metadata] = await sequelize.query("SELECT * FROM pets");

    res.json({
      results,
    });
  }
  catch (err) {
    console.log(err);
  }
};

export const SimpleCreate = async (req: Request, res: Response) => {    // Create owner "Deller"
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

export const SimpleCreatePure = async (req: Request, res: Response) => {    // Create owner "Deller"
  try {

    const [results, metadata] = await sequelize.query("INSERT INTO owners (first_name, last_name, address, city, telephone) VALUES ('Deller', 'Menser', 'notwere st', 'Entier', '0000666000')");

    res.json({
      results,
    });
  }
  catch (err) {
    console.log(err);
  }

};

export const SimpleDelete = async (req: Request, res: Response) => {    // Delete the first owner called "Deller"
  try {
    const Deller = await Owner.findOne({    // Deller = "SELECT * FROM owners WHERE first_name = 'Deller' LIMIT 1"
      where: {
        first_name: "Deller"
      }
    });

    const simpleDelete = await Owner.destroy({    // "DELETE FROM owners WHERE id = Deller.id"
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

export const SimpleUpdate = async (req: Request, res: Response) => {    // Update the city of the first owner called "Deller"
  try {
    const oldDeller = await Owner.findOne({   // Deller = "SELECT * FROM owners WHERE first_name = 'Deller' AND city = 'Entier' LIMIT 1"
      where: {
        first_name: "Deller",
        city: "Entier",
      }
    });
    
    const simpleUpdate = await Owner.update(    // "UPDATE owners SET city = 'Exiter' WHERE id = Deller.id"
      {
        city: "Exiter"
      },
      {
        where: {
          id: oldDeller?.get("id")
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