import { Request, Response } from 'express';
import use_case_lista_buscar_pelo_usuario_id from "../use_case/lista/buscar_pelo_usuario_id";
import use_case_lista_criar_lista_pelo_usuario_id from "../use_case/lista/criar_pelo_usuario_id";
import use_case_lista_atualizar_pelo_usuario_id from "../use_case/lista/atualizar_pelo_usuario_id";
import use_case_lista_deletar_pelo_usuario_id from "../use_case/lista/deletar_pelo_usuario_id";
import helpers from "../helpers/helpers";

const controller_lista = new class controller_lista {

    public async buscar_pelo_usuario_id(req: Request, res: Response) {
        try {

            const results = await new use_case_lista_buscar_pelo_usuario_id({
                usuario_id: req.usuario_auth._id
            }, req.usuario_auth).factory();

            return helpers.set_response.res.SUCCESS({ res, message: "Listas encontradas com sucesso!", results });

        } catch (error) {
            return helpers.set_response.res.SERVER_ERROR({ error, res });
        }
    }

    public async criar_lista_pelo_usuario_id(req: Request, res: Response) {
        try {
            console.log(req.body, req.usuario_auth, 'req.body, req.usuario_auth');

            const results = await new use_case_lista_criar_lista_pelo_usuario_id(req.body, req.usuario_auth).factory();

            return helpers.set_response.res.CREATED({ res, message: "Lista criada com sucesso!", results });

        } catch (error) {
            return helpers.set_response.res.SERVER_ERROR({ error, res });
        }
    }

    public async atualizar_pelo_usuario_id(req: Request, res: Response) {
        try {
            const results = await new use_case_lista_atualizar_pelo_usuario_id({
                data: {
                    id: String(req.params.id),
                    usuario_id: req.usuario_auth._id,
                    nome: req.body.data.nome
                }
            }, req.usuario_auth).factory();

            return helpers.set_response.res.SUCCESS({ res, message: "Lista atualizada com sucesso!", results });

        } catch (error) {
            return helpers.set_response.res.SERVER_ERROR({ error, res });
        }
    }

    public async deletar_pelo_usuario_id(req: Request, res: Response) {
        try {
            const results = await new use_case_lista_deletar_pelo_usuario_id({
                id: String(req.params.id),
                usuario_id: req.usuario_auth._id
            }, req.usuario_auth).factory();

            return helpers.set_response.res.SUCCESS({ res, message: "Lista removida com sucesso!", results });

        } catch (error) {
            return helpers.set_response.res.SERVER_ERROR({ error, res });
        }
    }
}

export default controller_lista;