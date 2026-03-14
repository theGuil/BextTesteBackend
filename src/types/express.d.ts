import * as jose from 'jose';
import t from './entidades';

declare global {
    namespace Express {
        interface Request {
            usuario_auth: t.Entidades.Usuario.UsuarioAuth
        }
    }
}

export { };