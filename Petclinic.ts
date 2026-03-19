import { Sequelize, DataTypes, Model } from 'sequelize';

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


(async () => {

    const owners = await Owner.findAll();       //selects all users
    console.log('All users:', JSON.stringify(owners, null, 2));    //prints users 

    const types = await Type.findAll();       
    console.log('All types:', JSON.stringify(types, null, 2)); 

    const pets = await Pet.findAll();       
    console.log('All pets:', JSON.stringify(pets, null, 2)); 

    const visits = await Visit.findAll();       
    console.log('All visits:', JSON.stringify(visits, null, 2)); 

    const vets = await Vet.findAll();       
    console.log('All vets:', JSON.stringify(vets, null, 2)); 

    const specialties = await Specialty.findAll();       
    console.log('All specialties:', JSON.stringify(specialties, null, 2)); 

    const User3pets = await Pet.findAll({
      where: {
        owner_id: 3
      }
    });       
    console.log('All pets from owner 3:', JSON.stringify(User3pets, null, 2)); 

    const petsFownerN = await Owner.findAll({
      where: {
        first_name: 'Betty'
      },
      include: [{
        model: Pet,
        required: true,
      }]
    });   
    console.log('All pets with owner Betty:', JSON.stringify(petsFownerN, null, 2)); 

    const petsFcity = await Pet.findAll({
      include: [{
        model: Owner,
        where: {
          city: 'Madison'
        }
      }]
    });       
    console.log('All pets living in Madison:', JSON.stringify(petsFcity, null, 2)); 

    const ownerWpetWvisit = await Owner.findAll({
      include: [{
        model: Pet,
        required: true,
        include: [{
          model: Visit,
          required: true,
        }]
      }]
    });       
    console.log('All owners who have had a visit with a pet:', JSON.stringify(ownerWpetWvisit, null, 2)); 

    const vet3spec = await Vet_Specialty.findAll({
      where: {
        vet_id: 3
      }
    });       
    console.log('All specialty id from vet 3:', JSON.stringify(vet3spec, null, 2)); 

    const vetWsurgery = await Vet.findAll({
      include: [{
        model: Specialty,
        required: true,
        where: { name: "surgery"}
      }]
    });       
    console.log('All vets with surgery specialty:', JSON.stringify(vetWsurgery, null, 2)); 

    const radiology = await Specialty.findAll({
      where: {
        id: 1
      }
    });
    console.log('Radiology:', JSON.stringify(radiology, null, 2)); 


    // Create

    //const Matilda = await Owner.create({first_name: "Matilda", last_name: "Obryan", address: "146 Obal St.", city: "London", telephone: "0008723410"})

    //const Bob = await Vet.create({first_name: "Bob", last_name: "Davidson"});
    //await Vet_Specialty.create({vet_id: Bob.get("id"), specialty_id: 1});
    


    // Delete
    /*
    await Vet.destroy({
      where: {
        first_name: "Bob"
      }
    })
    */

})();