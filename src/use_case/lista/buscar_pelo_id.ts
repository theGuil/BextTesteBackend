import model_lista from "../../model/model_lista";
import t from "../../types/entidades";
import domain_lista from "../../domain/domain_lista";

export default class use_case_lista_buscar_pelo_id {
    private params: t.Entidades.Lista.BuscarPeloId.Input
    private domain_lista: InstanceType<typeof domain_lista>;
    constructor(
        params: unknown,
        usuario_auth: t.Entidades.Usuario.UsuarioAuth
    ) {
        this.params = t.Entidades.Lista.BuscarPeloId.params.parse(params);

        this.domain_lista = new domain_lista(usuario_auth)
    }

    async factory(): Promise<t.Entidades.Lista.BuscarPeloId.Output> {

        const lista = await model_lista.buscar_pelo_id({ _id: this.params.id });

        this.domain_lista.verificar_se_encontrou_uma_lista(lista)

        this.domain_lista.verificar_se_lista_pertence_ao_usuario_auth(lista)


        return {
            data: {
                lista: lista
            }
        };
    }
}