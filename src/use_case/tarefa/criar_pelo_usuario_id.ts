import model_tarefa from "../../model/model_tarefa";
import t from "../../types/entidades";

export default class use_case_tarefa_criar_pelo_usuario_id {
    private tarefa: t.Entidades.Tarefa.CriarPeloUsuarioId.Input['data']['tarefa'];
    private usuario_auth: t.Entidades.Usuario.UsuarioAuth;

    constructor(props: t.Entidades.Tarefa.CriarPeloUsuarioId.Input, usuario_auth: t.Entidades.Usuario.UsuarioAuth) {
        this.usuario_auth = usuario_auth;
        this.tarefa = t.Entidades.Tarefa.CriarPeloUsuarioId.InputSchema.parse(props).data.tarefa;
    }

    async factory(): Promise<t.Entidades.Tarefa.CriarPeloUsuarioId.Output> {
        this.tarefa.usuario_id = this.usuario_auth._id;

        const nova_tarefa = await model_tarefa.criar_pelo_usuario_id(this.tarefa);

        return {
            data: {
                tarefa: nova_tarefa
            }
        };
    }
}