import { Request, Response, NextFunction } from 'express';
import * as jose from 'jose';
import set_response from './_set_response';
import t from '../types/entidades';

const token_secret = process.env.JSON_WEB_TOKEN_AUTH_USER || '';
const refresh_secret = process.env.JSON_WEB_REFRESH_TOKEN_AUTH_USER || '';

export class Token {
    public async verificar_token(req: Request, res: Response, next: NextFunction) {
        try {
            const auth_header = req.headers["authorization"];
            if (!auth_header) return set_response.res.WARNING({ res, message: 'Token não enviado!' });

            const token = auth_header.split(" ")[1];
            if (!token) return set_response.res.WARNING({ res, message: 'Acesso negado!' });

            const secret = new TextEncoder().encode(token_secret);
            const { payload } = await jose.jwtVerify(token, secret) as { payload: t.Entidades.Usuario.Base };

            if (!payload._id || !payload.email) {
                return set_response.res.WARNING({ res, message: 'Token inválido!' });
            }

            req.usuario_auth = payload;
            return next();
        } catch (error) {
            return set_response.res.WARNING({ res, message: 'Token inválido ou expirado!' });
        }
    }

    public async criar_token_login_usuario(usuario: Omit<t.Entidades.Usuario.Base, 'password'>): Promise<string> {
        if (!token_secret) {
            set_response.err.ERROR({ message: "Erro configuração token_secret!" });
        }

        const token = await new jose.SignJWT({
            _id: usuario._id,
            email: usuario.email,
            name: usuario.name,
            createdAt: usuario.createdAt
        })
            .setProtectedHeader({ alg: "HS256" })
            .setIssuedAt()
            .setExpirationTime("1h")
            .sign(new TextEncoder().encode(token_secret));

        return token;
    }

    public async criar_refresh_token(usuario_id: string): Promise<string> {
        if (!refresh_secret) {
            set_response.err.ERROR({ message: "Erro configuração refresh_secret!" });
        }

        const token = await new jose.SignJWT({ usuario_id })
            .setProtectedHeader({ alg: "HS256" })
            .setIssuedAt()
            .setExpirationTime("7d")
            .sign(new TextEncoder().encode(refresh_secret));

        return token;
    }

    public async verificar_refresh_token(refresh_token: string) {
        try {
            if (!refresh_token) return false;

            const secret = new TextEncoder().encode(refresh_secret);
            const { payload } = await jose.jwtVerify(refresh_token, secret);

            return payload as { usuario_id: string };
        } catch (error) {
            return false;
        }
    }
}

export default new Token();