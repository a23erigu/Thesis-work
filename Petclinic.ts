import { Types } from 'mysql2';
import { Sequelize, DataTypes, Model, json } from 'sequelize';
const express = require('express');

const app = express();

const sequelize = new Sequelize('petclinic', 'petclinic', 'petclinic', {  //database, username, password
  host: 'postgres',
  dialect: 'postgres',
  logging: console.log,
  port: 5432
});

try {
  sequelize.authenticate();
  console.log('Connection has been established successfully.'); //tests connection
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

const Owner = sequelize.define(
  'Owner',
  {
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING,
    },
    address: {
        type: DataTypes.STRING,
    },
    city: {
        type: DataTypes.STRING,
    },
    telephone: {
        type: DataTypes.STRING,
    }
  },
  {
    tableName: 'owners',     
    timestamps: false,      
  },
);

const Type = sequelize.define(
  'Type',
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: 'types',     
    timestamps: false,      
  },
);

const Pet = sequelize.define(
  'Pet',
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    birth_date: {
      type: DataTypes.DATE,
    },
  },
  {
    tableName: 'pets',     
    timestamps: false,      
  },
);

Pet.belongsTo(Type, { foreignKey: "type_id" });
Type.hasOne(Pet, { foreignKey: "type_id" });  
Pet.belongsTo(Owner, { foreignKey: "owner_id" });
Owner.hasMany(Pet, { foreignKey: "owner_id" });

const Visit = sequelize.define(
  'Visit',
  {
    visit_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
    },
  },
  {
    tableName: 'visits',     
    timestamps: false,      
  },
);

Visit.belongsTo(Pet, { foreignKey: "pet_id"});
Pet.hasMany(Visit, { foreignKey: "pet_id"});

const Vet = sequelize.define(               
  'Vet',
  {
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING,
    }
  },
  {
    tableName: 'vets',     
    timestamps: false,      
  },
);

const Specialty = sequelize.define(             
  'Specialty',
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  },
  {
    tableName: 'specialties',     
    timestamps: false,      
  },
);

const Vet_Specialty = sequelize.define(      
  'Vet_Specialty',
  {},
  {
    tableName: 'vet_specialties',     
    timestamps: false,      
  },
);

Vet.belongsToMany(Specialty, {through: Vet_Specialty, foreignKey: "vet_id"});          
Specialty.belongsToMany(Vet, {through: Vet_Specialty, foreignKey: "specialty_id"});    

// select everything
app.get('/', async (req, res) => {  // ignore these errors (just ts things)

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

});

app.get('/AllElement', async (req, res) => {  // Selects all elements in the database

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

});

app.get('/AllOwners', async (req, res) => {  // Selects all owners in the database

  const owners = await Owner.findAll();   

  res.json({
    owners,
  })

});

app.get('/SimpleSelect', async (req, res) => {
  try {
    const simpleSelect = await Pet.findAll({
      include: [{
        model: Owner,
        where : {
          city: 'Madison',
        },
        required: true
      }]
    });
    
    res.json({
      simpleSelect,
    })
  }
  catch (err) {
    console.log(err);
  }

});

app.get('/AdvancedSelect', async (req, res) => {
  try {
    const advansedSelect = await Owner.findAll({
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
      advansedSelect,
    })
  }
  catch (err) {
    console.log(err);
  }
  
});

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

app.get('/UpdateBob', async (req, res) => {

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

app.get('/CreatePet', async (req, res) => {
  try {
    const Newham = await Pet.create({
      name: "Ham",
      birth_date: "2006-09-12",
      type_id: 6,
      owner_id: 6
    });

    const HamVisit = await Visit.create({
      pet_id: Newham.get("id"),
      visit_date: "2006-09-14",
      description: "Birth check"
    });

    res.json({
      Newham,
      HamVisit
    })
  }
  catch (err) {
    console.log(err);
  }

});

app.get('/SimpleCreate', async (req, res) => {
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
    })
  }
  catch (err) {
    console.log(err);
  }

});

app.get('/SimpleDelete', async (req, res) => {
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

});

app.get('/SimpleUpdate', async (req, res) => {
  try {
    const oldDeller = await Owner.findOne({
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

});

const PORT = 8090;    // the port used by the website

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});