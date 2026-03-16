import t from "../../types/entidades";
// MODELS
import model_tarefa from "../../model/model_tarefa";
//DOMAIN
import domain_tarefa from "../../domain/domain_tarefa";

export default class use_case_tarefa_buscar_pelo_filtro {
    private query: t.Entidades.Tarefa.BuscarPeloFiltro.Input
    private domain_tarefa: InstanceType<typeof domain_tarefa>;

    constructor(
        query: t.Entidades.Tarefa.BuscarPeloFiltro.Input,
        usuario_auth: t.Entidades.Usuario.UsuarioAuth
    ) {
        this.domain_tarefa = new domain_tarefa(usuario_auth)

        this.query = t.Entidades.Tarefa.BuscarPeloFiltro.query.parse(query)
    }

    async factory(): Promise<t.Entidades.Tarefa.BuscarPeloFiltro.Output> {

        const results = await model_tarefa.buscar_pelo_filtro({
            usuario_id: this.domain_tarefa.USUARIO_AUTH._id,
            ...this.query
        });

        return {
            data: {
                paginacao: results.paginacao,
                tarefas: results.itens,
            }
        };
    }
}