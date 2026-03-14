import { schema_lista, ListaSelect } from "../schema/schema_lista";
import helpers from "../helpers/helpers";
import t from "../types/entidades";

export default class model_lista {

    static async buscar_pelo_usuario_id(props: t.Entidades.Lista.BuscarPeloUsuarioId.Input): Promise<t.Entidades.Lista.Base[]> {
        try {
            const results = await schema_lista.find({ usuario_id: props.usuario_id }).lean<t.Entidades.Lista.Base[]>();

            return results;
        } catch (error) {
            helpers.set_response.err.DB_ERROR({ message: "Erro ao buscar listas pelo ID do usuário!" });
        }
    }

    static async criar_pelo_usuario_id(props: t.Entidades.Lista.CriarPeloUsuarioId.Input): Promise<ListaSelect> {
        try {
            const set_nova_lista = new schema_lista({
                usuario_id: props.usuario_id,
                ...props.data
            });

            const nova_lista = await set_nova_lista.save();

            return nova_lista;
        } catch (error) {
            helpers.set_response.err.DB_ERROR({ message: "Erro ao criar lista!" });
        }
    }

    static async atualizar_pelo_usuario_id(props: t.Entidades.Lista.AtualizarPeloUsuarioId.Input): Promise<t.Entidades.Lista.Base> {
        try {
            const result = await schema_lista.findOneAndUpdate(
                { _id: props.data.id, usuario_id: props.data.usuario_id },
                { $set: { nome: props.data.nome } },
                { new: true }
            ).lean<t.Entidades.Lista.Base>();

            return result;
        } catch (error) {
            helpers.set_response.err.DB_ERROR({ message: "Erro ao atualizar lista!" });
        }
    }

    static async deletar_pelo_usuario_id(props: t.Entidades.Lista.DeletarPeloUsuarioId.Input): Promise<t.Entidades.Lista.Base> {
        try {
            return await schema_lista.findOneAndDelete({ _id: props.id, usuario_id: props.usuario_id });
        } catch (error) {
            helpers.set_response.err.DB_ERROR({ message: "Erro ao deletar lista!" });
        }
    }
}