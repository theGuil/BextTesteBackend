import z4 from "zod/v4";
import { Types } from 'mongoose';


namespace TypesUsuario {

    const schemaBase = z4.object({
        _id: z4.string(),
        name: z4.string().min(3),
        email: z4.email(),
        password: z4.string(),
        createdAt: z4.date(),
    })

    export type Base = z4.infer<typeof schemaBase>;

    export type UsuarioAuth = Pick<Base, '_id' | 'name' | "email" | 'createdAt'>

    export namespace Register {
        export const route = "/api/usuario/register" as const;

        export const InputSchema = z4.object({
            data: z4.object({
                usuario: z4.object({
                    name: z4.string().min(3),
                    email: z4.email(),
                    password: z4.string()
                        .min(8, { message: "A senha deve ter no mínimo 8 caracteres" })
                        .regex(/[A-Z]/, { message: "A senha deve conter pelo menos uma letra maiúscula" })
                        .regex(/[0-9]/, { message: "A senha deve conter pelo menos um número" })
                        .regex(/[^a-zA-Z0-9]/, { message: "A senha deve conter pelo menos um caractere especial" }),
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
                    password: z4.string(),
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