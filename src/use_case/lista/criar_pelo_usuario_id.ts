import model_lista from "../../model/model_lista";
import t from "../../types/entidades";

export default class use_case_lista_criar_pelo_usuario_id {
    private props: t.Entidades.Lista.CriarPeloUsuarioId.Input;
    private usuario_auth: t.Entidades.Usuario.UsuarioAuth;

    constructor(props: t.Entidades.Lista.CriarPeloUsuarioId.Input, usuario_auth: t.Entidades.Usuario.UsuarioAuth) {
        this.usuario_auth = usuario_auth
        this.props = t.Entidades.Lista.CriarPeloUsuarioId.InputSchema.parse(props);
    }

    async factory(): Promise<t.Entidades.Lista.CriarPeloUsuarioId.Output> {
        const nova_lista = await model_lista.criar_pelo_usuario_id(this.props);

        return {
            data: {
                lista: {
                    _id: nova_lista._id.toString(),
                    usuario_id: nova_lista.usuario_id.toString(),
                    nome: nova_lista.nome,
                    createdAt: nova_lista.createdAt
                }
            }
        };
    }
}