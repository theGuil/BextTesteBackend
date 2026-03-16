import model_lista from "../../model/model_lista";
import t from "../../types/entidades";
import domain_lista from "../../domain/domain_lista";

export default class use_case_lista_deletar_pelo_id {
    private params: t.Entidades.Lista.DeletarPeloId.Input;
    private USUARIO_AUTH: t.Entidades.Usuario.UsuarioAuth

    constructor(
        params: unknown,
        usuario_auth: t.Entidades.Usuario.UsuarioAuth
    ) {

        this.params = t.Entidades.Lista.DeletarPeloId.params.parse(params)

        this.USUARIO_AUTH = usuario_auth
    }

    async factory(): Promise<t.Entidades.Lista.DeletarPeloId.Output> {


        await model_lista.deletar_pelo_id({
            _id: this.params.id,
            usuario_id: this.USUARIO_AUTH._id
        });

        return {
            message: "Lista removida com sucesso!"
        };
    }
}