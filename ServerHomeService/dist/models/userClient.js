"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = __importDefault(require("sequelize"));
const sequelize_2 = __importDefault(require("../classes/sequelize"));
const jobOffer_1 = __importDefault(require("./jobOffer"));
const UserClient = sequelize_2.default.define('userClients', {
    iduserclient: {
        type: sequelize_1.default.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    firstName: {
        type: sequelize_1.default.STRING
    },
    secName: {
        type: sequelize_1.default.STRING
    },
    lastName: {
        type: sequelize_1.default.STRING
    },
    motherLastName: {
        type: sequelize_1.default.STRING
    },
    cellphonenumber: {
        type: sequelize_1.default.INTEGER,
        unique: true
    },
    email: {
        type: sequelize_1.default.STRING
    },
    password: {
        type: sequelize_1.default.STRING
    }
} /*, {
    //El timestamps se puede utilizar pa que postgress
    //cree dos casillas de creacion del dato y actualizacion del dato
    //que la base de datos manera por si sola y podremos recuperar esa informacion para algo
    //es opcional si ustedes lo usan sino lo eliminan todo esto comentado
    //si lo quiren lo descomentan y lo ponene en true
    timestamps: false,
}*/);
//Un Usuario Cliente tiene muchas Ofertas de Trabajo
UserClient.hasMany(jobOffer_1.default, { foreignKey: 'userClientId', sourceKey: 'iduserclient' });
//Una Oferta de Trabajo tiene solamente un Usuario Cliente
jobOffer_1.default.belongsTo(UserClient, { foreignKey: 'userClientId' });
exports.default = UserClient;
//# sourceMappingURL=userClient.js.map