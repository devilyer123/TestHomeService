import Sequelize from 'sequelize';
import database from '../classes/sequelize';

import JobOffer from './jobOffer';

const UserClient = database.define('userClients', {
    iduserclient: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    firstName: {
        type: Sequelize.STRING
    },
    secName: {
        type: Sequelize.STRING
    },
    lastName: {
        type: Sequelize.STRING
    },
    motherLastName: {
        type: Sequelize.STRING
    },
    cellphonenumber: {
        type: Sequelize.INTEGER,
        unique: true
    },
    email: {
        type: Sequelize.STRING
    },
    password: {
        type: Sequelize.STRING
    }
}/*, {
    //El timestamps se puede utilizar pa que postgress
    //cree dos casillas de creacion del dato y actualizacion del dato
    //que la base de datos manera por si sola y podremos recuperar esa informacion para algo
    //es opcional si ustedes lo usan sino lo eliminan todo esto comentado
    //si lo quiren lo descomentan y lo ponene en true
    timestamps: false,
}*/)

//Un Usuario Cliente tiene muchas Ofertas de Trabajo
UserClient.hasMany(JobOffer, {foreignKey:'userClientId', sourceKey:'iduserclient'});
//Una Oferta de Trabajo tiene solamente un Usuario Cliente
JobOffer.belongsTo(UserClient, {foreignKey:'userClientId'});

export default UserClient;