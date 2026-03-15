
import t from "../types/entidades"
import helpers from "../helpers/helpers"

const domain_lista = class domain_lista {
    private usuario_auth: t.Entidades.Usuario.UsuarioAuth;

    constructor(usuario_auth: t.Entidades.Usuario.UsuarioAuth) {
        this.usuario_auth = usuario_auth;
    }

    /* 
        É importante usar essa regra antes de ir ao banco de dados verificando o token e o id enviado,
        pois dessa forma é economisado uma requisição ao banco de dados.
    */
    public async verificar_se_usuario_id_body_e_igual_usuario_auth_id(props: { usuario_id_body: string }) {

        if (props?.usuario_id_body !== this.usuario_auth._id) {
            helpers.set_response.err.DOMAIN_ERROR({ message: "Acesso negado, lista não disponivel para este usuário!" })
        }

    }

}

export default domain_lista