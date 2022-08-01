"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = __importDefault(require("sequelize"));
const sequelize_2 = __importDefault(require("../classes/sequelize"));
const JobOffer = sequelize_2.default.define('jobOffers', {
    idjoboffer: {
        type: sequelize_1.default.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    description: {
        type: sequelize_1.default.STRING
    },
    initialDate: {
        type: sequelize_1.default.DATE
    },
    finalDate: {
        type: sequelize_1.default.DATE
    },
    userClientId: {
        type: sequelize_1.default.INTEGER
    }
} /*, {
    //El timestamps se puede utilizar pa que postgress
    //cree dos casillas de creacion del dato y actualizacion del dato
    //que la base de datos manera por si sola y podremos recuperar esa informacion para algo
    //es opcional si ustedes lo usan sino lo eliminan todo esto comentado
    //si lo quiren lo descomentan y lo ponene en true
    timestamps: false,
}*/);
exports.default = JobOffer;
//# sourceMappingURL=jobOffer.js.map