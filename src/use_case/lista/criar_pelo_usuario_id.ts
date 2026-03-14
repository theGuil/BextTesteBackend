import model_lista from "../../model/model_lista";
import t from "../../types/entidades";

export default class use_case_lista_criar_pelo_usuario_id {
    private lista: t.Entidades.Lista.CriarPeloUsuarioId.Input['data']['lista'];
    private usuario_auth: t.Entidades.Usuario.UsuarioAuth;

    constructor(props: t.Entidades.Lista.CriarPeloUsuarioId.Input, usuario_auth: t.Entidades.Usuario.UsuarioAuth) {
        this.usuario_auth = usuario_auth;
        this.lista = t.Entidades.Lista.CriarPeloUsuarioId.InputSchema.parse(props).data.lista;
    }

    async factory(): Promise<t.Entidades.Lista.CriarPeloUsuarioId.Output> {
        this.lista.usuario_id = this.usuario_auth._id;

        const nova_lista = await model_lista.criar_pelo_usuario_id(this.lista);

        return {
            data: {
                lista: nova_lista
            }
        };
    }
}