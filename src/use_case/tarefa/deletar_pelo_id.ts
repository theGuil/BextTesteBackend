import model_tarefa from "../../model/model_tarefa";
import t from "../../types/entidades";
import domain_tarefa from "../../domain/domain_tarefa";

export default class use_case_tarefa_deletar_pelo_id extends domain_tarefa {
    private tarefa: t.Entidades.Tarefa.DeletarPeloId.Input['data']['tarefa'];

    constructor(props: t.Entidades.Tarefa.DeletarPeloId.Input, usuario_auth: t.Entidades.Usuario.UsuarioAuth) {
        super(usuario_auth);
        this.tarefa = t.Entidades.Tarefa.DeletarPeloId.InputSchema.parse(props).data.tarefa;
    }

    async factory(): Promise<t.Entidades.Tarefa.DeletarPeloId.Output> {

        await this.verificar_se_usuario_id_body_e_igual_usuario_auth_id({ usuario_id_body: this.tarefa.usuario_id });

        await model_tarefa.deletar_pelo_id(this.tarefa);

        return {
            message: "Tarefa removida com sucesso!"
        };
    }
}