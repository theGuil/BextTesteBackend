import model_lista from "../../model/model_lista";
import t from "../../types/entidades";
import domain_lista from "../../domain/domain_lista";

export default class use_case_lista_buscar_pelo_id {
    private params: t.Entidades.Lista.BuscarPeloId.Input
    private USUARIO_AUTH: t.Entidades.Usuario.UsuarioAuth

    constructor(
        params: unknown,
        usuario_auth: t.Entidades.Usuario.UsuarioAuth
    ) {
        this.USUARIO_AUTH = usuario_auth
        this.params = t.Entidades.Lista.BuscarPeloId.params.parse(params);
    }

    async factory(): Promise<t.Entidades.Lista.BuscarPeloId.Output> {

        const lista = await model_lista.buscar_pelo_id({ _id: this.params.id });

        return {
            data: {
                lista: lista
            }
        };
    }
}