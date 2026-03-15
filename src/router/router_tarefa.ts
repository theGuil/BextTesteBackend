import { Router } from "express";
import controller_tarefa from "../controller/controller_tarefa";
import t from "../types/entidades";
import helpers from "../helpers/helpers";

const router_tarefa = Router();

router_tarefa.post(t.Entidades.Tarefa.Criar.route, helpers.token.verificar_token, controller_tarefa.criar);

router_tarefa.get(t.Entidades.Tarefa.BuscarPeloFiltro.route, helpers.token.verificar_token, controller_tarefa.buscar_pelo_filtro);

router_tarefa.patch(t.Entidades.Tarefa.AtualizarPeloId.route, helpers.token.verificar_token, controller_tarefa.atualizar_pelo_id);

router_tarefa.delete(t.Entidades.Tarefa.DeletarPeloId.route, helpers.token.verificar_token, controller_tarefa.deletar_pelo_id);

export default router_tarefa;