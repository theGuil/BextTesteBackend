import { Request, Response } from 'express';
import use_case_tarefa_buscar_pelo_usuario_id from "../use_case/tarefa/buscar_pelo_usuario_id";
import use_case_tarefa_criar_pelo_usuario_id from "../use_case/tarefa/criar_pelo_usuario_id";
import use_case_tarefa_atualizar_pelo_usuario_id from "../use_case/tarefa/atualizar_pelo_usuario_id";
import use_case_tarefa_deletar_pelo_usuario_id from "../use_case/tarefa/deletar_pelo_usuario_id";
import helpers from "../helpers/helpers";



const controller_tarefa = new class controller_tarefa {

    public async buscar_pelo_usuario_id(req: Request, res: Response) {
        try {
            const results = await new use_case_tarefa_buscar_pelo_usuario_id(req.body, req.usuario_auth).factory();

            return helpers.set_response.res.SUCCESS({ res, message: "Tarefas encontradas com sucesso!", results });

        } catch (error) {
            return helpers.set_response.res.SERVER_ERROR({ error, res });
        }
    }

    public async criar_pelo_usuario_id(req: Request, res: Response) {
        try {
            const results = await new use_case_tarefa_criar_pelo_usuario_id(req.body, req.usuario_auth).factory();

            return helpers.set_response.res.CREATED({ res, message: "Tarefa criada com sucesso!", results });

        } catch (error) {
            return helpers.set_response.res.SERVER_ERROR({ error, res });
        }
    }

    public async atualizar_pelo_usuario_id(req: Request, res: Response) {
        try {
            const results = await new use_case_tarefa_atualizar_pelo_usuario_id(req.body, req.usuario_auth).factory();

            return helpers.set_response.res.SUCCESS({ res, message: "Tarefa atualizada com sucesso!", results });

        } catch (error) {
            return helpers.set_response.res.SERVER_ERROR({ error, res });
        }
    }

    public async deletar_pelo_usuario_id(req: Request, res: Response) {
        try {
            const { id } = req.params;

            const results = await new use_case_tarefa_deletar_pelo_usuario_id({ id: String(id), usuario_id: "" }, req.usuario_auth).factory();

            return helpers.set_response.res.SUCCESS({ res, message: "Tarefa removida com sucesso!", results });

        } catch (error) {
            return helpers.set_response.res.SERVER_ERROR({ error, res });
        }
    }
}

export default controller_tarefa;