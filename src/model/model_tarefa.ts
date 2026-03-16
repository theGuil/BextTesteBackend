import {
    schema_tarefa,
    TarefaSelect,
    TarefaCriar,
    TarefaAtualizarPeloId,
    TarefaDeletarPeloId
} from "../schema/schema_tarefa";
import helpers from "../helpers/helpers";
import { Schema } from "mongoose";

import t from "../types/entidades";

export default class model_tarefa {

    static async buscar_pelo_filtro(props: t.Entidades.Tarefa.BuscarPeloFiltro.Input & { usuario_id: string }): Promise<TarefaSelect[]> {
        try {
            const query: any = { usuario_id: props.usuario_id };

            if (props._id) query._id = props._id;
            if (props.titulo) query.titulo = { $regex: props.titulo, $options: 'i' };
            if (props.descricao) query.descricao = { $regex: props.descricao, $options: 'i' };
            if (props.status) query.status = props.status;
            if (props.data_vencimento) query.data_vencimento = props.data_vencimento;
            if (props.lista_id) query.lista_id = props.lista_id;

            const limite = 30;
            const p = props.pagina || 1;
            const pular = (p - 1) * limite;

            return await schema_tarefa
                .find(query)
                .skip(pular)
                .limit(limite)
                .lean<TarefaSelect[]>();

        } catch (error) {
            helpers.set_response.err.DB_ERROR({ message: "Erro ao buscar tarefas pelo filtro!" });
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
            const { _id, ...campos } = props;

            return await schema_tarefa.findOneAndUpdate(
                { _id },
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