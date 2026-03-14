
import t from "../../types/entidades"
import { model_usuario } from "../../model/model_usuario"
import helpers from "../../helpers/helpers"
import domain_usuario from "../../domain/usuario"

const use_case_usuario_register = class use_case_usuario_register {
    private usuario: t.Entidades.Usuario.Register.Input['data']['usuario']

    constructor(usuario: t.Entidades.Usuario.Register.Input) {
        this.usuario = t.Entidades.Usuario.Register.InputSchema.parse(usuario).data.usuario
    }


    public async factory(): Promise<t.Entidades.Usuario.Register.Output> {
        const buscar_usuario = await model_usuario.buscar_pelo_email({ email: this.usuario.email })

        domain_usuario.verificar_se_usuario_ja_existe(buscar_usuario)

        this.usuario.password = await helpers.secret.gerar_hash_senha(this.usuario.password)

        const novo_usuario = await model_usuario.registrar(this.usuario)

        const [bererToken, refreshToken] = await Promise.all([
            helpers.token.criar_token_login_usuario(novo_usuario),
            helpers.token.criar_refresh_token(novo_usuario._id)
        ])


        return {
            data: {
                usuario: {
                    _id: novo_usuario._id,
                    email: novo_usuario.email,
                    name: novo_usuario.name,
                    createdAt: novo_usuario.createdAt,
                    token: bererToken,
                    refresh_token: refreshToken
                }
            }
        }
    }



}

export default use_case_usuario_register