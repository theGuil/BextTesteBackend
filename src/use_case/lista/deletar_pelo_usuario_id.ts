import model_lista from "../../model/model_lista";
import t from "../../types/entidades";

export default class use_case_lista_deletar_pelo_usuario_id {
    private props: t.Entidades.Lista.DeletarPeloUsuarioId.Input;
    private usuario_auth: t.Entidades.Usuario.UsuarioAuth;
    constructor(props: t.Entidades.Lista.DeletarPeloUsuarioId.Input, usuario_auth: t.Entidades.Usuario.UsuarioAuth) {
        this.usuario_auth = usuario_auth
        this.props = t.Entidades.Lista.DeletarPeloUsuarioId.InputSchema.parse(props);
    }

    async factory(): Promise<t.Entidades.Lista.DeletarPeloUsuarioId.Output> {
        await model_lista.deletar_pelo_usuario_id({
            id: this.props.id,
            usuario_id: this.props.usuario_id
        });

        return {
            message: "Lista removida com sucesso!"
        };
    }
}