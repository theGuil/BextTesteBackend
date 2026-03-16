import model_lista from "../../model/model_lista";
import t from "../../types/entidades";
import domain_lista from "../../domain/domain_lista";

export default class use_case_lista_deletar_pelo_id {
    private params: t.Entidades.Lista.DeletarPeloId.Input;
    private USUARIO_AUTH: t.Entidades.Usuario.UsuarioAuth
    private domain_lista: InstanceType<typeof domain_lista>;
    constructor(
        params: unknown,
        usuario_auth: t.Entidades.Usuario.UsuarioAuth
    ) {

        this.params = t.Entidades.Lista.DeletarPeloId.params.parse(params)
        this.domain_lista = new domain_lista(usuario_auth)
        this.USUARIO_AUTH = usuario_auth
    }

    async factory(): Promise<t.Entidades.Lista.DeletarPeloId.Output> {



        const lista = await model_lista.buscar_pelo_id({ _id: this.params.id });

        this.domain_lista.verificar_se_encontrou_uma_lista(lista)

        this.domain_lista.verificar_se_lista_pertence_ao_usuario_auth(lista)


        await model_lista.deletar_pelo_id({
            _id: this.params.id,
            usuario_id: this.USUARIO_AUTH._id // Como o id do usuário já vem do token en não do body, não precisaria de domain para validar
        });

        return {
            message: "Lista removida com sucesso!"
        };
    }
}