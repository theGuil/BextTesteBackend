import model_tarefa from "../../model/model_tarefa";
import t from "../../types/entidades";

export default class use_case_tarefa_criar_pelo_usuario_id {
    private props: t.Entidades.Tarefa.CriarPeloUsuarioId.Input;
    private usuario_auth: t.Entidades.Usuario.UsuarioAuth;
    constructor(props: t.Entidades.Tarefa.CriarPeloUsuarioId.Input, usuario_auth: t.Entidades.Usuario.UsuarioAuth) {
        this.usuario_auth = usuario_auth
        this.props = t.Entidades.Tarefa.CriarPeloUsuarioId.InputSchema.parse(props);
    }

    async factory(): Promise<t.Entidades.Tarefa.CriarPeloUsuarioId.Output> {
        const nova_tarefa = await model_tarefa.criar_pelo_usuario_id(this.props);

        return {
            data: {
                tarefa: {
                    _id: String(nova_tarefa._id),
                    titulo: nova_tarefa.titulo,
                    descricao: nova_tarefa.descricao,
                    status: nova_tarefa.status,
                    data_vencimento: nova_tarefa.data_vencimento,
                    lista_id: String(nova_tarefa.lista_id),
                    usuario_id: String(nova_tarefa.usuario_id),
                    createdAt: nova_tarefa.createdAt
                }
            }
        };
    }
}