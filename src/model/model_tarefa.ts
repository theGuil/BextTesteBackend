import { schema_tarefa, TarefaSelect } from "../schema/schema_tarefa";
import helpers from "../helpers/helpers";
import t from "../types/entidades";

export default class model_tarefa {

    static async buscar_pelo_usuario_id(props: t.Entidades.Tarefa.BuscarPeloUsuarioId.Input): Promise<t.Entidades.Tarefa.Base[]> {
        try {
            const results = await schema_tarefa.find({ usuario_id: props.usuario_id }).lean<t.Entidades.Tarefa.Base[]>();

            return results;
        } catch (error) {
            helpers.set_response.err.DB_ERROR({ message: "Erro ao buscar tarefas pelo ID do usuário!" });
        }
    }

    static async criar_pelo_usuario_id(props: t.Entidades.Tarefa.CriarPeloUsuarioId.Input): Promise<TarefaSelect> {
        try {
            const set_nova_tarefa = new schema_tarefa({
                usuario_id: props.usuario_id,
                ...props.data
            });

            const nova_tarefa = await set_nova_tarefa.save();

            return nova_tarefa;
        } catch (error) {
            helpers.set_response.err.DB_ERROR({ message: "Erro ao criar tarefa!" });
        }
    }

    static async atualizar_pelo_usuario_id(props: t.Entidades.Tarefa.AtualizarPeloUsuarioId.Input): Promise<t.Entidades.Tarefa.Base> {
        try {
            const result = await schema_tarefa.findOneAndUpdate(
                { _id: props.id, usuario_id: props.usuario_id },
                { $set: props.data.tarefa },
                { new: true }
            ).lean<t.Entidades.Tarefa.Base>();

            return result;
        } catch (error) {
            helpers.set_response.err.DB_ERROR({ message: "Erro ao atualizar tarefa!" });
        }
    }

    static async deletar_pelo_usuario_id(props: t.Entidades.Tarefa.DeletarPeloUsuarioId.Input): Promise<void> {
        try {
            await schema_tarefa.findOneAndDelete({ _id: props.id, usuario_id: props.usuario_id });
        } catch (error) {
            helpers.set_response.err.DB_ERROR({ message: "Erro ao deletar tarefa!" });
        }
    }
}