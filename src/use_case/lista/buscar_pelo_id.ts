import model_lista from "../../model/model_lista";
import t from "../../types/entidades";
import domain_lista from "../../domain/domain_lista";

export default class use_case_lista_buscar_pelo_id extends domain_lista {
    private lista: t.Entidades.Lista.BuscarPeloId.Input['data']['lista'];

    constructor(props: t.Entidades.Lista.BuscarPeloId.Input, usuario_auth: t.Entidades.Usuario.UsuarioAuth) {
        super(usuario_auth);
        this.lista = t.Entidades.Lista.BuscarPeloId.InputSchema.parse(props).data.lista;
    }

    async factory(): Promise<t.Entidades.Lista.BuscarPeloId.Output> {

        const lista = await model_lista.buscar_pelo_id({ _id: this.lista._id });

        return {
            data: {
                lista: lista
            }
        };
    }
}