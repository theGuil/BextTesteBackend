import model_lista from "../../model/model_lista";
import t from "../../types/entidades";
import domain_lista from "../../domain/domain_lista";

export default class use_case_lista_buscar_pelo_filtro {
    private query: t.Entidades.Lista.BuscarPeloFiltro.Input
    private USUARIO_AUTH: t.Entidades.Usuario.UsuarioAuth

    constructor(
        query: t.Entidades.Lista.BuscarPeloFiltro.Input,
        usuario_auth: t.Entidades.Usuario.UsuarioAuth
    ) {
        this.USUARIO_AUTH = usuario_auth
        this.query = t.Entidades.Lista.BuscarPeloFiltro.query.parse(query)
    }

    async factory(): Promise<t.Entidades.Lista.BuscarPeloFiltro.Output> {

        const results = await model_lista.buscar_pelo_filtro({
            usuario_id: this.USUARIO_AUTH._id,
            ...this.query,
        });

        return {
            data: {
                paginacao: results.paginacao,
                listas: results.itens,
            }
        };
    }
}