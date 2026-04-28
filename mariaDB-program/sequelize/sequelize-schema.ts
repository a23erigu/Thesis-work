import { DataTypes } from 'sequelize';
import { sequelize } from './sequelize-db';

// id gets defined automatically by sequelize

export const Owner = sequelize.define(
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

export const Type = sequelize.define(
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

export const Pet = sequelize.define(
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
export const PetWowner = Pet.belongsTo(Owner, { foreignKey: "owner_id" });
const OwnerWpet = Owner.hasMany(Pet, { foreignKey: "owner_id" });

export const Visit = sequelize.define(
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

export const VisitWpet = Visit.belongsTo(Pet, { foreignKey: "pet_id"});
const PetWvisit = Pet.hasMany(Visit, { foreignKey: "pet_id"});

export const Vet = sequelize.define(               
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

export const Specialty = sequelize.define(             
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

export const Vet_Specialty = sequelize.define(      
  'Vet_Specialty',
  {},
  {
    tableName: 'vet_specialties',     
    timestamps: false,      
  },
);

Vet.belongsToMany(Specialty, {through: Vet_Specialty, foreignKey: "vet_id"});          
Specialty.belongsToMany(Vet, {through: Vet_Specialty, foreignKey: "specialty_id"});    