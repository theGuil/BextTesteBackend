import * as jose from 'jose';

declare global {
    namespace Express {
        interface Request {
            usuario_auth?: jose.JWTPayload;
        }
    }
}

export { };