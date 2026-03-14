import model_lista from "../../model/model_lista";
import t from "../../types/entidades";

export default class use_case_lista_atualizar_pelo_usuario_id {
    private lista: t.Entidades.Lista.AtualizarPeloUsuarioId.Input['data']['lista'];
    private usuario_auth: t.Entidades.Usuario.UsuarioAuth;

    constructor(props: t.Entidades.Lista.AtualizarPeloUsuarioId.Input, usuario_auth: t.Entidades.Usuario.UsuarioAuth) {
        this.usuario_auth = usuario_auth;
        this.lista = t.Entidades.Lista.AtualizarPeloUsuarioId.InputSchema.parse(props).data.lista;
    }

    async factory(): Promise<t.Entidades.Lista.AtualizarPeloUsuarioId.Output> {

        const lista_atualizada = await model_lista.atualizar_pelo_usuario_id(this.lista);

        return {
            data: {
                lista: lista_atualizada
            }
        };
    }
}