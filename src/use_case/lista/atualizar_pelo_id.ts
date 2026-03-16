import model_lista from "../../model/model_lista";
import t from "../../types/entidades";
import domain_lista from "../../domain/domain_lista";


export default class use_case_lista_atualizar_pelo_id {
    private body: t.Entidades.Lista.AtualizarPeloId.Input['data']['lista'];
    private params: t.Entidades.Lista.AtualizarPeloId.Params
    private USUARIO_AUTH: t.Entidades.Usuario.UsuarioAuth

    constructor(
        body: t.Entidades.Lista.AtualizarPeloId.Input,
        params: unknown,
        usuario_auth: t.Entidades.Usuario.UsuarioAuth
    ) {
        this.body = t.Entidades.Lista.AtualizarPeloId.body.parse(body).data.lista;
        this.params = t.Entidades.Lista.AtualizarPeloId.params.parse(params);
        this.USUARIO_AUTH = usuario_auth
    }

    async factory(): Promise<t.Entidades.Lista.AtualizarPeloId.Output> {


        const lista_atualizada = await model_lista.atualizar_pelo_id({
            usuario_id: this.USUARIO_AUTH._id,
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