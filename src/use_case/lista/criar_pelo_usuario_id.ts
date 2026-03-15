import model_lista from "../../model/model_lista";
import t from "../../types/entidades";
import domain_lista from "../../domain/domain_lista";

export default class use_case_lista_criar_pelo_usuario_id extends domain_lista {
    private lista: t.Entidades.Lista.CriarPeloUsuarioId.Input['data']['lista'];

    constructor(props: t.Entidades.Lista.CriarPeloUsuarioId.Input, usuario_auth: t.Entidades.Usuario.UsuarioAuth) {
        super(usuario_auth);
        this.lista = t.Entidades.Lista.CriarPeloUsuarioId.InputSchema.parse(props).data.lista;
    }

    async factory(): Promise<t.Entidades.Lista.CriarPeloUsuarioId.Output> {

        await this.verificar_se_usuario_id_body_e_igual_usuario_auth_id({ usuario_id_body: this.lista.usuario_id });

        const nova_lista = await model_lista.criar_pelo_usuario_id(this.lista);

        return {
            data: {
                lista: nova_lista
            }
        };
    }
}