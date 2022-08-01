import { Request, Response } from "express";
import UserClient from "../models/userClient";
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

export default class UserClientController {
    createUserClient = async (req: Request, res: Response) => {
        let password = bcrypt.hashSync(req.body.password, 10);
        const { firstName, secName, lastName, motherLastName, cellphonenumber, email } = req.body;
        try {
            let userclient = await UserClient.findOne({
                where: {
                    email: email
                }
            });
            if (userclient) {
                res./*status(404).*/json({ok: false, message: "Este email de usuario ya esta siendo utilizado"});
            } else {
                let newUserClient = await UserClient.create({
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
        } catch (e) {
            console.log(e);
            res.status(500).json({
                ok: false,
                message: 'Ha ocurrido un error inesperado',
                dataUsersClient: {}
            });
        }
    }

    getUsersClient = async (req: Request, res: Response) => {
        try {
            const usersclient = await UserClient.findAll({
                order: [
                    ['firstName', 'ASC']
                ]
            });
            res.json({
                dataUsersClient: usersclient
            });
        } catch (e) {
            console.log(e);
        }
    }

    getOneUserClient = async (req: Request, res: Response) => {
        const { id } = req.params;
        const userClient = await UserClient.findOne({
            where: {
                iduserclient: id
            }
        })
        res.json(userClient);
    }

    deleteUserClient = async (req: Request, res: Response) => {
        const { id } = req.params;
        const deleteRowCount = await UserClient.destroy({
            where: {
                iduserclient: id
            }
        });
        res.json({
            message: 'Usuario Cliente eliminado satisfactoriamente',
            count: deleteRowCount
        });
    }

    updateUserClient = async (req: Request, res: Response) => {
        const { id } = req.params;
        const { firstName, secName, lastName, motherLastName, cellphonenumber, email/*, password*/ } = req.body;

        const usersClient = await UserClient.findAll({
            attributes: [ 'iduserclient', 'firstName', 'secName', 'lastName', 'motherLastName', 'cellphonenumber', 'email'/*, 'password'*/ ],
            where: {
                iduserclient: id
            }
        });

        if(usersClient.length > 0) {
            usersClient.forEach(async userclient => {
                await userclient.update({
                    firstName: firstName,
                    secName: secName,
                    lastName: lastName,
                    motherLastName: motherLastName,
                    cellphonenumber: cellphonenumber,
                    email: email,
                    //password: bcrypt.hashSync(password, 10)
                });
            })
        }

        return res.json({
            message: 'Usuario Cliente actualizado satisfactoriamente',
            dataUsersClient: usersClient
        })
    }

    loginUserClient = async (req: Request, res: Response) => {
        const { email, password } = req.body;
        try{
            let userclient = await UserClient.findOne({
                where: {
                    email: email
                }
            });
            if (!userclient) {
                res./*status(404).*/json({ok: false, message: "Usuario Cliente con este email no encontrado"});
            } else {
                if (bcrypt.compareSync(password, userclient.password)) {
                    
                    let token = jwt.sign({ userclient: userclient }, "secret");
                    return res.header('x-token', token).json({
                        userclient: userclient,
                        ok: true,
                        token: token
                    })
                } else {
                    return res./*status(401).*/json({ok: false, message: "Contraseña Incorrecta" })
                }
            }
        } catch (e) {
            res.status(500).json({
                ok: false,
                message: 'Email/Constraseña no son correctos',
            });
        }
    }

    profile = async (req: Request, res: Response) => {
        const userclient = await UserClient.findOne({where: { iduserclient: req.userIdClient }})
        if (!userclient) {return res.status(404).json('No se encontro este usuario')};
        res.json(userclient);
    }
}