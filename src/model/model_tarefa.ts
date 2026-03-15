import {
    schema_tarefa,
    TarefaSelect,
    TarefaBuscarPeloFiltro,
    TarefaCriar,
    TarefaAtualizarPeloId,
    TarefaDeletarPeloId
} from "../schema/schema_tarefa";
import helpers from "../helpers/helpers";

export default class model_tarefa {

    static async buscar_pelo_filtro(props: TarefaBuscarPeloFiltro): Promise<TarefaSelect[]> {
        try {
            return await schema_tarefa.find({ usuario_id: props.usuario_id }).lean<TarefaSelect[]>();
        } catch (error) {
            helpers.set_response.err.DB_ERROR({ message: "Erro ao buscar tarefas pelo ID do usuário!" });
        }
    }

    static async buscar_pelo_id(props: { _id: string }): Promise<TarefaSelect> {
        try {
            const [results] = await schema_tarefa.find({ _id: props._id }).lean();

            return results
        } catch (error) {
            helpers.set_response.err.DB_ERROR({ message: "Erro ao buscar tarefas pelo ID do usuário!" });
        }
    }

    static async criar(props: TarefaCriar): Promise<TarefaSelect> {
        try {
            const set_nova_tarefa = new schema_tarefa(props);
            return await set_nova_tarefa.save();
        } catch (error) {
            helpers.set_response.err.DB_ERROR({ message: "Erro ao criar tarefa!" });
        }
    }

    static async atualizar_pelo_id(props: TarefaAtualizarPeloId): Promise<TarefaSelect> {
        try {
            const { _id, usuario_id, ...campos } = props;

            return await schema_tarefa.findOneAndUpdate(
                { _id, usuario_id },
                { $set: campos },
                { new: true }
            ).lean<TarefaSelect>();
        } catch (error) {
            helpers.set_response.err.DB_ERROR({ message: "Erro ao atualizar tarefa!" });
        }
    }

    static async deletar_pelo_id(props: TarefaDeletarPeloId): Promise<void> {
        try {
            await schema_tarefa.findOneAndDelete({ _id: props._id });
        } catch (error) {
            helpers.set_response.err.DB_ERROR({ message: "Erro ao deletar tarefa!" });
        }
    }
}