import z4 from "zod/v4";

namespace TypesLista {

    const schemaBase = z4.object({
        _id: z4.string(),
        usuario_id: z4.string(),
        nome: z4.string().min(3),
        createdAt: z4.date(),
    })

    export type Base = z4.infer<typeof schemaBase>;

    export namespace Criar {
        export const route = "/api/lista" as const;

        export const body = z4.object({
            data: z4.object({
                lista: z4.object({
                    nome: z4.string().min(3),
                }),
            }),
        }).strict();

        export type Input = z4.infer<typeof body>;

        export type Output = {
            data: {
                lista: Base;
            };
        };
    }

    export namespace BuscarPeloFiltro {
        export const route = "/api/listas" as const;

        export const query = z4.object({
            pagina: z4.coerce.number().min(1).max(10).optional().default(1).optional(),
            _id: z4.string().optional(),
            nome: z4.string().optional(),
        }).strict();

        export type Input = z4.infer<typeof query>;

        export type Output = {
            data: {
                paginacao: {
                    total_itens: number;
                    total_paginas: number;
                    itens_por_pagina: number;
                    total_itens_pagina_atual: number;
                    pagina_atual: number;
                };
                listas: Base[];
            };
        };
    }

    export namespace DeletarPeloId {
        export const route = "/api/lista/:id" as const;

        export const params = z4.object({
            id: z4.string(),
        })


        export type Input = z4.infer<typeof params>;

        export type Output = {
            message: string;
        };
    }

    export namespace AtualizarPeloId {
        export const route = "/api/lista/:id" as const;

        export const params = z4.object({
            id: z4.string(),
        })

        export const body = z4.object({
            data: z4.object({
                lista: z4.object({
                    nome: z4.string().min(3).optional(),
                }),
            }),
        }).strict();


        export type Params = z4.infer<typeof params>;

        export type Input = z4.infer<typeof body>;

        export type Output = {
            data: {
                lista: Base;
            };
        };
    }

    export namespace BuscarPeloId {
        export const route = "/api/lista/:id" as const;

        export const params = z4.object({
            id: z4.string(),
        })

        export type Input = z4.infer<typeof params>;

        export type Output = {
            data: {
                lista: Base;
            };
        };
    }
}

export default TypesLista;