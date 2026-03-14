import model_lista from "../../model/model_lista";
import t from "../../types/entidades";

export default class use_case_lista_deletar_pelo_usuario_id {
    private lista: t.Entidades.Lista.DeletarPeloUsuarioId.Input['data']['lista'];
    private usuario_auth: t.Entidades.Usuario.UsuarioAuth;

    constructor(props: t.Entidades.Lista.DeletarPeloUsuarioId.Input, usuario_auth: t.Entidades.Usuario.UsuarioAuth) {
        this.lista = t.Entidades.Lista.DeletarPeloUsuarioId.InputSchema.parse(props).data.lista;
    }

    async factory(): Promise<t.Entidades.Lista.DeletarPeloUsuarioId.Output> {
        this.lista.usuario_id = this.usuario_auth._id;

        await model_lista.deletar_pelo_usuario_id(this.lista);

        return {
            message: "Lista removida com sucesso!"
        };
    }
}