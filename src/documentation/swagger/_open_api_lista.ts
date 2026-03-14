import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import t from "../../types/entidades";

export const registerListaRoutes = (registry: OpenAPIRegistry) => {
    registry.registerPath({
        method: "post",
        path: t.Entidades.Lista.CriarPeloUsuarioId.route,
        summary: "Criar lista",
        tags: ["Lista"],
        request: {
            body: {
                content: { "application/json": { schema: t.Entidades.Lista.CriarPeloUsuarioId.InputSchema } }
            }
        },
        responses: {
            201: { description: "Lista criada com sucesso" },
            400: { description: "Erro de validação" }
        }
    });

    registry.registerPath({
        method: "get",
        path: t.Entidades.Lista.BuscarPeloUsuarioId.route,
        summary: "Buscar listas do usuário",
        tags: ["Lista"],
        responses: {
            200: { description: "Listas encontradas com sucesso" },
            404: { description: "Nenhuma lista encontrada" }
        }
    });

    registry.registerPath({
        method: "patch",
        path: t.Entidades.Lista.AtualizarPeloUsuarioId.route,
        summary: "Atualizar lista",
        tags: ["Lista"],
        request: {
            // Acessamos o schema dentro de 'data' para pegar o 'id'
            params: t.Entidades.Lista.AtualizarPeloUsuarioId.InputSchema.shape.data.pick({ id: true }),
            body: {
                content: {
                    "application/json": {
                        // Enviamos o restante do schema de data para o body
                        schema: t.Entidades.Lista.AtualizarPeloUsuarioId.InputSchema.shape.data
                    }
                }
            }
        },
        responses: {
            200: { description: "Lista atualizada com sucesso" },
            400: { description: "Erro de validação" }
        }
    });

    registry.registerPath({
        method: "delete",
        path: t.Entidades.Lista.DeletarPeloUsuarioId.route,
        summary: "Deletar lista",
        tags: ["Lista"],
        request: {
            params: t.Entidades.Lista.DeletarPeloUsuarioId.InputSchema.pick({ id: true })
        },
        responses: {
            200: { description: "Lista deletada com sucesso" }
        }
    });
};