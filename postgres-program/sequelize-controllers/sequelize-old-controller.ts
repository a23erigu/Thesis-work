import { sequelize } from '../sequelize-db';
import { Owner, Type, Pet, Visit, Vet, Specialty, Vet_Specialty } from '../sequelize-schema';
import { Request, Response } from "express";


/*-----------------*\
|   Start section   |
\*-----------------*/

export const GetEverything = async (req: Request, res: Response) => {

  const owners = await Owner.findAll();   // selects all elements in the database
  const types = await Type.findAll(); 
  const pets = await Pet.findAll(); 
  const visits = await Visit.findAll(); 
  const vets = await Vet.findAll();
  const specialties = await Specialty.findAll();
  const vet_specialties = await Vet_Specialty.findAll();

  const user3pets = await Pet.findAll({   // all pets from owner with id 3
    where: {
      owner_id: 3
    }
  }); 

  const petsFowner = await Owner.findAll({ // all pets from owner Betty
    where: {
      first_name: 'Betty'
    },
    include: [{
      model: Pet,
      required: true,
    }]
  });  

  const petsFcity = await Pet.findAll({ // all pets from Madison
    include: [{
      model: Owner,
      where: {
        city: 'Madison'
      }
    }]
  }); 

  const ownerWpetWvisit = await Owner.findAll({ // owner of pets that have had a visit
    include: [{
      model: Pet,
      required: true,
      include: [{
        model: Visit,
        required: true,
      }]
    }]
  });

  const vet3spec = await Vet_Specialty.findAll({  // all specialty id of vet with id 3
    where: {
      vet_id: 3
    }
  });

  const vetWsurgery = await Vet.findAll({ // all vets with the surgety specialty
    include: [{
      model: Specialty,
      required: true,
      where: { name: "surgery"}
    }]
  }); 

  res.json({    // turns data in to json and gives to website
    owners,
    types,
    pets,
    visits,
    vets,
    vet_specialties,
    specialties,
    user3pets,
    petsFowner,
    petsFcity,
    ownerWpetWvisit,
    vet3spec,
    vetWsurgery,
  });

};

/*----------------*\
|   Show section   |
\*----------------*/

export const AllElement = async (req: Request, res: Response) => {  // Selects all elements in the database

  const owners = await Owner.findAll();   
  const types = await Type.findAll(); 
  const pets = await Pet.findAll(); 
  const visits = await Visit.findAll(); 
  const vets = await Vet.findAll();
  const specialties = await Specialty.findAll();
  const vet_specialties = await Vet_Specialty.findAll();

  res.json({
    owners,
    types,
    pets,
    visits,
    vets,
    specialties,
    vet_specialties
  })

};

export const AllOwners = async (req: Request, res: Response) => {  // Selects all owners in the database

  const owners = await Owner.findAll();   

  res.json({
    owners,
  })

};

export const AllOwnersPure = async (req: Request, res: Response) => {  // Selects all owners in the database with pure sql

  const [results, metadata] = await sequelize.query('SELECT * FROM owners') 

  res.json({
    results,
  })

};

/*---------------*\
|   Bob section   |
\*---------------*/
/*
app.get('/KillBob', async (req, res) => { // Delete vet bob

  try {
    const Bob = await Vet.findOne({
      where: {
        first_name: "Bob"
      }
    })

    const deletedBobSpecialty = await Vet_Specialty.destroy({ 
      where: {
        vet_id: Bob?.get("id")
      }
    })

    const deletedBob = await Vet.destroy({
      where: {
        first_name: "Bob"
      }
    })

    res.json({
      deletedBobSpecialty,
      deletedBob
    });
  }
  catch (err) {
    console.log(err);
  }

})

app.get('/CreateBob', async (req, res) => { // Create vet bob

  try {
    const Bob = await Vet.create({
      first_name: "Bob", 
      last_name: "Davidson"}
    );

    const BobSpecialty = await Vet_Specialty.create({
      vet_id: Bob.get("id"),
      specialty_id: 1
    });

    res.json({
      Bob,
      BobSpecialty
    })
  }
  catch (err) {
    console.log(err);
  }

})

app.get('/UpdateBob', async (req, res) => {   // Update vet Bob

  try {
    const Bob = await Vet.findOne({
      where: {
        first_name: "Bob"
      }
    })

    const SurgeryBob = await Vet_Specialty.update(
      {
        specialty_id: 2
      },
      {
        where: {
          vet_id: Bob?.get("id"),
        }
      }
    )
    res.json({
      SurgeryBob
    })
  }
  catch (err) {
    console.log(err);
  }

})
*/
