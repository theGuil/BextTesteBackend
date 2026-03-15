import t from "../types/entidades"
import helpers from "../helpers/helpers"

const domain_tarefa = class domain_tarefa {
    public USUARIO_AUTH: t.Entidades.Usuario.UsuarioAuth;

    constructor(usuario_auth: t.Entidades.Usuario.UsuarioAuth) {
        this.USUARIO_AUTH = usuario_auth;
    }


}

export default domain_tarefa;