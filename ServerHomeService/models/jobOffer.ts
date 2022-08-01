import Sequelize from 'sequelize';
import database from '../classes/sequelize';

const JobOffer = database.define('jobOffers', {
    idjoboffer: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    description: {
        type: Sequelize.STRING
    },
    initialDate: {
        type: Sequelize.DATE
    },
    finalDate: {
        type: Sequelize.DATE
    },
    userClientId: {
        type: Sequelize.INTEGER
    }
}/*, {
    //El timestamps se puede utilizar pa que postgress
    //cree dos casillas de creacion del dato y actualizacion del dato
    //que la base de datos manera por si sola y podremos recuperar esa informacion para algo
    //es opcional si ustedes lo usan sino lo eliminan todo esto comentado
    //si lo quiren lo descomentan y lo ponene en true
    timestamps: false,
}*/)

export default JobOffer;