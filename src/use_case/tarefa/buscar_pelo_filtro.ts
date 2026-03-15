import t from "../../types/entidades";
// MODELS
import model_tarefa from "../../model/model_tarefa";
//DOMAIN
import domain_tarefa from "../../domain/domain_tarefa";

export default class use_case_tarefa_buscar_pelo_filtro {
    private filtro: t.Entidades.Tarefa.BuscarPeloFiltro.Input['data']['filtro'];
    private domain_tarefa: InstanceType<typeof domain_tarefa>;

    constructor(props: t.Entidades.Tarefa.BuscarPeloFiltro.Input, usuario_auth: t.Entidades.Usuario.UsuarioAuth) {
        this.domain_tarefa = new domain_tarefa(usuario_auth)

        this.filtro = t.Entidades.Tarefa.BuscarPeloFiltro.InputSchema.parse(props).data.filtro;
    }

    async factory(): Promise<t.Entidades.Tarefa.BuscarPeloFiltro.Output> {


        // Aqui o this.domain_tarefa.USUARIO_AUTH._id sempre vai no filtro então não precisa verificar se é do usuário
        // pois o banco de dados já faz o filtro pelo usuario_id

        const tarefas = await model_tarefa.buscar_pelo_filtro({
            usuario_id: this.domain_tarefa.USUARIO_AUTH._id,
            ...this.filtro
        });

        return {
            data: {
                tarefas: tarefas || []
            }
        };
    }
}