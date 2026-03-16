
import t from "../types/entidades"
import helpers from "../helpers/helpers"
import { Types } from 'mongoose';

import { ListaSelect } from "../schema/schema_lista";
const domain_lista = class domain_lista {
    public USUARIO_AUTH: t.Entidades.Usuario.UsuarioAuth;

    constructor(usuario_auth: t.Entidades.Usuario.UsuarioAuth) {
        usuario_auth._id = new Types.ObjectId(usuario_auth._id).toString();
        this.USUARIO_AUTH = usuario_auth;
    }


    public verificar_se_encontrou_uma_lista(lista: ListaSelect) {

        if (!lista?._id) {
            helpers.set_response.err.DOMAIN_ERROR({ message: "Lista não encontrada!" })
        }
    }


    public verificar_se_lista_pertence_ao_usuario_auth(lista: ListaSelect) {
        const lista_id = new Types.ObjectId(String(lista.usuario_id)).toString();

        if (lista_id !== this.USUARIO_AUTH._id) {
            helpers.set_response.err.DOMAIN_ERROR({ message: "Lista não pertence a este usuário!" });
        }
    }

}

export default domain_lista