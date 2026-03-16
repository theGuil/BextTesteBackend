import model_tarefa from "../../model/model_tarefa";
import t from "../../types/entidades";

//DOMAIN
import domain_tarefa from "../../domain/domain_tarefa";

export default class use_case_tarefa_deletar_pelo_id {
    private params: t.Entidades.Tarefa.DeletarPeloId.Input
    private domain_tarefa: InstanceType<typeof domain_tarefa>;

    constructor(
        params: unknown,
        usuario_auth: t.Entidades.Usuario.UsuarioAuth
    ) {
        this.params = t.Entidades.Tarefa.DeletarPeloId.params.parse(params)
        this.domain_tarefa = new domain_tarefa(usuario_auth)
    }

    async factory(): Promise<t.Entidades.Tarefa.DeletarPeloId.Output> {

        const tarefa = await model_tarefa.buscar_pelo_id({ _id: this.params.id })

        this.domain_tarefa.verificar_se_encontrou_algo(tarefa)

        this.domain_tarefa.verificar_se_pertence_ao_usuario_auth(tarefa)

        await model_tarefa.deletar_pelo_id({ _id: this.params.id });

        return {
            message: "Tarefa removida com sucesso!"
        };
    }
}