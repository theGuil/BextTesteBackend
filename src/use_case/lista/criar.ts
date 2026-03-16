import model_lista from "../../model/model_lista";
import t from "../../types/entidades";
import domain_lista from "../../domain/domain_lista";

export default class use_case_lista_criar {
    private body: t.Entidades.Lista.Criar.Input['data']['lista'];
    private USUARIO_AUTH: t.Entidades.Usuario.UsuarioAuth

    constructor(body: t.Entidades.Lista.Criar.Input, usuario_auth: t.Entidades.Usuario.UsuarioAuth) {

        this.body = t.Entidades.Lista.Criar.body.parse(body).data.lista;
        this.USUARIO_AUTH = usuario_auth
    }

    async factory(): Promise<t.Entidades.Lista.Criar.Output> {


        const nova_lista = await model_lista.criar({
            usuario_id: this.USUARIO_AUTH._id,
            ...this.body,
        });

        return {
            data: {
                lista: nova_lista
            }
        };
    }
}