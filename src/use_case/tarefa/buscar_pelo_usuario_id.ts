import model_tarefa from "../../model/model_tarefa";
import t from "../../types/entidades";
import domain_tarefa from "../../domain/domain_tarefa";

export default class use_case_tarefa_buscar_pelo_usuario_id extends domain_tarefa {
    private tarefa: t.Entidades.Tarefa.BuscarPeloUsuarioId.Input['data']['tarefa'];

    constructor(props: t.Entidades.Tarefa.BuscarPeloUsuarioId.Input, usuario_auth: t.Entidades.Usuario.UsuarioAuth) {
        super(usuario_auth);
        this.tarefa = t.Entidades.Tarefa.BuscarPeloUsuarioId.InputSchema.parse(props).data.tarefa;
    }

    async factory(): Promise<t.Entidades.Tarefa.BuscarPeloUsuarioId.Output> {

        await this.verificar_se_usuario_id_body_e_igual_usuario_auth_id({ usuario_id_body: this.tarefa.usuario_id });

        const tarefas = await model_tarefa.buscar_pelo_usuario_id(this.tarefa);

        return {
            data: {
                tarefas: tarefas || []
            }
        };
    }
}