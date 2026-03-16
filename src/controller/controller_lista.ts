import { Request, Response } from 'express';
import use_case_lista_buscar_pelo_filtro from "../use_case/lista/buscar_pelo_filtro";
import use_case_lista_criar from "../use_case/lista/criar";
import use_case_lista_atualizar_pelo_id from "../use_case/lista/atualizar_pelo_id";
import use_case_lista_deletar_pelo_id from "../use_case/lista/deletar_pelo_id";
import helpers from "../helpers/helpers";

import t from '../types/entidades';

const controller_lista = new class controller_lista {

    public async buscar_pelo_filtro(req: Request, res: Response) {
        try {

            const results = await new use_case_lista_buscar_pelo_filtro(req.query, req.usuario_auth).factory();

            return helpers.set_response.res.SUCCESS({ res, message: "Listas encontradas com sucesso!", results });
        } catch (error) {
            return helpers.set_response.res.SERVER_ERROR({ error, res });
        }
    }

    public async criar(req: Request, res: Response) {
        try {

            const results = await new use_case_lista_criar(req.body, req.usuario_auth).factory();

            return helpers.set_response.res.CREATED({ res, message: "Lista criada com sucesso!", results });
        } catch (error) {
            return helpers.set_response.res.SERVER_ERROR({ error, res });
        }
    }

    public async atualizar_pelo_id(req: Request, res: Response) {
        try {

            const results = await new use_case_lista_atualizar_pelo_id(
                req.body,
                req.params,
                req.usuario_auth
            ).factory();

            return helpers.set_response.res.SUCCESS({ res, message: "Lista atualizada com sucesso!", results });
        } catch (error) {
            return helpers.set_response.res.SERVER_ERROR({ error, res });
        }
    }

    public async deletar_pelo_id(req: Request, res: Response) {
        try {

            const results = await new use_case_lista_deletar_pelo_id(req?.params, req.usuario_auth).factory();

            return helpers.set_response.res.SUCCESS({ res, message: "Lista removida com sucesso!", results });
        } catch (error) {
            return helpers.set_response.res.SERVER_ERROR({ error, res });
        }
    }
}

export default controller_lista;