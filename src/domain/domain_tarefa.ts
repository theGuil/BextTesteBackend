import t from "../types/entidades"
import helpers from "../helpers/helpers"
import { Types } from "mongoose";
import { TarefaSelect } from "../schema/schema_tarefa";

const domain_tarefa = class domain_tarefa {
    public USUARIO_AUTH: t.Entidades.Usuario.UsuarioAuth;

    constructor(usuario_auth: t.Entidades.Usuario.UsuarioAuth) {
        this.USUARIO_AUTH = usuario_auth;
    }

    public verificar_se_encontrou_algo(lista: TarefaSelect) {

        if (!lista?._id) {
            helpers.set_response.err.DOMAIN_ERROR({ message: "Tarefa não encontrada!" })
        }
    }


    public verificar_se_pertence_ao_usuario_auth(tarefa: TarefaSelect) {
        const tarefa_usuario_id = new Types.ObjectId(String(tarefa.usuario_id)).toString();

        if (tarefa_usuario_id !== this.USUARIO_AUTH._id) {
            helpers.set_response.err.DOMAIN_ERROR({ message: "Tarefa não pertence a este usuário!" })
        }
    }
}

export default domain_tarefa;