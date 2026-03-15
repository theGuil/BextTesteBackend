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


        await model_tarefa.deletar_pelo_id({
            _id: this.tarefa._id,
            usuario_id: this.USUARIO_AUTH._id
        });

        return {
            message: "Tarefa removida com sucesso!"
        };
    }
}