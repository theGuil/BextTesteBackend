import model_tarefa from "../../model/model_tarefa";
import t from "../../types/entidades";

export default class use_case_tarefa_atualizar_pelo_usuario_id {
    private props: t.Entidades.Tarefa.AtualizarPeloUsuarioId.Input;
    private usuario_auth: t.Entidades.Usuario.UsuarioAuth;
    constructor(props: t.Entidades.Tarefa.AtualizarPeloUsuarioId.Input, usuario_auth: t.Entidades.Usuario.UsuarioAuth) {
        this.usuario_auth = usuario_auth
        this.props = t.Entidades.Tarefa.AtualizarPeloUsuarioId.InputSchema.parse(props);
    }

    async factory(): Promise<t.Entidades.Tarefa.AtualizarPeloUsuarioId.Output> {
        const tarefa_atualizada = await model_tarefa.atualizar_pelo_usuario_id(this.props);

        return {
            data: {
                tarefa: tarefa_atualizada
            }
        };
    }
}