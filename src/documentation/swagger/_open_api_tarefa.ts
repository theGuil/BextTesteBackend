import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import t from "../../types/entidades";

export const registerTarefaRoutes = (registry: OpenAPIRegistry) => {
    registry.registerPath({
        method: "post",
        path: t.Entidades.Tarefa.Criar.route,
        summary: "Criar tarefa do usuário",
        tags: ["Tarefa"],
        security: [{ BearerAuth: [] }],
        request: {
            body: {
                content: { "application/json": { schema: t.Entidades.Tarefa.Criar.body } }
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
            query: t.Entidades.Tarefa.BuscarPeloFiltro.query,
        },
        responses: {
            200: { description: "Tarefas encontradas com sucesso" },
            401: { description: "Não autorizado" }
        }
    });

    registry.registerPath({
        method: "patch",
        path: t.Entidades.Tarefa.AtualizarPeloId.route.replace(':id', '{id}'),
        summary: "Atualizar tarefa do usuário",
        tags: ["Tarefa"],
        security: [{ BearerAuth: [] }],
        request: {
            params: t.Entidades.Tarefa.AtualizarPeloId.params,
            body: {
                content: { "application/json": { schema: t.Entidades.Tarefa.AtualizarPeloId.body } }
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
        path: t.Entidades.Tarefa.DeletarPeloId.route.replace(':id', '{id}'),
        summary: "Deletar tarefa do usuário",
        tags: ["Tarefa"],
        security: [{ BearerAuth: [] }],
        request: {
            params: t.Entidades.Tarefa.DeletarPeloId.params
        },
        responses: {
            200: { description: "Tarefa deletada com sucesso" },
            401: { description: "Não autorizado" }
        }
    });
};