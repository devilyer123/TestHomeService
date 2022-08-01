import { Response, Router } from "express";
import { TokenValidation } from '../middlewares/autenticacion';
import UserClientController from "../controllers/userClient.controller";
import JobOfferCcontroller from "../controllers/jobOffer.controller";

class UserRoutes {
    static init(router: Router) {

        //apis de usuario cliente __ /api/v1/
        router.post('/userclient/create', this.userClientController.createUserClient);

        router.get('/usersclient', this.userClientController.getUsersClient);

        router.get('/usersclient/:id', this.userClientController.getOneUserClient);

        router.delete('/usersclient/:id', this.userClientController.deleteUserClient);

        router.put('/usersclient/:id', this.userClientController.updateUserClient);

        router.post('/usersclient/login', this.userClientController.loginUserClient);

        router.get('/profile', TokenValidation , this.userClientController.profile);

        //apis de oferta de trabajo
        router.post('/joboffers/create', this.jobOfferController.createJobOffer);

        router.get('/joboffers', this.jobOfferController.getJobOffers);

        router.delete('/joboffers/:id', this.jobOfferController.deleteJobOffer);

        router.put('/joboffers/:id', this.jobOfferController.updateJobOffer);

        router.get('/joboffers/:id', this.jobOfferController.getOneJobOffer);

        router.get('/joboffers/userclient/:userId', this.jobOfferController.getJobOfferByUserClient);

    }
    static userClientController = new UserClientController();
    static jobOfferController = new JobOfferCcontroller();
}

export default UserRoutes;