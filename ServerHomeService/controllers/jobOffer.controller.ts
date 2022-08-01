import { Request, Response } from "express";
import JobOffer from '../models/jobOffer';

export default class JobOfferCcontroller {
    createJobOffer = async (req: Request, res: Response) => {
        const { description, initialDate, finalDate, userClientId } = req.body;
        let newJobOffer = await JobOffer.create({
            description: description,
            initialDate: initialDate,
            finalDate: finalDate,
            userClientId: userClientId
        }, {
            fields: [ 'description', 'initialDate', 'finalDate', 'userClientId' ]
        });
        res.json({message: 'Nueva Oferta de Trabajo registrada'});
    }

    getJobOffers = async (req: Request, res: Response) => {
        try {
            const joboffers = await JobOffer.findAll({
                attributes: [ 'idjoboffer', 'userClientId', 'description', 'initialDate', 'finalDate' ],
                order: [
                    ['idjoboffer', 'ASC'] /*'DESC'*/
                ]
            });
            res.json({joboffers});
        } catch (e) {
            console.log(e);
        }
    }

    getOneJobOffer = async (req: Request, res: Response) => {
        const { id } = req.params;        
        const joboffer = await JobOffer.findOne({
            where: { idjoboffer: id },
            attributes: [ 'idjoboffer', 'userClientId', 'description', 'initialDate', 'finalDate' ]
        });
        res.json(joboffer);
    }

    deleteJobOffer = async (req: Request, res: Response) => {
        const { id } = req.params;
        await JobOffer.destroy({
            where: {
                idjoboffer: id
            }
        });
        res.json({message: 'Oferta de Trabajo eliminada satisfactoriamente'});
    }

    updateJobOffer = async (req: Request, res: Response) => {
        const { id } = req.params;
        const { userClientId, description, initialDate, finalDate } = req.body;

        const joboffer =  await JobOffer.findOne({
            attributes: [ 'description', 'initialDate', 'finalDate', 'userClientId', 'idjoboffer' ],
            where: { idjoboffer: id }
        });
        
        const updatedjobOffer = await JobOffer.update({
            description: description,
            initialDate: initialDate,
            finalDate: finalDate,
            userClientId: userClientId
        }, {
            where: {idjoboffer: id}
        });

        res.json({
            message: 'Oferta de Trabajo Actualizada',
            updatedjobOffer
        })

    }

    getJobOfferByUserClient = async (req: Request, res: Response) => {
        const { userClientId } = req.params;
        const joboffers = await JobOffer.findAll({
            attributes: ['idjoboffer', 'userClientId', 'description', 'initialDate', 'finalDate'],
            where: { userClientId }
        });
        res.json({
            dataJobOffers: joboffers
        });
    }
}