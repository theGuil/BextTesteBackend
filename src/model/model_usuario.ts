import { schema_usuario, UsuarioSelect } from "../schema/schema_usuario";
import helpers from "../helpers/helpers";
import t from "../types/entidades";



export default class model_usuario {

    static async buscar_pelo_email(props: { email: string }): Promise<t.Entidades.Usuario.Base> {
        try {
            const results = await schema_usuario.findOne({ email: props.email }).lean<t.Entidades.Usuario.Base>();

            return results;
        } catch (error) {
            helpers.set_response.err.DB_ERROR({ message: "Erro ao buscar usuário pelo e-mail!" });
        }
    }

    static async registrar(dados: t.Entidades.Usuario.Register.Input["data"]["usuario"]): Promise<Omit<UsuarioSelect, 'password'>> {
        try {
            const set_novo_usuario = new schema_usuario(dados);

            const novo_usuario = await set_novo_usuario.save();


            return {
                _id: novo_usuario._id,
                createdAt: novo_usuario.createdAt,
                email: novo_usuario.email,
                name: novo_usuario.name,

            }
        } catch (error) {
            helpers.set_response.err.DB_ERROR({ message: "Erro ao registrar usuário!" });
        }
    }

    static async deletar_pelo_id(props: { id: string }): Promise<void> {
        try {
            await schema_usuario.findByIdAndDelete(props.id);
        } catch (error) {
            helpers.set_response.err.DB_ERROR({ message: "Erro ao deletar usuário pelo ID!" });
        }
    }
}