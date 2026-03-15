import { Router } from "express";
import controller_lista from "../controller/controller_lista";
import t from "../types/entidades";
import helpers from "../helpers/helpers";
const router_lista = Router();

router_lista.post(t.Entidades.Lista.Criar.route, helpers.token.verificar_token, controller_lista.criar_lista_pelo_usuario_id);

router_lista.get(t.Entidades.Lista.BuscarPeloFiltro.route, helpers.token.verificar_token, controller_lista.buscar_pelo_filtro);

router_lista.patch(t.Entidades.Lista.AtualizarPeloId.route, helpers.token.verificar_token, controller_lista.atualizar_pelo_id);

router_lista.delete(t.Entidades.Lista.DeletarPeloId.route, helpers.token.verificar_token, controller_lista.deletar_pelo_id);

export default router_lista;