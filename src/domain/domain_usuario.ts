
import t from "../types/entidades"
import helpers from "../helpers/helpers"

const domain_usuario = class domain_usuario {


    public static verificar_se_usuario_ja_existe(usuario: t.Entidades.Usuario.Base) {
        if (usuario?._id) {
            helpers.set_response.err.DOMAIN_ERROR({ message: "E-mail já está em utilização!" })
        }
    }

    public static verificar_se_usuario_nao_existe(usuario: t.Entidades.Usuario.Base) {
        if (!usuario?._id) {
            helpers.set_response.err.DOMAIN_ERROR({ message: "Senha ou e-mail invalidos!" })
        }
    }

    public static verificar_se_senha_esta_correta(vefificacao: boolean) {
        if (vefificacao !== true) {
            helpers.set_response.err.DOMAIN_ERROR({ message: "E-mail ou senha invalidos!" })
        }
    }


}

export default domain_usuario