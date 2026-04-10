import { sequelize } from '../sequelize-db';
import { Owner, Type, Pet, Visit, Vet, Specialty, Vet_Specialty, PetWowner, VisitWpet } from '../sequelize-schema';
import { Request, Response } from "express";

export const AdvancedSelect = async (req: Request, res: Response) => {    // Select all owners who have a hamster that has had a visit
  try {
    const advancedSelect = await Owner.findAll({    // "SELECT owners.id, owners.first_name, owners.last_name, owners.address, owners.city, owners.telephone FROM owners JOIN pets ON owners.id = pets.owner_id "
      include: [{
        model: Pet,
        required: true,
        include: [{
          model: Visit,
          required: true,
        },
        {
          model: Type,
          where: {
            name: "hamster"
          },
          required: true,
        }],
      }]
    });

    res.json({
      advancedSelect,
    })
  }
  catch (err) {
    console.log(err);
  }
  
};

export const AdvancedCreate = async (req: Request, res: Response) => {    // Creates the owner "Entre", there dog "Blue" and a visit for Blue
  try {
    const advancedCreate = await Visit.create(
      {
        visit_date: "2009-08-15",
        description: "rabis check",
        Pet: {
          name: "Blue",
          birth_date: "2007-02-23",
          type_id: 2,
          Owner: {
            first_name: "Entre",
            last_name: "Dublo",
            address: "le trest avenue 5",
            city: "Paris",
            telephone: "0908234680",
          }
        },
      },
      {
        include: [
          {
            association: VisitWpet,
            include: [PetWowner],
          },
        ],
      }
    );

    res.json({
      advancedCreate,
    })
  }
  catch (err) {
    console.log(err);
  }

};

export const AdvancedDelete = async (req: Request, res: Response) => {    // Delete the owner "Entre", there dog "Blue" and the visit for Blue
  try {

    const Entre = await Owner.findOne({
      where: {
        first_name: "Entre",
      }
    });

    const Blue = await Pet.findOne({
      where: {
        owner_id: Entre?.get("id")
      }
    });

    const advancedDelete1 = await Visit.destroy({
      where: {
        pet_id: Blue?.get("id")
      }
    });

    const advancedDelete2 = await Pet.destroy({
      where: {
        id: Blue?.get("id")
      }
    });

    const advancedDelete3 = await Owner.destroy({
      where: {
        id: Entre?.get("id")
      }
    });

    res.json({
      advancedDelete1,
      advancedDelete2,
      advancedDelete3,
    })
  }
  catch (err) {
    console.log(err);
  }

};

export const AdvancedUpdate = async (req: Request, res: Response) => { // don't know what do about this one
  try {
    console.log("this is a test");
  }
  catch (err) {
    console.log(err);
  }

};