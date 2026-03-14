import {
    schema_lista,
    ListaSelect,
    ListaBuscarPeloUsuarioId,
    ListaCriarPeloUsuarioId,
    ListaAtualizarPeloUsuarioId,
    ListaDeletarPeloUsuarioId
} from "../schema/schema_lista";

import helpers from "../helpers/helpers";

export default class model_lista {

    static async buscar_pelo_usuario_id(props: ListaBuscarPeloUsuarioId): Promise<ListaSelect[]> {
        try {
            return await schema_lista.find({ usuario_id: props.usuario_id }).lean<ListaSelect[]>();
        } catch (error) {
            helpers.set_response.err.DB_ERROR({ message: "Erro ao buscar listas pelo ID do usuário!" });
        }
    }

    static async criar_pelo_usuario_id(props: ListaCriarPeloUsuarioId): Promise<ListaSelect> {
        try {
            const set_nova_lista = new schema_lista(props);
            return await set_nova_lista.save();
        } catch (error) {
            helpers.set_response.err.DB_ERROR({ message: "Erro ao criar lista!" });
        }
    }

    static async atualizar_pelo_usuario_id(props: ListaAtualizarPeloUsuarioId): Promise<ListaSelect> {
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

    static async deletar_pelo_usuario_id(props: ListaDeletarPeloUsuarioId): Promise<void> {
        try {
            await schema_lista.findOneAndDelete({ _id: props._id, usuario_id: props.usuario_id });
        } catch (error) {
            helpers.set_response.err.DB_ERROR({ message: "Erro ao deletar lista!" });
        }
    }
}