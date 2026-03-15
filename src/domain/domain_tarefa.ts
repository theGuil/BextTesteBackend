import t from "../types/entidades"
import helpers from "../helpers/helpers"

import { TarefaSelect } from "../schema/schema_tarefa";

const domain_tarefa = class domain_tarefa {
    public USUARIO_AUTH: t.Entidades.Usuario.UsuarioAuth;

    constructor(usuario_auth: t.Entidades.Usuario.UsuarioAuth) {
        this.USUARIO_AUTH = usuario_auth;
    }

    public verificar_se_encontrou_algo(lista: TarefaSelect) {

        if (!lista?._id) {
            helpers.set_response.err.DOMAIN_ERROR({ message: "Lista não encontrada!" })
        }
    }


    public verificar_se_pertence_ao_usuario_auth(tarefa: TarefaSelect) {

        if (tarefa.usuario_id !== this.USUARIO_AUTH._id) {
            helpers.set_response.err.DOMAIN_ERROR({ message: "Tarefa não pertence a este usuário!" })
        }
    }
}

export default domain_tarefa;