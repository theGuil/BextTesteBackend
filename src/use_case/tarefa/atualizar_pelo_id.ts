import model_tarefa from "../../model/model_tarefa";
import t from "../../types/entidades";
import domain_tarefa from "../../domain/domain_tarefa";

export default class use_case_tarefa_atualizar_pelo_id {
    private tarefa: t.Entidades.Tarefa.AtualizarPeloId.Input['data']['tarefa'];
    private domain_tarefa: InstanceType<typeof domain_tarefa>;
    constructor(props: t.Entidades.Tarefa.AtualizarPeloId.Input, usuario_auth: t.Entidades.Usuario.UsuarioAuth) {
        this.domain_tarefa = new domain_tarefa(usuario_auth)
        this.tarefa = t.Entidades.Tarefa.AtualizarPeloId.body.parse(props).data.tarefa;
    }

    async factory(): Promise<t.Entidades.Tarefa.AtualizarPeloId.Output> {

        const tarefa = await model_tarefa.buscar_pelo_id({ _id: this.tarefa._id })

        this.domain_tarefa.verificar_se_encontrou_algo(tarefa)

        this.domain_tarefa.verificar_se_pertence_ao_usuario_auth(tarefa)

        const tarefa_atualizada = await model_tarefa.atualizar_pelo_id(this.tarefa);

        return {
            data: {
                tarefa: tarefa_atualizada
            }
        };
    }
}