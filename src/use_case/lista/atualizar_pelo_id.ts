import model_lista from "../../model/model_lista";
import t from "../../types/entidades";
import domain_lista from "../../domain/domain_lista";


export default class use_case_lista_atualizar_pelo_id {
    private body: t.Entidades.Lista.AtualizarPeloId.Input['data']['lista'];
    private params: t.Entidades.Lista.AtualizarPeloId.Params
    private USUARIO_AUTH: t.Entidades.Usuario.UsuarioAuth
    private domain_lista: InstanceType<typeof domain_lista>;
    constructor(
        body: t.Entidades.Lista.AtualizarPeloId.Input,
        params: unknown,
        usuario_auth: t.Entidades.Usuario.UsuarioAuth
    ) {
        this.body = t.Entidades.Lista.AtualizarPeloId.body.parse(body).data.lista;
        this.params = t.Entidades.Lista.AtualizarPeloId.params.parse(params);
        this.USUARIO_AUTH = usuario_auth
        this.domain_lista = new domain_lista(usuario_auth)
    }

    async factory(): Promise<t.Entidades.Lista.AtualizarPeloId.Output> {

        const lista = await model_lista.buscar_pelo_id({ _id: this.params.id });

        this.domain_lista.verificar_se_encontrou_uma_lista(lista)

        this.domain_lista.verificar_se_lista_pertence_ao_usuario_auth(lista)


        const lista_atualizada = await model_lista.atualizar_pelo_id({
            usuario_id: this.USUARIO_AUTH._id,// Como o id do usuário já vem do token en não do body, não precisaria de domain para validar
            _id: this.params.id,
            ...this.body,
        });


        return {
            data: {
                lista: lista_atualizada
            }
        };
    }
}