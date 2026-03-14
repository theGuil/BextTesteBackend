import { Response } from 'express';
import z4 from "zod/v4";

import t from '../types/entidades';

type ResponseType = t.Geral.Res.ResponseType

const set_response = new class {
    public res = new class {
        public SUCCESS({ res, message, results }: t.Geral.Res.ResponseParams) {
            const payload: t.Geral.Res.Payload = {
                status: 200,
                code: "SUCCESS",
                type: "success",
                message: message || "Realizado com sucesso!",
                results: results || [],
            };
            return res.status(payload.status).json(payload);
        }

        public CREATED({ res, message, results }: t.Geral.Res.ResponseParams) {
            const payload: t.Geral.Res.Payload = {
                status: 201,
                code: "CREATED",
                type: "success",
                message: message || "Criado com sucesso!",
                results: results || [],
            };
            return res.status(201).json(payload);
        }

        public WARNING({ res, message, results }: t.Geral.Res.ResponseParams) {
            const payload: t.Geral.Res.Payload = {
                status: 400,
                code: "WARNING",
                type: "warning",
                message: message || "Aviso!",
                results: results || [],
            };
            return res.status(400).json(payload);
        }

        public SERVER_ERROR({ error, res }: { error: any, res: Response }) {
            if (error instanceof z4.ZodError) {
                const payload: t.Geral.Res.Payload = {
                    status: 400,
                    code: "SCHEMA_VALIDATION",
                    type: "warning",
                    message: "Erro ao validar dados!",
                    results: z4.treeifyError(error),
                };
                return res.status(400).json(payload);
            }

            const payload: t.Geral.Res.Payload = {
                status: error?.status || 500,
                code: error?.code || "SERVER_ERROR",
                type: (error?.type as ResponseType) || "error",
                message: error?.message || "Erro interno no servidor!",
                results: error?.results || [],
            };

            return res.status(payload.status).json(payload);
        }
    }

    public err = new class {
        public ERROR({ message, results }: Omit<t.Geral.Res.ResponseParams, "res">) {
            const payload: t.Geral.Res.Payload = {
                status: 400,
                code: "ERROR",
                type: "error",
                message: message || "Erro!",
                results: results || [],
            };
            throw payload;
        }

        public DOMAIN_ERROR({ message, results }: Omit<t.Geral.Res.ResponseParams, "res">) {
            const payload: t.Geral.Res.Payload = {
                status: 400,
                code: "DOMAIN_ERROR",
                type: "error",
                message: message || "Erro!",
                results: results || [],
            };
            throw payload;
        }

        public UNAUTHORIZED({ message }: Omit<t.Geral.Res.ResponseParams, "res">) {
            const payload: t.Geral.Res.Payload = {
                status: 401,
                code: "UNAUTHORIZED",
                type: "error",
                message: message || "Não autorizado!",
                results: [],
            };
            throw payload;
        }

        public NOT_FOUND({ message }: Omit<t.Geral.Res.ResponseParams, "res">) {
            const payload: t.Geral.Res.Payload = {
                status: 404,
                code: "NOT_FOUND",
                type: "error",
                message: message || "Não encontrado!",
                results: [],
            };
            throw payload;
        }

        public DB_ERROR({ message }: Omit<t.Geral.Res.ResponseParams, "res">) {
            const payload: t.Geral.Res.Payload = {
                status: 404,
                code: "DB_ERROR",
                type: "error",
                message: message || "Erro no banco de dados!",
                results: [],
            };
            throw payload;
        }
    }
};

export default set_response;