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

        export const body = z4.object({
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

        export type Input = z4.infer<typeof body>;
        export type Output = { data: { tarefa: Base } };
    }

    export namespace BuscarPeloFiltro {
        export const route = "/api/tarefas" as const;

        export const query = z4.object({
            pagina: z4.coerce.number().min(1).max(30).default(1).optional(),
            _id: z4.string().optional(),
            titulo: z4.string().optional(),
            descricao: z4.string().optional(),
            status: z4.enum(["pendente", "em_andamento", "concluida"]).optional(),
            data_vencimento: z4.coerce.date().optional(),
            lista_id: z4.string().optional(),
        }).strict();

        export type Input = z4.infer<typeof query>;
        export type Output = {
            data: {
                tarefas: Base[];
                paginacao: {
                    total_itens: number;
                    total_paginas: number;
                    itens_por_pagina: number;
                    total_itens_pagina_atual: number;
                    pagina_atual: number;
                };

            }
        };
    }

    export namespace DeletarPeloId {
        export const route = "/api/tarefa/:id" as const;

        export const params = z4.object({
            id: z4.string(),
        })

        export type Input = z4.infer<typeof params>;

        export type Output = { message: string };
    }

    export namespace AtualizarPeloId {
        export const route = "/api/tarefa/:id" as const;

        export const params = z4.object({
            id: z4.string(),
        })

        export const body = z4.object({
            data: z4.object({
                tarefa: z4.object({
                    titulo: z4.string().min(3).optional(),
                    descricao: z4.string().optional(),
                    status: z4.enum(["pendente", "em_andamento", "concluida"]).optional(),
                    data_vencimento: z4.coerce.date().optional(),
                }),
            }),
        }).strict();

        export type Params = z4.infer<typeof params>;

        export type Input = z4.infer<typeof body>;

        export type Output = { data: { tarefa: Base } };
    }
}

export default TypesTarefa;