import { Router } from "express";
import controller_lista from "../controller/controller_lista";
import t from "../types/entidades";
import helpers from "../helpers/helpers";
const router_lista = Router();

router_lista.post(t.Entidades.Lista.CriarPeloUsuarioId.route, helpers.token.verificar_token, controller_lista.criar_lista_pelo_usuario_id);

router_lista.get(t.Entidades.Lista.BuscarPeloUsuarioId.route, helpers.token.verificar_token, controller_lista.buscar_pelo_usuario_id);

router_lista.patch(t.Entidades.Lista.AtualizarPeloUsuarioId.route, helpers.token.verificar_token, controller_lista.atualizar_pelo_usuario_id);

router_lista.delete(t.Entidades.Lista.DeletarPeloUsuarioId.route, helpers.token.verificar_token, controller_lista.deletar_pelo_usuario_id);

export default router_lista;