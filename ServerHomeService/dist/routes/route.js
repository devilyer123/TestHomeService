"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const autenticacion_1 = require("../middlewares/autenticacion");
const userClient_controller_1 = __importDefault(require("../controllers/userClient.controller"));
const jobOffer_controller_1 = __importDefault(require("../controllers/jobOffer.controller"));
class UserRoutes {
    static init(router) {
        //apis de usuario cliente __ /api/v1/
        router.post('/userclient/create', this.userClientController.createUserClient);
        router.get('/usersclient', this.userClientController.getUsersClient);
        router.get('/usersclient/:id', this.userClientController.getOneUserClient);
        router.delete('/usersclient/:id', this.userClientController.deleteUserClient);
        router.put('/usersclient/:id', this.userClientController.updateUserClient);
        router.post('/usersclient/login', this.userClientController.loginUserClient);
        router.get('/profile', autenticacion_1.TokenValidation, this.userClientController.profile);
        //apis de oferta de trabajo
        router.post('/joboffers/create', this.jobOfferController.createJobOffer);
        router.get('/joboffers', this.jobOfferController.getJobOffers);
        router.delete('/joboffers/:id', this.jobOfferController.deleteJobOffer);
        router.put('/joboffers/:id', this.jobOfferController.updateJobOffer);
        router.get('/joboffers/:id', this.jobOfferController.getOneJobOffer);
        router.get('/joboffers/userclient/:userId', this.jobOfferController.getJobOfferByUserClient);
    }
}
UserRoutes.userClientController = new userClient_controller_1.default();
UserRoutes.jobOfferController = new jobOffer_controller_1.default();
exports.default = UserRoutes;
//# sourceMappingURL=route.js.map