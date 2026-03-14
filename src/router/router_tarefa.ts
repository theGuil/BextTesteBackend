import { Router } from "express";
import controller_tarefa from "../controller/controller_tarefa";
import t from "../types/entidades";
import helpers from "../helpers/helpers";

const router_tarefa = Router();

router_tarefa.post(t.Entidades.Tarefa.CriarPeloUsuarioId.route, helpers.token.verificar_token, controller_tarefa.criar_pelo_usuario_id);

router_tarefa.get(t.Entidades.Tarefa.BuscarPeloUsuarioId.route, helpers.token.verificar_token, controller_tarefa.buscar_pelo_usuario_id);

router_tarefa.patch(t.Entidades.Tarefa.AtualizarPeloUsuarioId.route, helpers.token.verificar_token, controller_tarefa.atualizar_pelo_usuario_id);

router_tarefa.delete(t.Entidades.Tarefa.DeletarPeloUsuarioId.route, helpers.token.verificar_token, controller_tarefa.deletar_pelo_usuario_id);

export default router_tarefa;