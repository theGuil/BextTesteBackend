import z4 from "zod/v4";

namespace TypesTarefa {

    const schemaBase = z4.object({
        _id: z4.string(),
        titulo: z4.string().min(3),
        descricao: z4.string(),
        status: z4.enum(["pendente", "em_andamento", "concluida"]),
        data_vencimento: z4.date(),
        lista_id: z4.string(),
        usuario_id: z4.string(),
        createdAt: z4.date(),
    })

    export type Base = z4.infer<typeof schemaBase>;

    export namespace CriarPeloUsuarioId {
        export const route = "/api/tarefa" as const;

        export const InputSchema = z4.object({
            usuario_id: z4.string(),
            data: z4.object({
                titulo: z4.string().min(3),
                descricao: z4.string(),
                status: z4.enum(["pendente", "em_andamento", "concluida"]),
                data_vencimento: z4.date(),
                lista_id: z4.string()
            })
        }).strict();

        export type Input = z4.infer<typeof InputSchema>;

        export type Output = {
            data: {
                tarefa: Base;
            };
        };
    }

    export namespace BuscarPeloUsuarioId {
        export const route = "/api/tarefas" as const;

        export const InputSchema = z4.object({
            usuario_id: z4.string()
        }).strict();

        export type Input = z4.infer<typeof InputSchema>;

        export type Output = {
            data: {
                tarefas: Base[];
            };
        };
    }

    export namespace DeletarPeloUsuarioId {
        export const route = "/api/tarefa" as const;

        export const InputSchema = z4.object({
            id: z4.string(),
            usuario_id: z4.string()
        }).strict();

        export type Input = z4.infer<typeof InputSchema>;

        export type Output = {
            message: string;
        };
    }

    export namespace AtualizarPeloUsuarioId {
        export const route = "/api/tarefa" as const;

        export const InputSchema = z4.object({
            id: z4.string(),
            usuario_id: z4.string(),
            data: z4.object({
                tarefa: z4.object({
                    titulo: z4.string().min(3).optional(),
                    descricao: z4.string().optional(),
                    status: z4.enum(["pendente", "em_andamento", "concluida"]).optional(),
                    data_vencimento: z4.date().optional(),
                    lista_id: z4.string().optional()
                }),
            }),
        }).strict();

        export type Input = z4.infer<typeof InputSchema>;

        export type Output = {
            data: {
                tarefa: Base;
            };
        };
    }
}

export default TypesTarefa;