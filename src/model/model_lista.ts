import {
    schema_lista,
    ListaSelect,
    ListaBuscarPeloFiltro,
    ListaCriar,
    ListaAtualizarPeloId,
    ListaDeletarPeloId
} from "../schema/schema_lista";

import helpers from "../helpers/helpers";

import t from "../types/entidades";

export default class model_lista {

    static async buscar_pelo_filtro(props: t.Entidades.Lista.BuscarPeloFiltro.Input & { usuario_id: string }): Promise<ListaBuscarPeloFiltro> {
        try {
            const query: any = { usuario_id: props.usuario_id };

            if (props._id) query._id = props._id;
            if (props.nome) query.nome = { $regex: props.nome, $options: 'i' };

            const limite = 10;
            const p = props.pagina || 1;
            const pular = (p - 1) * limite;

            const [results, totalItens] = await Promise.all([
                schema_lista.find(query).skip(pular).limit(limite).lean<ListaSelect[]>(),
                schema_lista.countDocuments(query)
            ]);

            return {
                itens: results,
                paginacao: {
                    total_itens: totalItens,
                    total_paginas: Math.ceil(totalItens / limite),
                    itens_por_pagina: limite,
                    total_itens_pagina_atual: results.length,
                    pagina_atual: p
                }
            };
        } catch (error) {
            helpers.set_response.err.DB_ERROR({ message: "Erro ao buscar listas pelo filtro!" });
        }
    }

    static async criar(props: ListaCriar): Promise<ListaSelect> {
        try {
            const set_nova_lista = new schema_lista(props);
            return await set_nova_lista.save();
        } catch (error) {
            helpers.set_response.err.DB_ERROR({ message: "Erro ao criar lista!" });
        }
    }

    static async atualizar_pelo_id(props: ListaAtualizarPeloId): Promise<ListaSelect> {
        try {
            const { _id, usuario_id, ...campos } = props;

            return await schema_lista.findOneAndUpdate(
                { _id, usuario_id },
                { $set: campos },
                { new: true }
            ).lean<ListaSelect>();
        } catch (error) {
            helpers.set_response.err.DB_ERROR({ message: "Erro ao atualizar lista!" });
        }
    }

    static async deletar_pelo_id(props: ListaDeletarPeloId): Promise<void> {
        try {
            await schema_lista.findOneAndDelete({ _id: props._id });
        } catch (error) {
            helpers.set_response.err.DB_ERROR({ message: "Erro ao deletar lista!" });
        }
    }

    static async buscar_pelo_id(props: { _id: string }): Promise<ListaSelect> {
        try {
            const [results] = await schema_lista.find({ _id: props._id }).lean();

            return results
        } catch (error) {
            helpers.set_response.err.DB_ERROR({ message: "Erro ao buscar listas pelo ID do usuário!" });
        }
    }
}