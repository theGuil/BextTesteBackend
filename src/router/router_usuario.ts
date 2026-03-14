import { Router } from "express";
import controller_usuario from "../controller/controller_usuario";
import t from "../types/entidades";

const router_usuario = Router();

router_usuario.post(t.Entidades.Usuario.Register.route, controller_usuario.register);

router_usuario.post(t.Entidades.Usuario.Login.route, controller_usuario.login);

export default router_usuario;