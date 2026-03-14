import model_tarefa from "../../model/model_tarefa";
import t from "../../types/entidades";

export default class use_case_tarefa_buscar_pelo_usuario_id {
    private tarefa: t.Entidades.Tarefa.BuscarPeloUsuarioId.Input['data']['tarefa'];
    private usuario_auth: t.Entidades.Usuario.UsuarioAuth;

    constructor(props: t.Entidades.Tarefa.BuscarPeloUsuarioId.Input, usuario_auth: t.Entidades.Usuario.UsuarioAuth) {
        this.usuario_auth = usuario_auth;
        this.tarefa = t.Entidades.Tarefa.BuscarPeloUsuarioId.InputSchema.parse(props).data.tarefa;
    }

    async factory(): Promise<t.Entidades.Tarefa.BuscarPeloUsuarioId.Output> {
        this.tarefa.usuario_id = this.usuario_auth._id;

        const tarefas = await model_tarefa.buscar_pelo_usuario_id(this.tarefa);

        return {
            data: {
                tarefas: tarefas || []
            }
        };
    }
}