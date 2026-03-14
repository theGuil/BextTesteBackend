import model_lista from "../../model/model_lista";
import t from "../../types/entidades";

export default class use_case_lista_buscar_pelo_usuario_id {
    private lista: t.Entidades.Lista.BuscarPeloUsuarioId.Input['data']['lista'];
    private usuario_auth: t.Entidades.Usuario.UsuarioAuth;

    constructor(props: t.Entidades.Lista.BuscarPeloUsuarioId.Input, usuario_auth: t.Entidades.Usuario.UsuarioAuth) {
        this.usuario_auth = usuario_auth;
        this.lista = t.Entidades.Lista.BuscarPeloUsuarioId.InputSchema.parse(props).data.lista;
    }

    async factory(): Promise<t.Entidades.Lista.BuscarPeloUsuarioId.Output> {
        this.lista.usuario_id = this.usuario_auth._id;

        const listas = await model_lista.buscar_pelo_usuario_id(this.lista);

        return {
            data: {
                listas: listas || []
            }
        };
    }
}