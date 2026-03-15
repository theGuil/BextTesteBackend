import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import t from "../../types/entidades";
import z4 from "zod/v4";

export const registerTarefaRoutes = (registry: OpenAPIRegistry) => {
    registry.registerPath({
        method: "post",
        path: t.Entidades.Tarefa.Criar.route,
        summary: "Criar tarefa do usuário",
        tags: ["Tarefa"],
        security: [{ BearerAuth: [] }],
        request: {
            params: z4.object({
                usuario_id: z4.string(),
                lista_id: z4.string()
            }),
            body: {
                content: { "application/json": { schema: t.Entidades.Tarefa.Criar.InputSchema } }
            }
        },
        responses: {
            201: { description: "Tarefa criada com sucesso" },
            401: { description: "Não autorizado" },
            400: { description: "Erro de validação" }
        }
    });

    registry.registerPath({
        method: "get",
        path: t.Entidades.Tarefa.BuscarPeloFiltro.route,
        summary: "Buscar tarefas do usuário",
        tags: ["Tarefa"],
        security: [{ BearerAuth: [] }],
        request: {
            params: z4.object({
                usuario_id: z4.string(),
                lista_id: z4.string()
            }),
        },
        responses: {
            200: { description: "Tarefas encontradas com sucesso" },
            401: { description: "Não autorizado" }
        }
    });

    registry.registerPath({
        method: "patch",
        path: t.Entidades.Tarefa.AtualizarPeloId.route,
        summary: "Atualizar tarefa do usuário",
        tags: ["Tarefa"],
        security: [{ BearerAuth: [] }],
        request: {
            params: z4.object({
                usuario_id: z4.string(),
                lista_id: z4.string(),
                tarefa_id: z4.string()
            }),
            body: {
                content: { "application/json": { schema: t.Entidades.Tarefa.AtualizarPeloId.InputSchema } }
            }
        },
        responses: {
            200: { description: "Tarefa atualizada com sucesso" },
            401: { description: "Não autorizado" },
            400: { description: "Erro de validação" }
        }
    });

    registry.registerPath({
        method: "delete",
        path: t.Entidades.Tarefa.DeletarPeloId.route,
        summary: "Deletar tarefa do usuário",
        tags: ["Tarefa"],
        security: [{ BearerAuth: [] }],
        request: {
            params: z4.object({
                usuario_id: z4.string(),
                lista_id: z4.string(),
                tarefa_id: z4.string()
            })
        },
        responses: {
            200: { description: "Tarefa deletada com sucesso" },
            401: { description: "Não autorizado" }
        }
    });
};