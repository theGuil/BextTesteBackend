import { Router } from "express";
import controller_usuario from "../controller/controller_usuario";
import t from "../types/entidades";

const router_usuario = Router();

router_usuario.post(t.Entidades.Usuario.Register.route, controller_usuario.register);

export default router_usuario;