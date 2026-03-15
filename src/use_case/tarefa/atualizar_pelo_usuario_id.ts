import model_tarefa from "../../model/model_tarefa";
import t from "../../types/entidades";
import domain_tarefa from "../../domain/domain_tarefa";

export default class use_case_tarefa_atualizar_pelo_usuario_id extends domain_tarefa {
    private tarefa: t.Entidades.Tarefa.AtualizarPeloUsuarioId.Input['data']['tarefa'];

    constructor(props: t.Entidades.Tarefa.AtualizarPeloUsuarioId.Input, usuario_auth: t.Entidades.Usuario.UsuarioAuth) {
        super(usuario_auth);
        this.tarefa = t.Entidades.Tarefa.AtualizarPeloUsuarioId.InputSchema.parse(props).data.tarefa;
    }

    async factory(): Promise<t.Entidades.Tarefa.AtualizarPeloUsuarioId.Output> {

        await this.verificar_se_usuario_id_body_e_igual_usuario_auth_id({ usuario_id_body: this.tarefa.usuario_id });

        const tarefa_atualizada = await model_tarefa.atualizar_pelo_usuario_id(this.tarefa);

        return {
            data: {
                tarefa: tarefa_atualizada
            }
        };
    }
}