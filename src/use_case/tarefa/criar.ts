import t from "../../types/entidades";
//DOMAIN
import domain_tarefa from "../../domain/domain_tarefa";
import domain_lista from "../../domain/domain_lista";
//MODEL
import model_tarefa from "../../model/model_tarefa";
import model_lista from "../../model/model_lista";


export default class use_case_tarefa_criar {
    private tarefa: t.Entidades.Tarefa.Criar.Input['data']['tarefa'];
    private domain_tarefa: InstanceType<typeof domain_tarefa>;
    private domain_lista: InstanceType<typeof domain_lista>;

    constructor(props: t.Entidades.Tarefa.Criar.Input, usuario_auth: t.Entidades.Usuario.UsuarioAuth) {
        this.tarefa = t.Entidades.Tarefa.Criar.InputSchema.parse(props).data.tarefa;
        this.domain_tarefa = new domain_tarefa(usuario_auth)
        this.domain_lista = new domain_lista(usuario_auth)
    }

    async factory(): Promise<t.Entidades.Tarefa.Criar.Output> {

        const lista = await model_lista.buscar_pelo_id({ _id: this.tarefa.lista_id })

        this.domain_lista.verificar_se_encontrou_uma_lista(lista)

        this.domain_lista.verificar_se_lista_pertence_ao_usuario_auth(lista)

        const nova_tarefa = await model_tarefa.criar(this.tarefa);

        return {
            data: {
                tarefa: nova_tarefa
            }
        };
    }
}