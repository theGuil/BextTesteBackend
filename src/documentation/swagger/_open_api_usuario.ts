import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import t from "../../types/entidades";

export const registerUsuarioRoutes = (registry: OpenAPIRegistry) => {
    registry.registerPath({
        method: "post",
        path: t.Entidades.Usuario.Register.route,
        summary: "Registrar usuário",
        tags: ["Usuário"],
        request: {
            body: {
                content: { "application/json": { schema: t.Entidades.Usuario.Register.body } }
            }
        },
        responses: {
            201: { description: "Usuário registrado com sucesso" },
            400: { description: "Erro de validação" }
        }
    });

    registry.registerPath({
        method: "post",
        path: t.Entidades.Usuario.Login.route,
        summary: "Login de usuário",
        tags: ["Usuário"],
        request: {
            body: {
                content: { "application/json": { schema: t.Entidades.Usuario.Login.body } }
            }
        },
        responses: {
            200: { description: "Login realizado com sucesso" },
            401: { description: "Credenciais inválidas" }
        }
    });


};