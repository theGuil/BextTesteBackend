import model_tarefa from "../../model/model_tarefa";
import t from "../../types/entidades";

//DOMAIN
import domain_tarefa from "../../domain/domain_tarefa";

export default class use_case_tarefa_deletar_pelo_id {
    private tarefa: t.Entidades.Tarefa.DeletarPeloId.Input['data']['tarefa'];
    private domain_tarefa: InstanceType<typeof domain_tarefa>;

    constructor(props: t.Entidades.Tarefa.DeletarPeloId.Input, usuario_auth: t.Entidades.Usuario.UsuarioAuth) {
        this.tarefa = t.Entidades.Tarefa.DeletarPeloId.InputSchema.parse(props).data.tarefa;
        this.domain_tarefa = new domain_tarefa(usuario_auth)
    }

    async factory(): Promise<t.Entidades.Tarefa.DeletarPeloId.Output> {

        const tarefa = await model_tarefa.buscar_pelo_id({ _id: this.tarefa._id })

        this.domain_tarefa.verificar_se_encontrou_algo(tarefa)

        this.domain_tarefa.verificar_se_pertence_ao_usuario_auth(tarefa)

        await model_tarefa.deletar_pelo_id({ _id: this.tarefa._id });

        return {
            message: "Tarefa removida com sucesso!"
        };
    }
}