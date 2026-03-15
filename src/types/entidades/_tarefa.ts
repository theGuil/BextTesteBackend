import z4 from "zod/v4";

namespace TypesTarefa {

    const schemaBase = z4.object({
        _id: z4.string(),
        titulo: z4.string().min(3),
        descricao: z4.string(),
        status: z4.enum(["pendente", "em_andamento", "concluida"]),
        data_vencimento: z4.coerce.date(),
        lista_id: z4.string(),
        usuario_id: z4.string(),
        createdAt: z4.date(),
    })

    export type Base = z4.infer<typeof schemaBase>;

    export namespace Criar {
        export const route = "/api/tarefa" as const;

        export const InputSchema = z4.object({
            data: z4.object({
                tarefa: z4.object({
                    lista_id: z4.string(),
                    titulo: z4.string().min(3),
                    descricao: z4.string(),
                    status: z4.enum(["pendente", "em_andamento", "concluida"]),
                    data_vencimento: z4.coerce.date()
                }),
            }),
        }).strict();

        export type Input = z4.infer<typeof InputSchema>;
        export type Output = { data: { tarefa: Base } };
    }

    export namespace BuscarPeloFiltro {
        export const route = "/api/tarefas" as const;

        export const InputSchema = z4.object({
            data: z4.object({
                filtro: z4.object({
                    pagina: z4.number().min(1).max(30),
                    _id: z4.string().optional(),
                    titulo: z4.string().optional(),
                    descricao: z4.string().optional(),
                    status: z4.enum(["pendente", "em_andamento", "concluida"]).optional(),
                    data_vencimento: z4.coerce.date().optional(),
                    lista_id: z4.string().optional(),
                }).strict(),
            }).strict(),
        }).strict();

        export type Input = z4.infer<typeof InputSchema>;
        export type Output = { data: { tarefas: Base[] } };
    }

    export namespace DeletarPeloId {
        export const route = "/api/tarefa/:id" as const;

        export const InputSchema = z4.object({
            data: z4.object({
                tarefa: z4.object({
                    _id: z4.string(),
                }),
            }),
        }).strict();

        export type Input = z4.infer<typeof InputSchema>;
        export type Output = { message: string };
    }

    export namespace AtualizarPeloId {
        export const route = "/api/tarefa/:id" as const;

        export const InputSchema = z4.object({
            data: z4.object({
                tarefa: z4.object({
                    _id: z4.string(),
                    titulo: z4.string().min(3).optional(),
                    descricao: z4.string().optional(),
                    status: z4.enum(["pendente", "em_andamento", "concluida"]).optional(),
                    data_vencimento: z4.coerce.date().optional(),
                }),
            }),
        }).strict();

        export type Input = z4.infer<typeof InputSchema>;
        export type Output = { data: { tarefa: Base } };
    }
}

export default TypesTarefa;