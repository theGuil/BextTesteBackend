import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import t from "../../types/entidades";

export const registerListaRoutes = (registry: OpenAPIRegistry) => {
    registry.registerPath({
        method: "post",
        path: t.Entidades.Lista.Criar.route,
        summary: "Criar lista do usuário",
        tags: ["Lista"],
        security: [{ BearerAuth: [] }],
        request: {
            body: {
                content: {
                    "application/json": {
                        schema: t.Entidades.Lista.Criar.body
                    }
                }
            }
        },
        responses: {
            201: { description: "Lista criada com sucesso" },
            401: { description: "Token não fornecido ou inválido" },
            400: { description: "Erro de validação" }
        }
    });

    registry.registerPath({
        method: "get",
        path: t.Entidades.Lista.BuscarPeloFiltro.route,
        summary: "Buscar listas do usuário",
        tags: ["Lista"],
        security: [{ BearerAuth: [] }],
        request: {
            query: t.Entidades.Lista.BuscarPeloFiltro.query,
        },
        responses: {
            200: { description: "Listas encontradas com sucesso" },
            401: { description: "Token não fornecido ou inválido" },
            404: { description: "Nenhuma lista encontrada" }
        }
    });

    registry.registerPath({
        method: "patch",
        path: t.Entidades.Lista.AtualizarPeloId.route.replace(':id', '{id}'),
        summary: "Atualizar lista do usuário",
        description: "Atualiza a lista do usuário pelo id dele que está no token!",
        tags: ["Lista"],
        security: [{ BearerAuth: [] }],
        request: {
            params: t.Entidades.Lista.AtualizarPeloId.params,
            body: {
                content: {
                    "application/json": {
                        schema: t.Entidades.Lista.AtualizarPeloId.body
                    }
                }
            }
        },
        responses: {
            200: { description: "Lista atualizada com sucesso" },
            401: { description: "Token não fornecido ou inválido" },
            400: { description: "Erro de validação" }
        }
    });

    registry.registerPath({
        method: "delete",
        path: t.Entidades.Lista.DeletarPeloId.route.replace(':id', '{id}'),
        summary: "Deletar lista do usuário",
        description: "Remove uma lista permanentemente. A lista deve estar vazia (sem tarefas) para ser deletada.",
        tags: ["Lista"],
        security: [{ BearerAuth: [] }],
        request: {
            params: t.Entidades.Lista.DeletarPeloId.params
        },
        responses: {
            200: { description: "Lista deletada com sucesso" },
            401: { description: "Token não fornecido ou inválido" },
            400: { description: "Não é possível deletar uma lista que ainda contém tarefas." },
            404: { description: "Lista não encontrada." }
        }
    });
};