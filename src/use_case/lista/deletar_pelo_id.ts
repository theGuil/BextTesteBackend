import model_lista from "../../model/model_lista";
import t from "../../types/entidades";
import domain_lista from "../../domain/domain_lista";

export default class use_case_lista_deletar_pelo_id extends domain_lista {
    private lista: t.Entidades.Lista.DeletarPeloId.Input['data']['lista'];

    constructor(props: t.Entidades.Lista.DeletarPeloId.Input, usuario_auth: t.Entidades.Usuario.UsuarioAuth) {
        super(usuario_auth);
        this.lista = t.Entidades.Lista.DeletarPeloId.InputSchema.parse(props).data.lista;
    }

    async factory(): Promise<t.Entidades.Lista.DeletarPeloId.Output> {

        await model_lista.deletar_pelo_id({
            _id: this.lista._id,
            usuario_id: this.USUARIO_AUTH._id
        });

        return {
            message: "Lista removida com sucesso!"
        };
    }
}