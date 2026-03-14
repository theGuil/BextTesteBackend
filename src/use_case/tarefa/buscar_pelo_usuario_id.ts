import model_tarefa from "../../model/model_tarefa";
import t from "../../types/entidades";

export default class use_case_tarefa_buscar_pelo_usuario_id {
    private props: t.Entidades.Tarefa.BuscarPeloUsuarioId.Input;
    private usuario_auth: t.Entidades.Usuario.UsuarioAuth;
    constructor(props: t.Entidades.Tarefa.BuscarPeloUsuarioId.Input, usuario_auth: t.Entidades.Usuario.UsuarioAuth) {
        this.usuario_auth = usuario_auth
        this.props = t.Entidades.Tarefa.BuscarPeloUsuarioId.InputSchema.parse(props);
    }

    async factory(): Promise<t.Entidades.Tarefa.BuscarPeloUsuarioId.Output> {
        const tarefas = await model_tarefa.buscar_pelo_usuario_id(this.props);

        return {
            data: {
                tarefas: tarefas || []
            }
        };
    }
}