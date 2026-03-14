import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import t from "../../types/entidades";

export const registerTarefaRoutes = (registry: OpenAPIRegistry) => {
    registry.registerPath({
        method: "post",
        path: t.Entidades.Tarefa.CriarPeloUsuarioId.route,
        summary: "Criar tarefa",
        tags: ["Tarefa"],
        request: {
            body: {
                content: { "application/json": { schema: t.Entidades.Tarefa.CriarPeloUsuarioId.InputSchema } }
            }
        },
        responses: {
            201: { description: "Tarefa criada com sucesso" },
            400: { description: "Erro de validação" }
        }
    });

    registry.registerPath({
        method: "get",
        path: t.Entidades.Tarefa.BuscarPeloUsuarioId.route,
        summary: "Buscar tarefas do usuário",
        tags: ["Tarefa"],
        responses: {
            200: { description: "Tarefas encontradas com sucesso" }
        }
    });

    registry.registerPath({
        method: "patch",
        path: t.Entidades.Tarefa.AtualizarPeloUsuarioId.route,
        summary: "Atualizar tarefa",
        tags: ["Tarefa"],
        request: {
            params: t.Entidades.Tarefa.AtualizarPeloUsuarioId.InputSchema.pick({ id: true }),
            body: {
                content: { "application/json": { schema: t.Entidades.Tarefa.AtualizarPeloUsuarioId.InputSchema.shape.data } }
            }
        },
        responses: {
            200: { description: "Tarefa atualizada com sucesso" }
        }
    });

    registry.registerPath({
        method: "delete",
        path: t.Entidades.Tarefa.DeletarPeloUsuarioId.route,
        summary: "Deletar tarefa",
        tags: ["Tarefa"],
        request: {
            params: t.Entidades.Tarefa.DeletarPeloUsuarioId.InputSchema.pick({ id: true })
        },
        responses: {
            200: { description: "Tarefa deletada com sucesso" }
        }
    });
};