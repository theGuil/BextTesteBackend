import t from "../../types/entidades"
import model_usuario from "../../model/model_usuario"
import helpers from "../../helpers/helpers"
import domain_usuario from "../../domain/domain_usuario"

const use_case_usuario_login = class use_case_usuario_login {
    private login: t.Entidades.Usuario.Login.Input['data']['usuario']

    constructor(usuario: t.Entidades.Usuario.Login.Input) {
        this.login = t.Entidades.Usuario.Login.body.parse(usuario).data.usuario
    }

    public async factory(): Promise<t.Entidades.Usuario.Register.Output> {
        const usuario_db = await model_usuario.buscar_pelo_email({ email: this.login.email })

        domain_usuario.verificar_se_usuario_nao_existe(usuario_db)

        const verificar_senha = await helpers.secret.verificar_senha({ password: this.login.password, dashed_senha: usuario_db.password })

        domain_usuario.verificar_se_senha_esta_correta(verificar_senha)

        const [bearerToken, refreshToken] = await Promise.all([
            helpers.token.criar_token_login_usuario(usuario_db),
            helpers.token.criar_refresh_token(usuario_db._id)
        ])

        return {
            data: {
                usuario: {
                    _id: usuario_db._id,
                    email: usuario_db.email,
                    name: usuario_db.name,
                    createdAt: usuario_db.createdAt,
                    token: bearerToken,
                    refresh_token: refreshToken,
                }
            }
        }
    }
}

export default use_case_usuario_login