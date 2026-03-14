import { Request, Response } from 'express';
import use_case_usuario_register from "../use_case/usuario/register";
import helpers from "../helpers/helpers";

const controller_usuario = new class controller_usuario {

    public async register(req: Request, res: Response) {
        try {
            const results = await new use_case_usuario_register(req.body).factory();

            return helpers.set_response.res.CREATED({ res, message: "Usuário registrado com sucesso!", results });

        } catch (error) {
            return helpers.set_response.res.SERVER_ERROR({ error, res });
        }
    }
}

export default controller_usuario;