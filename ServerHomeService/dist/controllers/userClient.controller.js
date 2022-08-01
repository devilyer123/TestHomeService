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
const userClient_1 = __importDefault(require("../models/userClient"));
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
class UserClientController {
    constructor() {
        this.createUserClient = (req, res) => __awaiter(this, void 0, void 0, function* () {
            let password = bcrypt.hashSync(req.body.password, 10);
            const { firstName, secName, lastName, motherLastName, cellphonenumber, email } = req.body;
            try {
                let userclient = yield userClient_1.default.findOne({
                    where: {
                        email: email
                    }
                });
                if (userclient) {
                    res. /*status(404).*/json({ ok: false, message: "Este email de usuario ya esta siendo utilizado" });
                }
                else {
                    let newUserClient = yield userClient_1.default.create({
                        firstName: firstName,
                        secName: secName,
                        lastName: lastName,
                        motherLastName: motherLastName,
                        cellphonenumber: cellphonenumber,
                        email: email,
                        password: password
                    });
                    if (newUserClient) {
                        let token = jwt.sign({ newUserClient: newUserClient }, "secret");
                        return res.json({
                            ok: true,
                            message: 'Usuario Cliente creado satisfactoriamente',
                            dataUsersClient: newUserClient,
                            token: token
                        });
                    }
                }
            }
            catch (e) {
                console.log(e);
                res.status(500).json({
                    ok: false,
                    message: 'Ha ocurrido un error inesperado',
                    dataUsersClient: {}
                });
            }
        });
        this.getUsersClient = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const usersclient = yield userClient_1.default.findAll({
                    order: [
                        ['firstName', 'ASC']
                    ]
                });
                res.json({
                    dataUsersClient: usersclient
                });
            }
            catch (e) {
                console.log(e);
            }
        });
        this.getOneUserClient = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const userClient = yield userClient_1.default.findOne({
                where: {
                    iduserclient: id
                }
            });
            res.json(userClient);
        });
        this.deleteUserClient = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const deleteRowCount = yield userClient_1.default.destroy({
                where: {
                    iduserclient: id
                }
            });
            res.json({
                message: 'Usuario Cliente eliminado satisfactoriamente',
                count: deleteRowCount
            });
        });
        this.updateUserClient = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { firstName, secName, lastName, motherLastName, cellphonenumber, email /*, password*/ } = req.body;
            const usersClient = yield userClient_1.default.findAll({
                attributes: ['iduserclient', 'firstName', 'secName', 'lastName', 'motherLastName', 'cellphonenumber', 'email' /*, 'password'*/],
                where: {
                    iduserclient: id
                }
            });
            if (usersClient.length > 0) {
                usersClient.forEach((userclient) => __awaiter(this, void 0, void 0, function* () {
                    yield userclient.update({
                        firstName: firstName,
                        secName: secName,
                        lastName: lastName,
                        motherLastName: motherLastName,
                        cellphonenumber: cellphonenumber,
                        email: email,
                        //password: bcrypt.hashSync(password, 10)
                    });
                }));
            }
            return res.json({
                message: 'Usuario Cliente actualizado satisfactoriamente',
                dataUsersClient: usersClient
            });
        });
        this.loginUserClient = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            try {
                let userclient = yield userClient_1.default.findOne({
                    where: {
                        email: email
                    }
                });
                if (!userclient) {
                    res. /*status(404).*/json({ ok: false, message: "Usuario Cliente con este email no encontrado" });
                }
                else {
                    if (bcrypt.compareSync(password, userclient.password)) {
                        let token = jwt.sign({ userclient: userclient }, "secret");
                        return res.header('x-token', token).json({
                            userclient: userclient,
                            ok: true,
                            token: token
                        });
                    }
                    else {
                        return res. /*status(401).*/json({ ok: false, message: "Contraseña Incorrecta" });
                    }
                }
            }
            catch (e) {
                res.status(500).json({
                    ok: false,
                    message: 'Email/Constraseña no son correctos',
                });
            }
        });
        this.profile = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const userclient = yield userClient_1.default.findOne({ where: { iduserclient: req.userIdClient } });
            if (!userclient) {
                return res.status(404).json('No se encontro este usuario');
            }
            ;
            res.json(userclient);
        });
    }
}
exports.default = UserClientController;
//# sourceMappingURL=userClient.controller.js.map