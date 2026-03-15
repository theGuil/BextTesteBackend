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

        export const InputSchema = z4.object({
            data: z4.object({
                lista: z4.object({
                    nome: z4.string().min(3),
                }),
            }),
        }).strict();

        export type Input = z4.infer<typeof InputSchema>;

        export type Output = {
            data: {
                lista: Base;
            };
        };
    }

    export namespace BuscarPeloFiltro {
        export const route = "/api/listas" as const;

        export const InputSchema = z4.object({
            data: z4.object({
                filtros: z4.object({
                    pagina: z4.number().min(0).max(10),
                    nome: z4.string().optional()
                }).strict(),
            }),
        }).strict();

        export type Input = z4.infer<typeof InputSchema>;

        export type Output = {
            data: {
                listas: Base[];
            };
        };
    }

    export namespace DeletarPeloId {
        export const route = "/api/lista/:id" as const;

        export const InputSchema = z4.object({
            data: z4.object({
                lista: z4.object({
                    _id: z4.string(),
                }),
            }),
        }).strict();

        export type Input = z4.infer<typeof InputSchema>;

        export type Output = {
            message: string;
        };
    }

    export namespace AtualizarPeloId {
        export const route = "/api/lista/:id" as const;

        export const InputSchema = z4.object({
            data: z4.object({
                lista: z4.object({
                    _id: z4.string(),
                    nome: z4.string().min(3).optional(),
                }),
            }),
        }).strict();

        export type Input = z4.infer<typeof InputSchema>;

        export type Output = {
            data: {
                lista: Base;
            };
        };
    }

    export namespace BuscarPeloId {
        export const route = "/api/lista/:id" as const;

        export const InputSchema = z4.object({
            data: z4.object({
                lista: z4.object({
                    _id: z4.string(),

                }),
            }),
        }).strict();

        export type Input = z4.infer<typeof InputSchema>;

        export type Output = {
            data: {
                lista: Base;
            };
        };
    }
}

export default TypesLista;