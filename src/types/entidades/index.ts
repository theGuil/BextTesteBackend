

import TypesUsuario from "./_usuario";
import { Response } from "express"



namespace t {
    export namespace Entidades {
        export import Usuario = TypesUsuario;

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