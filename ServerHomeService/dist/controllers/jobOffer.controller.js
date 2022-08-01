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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jobOffer_1 = __importDefault(require("../models/jobOffer"));
class JobOfferCcontroller {
    constructor() {
        this.createJobOffer = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { description, initialDate, finalDate, userClientId } = req.body;
            let newJobOffer = yield jobOffer_1.default.create({
                description: description,
                initialDate: initialDate,
                finalDate: finalDate,
                userClientId: userClientId
            }, {
                fields: ['description', 'initialDate', 'finalDate', 'userClientId']
            });
            res.json({ message: 'Nueva Oferta de Trabajo registrada' });
        });
        this.getJobOffers = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const joboffers = yield jobOffer_1.default.findAll({
                    attributes: ['idjoboffer', 'userClientId', 'description', 'initialDate', 'finalDate'],
                    order: [
                        ['idjoboffer', 'ASC'] /*'DESC'*/
                    ]
                });
                res.json({ joboffers });
            }
            catch (e) {
                console.log(e);
            }
        });
        this.getOneJobOffer = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const joboffer = yield jobOffer_1.default.findOne({
                where: { idjoboffer: id },
                attributes: ['idjoboffer', 'userClientId', 'description', 'initialDate', 'finalDate']
            });
            res.json(joboffer);
        });
        this.deleteJobOffer = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield jobOffer_1.default.destroy({
                where: {
                    idjoboffer: id
                }
            });
            res.json({ message: 'Oferta de Trabajo eliminada satisfactoriamente' });
        });
        this.updateJobOffer = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { userClientId, description, initialDate, finalDate } = req.body;
            const joboffer = yield jobOffer_1.default.findOne({
                attributes: ['description', 'initialDate', 'finalDate', 'userClientId', 'idjoboffer'],
                where: { idjoboffer: id }
            });
            const updatedjobOffer = yield jobOffer_1.default.update({
                description: description,
                initialDate: initialDate,
                finalDate: finalDate,
                userClientId: userClientId
            }, {
                where: { idjoboffer: id }
            });
            res.json({
                message: 'Oferta de Trabajo Actualizada',
                updatedjobOffer
            });
        });
        this.getJobOfferByUserClient = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { userClientId } = req.params;
            const joboffers = yield jobOffer_1.default.findAll({
                attributes: ['idjoboffer', 'userClientId', 'description', 'initialDate', 'finalDate'],
                where: { userClientId }
            });
            res.json({
                dataJobOffers: joboffers
            });
        });
    }
}
exports.default = JobOfferCcontroller;
//# sourceMappingURL=jobOffer.controller.js.map