import z4 from "zod/v4";

namespace TypesUsuario {

    const schemaBase = z4.object({
        _id: z4.string(),
        name: z4.string().min(3),
        email: z4.email(),
        password: z4.string().min(6),
        createdAt: z4.date(),
    })

    export type Base = z4.infer<typeof schemaBase>;

    export namespace Register {
        export const route = "/api/usuario/register" as const;

        export const InputSchema = z4.object({
            data: z4.object({
                usuario: z4.object({
                    name: z4.string().min(3),
                    email: z4.email(),
                    password: z4.string().min(6),
                }),
            }),
        }).strict();

        export type Input = z4.infer<typeof InputSchema>;

        export type Output = {
            data: {
                usuario: Omit<Base, "password"> & { token: string; refresh_token: string };
            };
        };
    }

    export namespace Login {
        export const route = "/api/usuario/login" as const;

        export const InputSchema = z4.object({
            data: z4.object({
                usuario: z4.object({
                    email: z4.email(),
                    password: z4.string().min(6),
                }),
            }),
        }).strict();

        export type Input = z4.infer<typeof InputSchema>;

        export type Output = {
            data: {
                usuario: Omit<Base, "password">;
            };
        };
    }
}

export default TypesUsuario;