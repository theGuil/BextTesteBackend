import model_tarefa from "../../model/model_tarefa";
import t from "../../types/entidades";
import domain_tarefa from "../../domain/domain_tarefa";

export default class use_case_tarefa_atualizar_pelo_id extends domain_tarefa {
    private tarefa: t.Entidades.Tarefa.AtualizarPeloId.Input['data']['tarefa'];

    constructor(props: t.Entidades.Tarefa.AtualizarPeloId.Input, usuario_auth: t.Entidades.Usuario.UsuarioAuth) {
        super(usuario_auth);
        this.tarefa = t.Entidades.Tarefa.AtualizarPeloId.InputSchema.parse(props).data.tarefa;
    }

    async factory(): Promise<t.Entidades.Tarefa.AtualizarPeloId.Output> {


        /* Não precisa de regra de negócio pois como é uma aplicação simples e todas as chamadas no banco já é enviado o 
            usuario id e id da lista é impossivel um usuário atualizar a lista de outro
            os campos usuario_id e id vão no where do metodo  atualizar_pelo_id
          */

        const tarefa_atualizada = await model_tarefa.atualizar_pelo_id({
            usuario_id: this.USUARIO_AUTH._id,
            _id: this.tarefa._id,
            ...this.tarefa
        });

        return {
            data: {
                tarefa: tarefa_atualizada
            }
        };
    }
}