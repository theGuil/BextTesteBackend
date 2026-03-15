import model_tarefa from "../../model/model_tarefa";
import t from "../../types/entidades";
import domain_tarefa from "../../domain/domain_tarefa";

export default class use_case_tarefa_buscar_pelo_filtro extends domain_tarefa {
    private filtro: t.Entidades.Tarefa.BuscarPeloFiltro.Input['data']['filtro'];

    constructor(props: t.Entidades.Tarefa.BuscarPeloFiltro.Input, usuario_auth: t.Entidades.Usuario.UsuarioAuth) {
        super(usuario_auth);
        this.filtro = t.Entidades.Tarefa.BuscarPeloFiltro.InputSchema.parse(props).data.filtro;
    }

    async factory(): Promise<t.Entidades.Tarefa.BuscarPeloFiltro.Output> {


        const tarefas = await model_tarefa.buscar_pelo_filtro({
            usuario_id: this.USUARIO_AUTH._id,
            ...this.filtro
        });

        return {
            data: {
                tarefas: tarefas || []
            }
        };
    }
}