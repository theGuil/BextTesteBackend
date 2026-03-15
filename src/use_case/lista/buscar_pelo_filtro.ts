import model_lista from "../../model/model_lista";
import t from "../../types/entidades";
import domain_lista from "../../domain/domain_lista";

export default class use_case_lista_buscar_pelo_filtro extends domain_lista {
    private filtros: t.Entidades.Lista.BuscarPeloFiltro.Input['data']['filtros'];

    constructor(props: t.Entidades.Lista.BuscarPeloFiltro.Input, usuario_auth: t.Entidades.Usuario.UsuarioAuth) {
        super(usuario_auth);
        this.filtros = t.Entidades.Lista.BuscarPeloFiltro.InputSchema.parse(props).data.filtros;
    }

    async factory(): Promise<t.Entidades.Lista.BuscarPeloFiltro.Output> {

        const listas = await model_lista.buscar_pelo_filtro({
            usuario_id: this.USUARIO_AUTH._id,
            ...this.filtros,
        });

        return {
            data: {
                listas: listas || []
            }
        };
    }
}