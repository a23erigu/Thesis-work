"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var sequelize_1 = require("sequelize");
var express = require('express');
var app = express();
var sequelize = new sequelize_1.Sequelize('petclinic', 'petclinic', 'petclinic', {
    host: 'postgres',
    dialect: 'postgres',
    logging: console.log,
    port: 5432
});
try {
    sequelize.authenticate();
    console.log('Connection has been established successfully.'); //tests connection
}
catch (error) {
    console.error('Unable to connect to the database:', error);
}
var Owner = sequelize.define('Owner', {
    first_name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    last_name: {
        type: sequelize_1.DataTypes.STRING,
    },
    address: {
        type: sequelize_1.DataTypes.STRING,
    },
    city: {
        type: sequelize_1.DataTypes.STRING,
    },
    telephone: {
        type: sequelize_1.DataTypes.STRING,
    }
}, {
    tableName: 'owners',
    timestamps: false,
});
var Type = sequelize.define('Type', {
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
}, {
    tableName: 'types',
    timestamps: false,
});
var Pet = sequelize.define('Pet', {
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    birth_date: {
        type: sequelize_1.DataTypes.DATE,
    },
}, {
    tableName: 'pets',
    timestamps: false,
});
Pet.belongsTo(Type, { foreignKey: "type_id" });
Type.hasOne(Pet, { foreignKey: "type_id" });
Pet.belongsTo(Owner, { foreignKey: "owner_id" });
Owner.hasMany(Pet, { foreignKey: "owner_id" });
var Visit = sequelize.define('Visit', {
    visit_date: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
    description: {
        type: sequelize_1.DataTypes.STRING,
    },
}, {
    tableName: 'visits',
    timestamps: false,
});
Visit.belongsTo(Pet, { foreignKey: "pet_id" });
Pet.hasMany(Visit, { foreignKey: "pet_id" });
var Vet = sequelize.define('Vet', {
    first_name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    last_name: {
        type: sequelize_1.DataTypes.STRING,
    }
}, {
    tableName: 'vets',
    timestamps: false,
});
var Specialty = sequelize.define('Specialty', {
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    }
}, {
    tableName: 'specialties',
    timestamps: false,
});
var Vet_Specialty = sequelize.define('Vet_Specialty', {}, {
    tableName: 'vet_specialties',
    timestamps: false,
});
Vet.belongsToMany(Specialty, { through: Vet_Specialty, foreignKey: "vet_id" });
Specialty.belongsToMany(Vet, { through: Vet_Specialty, foreignKey: "specialty_id" });
// select everything
app.get('/', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var owners, types, pets, visits, vets, specialties, user3pets, petsFowner, petsFcity, ownerWpetWvisit, vet3spec, vetWsurgery;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, Owner.findAll()];
            case 1:
                owners = _a.sent();
                return [4 /*yield*/, Type.findAll()];
            case 2:
                types = _a.sent();
                return [4 /*yield*/, Pet.findAll()];
            case 3:
                pets = _a.sent();
                return [4 /*yield*/, Visit.findAll()];
            case 4:
                visits = _a.sent();
                return [4 /*yield*/, Vet.findAll()];
            case 5:
                vets = _a.sent();
                return [4 /*yield*/, Specialty.findAll()];
            case 6:
                specialties = _a.sent();
                return [4 /*yield*/, Pet.findAll({
                        where: {
                            owner_id: 3
                        }
                    })];
            case 7:
                user3pets = _a.sent();
                return [4 /*yield*/, Owner.findAll({
                        where: {
                            first_name: 'Betty'
                        },
                        include: [{
                                model: Pet,
                                required: true,
                            }]
                    })];
            case 8:
                petsFowner = _a.sent();
                return [4 /*yield*/, Pet.findAll({
                        include: [{
                                model: Owner,
                                where: {
                                    city: 'Madison'
                                }
                            }]
                    })];
            case 9:
                petsFcity = _a.sent();
                return [4 /*yield*/, Owner.findAll({
                        include: [{
                                model: Pet,
                                required: true,
                                include: [{
                                        model: Visit,
                                        required: true,
                                    }]
                            }]
                    })];
            case 10:
                ownerWpetWvisit = _a.sent();
                return [4 /*yield*/, Vet_Specialty.findAll({
                        where: {
                            vet_id: 3
                        }
                    })];
            case 11:
                vet3spec = _a.sent();
                return [4 /*yield*/, Vet.findAll({
                        include: [{
                                model: Specialty,
                                required: true,
                                where: { name: "surgery" }
                            }]
                    })];
            case 12:
                vetWsurgery = _a.sent();
                res.json({
                    owners: owners,
                    types: types,
                    pets: pets,
                    visits: visits,
                    vets: vets,
                    specialties: specialties,
                    user3pets: user3pets,
                    petsFowner: petsFowner,
                    petsFcity: petsFcity,
                    ownerWpetWvisit: ownerWpetWvisit,
                    vet3spec: vet3spec,
                    vetWsurgery: vetWsurgery,
                });
                return [2 /*return*/];
        }
    });
}); });
app.get('/AllElement', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var owners, types, pets, visits, vets, specialties;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, Owner.findAll()];
            case 1:
                owners = _a.sent();
                return [4 /*yield*/, Type.findAll()];
            case 2:
                types = _a.sent();
                return [4 /*yield*/, Pet.findAll()];
            case 3:
                pets = _a.sent();
                return [4 /*yield*/, Visit.findAll()];
            case 4:
                visits = _a.sent();
                return [4 /*yield*/, Vet.findAll()];
            case 5:
                vets = _a.sent();
                return [4 /*yield*/, Specialty.findAll()];
            case 6:
                specialties = _a.sent();
                res.json({
                    owners: owners,
                    types: types,
                    pets: pets,
                    visits: visits,
                    vets: vets,
                    specialties: specialties,
                });
                return [2 /*return*/];
        }
    });
}); });
app.get('/killBob', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var Bob, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                return [4 /*yield*/, Vet.findOne({
                        where: {
                            first_name: "Bob"
                        }
                    })];
            case 1:
                Bob = _a.sent();
                return [4 /*yield*/, Vet_Specialty.destroy({
                        where: {
                            vet_id: Bob === null || Bob === void 0 ? void 0 : Bob.get("id")
                        }
                    })];
            case 2:
                _a.sent();
                return [4 /*yield*/, Vet.destroy({
                        where: {
                            first_name: "Bob"
                        }
                    })];
            case 3:
                _a.sent();
                res.send("deletion works");
                return [3 /*break*/, 5];
            case 4:
                err_1 = _a.sent();
                console.log(err_1);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); });
app.get('/createBob', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var Bob, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, Vet.create({
                        first_name: "Bob",
                        last_name: "Davidson"
                    })];
            case 1:
                Bob = _a.sent();
                return [4 /*yield*/, Vet_Specialty.create({
                        vet_id: Bob.get("id"),
                        specialty_id: 1
                    })];
            case 2:
                _a.sent();
                res.send("creation success");
                return [3 /*break*/, 4];
            case 3:
                err_2 = _a.sent();
                console.log(err_2);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
var PORT = 8090; // the port used by the website
app.listen(PORT, function () {
    console.log("Example app listening at http://localhost:".concat(PORT));
});
