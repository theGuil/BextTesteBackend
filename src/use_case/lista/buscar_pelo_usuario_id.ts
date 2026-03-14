import model_lista from "../../model/model_lista";
import t from "../../types/entidades";

export default class use_case_lista_buscar_pelo_usuario_id {
    private props: t.Entidades.Lista.BuscarPeloUsuarioId.Input;
    private usuario_auth: t.Entidades.Usuario.UsuarioAuth;
    constructor(props: t.Entidades.Lista.BuscarPeloUsuarioId.Input, usuario_auth: t.Entidades.Usuario.UsuarioAuth) {
        this.usuario_auth = usuario_auth
        this.props = t.Entidades.Lista.BuscarPeloUsuarioId.InputSchema.parse(props);
    }

    async factory(): Promise<t.Entidades.Lista.BuscarPeloUsuarioId.Output> {
        const listas = await model_lista.buscar_pelo_usuario_id({
            usuario_id: this.props.usuario_id
        });

        return {
            data: {
                listas: listas || []
            }
        };
    }
}