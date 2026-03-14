import model_tarefa from "../../model/model_tarefa";
import t from "../../types/entidades";

export default class use_case_tarefa_deletar_pelo_usuario_id {
    private tarefa: t.Entidades.Tarefa.DeletarPeloUsuarioId.Input['data']['tarefa'];
    private usuario_auth: t.Entidades.Usuario.UsuarioAuth;

    constructor(props: t.Entidades.Tarefa.DeletarPeloUsuarioId.Input, usuario_auth: t.Entidades.Usuario.UsuarioAuth) {
        this.usuario_auth = usuario_auth;
        this.tarefa = t.Entidades.Tarefa.DeletarPeloUsuarioId.InputSchema.parse(props).data.tarefa;
    }

    async factory(): Promise<t.Entidades.Tarefa.DeletarPeloUsuarioId.Output> {
        await model_tarefa.deletar_pelo_usuario_id({
            _id: this.tarefa._id,
            usuario_id: this.usuario_auth._id
        });

        return {
            message: "Tarefa removida com sucesso!"
        };
    }
}