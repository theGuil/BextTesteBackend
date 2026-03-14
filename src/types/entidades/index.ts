

import { Response } from "express"

// ENTIDADES
import TypesUsuario from "./_usuario";
import TypesLista from "./_lista";
import TypesTarefa from "./_tarefa";

namespace t {
    export namespace Entidades {
        export import Usuario = TypesUsuario;

        export import Lista = TypesLista;

        export import Tarefa = TypesTarefa;
    }

    export namespace Geral {
        export namespace Res {
            export type ResponseStatus = 200 | 201 | 400 | 401 | 404;
            export type ResponseCode = "SUCCESS" | "CREATED" | "WARNING" | "ERROR" | "DOMAIN_ERROR" | "UNAUTHORIZED" | "NOT_FOUND" | "DB_ERROR" | "SCHEMA_VALIDATION"
            export type ResponseType = "success" | "warning" | "error";


            export interface Payload {
                status: ResponseStatus;
                code: ResponseCode;
                type: ResponseType;
                message: string;
                results: any;
            }

            export interface ResponseParams {
                res: Response;
                message?: string;
                results?: any;
            }
        }
    }

}

export default t