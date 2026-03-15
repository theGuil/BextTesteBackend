import model_lista from "../../model/model_lista";
import t from "../../types/entidades";
import domain_lista from "../../domain/domain_lista";

export default class use_case_lista_criar extends domain_lista {
    private lista: t.Entidades.Lista.Criar.Input['data']['lista'];

    constructor(props: t.Entidades.Lista.Criar.Input, usuario_auth: t.Entidades.Usuario.UsuarioAuth) {
        super(usuario_auth);
        this.lista = t.Entidades.Lista.Criar.InputSchema.parse(props).data.lista;
    }

    async factory(): Promise<t.Entidades.Lista.Criar.Output> {


        const nova_lista = await model_lista.criar({
            usuario_id: this.USUARIO_AUTH._id,
            ...this.lista,
        });

        return {
            data: {
                lista: nova_lista
            }
        };
    }
}