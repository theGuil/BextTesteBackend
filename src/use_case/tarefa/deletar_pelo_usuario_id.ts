import model_tarefa from "../../model/model_tarefa";
import t from "../../types/entidades";

export default class use_case_tarefa_deletar_pelo_usuario_id {
    private props: t.Entidades.Tarefa.DeletarPeloUsuarioId.Input;
    private usuario_auth: t.Entidades.Usuario.UsuarioAuth;
    constructor(props: t.Entidades.Tarefa.DeletarPeloUsuarioId.Input, usuario_auth: t.Entidades.Usuario.UsuarioAuth) {
        this.usuario_auth = usuario_auth
        this.props = t.Entidades.Tarefa.DeletarPeloUsuarioId.InputSchema.parse(props);
    }

    async factory(): Promise<t.Entidades.Tarefa.DeletarPeloUsuarioId.Output> {
        await model_tarefa.deletar_pelo_usuario_id(this.props);

        return {
            message: "Tarefa removida com sucesso!"
        };
    }
}